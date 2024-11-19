import React, { useState } from "react";
import "./InputField.css";

export default function InputField({ type, placeholder, value, onChange }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        value={value} // Set the value prop here
        onChange={onChange} // Set the onChange prop here
        className="input-field"
        required
      />

      {type === "text" && <i className="fa-solid fa-user"></i>}
      {/* Show email icon if type is email */}
      {type === "email" && <i className="fa-solid fa-envelope"></i>}

      {/* Show lock icon for password field */}
      {type === "password" && <i className="fa-solid fa-lock"></i>}

      {/* Toggle password visibility for password field */}
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
}
