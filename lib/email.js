// lib/email.js
import nodemailer from 'nodemailer'

export async function sendEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const info = await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}
