module.exports = {
  generateOTP: async () => {
    var digits = "0123456789";
    var otpLength = 4;
    var otp = "";
    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);
      otp = otp + digits[index];
    }
    return otp;
  },

  generateRandomPassword: async () => {
    var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    var digits = "0123456789";
    var specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var passwordLength = Math.floor(Math.random() * (16 - 8 + 1)) + 8; // Random length between 8 and 16
    var password = "";

    // Ensure at least one uppercase letter
    password +=
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];

    // Ensure at least one lowercase letter
    password +=
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];

    // Ensure at least one number
    password += digits[Math.floor(Math.random() * digits.length)];

    // Ensure at least one special character
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the remaining characters randomly
    for (let i = 4; i < passwordLength; i++) {
      var randomType = Math.floor(Math.random() * 4); // Randomly select a character type
      switch (randomType) {
        case 0:
          password +=
            uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
          break;
        case 1:
          password +=
            lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
          break;
        case 2:
          password += digits[Math.floor(Math.random() * digits.length)];
          break;
        case 3:
          password +=
            specialChars[Math.floor(Math.random() * specialChars.length)];
          break;
        default:
          break;
      }
    }

    // Shuffle the password characters
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    return password;
  },
};
