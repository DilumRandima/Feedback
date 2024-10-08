import React, { useState } from "react";
import axios from "axios";

export default function AddFeedback() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null); // State for error messages
  const [buttonColor, setButtonColor] = useState("red"); // State for button background color

  // Function to handle form submission
  function sendData(e) {
    e.preventDefault();

    // Validation for name (must not contain numbers)
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    if (!nameRegex.test(name)) {
      setError("Name cannot contain numbers or special characters.");
      return;
    }

    // Validation for phone number (must start with 0 and be 10 digits)
    const phoneRegex = /^0\d{9}$/; // Starts with 0 and has exactly 10 digits
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must start with 0 and contain exactly 10 digits.");
      return;
    }

    const newCustomer = {
      name,
      phone_number: phoneNumber, // Matching the backend's field naming
      email,
      employee_name: employeeName,
      message,
    };

    axios
      .post("http://localhost:8100/Customer/add", newCustomer) // Ensure this matches the server URL
      .then(() => {
        alert("Customer Added Successfully");
        // Clear form fields after successful submission
        setName("");
        setPhoneNumber("");
        setEmail("");
        setEmployeeName("");
        setMessage("");
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Error adding customer:", err);
        setError("Failed to add customer. Please try again."); // Set error message
      });
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "400px", border: "2px solid black" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Add Feedback</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={sendData}>
            {/* Customer Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "red" }}>Customer Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label" style={{ color: "red" }}>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone_number"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* E-Mail Address */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "red" }}>E-Mail Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Employee Selection */}
            <div className="mb-3">
              <label htmlFor="employee_name" className="form-label" style={{ color: "red" }}>Employee</label>
              <select
                className="form-select"
                id="employee_name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Employee
                </option>
                <option value="Kamal">Kamal</option>
                <option value="Nimal">Nimal</option>
                <option value="Sunil">Sunil</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label" style={{ color: "red" }}>Message</label>
              <textarea
                className="form-control"
                id="message"
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: buttonColor,
                color: "white",
                transition: "background-color 0.3s",
              }}
              onMouseOver={() => setButtonColor("green")}  // Change background to green on hover
              onMouseOut={() => setButtonColor("red")}  // Revert background to red when mouse leaves
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
