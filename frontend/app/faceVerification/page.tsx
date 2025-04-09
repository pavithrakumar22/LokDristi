'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default function FaceVerification() {
  const [voterId, setVoterId] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [capturing, setCapturing] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const webcamRef = useRef<Webcam>(null);

  const captureAndVerify = async () => {
    setCapturing(true);
    const capturedImages: string[] = [];

    for (let i = 0; i < 5; i++) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) capturedImages.push(imageSrc);
      await new Promise((res) => setTimeout(res, 2000));
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/face/verify-face`, {
        voterId,
        capturedImages,
      });

      if (res.data.verified) setVerified(true);
      else setError('Face verification failed. Please try again.');
    } catch (err) {
      console.error(err);
      setError('Error verifying face');
    }

    setCapturing(false);
  };

  return (
    <div className="p-6 space-y-4">
      <input
        type="text"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
        className="border p-2 w-full"
      />
      {voterId && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
        />
      )}
      {!capturing && (
        <button onClick={captureAndVerify} className="bg-blue-500 text-white p-2 rounded">
          Go to Vote
        </button>
      )}
      {verified && (
        <button className="bg-green-500 text-white p-2 rounded">
          Vote Now
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
