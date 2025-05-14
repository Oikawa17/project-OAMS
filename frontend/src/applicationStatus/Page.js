import { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationStatus = ({ applicationId }) => {
    const [status, setStatus] = useState(null);

    const fetchStatus = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/application-status/${applicationId}`);
            setStatus(res.data);
        } catch (error) {
            console.error('Error fetching application status:', error);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, [applicationId]);

    return (
        <div className="application-status">
            <h2>Application Status</h2>
            {status ? (
                <div>
                    <h3>Status: {status.status}</h3>
                    <p>Last Updated: {status.last_updated || "Pending Review"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ApplicationStatus;
