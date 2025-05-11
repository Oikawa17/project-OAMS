import React, { useState, useEffect } from 'react';

function ApplicationForm() {
  const [applicationId, setApplicationId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const storedApplicationId = localStorage.getItem('application_id');
    if (storedApplicationId) {
      setApplicationId(storedApplicationId);
    } else {
      alert('Application ID is missing. Please log in again.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/application-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, application_id: applicationId }), // Include stored application_id
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Submission failed. Please try again.');
        return;
      }

      alert(data.message || 'Application updated successfully!');
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Application Form</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>

        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplicationForm;