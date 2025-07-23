import Quote from "../models/Quote.js";
import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
// Configure your transporter (use environment variables in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const createQuote = async (req, res) => {
  try {
    // Debug: Log environment variables for nodemailer
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "*****" : undefined);

    const quote = new Quote(req.body);
    await quote.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: quote.email,
      subject: "We received your quote request!",
      text: `Dear ${quote.fullName},\n\nThank you for your quote request. Our team will get back to you soon!\n\nBest regards,\nFresh Berry Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email error:", error);
    }

    res.status(201).json({ message: "Quote submitted successfully", quote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markQuoteDone = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );
    if (!quote) return res.status(404).json({ error: "Quote not found" });

    // Send email to user when marked as done
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: quote.email,
      subject: "Your quote request is complete!",
      text: `Dear ${quote.fullName},\n\nYour quote request has been marked as done by our team. If you have any further questions or need more assistance, feel free to reply to this email.\n\nBest regards,\nFresh Berry Team`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email error (done):", error);
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
