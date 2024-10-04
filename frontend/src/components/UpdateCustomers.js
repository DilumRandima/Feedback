import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateFeedback() {
  const { id } = useParams(); // Get the customer ID from the URL
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [buttonColor, setButtonColor] = useState("red"); // State for button background color
  const navigate = useNavigate();

  // Fetch customer details using the ID from the URL
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:8100/Customer/get/${id}`);
        const customer = res.data.customer; // Ensure to correctly fetch the customer object
        setName(customer.name);
        setPhoneNumber(customer.phone_number);
        setEmail(customer.email);
        setEmployeeName(customer.employee_name);
        setMessage(customer.message);
      } catch (err) {
        setError("Error fetching customer details. Please try again.");
        console.error(err.message);
      }
    };
    fetchCustomer();
  }, [id]);

  // Function to handle customer update
  const updateData = async (e) => {
    e.preventDefault();

    const updatedCustomer = {
      name,
      phone_number: phoneNumber,
      email,
      employee_name: employeeName,
      message,
    };

    // Make the update request to the backend
    try {
      await axios.put(`http://localhost:8100/Customer/update/${id}`, updatedCustomer);
      alert("Customer Updated Successfully");
      navigate("/customers"); // Redirect to the customer list after successful update
    } catch (err) {
      setError("Error updating customer. Please try again.");
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "400px", border: "2px solid black" }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Update Feedback</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={updateData}>
            {/* Customer Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: "red" }}>Customer Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Customer Name"
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter E-Mail Address"
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
                <option value="" disabled>Select Employee</option>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Message"
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
