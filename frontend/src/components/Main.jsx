//component with an input field and a button to send the email

import React, { useState } from "react";

import "./main.css";

const Main = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [mailCheck, setMailCheck] = useState(false);
  const [verified, setVerified] = useState(false);

  const sendEmail = async () => {
    try {
      console.log("send mail");
      const response = await fetch("http://localhost:5000/api/auth/sendcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        setMailCheck(true);
        window.alert("Mail Sent! Please enter Code");
      } else {
        window.alert("Invalid Email");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const verifyCode = async () => {
    try {
      console.log("send code");
      const response = await fetch(
        "http://localhost:5000/api/auth/verifycode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            email,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        setVerified(true);
        window.alert("Code Verified!");
      } else {
        window.alert("Invalid Code");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async () => {
    try {
      console.log("verify");
      const response = await fetch(
        "http://localhost:5000/api/auth/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            email,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      if (response.status === 200) {
        window.alert("Pass Changed!");
      } else {
        window.alert("Error changing the password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      {!mailCheck && !verified && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendEmail}>Send Code</button>
        </div>
      )}

      {mailCheck && !verified && (
        <div>
          <input
            placeholder="Enter the code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}

      {mailCheck && verified && (
        <div>
          <input
            type={password}
            placeholder="Enter the password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={changePassword}>Verify Code</button>
        </div>
      )}
    </div>
  );
};

export default Main;
