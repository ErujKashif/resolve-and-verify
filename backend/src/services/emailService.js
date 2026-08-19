const nodemailer = require('nodemailer');

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"Resolve & Verify" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Your OTP for Resolve & Verify',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2c3e50;">🔐 Your OTP Code</h2>
          <p style="color: #555;">Use the following OTP to log in to the <strong>Resolve & Verify</strong> system:</p>
          <div style="background: #f4f6f8; padding: 15px; font-size: 32px; letter-spacing: 8px; text-align: center; font-weight: bold; border-radius: 8px; margin: 20px 0; color: #2c3e50;">
            ${otp}
          </div>
          <p style="color: #555;">This OTP is valid for <strong>${process.env.OTP_EXPIRY_MINUTES || 5} minutes</strong>.</p>
          <p style="color: #555;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px;">Resolve & Verify - CDA Citizen Feedback System</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send OTP to ${to}:`, error.message);
    throw new Error('Failed to send OTP email. Please try again later.');
  }
};

module.exports = sendOTPEmail;