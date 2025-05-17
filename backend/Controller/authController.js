import userModel from "../Model/user.js"; // Import the user model
import jwt from "jsonwebtoken"; // Import JSON Web Token for authentication
import bcrypt from "bcrypt"; // Import bcrypt for password hashing and comparison


// Function to register a new user
export const registerUser = async (req, res) => {
  try {
     // Extract user details from the request body
    const { name, email, password } = req.body;

    // Check if email or username is already registered
    const existingUser = await userModel.findOne({ $or: [{ email }, { name }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" }); // Return error if user already exists

    // Create a new user instance with provided details
    const user = new userModel({ 
      name: name, 
      email: email,
      password: password, 
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).json({ message: err.message });
  }
};

// Function to log in a user
export const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" }); // Return error if user does not exist

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" }); // Return error if passwords do not match

    // Generate a JWT token for authenticated user
    const token = jwt.sign({ user: user.username }, "secretKey", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send success response with the generated token
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: err.message });
  }
};

// Function to get all users excluding their password
export const getAllUsers = async (req, res) => {
  try {
    // Find all users, exclude the password field
    const users = await userModel.find({}, { password: 0 });

    // Send the users in the response
    res.status(200).json(users);
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: err.message });
  }
};
