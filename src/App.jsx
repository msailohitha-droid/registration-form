import React, { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    course: "",
    address: "",
    terms: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.terms) {
      alert("Please accept Terms & Conditions");
      return;
    }

    // Get existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check duplicate email
    const userExists = existingUsers.find(
      (user) => user.email === formData.email
    );

    if (userExists) {
      alert("User already registered with this email!");
      return;
    }

    // Save new user
    existingUsers.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

    alert("Registration Successful!");

    // Clear form after OK
    setFormData(initialState);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        <label>Full Name <span className="required">&#x2a;</span></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email <span className="required">&#x2a;</span></label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone <span className="required">&#x2a;</span></label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Password <span className="required">&#x2a;</span></label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password <span className="required">&#x2a;</span></label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label>Gender <span className="required">&#x2a;</span></label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <label>Date of Birth <span className="required">&#x2a;</span></label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label>Course <span className="required">&#x2a;</span></label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course <span className="required">&#x2a;</span></option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
        </select>

        <label>Address <span className="required">&#x2a;</span></label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

      <label>Terms & Conditions</label>

      <div className="terms-box">
        <p>
          1. All information provided must be accurate and valid.
        <br /><br />
          2. Your email will be used only for registration purposes.
        <br /><br />
          3. Keep your password confidential.
        <br /><br />
          4. We are not responsible for data loss if browser data is cleared.
        <br /><br />
          5. This is a demo registration system.
        </p>
      </div>

<div className="checkbox-group">
  <input
    type="checkbox"
    name="terms"
    checked={formData.terms}
    onChange={handleChange}
  />
  <span>I accept the Terms & Conditions</span>
</div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;