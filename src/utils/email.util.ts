import nodemailer from 'nodemailer';

// Utility to send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationLink = `http://localhost:3000/api/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Click on the link to verify your email: ${verificationLink}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error:any) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Error sending verification email');
  }
};
