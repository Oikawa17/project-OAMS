import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = ({ studentId }) => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/get_status/${studentId}`)
            .then(response => {
                setStatus(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching status:", error);
                setLoading(false);
            });
    }, [studentId]);

    const handleUpdateStatus = () => {
        axios.post("http://localhost:5000/update_status", {
            student_id: studentId,
            email: status.email,
            documents_status: status.documents_status,
            under_review: status.under_review,
            interview_date: status.interview_date,
            final_status: status.final_status,
            payment_status: status.payment_status
        }).then(() => {
            alert("Status updated successfully!");
        }).catch(error => console.error("Update error:", error));
    };

    if (loading) return <p>Loading...</p>;
    if (!status) return <p>No data found.</p>;

    return (
        <div>
            <h2>Application Status for {status.student_id}</h2>
            <p><strong>Email:</strong> {status.email}</p>
            <p><strong>Documents Submitted:</strong> {JSON.stringify(status.documents_status)}</p>
            <p><strong>Under Review:</strong> {status.under_review ? "Yes" : "No"}</p>
            <p><strong>Interview Date:</strong> {status.interview_date || "Not Set"}</p>
            <p><strong>Final Status:</strong> {status.final_status}</p>
            <p><strong>Payment Status:</strong> {status.payment_status}</p>

            <button onClick={handleUpdateStatus}>Update Status</button>
        </div>
    );
};

export default Page;