const tempOTP = {};
const storeOTP = (email, otp) => {
    tempOTP[email] = {
        otp: otp,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes expiry
    };
}


const verifyOTP = async (email, otp) => {
    if (!tempOTP[email]) {
        return {
            success:false,
            message: "OTP Not Found Or Expired"
        }
    }
    if (Date.now() > tempOTP[email].expiresAt) {
        delete tempOTP[email];
        return {
            success:false,
            message: "OTP Expired"
        }
    }

    if (tempOTP[email].otp !== otp) {
        return {
            success:false,
            message: "Invalid OTP"
        }
    }


    delete tempOTP[email];

    return {
        success: true,
        message: "OTP Verified Successfully"
    }



}


module.exports = {
    verifyOTP, storeOTP
}