var nodemailer = require("nodemailer");

const Auth = require("../models/auth.model");

exports.sendCode = async (req, res) => {
  try {
    console.log("Send Code");
    const { email } = req.body;
    console.log(email);
    const generateCode = Math.floor(1000 + Math.random() * 9000);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdullahqaisarr@gmail.com",
        pass: "oyyqjnsleasbohkq",
      },
    });

    const mailDetails = {
      from: "abdullahqaisarr@gmail.com",
      to: email,
      subject: "Your verification code",
      text: `Your verification code is ${generateCode}`,
    };

    const sent = await transporter
      .sendMail(mailDetails)
      .then(() => {
        console.log("Email Sent!");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    if (!sent) {
      res.status(200).json({ message: "Code Sent to email" });
    }

    const mail = await Auth.findOne({ email });
    if (!mail) {
      const auth = new Auth({
        email,
        code: generateCode,
      });
      await auth.save();
    } else {
      mail.code = generateCode;
      await mail.save();
    }

    res.status(200).json({ message: "Code Sent to email" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { code, email } = req.body;
    console.log(code, email);
    const auth = await Auth.findOne({ email });

    if (auth.code != code) {
      return res.status(401).json({ message: "Invalid Code" });
    }

    return res.status(200).json({ message: "Code Verified" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { pass, email } = req.body;
    console.log(pass, email);
    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(401).json({ message: "Invalid Email" });
    }
    auth.password = pass;
    await auth.save();

    return res.status(200).json({ message: "Pass Changed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
