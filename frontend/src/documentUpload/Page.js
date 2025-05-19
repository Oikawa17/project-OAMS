import { useState, useEffect } from 'react';

const categories = [
    { key: "form_137", label: "Form 137 (Transcript of Records)" },
    { key: "form_138", label: "Form 138 (Report Card)" },
    { key: "birth_certificate", label: "Birth Certificate" },
    { key: "good_moral", label: "Good Moral Certificate" },
    { key: "medical_certificate", label: "Medical Certificate" },
    { key: "id_photos", label: "2x2 ID Photos" },
    { key: "recommendation_letter", label: "Recommendation Letter" }
];

const DocumentUpload = () => {
    const [files, setFiles] = useState({});
    const [messages, setMessages] = useState({});
    const [applicationId, setApplicationId] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('application_id');
        if (!storedId) {
            alert("Error: No application ID found. Please log in again.");
            window.location.href = "/login";
        } else {
            setApplicationId(storedId);
        }
    }, []);

    const handleFileChange = (e, category) => {
        setFiles(prevFiles => ({
            ...prevFiles,
            [category]: e.target.files[0]
        }));
    };

    const handleUpload = async (category) => {
        if (!files[category]) {
            setMessages(prev => ({ ...prev, [category]: 'Please select a file' }));
            return;
        }

        const formData = new FormData();
        formData.append('file', files[category]);
        formData.append('application_id', applicationId);

        try {
            const response = await fetch(`http://localhost:5000/document-upload/upload/${category}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setMessages(prev => ({ ...prev, [category]: data.message }));
        } catch (error) {
            setMessages(prev => ({ ...prev, [category]: 'Error uploading file' }));
        }
    };

    if (!applicationId) return null; // Prevent rendering until ID is checked

    return (
        <div>
            <h2><strong>Application ID:</strong> {applicationId}</h2>
            <h2>Upload Required Documents</h2>
            {categories.map(({ key, label }) => (
                <div key={key} style={{ marginBottom: '20px' }}>
                    <label><strong>{label}</strong></label>
                    <input type="file" onChange={(e) => handleFileChange(e, key)} />
                    <button onClick={() => handleUpload(key)}>Upload</button>
                    <p>{messages[key]}</p>
                </div>
            ))}
        </div>  
    );
};

export default DocumentUpload;