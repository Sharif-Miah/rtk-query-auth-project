/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, orderItems, subtotal, tax, total, orderDate } = body;

    // Create transporter using your email service
    // Example using Gmail (you can use any SMTP service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    // Create email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Order Confirmation</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Thank you for your purchase!</p>
                  </td>
                </tr>

                <!-- Success Icon -->
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <div style="width: 80px; height: 80px; background-color: #10b981; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                      <span style="color: white; font-size: 40px;">✓</span>
                    </div>
                  </td>
                </tr>

                <!-- Customer Info -->
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <p style="color: #333333; font-size: 16px; margin: 0;">Hi ${name},</p>
                    <p style="color: #666666; font-size: 14px; margin: 10px 0 0 0;">
                      Your order has been confirmed and will be shipped shortly. Here are your order details:
                    </p>
                  </td>
                </tr>

                <!-- Order Details -->
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td style="padding-bottom: 10px;">
                          <p style="color: #666666; font-size: 14px; margin: 0;">Order Number</p>
                          <p style="color: #333333; font-size: 16px; font-weight: bold; margin: 5px 0 0 0;">${orderNumber}</p>
                        </td>
                        <td style="padding-bottom: 10px; text-align: right;">
                          <p style="color: #666666; font-size: 14px; margin: 0;">Order Date</p>
                          <p style="color: #333333; font-size: 16px; font-weight: bold; margin: 5px 0 0 0;">${orderDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Order Items -->
                <tr>
                  <td style="padding: 0 30px 20px 30px;">
                    <h2 style="color: #333333; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      Order Items
                    </h2>
                    ${orderItems.map((item: any) => `
                      <div style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width: 70%;">
                              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0;">${item.title}</p>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0 0;">Quantity: ${item.quantity}</p>
                            </td>
                            <td style="text-align: right;">
                              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0;">
                                $${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    `).join('')}
                  </td>
                </tr>

                <!-- Price Summary -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <p style="color: #666666; font-size: 14px; margin: 0;">Subtotal</p>
                        </td>
                        <td style="text-align: right; padding: 8px 0;">
                          <p style="color: #333333; font-size: 14px; font-weight: 600; margin: 0;">$${subtotal.toFixed(2)}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <p style="color: #666666; font-size: 14px; margin: 0;">Tax</p>
                        </td>
                        <td style="text-align: right; padding: 8px 0;">
                          <p style="color: #333333; font-size: 14px; font-weight: 600; margin: 0;">$${tax.toFixed(2)}</p>
                        </td>
                      </tr>
                      <tr style="border-top: 2px solid #e5e7eb;">
                        <td style="padding: 15px 0 0 0;">
                          <p style="color: #333333; font-size: 18px; font-weight: bold; margin: 0;">Total</p>
                        </td>
                        <td style="text-align: right; padding: 15px 0 0 0;">
                          <p style="color: #667eea; font-size: 24px; font-weight: bold; margin: 0;">$${total.toFixed(2)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Shipping Info -->
                <tr>
                  <td style="padding: 0 30px 30px 30px;">
                    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px;">
                      <p style="color: #1e40af; font-size: 14px; margin: 0;">
                        <strong>Free Shipping!</strong> Your order qualifies for free shipping and will arrive within 5-7 business days.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                      Need help? Contact us at support@yourstore.com
                    </p>
                    <p style="color: #999999; font-size: 12px; margin: 0;">
                      © 2024 Your Store. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Your Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: emailHTML,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      orderNumber 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}