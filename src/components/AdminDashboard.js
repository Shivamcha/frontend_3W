// frontend/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallBack';

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/submissions');
            if (!response.ok) throw new Error('Failed to fetch submissions');
            const data = await response.json();
            setSubmissions(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching submissions:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading submissions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {submissions.map((submission) => (
                <div key={submission._id} className="border rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-lg">{submission.name}</h3>
                    <p className="text-gray-600">{submission.socialMediaHandle}</p>
                    <p className="text-gray-600">{submission.date}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {submission.images.map((imageUrl, index) => (
                            <ImageWithFallback
                                key={index}
                                src={imageUrl}
                                alt={`Submission ${index + 1}`}
                                className="w-full h-40 object-cover rounded"
                                onLoad={() => console.log('Image loaded successfully:', imageUrl)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;