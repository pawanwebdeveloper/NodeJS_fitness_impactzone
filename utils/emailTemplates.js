const currentYear = new Date().getFullYear();
const websiteUrl = `${process.env.WEBSITE_URL}/#/login`;

module.exports = {
  welcome: (req, name) => {
    const apiUrl = `${req.protocol}://${req.get("host")}`;
    const logoImageUrl = `${apiUrl}/public/static/logo_rd_bg.png`;

    return `
    <div style="margin: 0; padding: 20px; max-width: 1130px ; font-family: Arial, Helvetica, sans-serif;">
    <div style="background-color: #eaf0f3; padding: 20px; box-sizing: border-box;">
      <div style="text-align: center;">
        <img src=${logoImageUrl} alt="logo_image" />
        <h2 style="font-weight: 100; max-width: 350px; padding: 20px 0; margin: 0 auto;">
          Hi <strong>${name}</strong>, welcome to Impact Zone
        </h2>

        
      </div>
      <div style="background-color: #fff; margin: 0 12%; max-width: 996px; border-radius: 10px; padding: 20px; color: rgb(90, 90, 90); box-sizing: border-box;">
        <p style="padding: 20px; text-align: center; box-sizing: border-box;">
          Your account has been registered, and you can now log in to your account.
        </p>
        <p style="padding: 20px; text-align: center; box-sizing: border-box;">
          Click
          <a href="${websiteUrl}" target="_blank" style="color: #ee2e97; text-decoration: none;">here</a>
          to get started
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <p>Copyright © ${currentYear}</p>
        <img src=${logoImageUrl} alt="logo_image" style="margin-top: 10px;" />
      </div>
    </div>
  </div>
  
    `;
  },

  welcomeCompanyUser: (
    req,
    name = "N/A",
    email = "N/A",
    randomPassword = "N/A"
  ) => {
    const apiUrl = `${req.protocol}://${req.get("host")}`;
    const logoImageUrl = `${apiUrl}/public/static/logo_rd_bg.png`;
    const checkImage = `${apiUrl}/public/static/checkImage.png`;

    return `
    <div
      style="
        margin: 0;
        padding: 20px;
        max-width: 1130px;
        font-family: Arial, Helvetica, sans-serif;
      "
    >
      <div
        style="background-color: #eaf0f3; padding: 20px; box-sizing: border-box"
      >
        <div style="text-align: center">
          <img src=${logoImageUrl} alt="logo_image" />
          <h2
            style="
              font-weight: 100;
              max-width: 350px;
              padding: 20px 0;
              margin: 0 auto;
            "
          >
            Hi <strong>${name}</strong>
          </h2>
        </div>
        <div
          style="
            background-color: #fff;
            margin: 0 12%;
            max-width: 996px;
            border-radius: 10px;
            padding: 20px;
            color: rgb(90, 90, 90);
            box-sizing: border-box;
            text-align: center;
          "
        >
          <img src=${checkImage} style="max-width: 100px; margin-bottom: 20px" alt="check_image" />
          <p style="padding: 20px; box-sizing: border-box">
            Here's your login credentials.
            <br />
            <br />
            <strong>Email:</strong> ${email}
            <br />
            <br />
            <strong>Password:</strong> ${randomPassword}
            <br />
            <br />
            <strong>Login Link:</strong>
            <a href=${websiteUrl}>Click here</a>
            <br />
          </p>
          <p style="padding: 20px; box-sizing: border-box">
            We look forward to providing you with a seamless experience on our
            platform
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <p>Copyright © ${currentYear}</p>
          <img
            src=${logoImageUrl}
            alt="logo_image"
            style="margin-top: 10px"
          />
        </div>
      </div>
    </div>
  
    `;
  },
  welcomeCompanyEmployee: (
    req,
    name = "User",
    email = "N/A",
    randomPassword = "N/A"
  ) => {
    const apiUrl = `${req.protocol}://${req.get("host")}`;
    const logoImageUrl = `${apiUrl}/public/static/logo_rd_bg.png`;
    const checkImage = `${apiUrl}/public/static/checkImage.png`;

    return `
    <div
      style="
        margin: 0;
        padding: 20px;
        max-width: 1130px;
        font-family: Arial, Helvetica, sans-serif;
      "
    >
      <div
        style="background-color: #eaf0f3; padding: 20px; box-sizing: border-box"
      >
        <div style="text-align: center">
          <img src=${logoImageUrl} alt="logo_image" />
          <h2
            style="
              font-weight: 100;
              max-width: 350px;
              padding: 20px 0;
              margin: 0 auto;
            "
          >
            Hi <strong>${name}</strong>
          </h2>
        </div>
        <div
          style="
            background-color: #fff;
            margin: 0 12%;
            max-width: 996px;
            border-radius: 10px;
            padding: 20px;
            color: rgb(90, 90, 90);
            box-sizing: border-box;
            text-align: center;
          "
        >
          <img src=${checkImage} style="max-width: 100px; margin-bottom: 20px" alt="check_image" />
          <p style="padding: 20px; box-sizing: border-box">
            Here's your login credentials.
            <br />
            <br />
            <strong>Email:</strong> ${email}
            <br />
            <br />
            <strong>Password:</strong> ${randomPassword}
            <br />
            <br />
            <strong>Login Link:</strong>
            <a href=${websiteUrl}>Click here</a>
            <br />
          </p>
          <p style="padding: 20px; box-sizing: border-box">
            We look forward to providing you with a seamless experience on our
            platform
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <p>Copyright © ${currentYear}</p>
          <img
            src=${logoImageUrl}
            alt="logo_image"
            style="margin-top: 10px"
          />
        </div>
      </div>
    </div>
  
    `;
  },

  registerOTPEmail: (req, otp, name) => {
    const apiUrl = `${req.protocol}://${req.get("host")}`;
    const logoImageUrl = `${apiUrl}/public/static/logo_rd_bg.png`;

    return `<div style="margin: 0; padding: 0; max-width: 1130px ; font-family: Arial, Helvetica, sans-serif; height: auto; display: flex; justify-content: center; align-items: center;">
    <div style="width: 100%; background-color: #eaf0f3; padding: 40px 0; text-align: center;">
      <div style="margin-bottom: 20px;">
        <img src="${logoImageUrl}" alt="logo_image" style="max-width: 200px; height: auto;" />
        <h2 style="font-weight: 100; padding: 20px 0;">Hi <strong>${name}</strong></h2>
      </div>
      <div style="background-color: #fff; max-width: 996px; border-radius: 10px; padding: 20px; color: rgb(90, 90, 90); text-align: center; margin: 0 12%;">
      <div style="margin: 0 25%"> 
      <div style="padding: 10px 40px; border-spacing: 1px; border-style: dashed; border-color: rgb(143, 143, 143); border-radius: 20px; margin-bottom: 20px;">
          <p style="letter-spacing: 3px; font-size: 18px; margin: 0;">${otp}</p>
        </div>
        </div>
        <p style="width: 80%; margin: 0 auto;">
        To ensure the security of your account we've sent you a one-time verification code (OTP). Please use this OTP to complete the verification process.
        </p>
      </div>
      <div style="margin-top: 20px; text-align: center; padding: 20px 0;">
        <p style="margin-bottom: 10px;">Copyright © ${currentYear}</p>
        <img src="${logoImageUrl}" alt="logo_img" style="max-width: 150px; height: auto;" />
      </div>
    </div>
  </div>
  `;
  },
};
