const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


router.post("/", async (req, res) => {
    const { item } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER, // or hardcode
        subject: `Enquiry for Item: ${item}`,
        text: `You received an enquiry for the item: ${item}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ success: false, error: "Email failed to send" });
    }
});

module.exports = router;
