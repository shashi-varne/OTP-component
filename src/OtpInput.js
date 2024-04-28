import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpChange = (e, i) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    console.log(newOtp);
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && i + 1 < length) {
      inputRefs.current[i + 1].focus();
    }
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };

  const handleOtpClick = (i) => {
    inputRefs.current[i].setSelectionRange(0, 1);
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && inputRefs.current[i - 1]) {
      inputRefs.current[i - 1].focus();
    }
  };

  console.log(inputRefs);
  return (
    <div className="otp-container">
      {otp.map((value, index) => {
        return (
          <input
            className="otp-input"
            ref={(input) => (inputRefs.current[index] = input)}
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleOtpChange(e, index)}
            onClick={() => handleOtpClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
