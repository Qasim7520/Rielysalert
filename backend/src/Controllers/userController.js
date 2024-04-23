const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const globalServices = require("../Services/index");
const bycrypt = require("bcryptjs");
const sendEmail = require("../Services/nodemailer");
const axios= require("axios")
const { findUserByObjects, findUserByResetTable } = require("../Services/userServices");
const { sendPushNotification } = require("../Utils/Firebase/Notification");
const {sendSMS} = require("../Utils/Twilio/SMS")

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });
  
  const upload = multer({ dest: 'uploads/' }); 
  

// *************************************************************************
module.exports = {
    signUp: async (req, res) => {
        let records = req.body;
        let emailExists = await globalServices.user.findUserByObjects({
            email: records.email,
        });
        if (!emailExists) {
            const otp = globalServices.global.createOtp();
            records.otp = otp.OTP;
            records.otpTime = otp.timestamp;
            let result = await globalServices.user.signUp(records);
            const emaiOTP = otp.OTP;
            console.log('RESULT:', result)

            const subject = "Riley's - Please verify your email address";
            const message = `Thanks for signing up! Here is your OTP: ${emaiOTP}`;

            const EmailSend = await sendEmail(result.email, subject, message, emaiOTP);
            console.log("Email Send", EmailSend)

            if (result && result._id) {
                if (EmailSend) {
                    return globalServices.global.returnResponse(res, 201, false, "Account created successfully.Please check your email to verify your account.", result);
                }
                else {
                    return globalServices.global.returnResponse(res, 201, true, "Account created successfully but there was an error while sending email.", result);
                }

            } else {
                return globalServices.global.returnResponse(res, 500, true, errorMessage.somethingWentWrong, result);
            }
        }
        else {
            return globalServices.global.returnResponse(res, 403, true, "Email already exists", {});
        }

    },

    login: async (req, res) => {
        let records = req.body;
        let accountResult = await globalServices.user.findUserByObjects({ email: records.email, });
        console.log("accountResult", accountResult)
        if (accountResult && accountResult._id) {
            let updatedUser= await globalServices.user.updateUserAccountById(accountResult?._id,{location:records.location})
            let verifyPassword = await bycrypt.compare(records.password, accountResult.password)
            if (verifyPassword) {
                if (accountResult.isVerified) {
                    let JwtToken = await globalServices.global.JwtToken({ _id: accountResult._id, });
                    let updatedResult = await globalServices.user.updateUserAccountById(accountResult._id, { token: JwtToken, login_try: 0 });
                    if (records?.fcm_token&&!accountResult.fcm_token.includes(records.fcm_token)) {
                        accountResult.fcm_token.push(records.fcm_token);
                        await accountResult.save();
                    }
                    return globalServices.global.returnResponse(res, 200, false, "Login successful.", updatedResult);
                } else {
                    return globalServices.global.returnResponse(res, 401, true, "Your account is not verified.Please verify your account first.", {});
                }
            } else {
                return globalServices.global.returnResponse(res, 401, true, "Email or password is incorrect", {});
            }
        } else {
            console.log("User Not found")
            return globalServices.global.returnResponse(res, 404, true, "Email doesn't exist", {});
        }
    },

    updatedToken: async (req, res) => {
        let records = req.body;
        let accountResult = await globalServices.user.findUserByObjects({ email: records.email, });
        console.log("accountResult", accountResult)
        if (accountResult && accountResult._id) {
            let updatedUser= await globalServices.user.updateUserAccountById(accountResult?._id,{location:records.location})
            return globalServices.global.returnResponse(res, 200, false, "User Found.", updatedUser);
        } else {
            console.log("User Not found")
            return globalServices.global.returnResponse(res, 404, true, "Email doesn't exist", {});
        }
    },

    resendOtp: async (req, res) => {
        try {
            const userEmail = req.body.email;
            let accountResult = await globalServices.user.findUserByObjects({ email: userEmail, });
            if (accountResult && accountResult._id) {
                const otp = globalServices.global.createOtp();
                const newOTP = otp.OTP;
                const updateUserOtp = await globalServices.user.updateUserAccountById(accountResult._id, { otp: newOTP, otpTime: otp.timestamp });

                const subject = "Riley's - New OTP";
                const message = `Your new OTP is: ${newOTP}`;
                const EmailSend = await sendEmail(updateUserOtp.email, subject, message);
                if (EmailSend) {
                    return globalServices.global.returnResponse(res, 200, false, "OTP resend Successfully", updateUserOtp);
                }
                else {
                    return globalServices.global.returnResponse(res, 200, true, "There was an Error send OTP", updateUserOtp);
                }
            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "No record found with this email.", {});

            }

        } catch (error) {
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});

        }

    },

    verifyOtp: async (req, res) => {
        try {
            const { email, otp } = req.body;
            const accountResult = await findUserByObjects({ email: email })
            if (accountResult && accountResult._id) {

                if (!accountResult.otp || accountResult.otp !== otp) {
                    return globalServices.global.returnResponse(res, 406, true, "Invalid OTP.", { otp_verification: false });
                }

                const otpTimestamp = accountResult.otpTime;
                const currentTimestamp = Date.now();
                const timeDifference = currentTimestamp - otpTimestamp;

                if (timeDifference > 5 * 60 * 1000) {
                    return globalServices.global.returnResponse(res, 406, true, "OTP has expired.", { otp_verification: false });
                }

                let token = await globalServices.global.JwtToken({ _id: accountResult._id });
                let updateResult = await globalServices.user.updateUserAccountById(
                    accountResult._id,
                    { otp: "", token, isVerified: true, otpTime: "" }
                );
                return globalServices.global.returnResponse(res, 200, false, "Account verified successfully.", updateResult);


            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "No record found with this email.", {});
            }
        } catch (error) {
            console.log("error", error)
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});
        }
    },
    verifyResetPassOtp: async (req, res) => {
        try {
            const { email, otp } = req.body;
            const accountResult = await findUserByObjects({ email: email })
            if (accountResult && accountResult._id) {

                const findUserOtp = await findUserByResetTable({ email: email, otp: otp })

                if (findUserOtp && findUserOtp?._id) {
                    const currentDate = new Date();
                    if (findUserOtp.expireAt > currentDate) {
                        return globalServices.global.returnResponse(res, 200, false, "OTP matched successfully.", findUserOtp);
                    }
                    else {
                        return globalServices.global.returnResponse(res, 404, true, "OTP has expired", {});
                    }
                }
                else {
                    return globalServices.global.returnResponse(res, 404, true, "Invalid Otp.", {});
                }

            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "No record found with this email.", {});
            }
        } catch (error) {
            console.log("error", error)
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            let accountResult = await globalServices.user.findUserByObjects({ email: email, });
            console.log('user found...', accountResult)
            if (accountResult && accountResult._id) {
                const resetToken = await globalServices.global.createOtp();
                const resetPassword = {
                    email: req.body.email,
                    otp: resetToken.OTP,
                    expireAt: new Date(Date.now() + 300000),
                };
                let updateResult = await globalServices.user.resetPassword(
                    resetPassword
                );
                const subject = "Riley's - Reset Password OTP";
                const message = `Here is your reset password OTP :${resetToken.OTP}`;

                const EmailSend = await sendEmail(updateResult.email, subject, message);
                console.log("Email Send", EmailSend);
                if (updateResult._id && EmailSend) {
                    return globalServices.global.returnResponse(res, 200, false, "Reset Password OTP send to your email.", updateResult);
                }
                else {
                    return globalServices.global.returnResponse(res, 401, false, "Erro sending Email.", {});

                }

            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "User not found.", {});
            }

        } catch (error) {
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { email, password, confirm_password } = req.body;
            const accountResult = await globalServices.user.findUserByObjects({ email: email })
            if (accountResult && accountResult._id) {

                let encryptedPassword = await globalServices.global.encryptedPassword(
                    password
                );
                let encryptedConfirmPassword = await globalServices.global.encryptedPassword(
                    confirm_password
                );
                let token = await globalServices.global.JwtToken({ _id: accountResult._id });
                let updateResult = await globalServices.user.updateUserAccountById(
                    accountResult._id,
                    {
                        password: encryptedPassword,
                        confirm_password: encryptedConfirmPassword,
                        token,
                    }
                );
                globalServices.global.returnResponse(
                    res,
                    200,
                    false,
                    "Password updated Successfully.",
                    updateResult
                );

            }
            else {
                return globalServices.global.returnResponse(res, 404, true, "Email doesn't exist", {});
            }
            console.log('accountResult', accountResult);
        } catch (error) {
            console.log('error', error)
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});
        }

    },

    getProfile: async (req, res) => {
        const id = req?.jwt_account?.id;
        try {
            let userAccount = await globalServices.user.findUserAccountById(id);
            if (userAccount && userAccount?._id) {
                globalServices.global.returnResponse(
                    res,
                    200,
                    false,
                    "user found Successfully.",
                    userAccount
                );
            }
            else {
                globalServices.global.returnResponse(
                    res,
                    404,
                    false,
                    "user not found.",
                    {}
                );
            }

        } catch (error) {
            console.log('error', error)
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong", {});
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { id } = req.body;
            const profileData = req.body;
            let payload = profileData;
            delete payload.id;
            delete payload.email;
            delete payload.password;
            delete payload.confirm_password;
            console.log("req.body",req.body)
            console.log("req.file",req.file)
            if (req.file) {
                const fileContent = fs.readFileSync(req.file.path);
                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `profile-images/${req.file.originalname}`,
                    Body: fileContent,
                    ACL: 'public-read' 
                };
    
                await s3.upload(params).promise();
                
                payload.image = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/profile-images/${req.file.originalname}`;
    
                fs.unlinkSync(req.file.path);
            }

            const userUpdatedData = await globalServices.user.updateUserAccountById(id, payload);
            if (userUpdatedData) {
                return globalServices.global.returnResponse(res, 200, false, "profile updated successfully ", userUpdatedData)
            } else {
                return globalServices.global.returnResponse(res, 200, true, res.message, {})
            }

        } catch (error) {
            console.log("Error updating profile: ", error.message)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})
        }
    },

    generateAlert: async (req, res) => {
        try {
            const {id,longitude,latitude} = req.body;
            console.log("DATA:::",id)
           
            try {
                let userAccount = await globalServices.user.findUserAccountById(id);
                const authToken=userAccount?.token;
                const contactAdded = await axios.get(`${process.env.BACKEND_URL}/api/v1/contact/user/${id}`, {
                    headers: {
                        'Authorization': `Bearer  ${authToken}`
                    }
                });

                const contacts = contactAdded?.data?.data;

                if (contacts && contacts.length > 0) {
                    for (const contact of contacts) {
                        let accountResult = await globalServices.user.findUserByObjects({ email: contact.email });
                        if (accountResult?._id) {
                            const fcm_tokens = accountResult?.fcm_token;
                            const phone = contact.phone;
                            if (fcm_tokens && fcm_tokens.length > 0) {
                                for (const fcm_token of fcm_tokens) {
                                    await sendPushNotification(fcm_token, longitude, latitude);
                                }
                            }
                            await sendSMS(phone, longitude, latitude);

                        } else {
                            const phone = contact.phone;
                            await sendSMS(phone, longitude, latitude);
                        }
                    }
                } else {
                    return globalServices.global.returnResponse(res, 404, true, "No contacts found", {});
                }
                
                return globalServices.global.returnResponse(res, 200, false, res.message, {message:"Alert message sent successfully"})
            } catch (error) {
                console.log('ERROR::',error)
            return globalServices.global.returnResponse(res, 500, true, error.message, {})

            }
        } catch (error) {
            return globalServices.global.returnResponse(res, 500, true, "Something went wrong.", {});
        }
    },

    // **********************************************************************
}

