import React, { useState, useEffect } from "react";
import axios from "axios";
import { generateFeedbackPDF } from './FeedbackReport'; 

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        const getCustomers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8100/Customer/");
                setCustomers(response.data);
                setLoading(false);
            } catch (err) {
                alert(err.message);
                setLoading(false);
            }
        };
        getCustomers();
    }, []);

    const deleteCustomer = (id) => {
        axios
            .delete(`http://localhost:8100/Customer/delete/${id}`)
            .then(() => {
                alert("Customer Deleted");
                setCustomers(customers.filter((customer) => customer._id !== id));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    
    const applySearchFilter = (customer) => {
        if (!customer) return false;
        const searchableFields = [
            'name',
            'customer_country',
            'phone_number',
            'email',
            'employee_name',
            'message'
        ];

        return searchableFields.some(field =>
            String(customer[field]).toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    
    const filteredCustomers = customers.filter(applySearchFilter);

    
    const handleGeneratePDF = () => {
        if (filteredCustomers.length > 0) {
            generateFeedbackPDF(filteredCustomers);
        } else {
            alert("No feedback available to generate report.");
        }
    };

    return (
        <div className="container">
            <h3>Feedback List</h3>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control mb-3"
            />
            {loading && <p>Loading customers...</p>}
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary mb-3" onClick={handleGeneratePDF}>
                Generate PDF
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Customer Country</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Employee</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.customer_country}</td>
                            <td>{customer.phone_number}</td>
                            <td>{customer.email}</td>
                            <td>{customer.employee_name}</td>
                            <td>{customer.message}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => window.location.href = `/update/${customer._id}`}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCustomer(customer._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
