'use client';

// import { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import type { WebcamProps } from 'react-webcam';
// const webcamRef = useRef<Webcam>(null);
// import axios from 'axios';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

export default function FaceCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [voterId, setVoterId] = useState('');
  const [message, setMessage] = useState('');
  const [capturing, setCapturing] = useState(false);

  const captureImage = async () => {
    if (!webcamRef.current) return;
  
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return;
  
    const blob = await fetch(screenshot).then(res => res.blob());
    const file = new File([blob], 'face.jpg', { type: 'image/jpeg' });
  
    const formData = new FormData();
    formData.append('voterId', voterId);
    formData.append('image', file); // 👈 name must match multer field name
  
    try {
      const res = await axios.post('http://localhost:5000/api/face/upload-face', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      alert('Upload successful!');
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };
  

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Face Capture</h2>

      <input
        type="text"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded w-full aspect-video object-cover"
      />

      <button
        onClick={captureImage}
        disabled={capturing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {capturing ? 'Uploading...' : 'Capture & Upload'}
      </button>

      {message && <p className="text-center font-medium">{message}</p>}
    </div>
  );
}
