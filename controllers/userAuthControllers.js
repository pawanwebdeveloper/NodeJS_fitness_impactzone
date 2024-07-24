const bcrypt = require("bcryptjs");
const { Company } = require("../models/company");
const Employee = require("../models/employee");

const { error, success } = require("../utils/response");
const { generateJWT } = require("../utils/jwt");
const { generateOTP } = require("../utils/generateOTP");
const { sendEmail } = require("../utils/sendEmail");
const { registerOTPEmail } = require("../utils/emailTemplates");

const otpServices = require("../services/otpServices");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userData = await Employee.findOne({ email }).lean();
      if (userData) {
        if (userData.isActive) {
          const match = await bcrypt.compare(password, userData.password);
          if (match) {
            let userId = userData._id;
            let role = userData.role;
            let companyId = userData.company;
            const token = await generateJWT({ userId, role, companyId });
            userData.password = undefined;
            userData.token = token;
            return res
              .status(200)
              .json(await success("login successful", userData));
          } else {
            return res
              .status(200)
              .json(await error("email or password is invalid", {}));
          }
        } else {
          return res
            .status(200)
            .json(await error("Gym Owner account disabled.", {}));
        }
      } else {
        return res.status(200).json(await error("User not found", {}));
      }
    } catch (err) {
      return res.status(500).json(await error(err.message, err));
    }
  },

  forgotPassword: async (req, res) => {
    try {
      let { email } = req.body;

      email = email.toLowerCase();
      const userData = await Employee.findOne({ email })
        .lean()
        .select("-password");
      const OTP = await generateOTP();
      if (userData) {
        let result = await otpServices.updateOtp(
          { email, otpType: "FPASSWORD" },
          { otpCode: OTP }
        );
        if (!result) {
          result = await otpServices.createOtp({
            email,
            otpCode: OTP,
            otpType: "FPASSWORD",
          });
        }
        await sendEmail(
          email,
          "User Forget Password request",
          registerOTPEmail(req, OTP, userData.name)
        );
        return res.status(200).json(
          await success("Please check your email for reset password otp", {
            email,
          })
        );
      } else {
        return res
          .status(200)
          .json(
            await error("This email address is not registred with us!", {})
          );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(await error(err.message, err));
    }
  },

  changeForgetPassword: async (req, res) => {
    try {
      let { password, email, otpCode } = req.body;

      if (!email) {
        return res.status(400).json(await error("Email is required", {}));
      }
      if (!password) {
        return res.status(400).json(await error("Password is required"));
      }
      if (!otpCode) {
        return res.status(400).json(await error("OTP is required", {}));
      }

      email = email.toLowerCase();

      let OtpReq = await otpServices.getOtp({ email, otpType: "FPASSWORD" });

      if (!OtpReq) {
        return res
          .status(200)
          .json(await error("Invalid OTP. Please try again!"));
      }
      if (OtpReq && OtpReq.otpCode === otpCode) {
        const hash = await bcrypt.hash(password, 10);
        let userData = await Employee.findOneAndUpdate(
          { email },
          { password: hash },
          { new: true }
        );
        if (userData) {
          await otpServices.deleteOtp({ email, otpType: "FPASSWORD" });
          return res
            .status(200)
            .json(await success("Your password has been changed Successfully"));
        } else {
          return res.status(200).json(await error("Failed to change password"));
        }
      } else {
        return res.status(200).json(await error("OTP not verified"));
      }
    } catch (err) {
      return res.status(500).json(await error(err.message, err));
    }
  },

  // Change Password (Needs login)
  changePassword: async (req, res) => {
    try {
      let userId = req.user.id;
      const { password, newPassword } = req.body;

      if (!password || !newPassword) {
        return res.status(400).json(await error("Passwords are required"));
      }

      let data = await Employee.findById(userId);

      if (data) {
        const match = await bcrypt.compare(password, data.password);
        if (match) {
          const hash = await bcrypt.hash(newPassword, 10);
          let result = await Employee.updateOne(
            { _id: userId },
            { password: hash },
            { new: true }
          );
          if (result) {
            return res
              .status(200)
              .json(await success("Password changed successfully"));
          }
        } else {
          return res.status(200).json(await error("Incorrect old password"));
        }
      } else {
        return res.status(200).json(await error("User not found"));
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(await error(err.message, err));
    }
  },

  profileGet: async (req, res) => {
    try {
      let { userId } = req.decoded;
      let data = await Employee.findById(userId);
      return res.status(200).json(await success("Profile Details", data));
    } catch (err) {
      console.log(err);
      return res.status(400).json(await error("Something went wrong", { err }));
    }
  },

  profileUpdate: async (req, res) => {
    try {
      let { userId } = req.decoded;

      const updateProfile = await Employee.findByIdAndUpdate(
        userId,
        { ...req.body },
        {
          new: true,
        }
      ).select("-password");

      if (updateProfile) {
        return res.status(200).json(await success("Profile Updated", data));
      } else {
        return res.status(400).json(await error("Bad Request", {}));
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(await error("Something went wrong", { err }));
    }
  },
};
