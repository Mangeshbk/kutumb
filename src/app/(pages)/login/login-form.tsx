"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance, setAuthToken } from "../../../../axiosConfig";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];

    if (value.length <= 4 && index === 0 && value.length > 1) {
      // Handle paste case
      const values = value.split("").slice(0, 4);
      for (let i = 0; i < 4; i++) {
        updatedOtp[i] = values[i] || "";
      }
      setOtp(updatedOtp);
      document.getElementById(`otp-${Math.min(values.length - 1, 3)}`)?.focus();
      return;
    }

    if (/^\d?$/.test(value)) {
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = "";
      setOtp(updatedOtp);
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (username.trim() === "" || otp.length !== 4) {
  //     alert("Please enter a valid username and 4-digit OTP.");
  //     return;
  //   }
  //   alert(`Login successful!\nUsername: ${username}\nOTP: ${otp}`);
  // };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "" || otp.some((digit) => digit === "")) {
      alert("Please enter a valid username and complete the 4-digit OTP.");
      return;
    }
    try {
      const response = await axiosInstance.post("/login", {
        username,
        otp: otp.join(""),
      });
      console.log("DATA", response);
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      router.push("/");
    } catch (error) {
      alert("Login failed");
      throw error;
    }
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <h2>Login</h2>

        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter your username'
        />

        <label htmlFor='otp'>4-Digit OTP</label>
        {/* <input
          type='text'
          id='otp'
          value={otp}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value)) {
              setOtp(value);
            }
          }}
          placeholder='Enter your OTP'
          maxLength={4}
        /> */}
        <div className='otp-container'>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type='text'
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              maxLength={1}
              className='otp-input'
            />
          ))}
        </div>

        <button type='submit' className='login-button'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
