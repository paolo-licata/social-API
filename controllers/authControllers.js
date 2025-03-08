const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Sign up a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
}

// Log in an existing user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: "Invalid credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login failed.", error });
    }
}

// Get a user by ID
exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password'); //To avoid sending sensitive data

        if (!user) {
            return res.status(404).json({ message: "No user found."})
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Error while fetching user"});
    }
}

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.user.id; // account data extracted from jwt token

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });

        // Update user details
        if (username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.status(200).json({ message: "Account data updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to update account data.", error });
    }
}

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user.id; // account data extracted from jwt token

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ nessage: "User not found"});

        await User.findByIdAndDelete(userId);;

        res.status(200).json({ message: "Account deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete account.", error });
    }
}