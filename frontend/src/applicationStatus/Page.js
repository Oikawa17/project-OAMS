import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './applicationStatus.css';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  Completed: 'green',
  Pending: '#b58900',
};

const ApplicationStatus = () => {
  const [status, setStatus] = useState('Pending');
  const [docStatus, setDocStatus] = useState('Pending');
  const [docCount, setDocCount] = useState(0);
  const [docTotal, setDocTotal] = useState(7);
  const [submittedFields, setSubmittedFields] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('Pending Verification (₱0)');
  const [paymentAmountPending, setPaymentAmountPending] = useState(0);
  const [paymentAmountVerified, setPaymentAmountVerified] = useState(0);
  const applicationId = localStorage.getItem('application_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!applicationId) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/application-status/${applicationId}`);
        const data = await res.json();
        setStatus(data.applicationFormStatus);
        setDocStatus(data.documentRequirementsStatus);
        setDocCount(data.submittedCount);
        setDocTotal(data.totalRequired || 7);
        setSubmittedFields(data.submittedFields || []);
        setPaymentStatus(data.paymentStatus || 'Pending Verification (₱0)');
        setPaymentAmountPending(data.paymentAmountPending || 0);
        setPaymentAmountVerified(data.paymentAmountVerified || 0);
      } catch (error) {
        setStatus('Unable to fetch status');
        setDocStatus('Unable to fetch status');
        setSubmittedFields([]);
        setPaymentStatus('Unable to fetch status');
        setPaymentAmountPending(0);
        setPaymentAmountVerified(0);
      }
    };
    fetchStatus();
  }, [applicationId]);

  // Payment status rendering logic
  let paymentDisplay;
  if (paymentAmountVerified === 1000) {
    paymentDisplay = (
      <div className="status-completed">
        Completed
      </div>
    );
  } else if (paymentStatus.startsWith('Pending Verification')) {
    paymentDisplay = (
      <div className="status-pending">
        Pending Verification (₱{paymentAmountPending})<br />
        Verified (₱{paymentAmountVerified})
      </div>
    );
  } else if (paymentStatus.startsWith('Verified')) {
    paymentDisplay = (
      <div className="status-pending">
        Verified (₱{paymentAmountVerified})
      </div>
    );
  } else {
    paymentDisplay = (
      <div className="status-pending">
        {paymentStatus}
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="app-status-container">
        <h2>Application Status</h2>
        <div
          className="app-status-card app-status-link"
          onClick={() => navigate('/application-form')}
          tabIndex={0}
          role="button"
        >
          <span
            className={`app-status-icon ${status === 'Completed' ? 'status-completed' : 'status-pending'}`}
          >
            {status === 'Completed' ? '✔️' : '⏳'}
          </span>
          <div>
            <strong>Application Form Status:</strong>
            <div className={status === 'Completed' ? 'status-completed' : 'status-pending'}>
              {status}
            </div>
          </div>
        </div>
        <div
          className="app-status-card app-status-link"
          onClick={() => navigate('/document-upload')}
          tabIndex={0}
          role="button"
        >
          <span
            className={`app-status-icon ${docStatus.startsWith('Completed') ? 'status-completed' : 'status-pending'}`}
          >
            {docStatus.startsWith('Completed') ? '✔️' : '⏳'}
          </span>
          <div>
            <strong>Document Requirements Status:</strong>
            <div className={docStatus.startsWith('Completed') ? 'status-completed' : 'status-pending'}>
              {docStatus}
            </div>
            {docStatus.startsWith('Pending') && (
              <div className="app-status-doc-details">
                <div>
                  <strong>Submitted:</strong> {submittedFields.length > 0 ? submittedFields.join(', ') : 'None'}
                </div>
                <div>
                  <strong>{docCount}</strong> out of <strong>{docTotal}</strong> requirements submitted
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="app-status-card app-status-link"
          onClick={() => navigate('/payment-information')}
          tabIndex={0}
          role="button"
        >
          <span
            className={`app-status-icon ${paymentAmountVerified === 1000 ? 'status-completed' : 'status-pending'}`}
          >
            {paymentAmountVerified === 1000 ? '✔️' : '⏳'}
          </span>
          <div>
            <strong>Application Fee Payment Status:</strong>
            {paymentDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;