import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminScreen() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []); // Fetch data once when the component mounts

  return (
    <div>
      <h2>Admin Submissions</h2>
      <ul>
        {submissions.map(submission => (
          <li key={submission._id}>
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Social Media Handle:</strong> {submission.socialMediaHandle}</p>
            <img src={`http://localhost:5000/${submission.images[0].replace('\\', '/')}`} alt={submission.name} width="200" />
            <p><strong>Date:</strong> {new Date(submission.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminScreen;
