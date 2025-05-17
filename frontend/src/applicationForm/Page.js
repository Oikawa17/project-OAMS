import React, { useState, useEffect } from 'react';

function ApplicationForm() {
  const [applicationId, setApplicationId] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lockedInfo, setLockedInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [isReviewing, setIsReviewing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zip: '',
    birthdate: '',
    gender: '',
    civilStatus: '',
    lastSchoolAttended: '',
    schoolAddress: '',
    yearGraduated: '',
    trackStrand: '',
    generalAverage: '',
    firstChoice: '',
    secondChoice: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactNumber: ''
  });

  useEffect(() => {
    const storedApplicationId = localStorage.getItem('application_id');
    if (!storedApplicationId) {
      alert('Application ID is missing. Please log in again.');
      window.location.href = "/login";
      return;
    }
    setApplicationId(storedApplicationId);

    fetch(`http://localhost:5000/application-form/application-status/${storedApplicationId}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        setIsLocked(data.locked === true);
        if (data.locked === true) {
          fetch(`http://localhost:5000/application-form/info/${storedApplicationId}`)
            .then(res => res.json())
            .then(infoData => setLockedInfo(infoData))
            .catch(() => setLockedInfo(null));
        }
      })
      .catch(() => {
        setLoading(false);
        setIsLocked(false);
      });
  }, []);

  // Populate formData with lockedInfo for editing
  const handleEditLocked = () => {
    if (lockedInfo) {
      setFormData({
        firstName: lockedInfo.first_name || '',
        lastName: lockedInfo.last_name || '',
        email: lockedInfo.email || '',
        phone: lockedInfo.phone || '',
        address: lockedInfo.address || '',
        city: lockedInfo.city || '',
        province: lockedInfo.province || '',
        zip: lockedInfo.zip || '',
        birthdate: lockedInfo.birthdate ? lockedInfo.birthdate.slice(0, 10) : '',
        gender: lockedInfo.gender || '',
        civilStatus: lockedInfo.civil_status || '',
        lastSchoolAttended: lockedInfo.last_school_attended || '',
        schoolAddress: lockedInfo.school_address || '',
        yearGraduated: lockedInfo.year_graduated || '',
        trackStrand: lockedInfo.track_strand || '',
        generalAverage: lockedInfo.general_average || '',
        firstChoice: lockedInfo.first_choice || '',
        secondChoice: lockedInfo.second_choice || '',
        emergencyContactName: lockedInfo.emergency_contact_name || '',
        emergencyContactRelationship: lockedInfo.emergency_contact_relationship || '',
        emergencyContactNumber: lockedInfo.emergency_contact_number || ''
      });
      setIsEditing(true);
      setIsReviewing(false);
      setIsLocked(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsReviewing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/application-form/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, application_id: applicationId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Submission failed. Please try again.');
        return;
      }

      alert(data.message || 'Application updated successfully!');
      setIsLocked(true);
      // Optionally, refresh lockedInfo
      fetch(`http://localhost:5000/application-form/info/${applicationId}`)
        .then(res => res.json())
        .then(infoData => setLockedInfo(infoData))
        .catch(() => setLockedInfo(null));
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
          maxWidth: "600px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#0a0" }}>Application form is completed.</h2>
          <p>You have already submitted your application form. Please wait for the registrar office to verify your form.</p>
          <hr />
          <h3>Your Submitted Information</h3>
          {lockedInfo ? (
            <ul style={{ textAlign: "left" }}>
              {Object.entries(lockedInfo)
                .filter(([key]) =>
                  key !== "application_id" &&
                  key !== "password" &&
                  key !== "is_temp"
                )
                .map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {value}
                  </li>
                ))}
            </ul>
          ) : (
            <div></div>
          )}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
            <button
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 24px",
                cursor: "pointer"
              }}
              onClick={handleEditLocked}
            >
              Edit and Resubmit Application Form
            </button>
            <button
              style={{
                background: "#0a0",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 24px",
                cursor: "pointer"
              }}
              onClick={() => window.location.href = "/dashboard"}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Application Form</h2>

      {isEditing && !isReviewing && (
        <form onSubmit={handlePreview}>
          <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </label>
          <label>
            Email Address:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Complete Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            City/Municipality:
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </label>
          <label>
            Province:
            <input type="text" name="province" value={formData.province} onChange={handleChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
          </label>
          <label>
            Birthdate:
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
          </label>
          <label>
            Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>
            Civil Status:
            <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} required>
              <option value="">Select Civil Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </label>
          <label>
            Last School Attended:
            <input type="text" name="lastSchoolAttended" value={formData.lastSchoolAttended} onChange={handleChange} required />
          </label>
          <label>
            School Address:
            <input type="text" name="schoolAddress" value={formData.schoolAddress} onChange={handleChange} required />
          </label>
          <label>
            Year Graduated:
            <select name="yearGraduated" value={formData.yearGraduated} onChange={handleChange} required>
              <option value="">Select Year</option>
              {Array.from({ length: 76 }, (_, i) => 1950 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
          <label>
            Track/Strand:
            <select name="trackStrand" value={formData.trackStrand} onChange={handleChange} required>
              <option value="">Select track/strand</option>
              <option value="STEM">STEM</option>
              <option value="HUMSS">HUMSS</option>
              <option value="ABM">ABM</option>
              <option value="GAS">GAS</option>
              <option value="TVL">TVL</option>
            </select>
          </label>
          <label>
            General Average:
            <input type="text" name="generalAverage" value={formData.generalAverage} onChange={handleChange} required />
          </label>
          <label>
            First Choice:
            <select name="firstChoice" value={formData.firstChoice} onChange={handleChange} required>
              <option value="">Select first choice</option>
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
              <option value="BSCE">BSCE</option>
              <option value="BSEE">BSEE</option>
              <option value="BSME">BSME</option>
              <option value="BSA">BSA</option>
              <option value="BSBA">BSBA</option>
              <option value="BSED">BSED</option>
            </select>
          </label>
          <label>
            Second Choice:
            <select name="secondChoice" value={formData.secondChoice} onChange={handleChange} required>
              <option value="">Select second choice</option>
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
              <option value="BSCE">BSCE</option>
              <option value="BSEE">BSEE</option>
              <option value="BSME">BSME</option>
              <option value="BSA">BSA</option>
              <option value="BSBA">BSBA</option>
              <option value="BSED">BSED</option>
            </select>
          </label>
          <label>
            Emergency Contact Name:
            <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
          </label>
          <label>
            Relationship to Emergency Contact:
            <input type="text" name="emergencyContactRelationship" value={formData.emergencyContactRelationship} onChange={handleChange} required />
          </label>
          <label>
            Emergency Contact Number:
            <input type="tel" name="emergencyContactNumber" value={formData.emergencyContactNumber} onChange={handleChange} required />
          </label>
          <button type="submit">Review your Information</button>
        </form>
      )}

      {isReviewing && (
        <div>
          <h3>Review your Information</h3>
          <ul>
            {Object.entries(formData)
              .filter(([key]) =>
                key !== "application_id" &&
                key !== "password" &&
                key !== "is_temp"
              )
              .map(([key, value]) => (
                <li key={key}>
                  <strong>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                    :
                  </strong>{" "}
                  {value}
                </li>
              ))}
          </ul>
          <button onClick={() => { setIsEditing(true); setIsReviewing(false); }}>Edit</button>
          <button onClick={handleSubmit}>Confirm and Submit</button>
        </div>
      )}
    </div>
  );
}

export default ApplicationForm;