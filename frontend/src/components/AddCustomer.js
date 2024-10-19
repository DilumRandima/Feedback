import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com"; // Import EmailJS
import back from "./back.jpg"; // Ensure this path is correct

export default function AddFeedback() {
  const [name, setName] = useState("");
  const [customercountry, setCustomerCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [buttonColor, setButtonColor] = useState("red");

  function sendEmail(customerEmail) {
    const emailParams = {
      to_email: customerEmail,
      message: `Dear ${name},\n\nThank you for your feedback!\n\nYour message: "${message}"\n\nBest regards,\nPeacock corridor`
    };

    emailjs.send(
      'service_p1zv9rh', // Replace with your service ID
      'template_pua7ayd', // Replace with your template ID
      emailParams,
      'v53cNBlrti0pL_RxD' // Replace with your user ID
    )
    .then(() => {
      console.log('Email sent successfully!');
    })
    .catch((err) => {
      console.error('Error sending email:', err);
    });
  }

  function sendData(e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setError("Name cannot contain numbers or special characters.");
      return;
    }

    const customerCountryRegex = /^[A-Za-z\s]+$/;
    if (!customerCountryRegex.test(customercountry)) {
      setError("Customer Country cannot contain numbers or special characters.");
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must start with 0 and contain exactly 10 digits.");
      return;
    }

    const newCustomer = {
      name,
      customer_country: customercountry,
      phone_number: phoneNumber,
      email,
      employee_name: employeeName,
      message,
    };

    axios
      .post("http://localhost:8100/Customer/add", newCustomer)
      .then(() => {
        alert("Customer Added Successfully");
        sendEmail(email); // Send the email after successful feedback submission
        setName("");
        setCustomerCountry("");
        setPhoneNumber("");
        setEmail("");
        setEmployeeName("");
        setMessage("");
        setError(null);
      })
      .catch((err) => {
        console.error("Error adding customer:", err);
        setError("Failed to add customer. Please try again.");
      });
  }

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card" style={{ width: "400px", border: "2px solid black" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Add Feedback</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={sendData}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "red" }}>
                Customer Name
              </label>
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

            <div className="mb-3">
              <label htmlFor="customer_country" className="form-label" style={{ color: "red" }}>
                Customer Country
              </label>
              <input
                type="text"
                className="form-control"
                id="customercountry"
                placeholder="Enter Customer Country"
                value={customercountry}
                onChange={(e) => setCustomerCountry(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label" style={{ color: "red" }}>
                Phone Number
              </label>
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

            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: "red" }}>
                E-Mail Address
              </label>
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

            <div className="mb-3">
              <label htmlFor="employee_name" className="form-label" style={{ color: "red" }}>
                Employee
              </label>
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

            <div className="mb-3">
              <label htmlFor="message" className="form-label" style={{ color: "red" }}>
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                placeholder="Enter Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: buttonColor,
                color: "white",
                transition: "background-color 0.3s",
              }}
              onMouseOver={() => setButtonColor("green")}
              onMouseOut={() => setButtonColor("red")}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
