const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { storeOTP } = require("./verifyOTP");

require("dotenv").config();
const sendOTP = async (toEmail, subject) => {
    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            digits: true
        });
        console.log("Otp generatedis : ", otp);

        storeOTP(toEmail, otp);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });


        transporter.sendMail({
            from: `"Pak Classifed"<${process.env.USER_EMAIL}`,
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

<body style="margin:0;padding:0;background:#0f1113;font-family:'Courier New',Courier,monospace;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1113;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#1D2023;border:2px solid #ffffff;border-radius:8px;overflow:hidden;">

<!-- Header -->
<tr>
<td align="center" style="background:#1D2023;padding:35px;border-bottom:1px solid rgba(255,255,255,0.25);">

<h1 style="margin:0;color:#f1f1f1;font-size:30px;font-weight:500;letter-spacing:1px;font-family:'Courier New',Courier,monospace;">
Pak Classified
</h1>

<p style="margin-top:10px;color:#fefefe;font-size:15px;font-family:'Courier New',Courier,monospace;">
Secure Email Verification
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#f1f1f1;font-size:22px;font-weight:500;font-family:'Courier New',Courier,monospace;">
Verify Your Email
</h2>

<p style="font-size:15px;color:#cfcfcf;line-height:26px;font-family:'Courier New',Courier,monospace;">
Hello,
</p>

<p style="font-size:15px;color:#cfcfcf;line-height:26px;font-family:'Courier New',Courier,monospace;">
Thank you for choosing
<strong style="color:#f1f1f1;">Pak Classified</strong>.
To complete your account verification, please use the One-Time Password (OTP) below.
</p>

<!-- OTP Box -->
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<div style="
display:inline-block;
background:#26292d;
border:1px dashed rgba(255,255,255,0.5);
padding:20px 45px;
border-radius:8px;
margin:25px 0;
">

<span style="
font-size:40px;
font-weight:bold;
letter-spacing:10px;
color:#f1f1f1;
font-family:'Courier New',Courier,monospace;
">
${otp}
</span>

</div>

</td>
</tr>
</table>

<p style="font-size:15px;color:#e0e0e0;text-align:center;font-family:'Courier New',Courier,monospace;">
This OTP will expire in
<strong style="color:#f1f1f1;">5 minutes</strong>.
</p>

<p style="font-size:14px;color:#a5a5a5;line-height:26px;font-family:'Courier New',Courier,monospace;">
Please do not share this OTP with anyone. Pak Classified will never ask for your OTP through phone calls, messages, or emails.
</p>

</td>
</tr>

<!-- Divider -->
<tr>
<td style="padding:0 40px;">
<hr style="border:none;border-top:1px solid rgba(255,255,255,0.2);">
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:30px 40px;text-align:center;">

<p style="font-size:13px;color:#a5a5a5;line-height:22px;font-family:'Courier New',Courier,monospace;">
This email was sent automatically by
<strong style="color:#cfcfcf;">Pak Classified</strong>.
</p>

<p style="font-size:13px;color:#a5a5a5;line-height:22px;font-family:'Courier New',Courier,monospace;">
If you did not request this verification code, you can safely ignore this email.
</p>

<p style="font-size:12px;color:#777;margin-top:25px;font-family:'Courier New',Courier,monospace;">
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


        console.log("OTP Sent Successfully", toEmail);
        return {
            success: true,
            message: "OTP Send Successfully"
        }


        // return otp;

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong while sending OTP"

        }
    }
}


// sendOTP("cyb3r.awais@gmail.com", "OTP To Verfiy");


module.exports = sendOTP;