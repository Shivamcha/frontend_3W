import React, { useState } from 'react';
import axios from 'axios';
import './UserSubmissionForm.css'; // For styling (optional)

function UserSubmissionForm() {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialMediaHandle', socialHandle); // Corrected field name to match the backend

        // Add all images to formData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]); // Ensure 'images' matches the backend field name
        }

        try {
            const response = await axios.post('http://localhost:5000/api/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Data submitted successfully');
            console.log(response.data); // Log the response data (optional)
            // Reset form fields after submission
            setName('');
            setSocialHandle('');
            setImages([]);
        } catch (error) {
            console.error('Error submitting data', error);
            alert('Submission failed. Please try again.'); // Provide feedback on failure
        }
    };

    return (
        <div className="submission-form">
            <h2>User Submission Form</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="socialHandle">Social Media Handle:</label>
                    <input
                        type="text"
                        id="socialHandle"
                        placeholder="@yourhandle"
                        value={socialHandle}
                        onChange={(e) => setSocialHandle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images">Upload Images:</label>
                    <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*" // Restrict to image files only
                        onChange={(e) => {
                            const filesArray = Array.from(e.target.files); // Convert FileList to an array
                            setImages(filesArray);
                        }}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserSubmissionForm;
