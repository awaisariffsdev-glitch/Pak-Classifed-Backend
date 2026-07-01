const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const {storeOTP}=require("./verifyOTP");

require("dotenv").config();
const sendOTP = async (toEmail, subject) => {
    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            digits: true
        });
        console.log(otp);

        storeOTP(toEmail,otp);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });


        await transporter.sendMail({
            from: "Pak Classifed",
            to: toEmail,
            subject,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pak Classified OTP</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td align="center" style="background:#0d6efd;padding:35px;">


<h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:bold;">
Pak Classified
</h1>

<p style="margin-top:10px;color:#e9f2ff;font-size:16px;">
Secure Email Verification
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;font-size:24px;">
Verify Your Email
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Hello,
</p>

<p style="font-size:16px;color:#555;line-height:28px;">
Thank you for choosing
<strong>Pak Classified</strong>.
To complete your account verification, please use the One-Time Password (OTP) below.
</p>

<!-- OTP Box -->
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<div style="
display:inline-block;
background:#f3f7ff;
border:2px dashed #0d6efd;
padding:20px 45px;
border-radius:12px;
margin:25px 0;
">

<span style="
font-size:42px;
font-weight:bold;
letter-spacing:10px;
color:#0d6efd;
">
${otp}
</span>

</div>

</td>
</tr>
</table>

<p style="font-size:16px;color:#444;text-align:center;">
 This OTP will expire in
<strong>5 minutes</strong>.
</p>

<p style="font-size:15px;color:#666;line-height:28px;">
Please do not share this OTP with anyone. Pak Classified will never ask for your OTP through phone calls, messages, or emails.
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:0 40px;">
<hr style="border:none;border-top:1px solid #eeeeee;">
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px;text-align:center;">

<p style="font-size:14px;color:#777;line-height:24px;">
This email was sent automatically by
<strong>Pak Classified</strong>.
</p>

<p style="font-size:14px;color:#777;line-height:24px;">
If you did not request this verification code, you can safely ignore this email.
</p>

<p style="font-size:13px;color:#999;margin-top:25px;">
© ${new Date().getFullYear()} Pak Classified. All Rights Reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
        });


        console.log("OTP Sent Successfully",toEmail);
        return {
            success:true,
            message:"OTP Send Successfully"
        }


        // return otp;

    } catch (error) {
        console.log(error);
        return {
            success:false,
            message:"Something went wrong while sending OTP"

        }
    }
}


// sendOTP("cyb3r.awais@gmail.com", "OTP To Verfiy");


module.exports = sendOTP;