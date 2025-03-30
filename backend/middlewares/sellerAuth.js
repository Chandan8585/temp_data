const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");
require('dotenv').config();

const sellerAuth = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
console.log("Received Token:", token);

    // const { token } = req.cookies;
    console.log("Token from cookies:", token);

    if (!token) {
        return res.status(401).json({ message: "Token is not found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("Decoded token:", decoded);

        const { _id } = decoded;
        const sellerData = await Seller.findById(_id);
        if (!sellerData) {
            return res.status(404).json({ message: "Seller not found" });
        }

        req.seller = sellerData;  
        console.log("Seller found:", sellerData);
        next();

    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(400).json({ message: "Seller token is invalid or expired" });
    }
};

module.exports = { sellerAuth };
