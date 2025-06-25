import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { to, subject, text, pdfBase64 } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your Business Name" <${process.env.EMAIL_USER}>`,
      to: "merrylyt@gmail.com", 
      cc: ["merrylyt@gmail.com"], 
      subject,
      text,
      attachments: [
        {
          filename: "quote.pdf",
          content: pdfBase64.split("base64,")[1],
          encoding: "base64",
        },
      ],
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
