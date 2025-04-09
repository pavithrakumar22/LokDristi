// components/FaceCapture.tsx
'use client';

import { useRef, useState } from 'react';

export default function FaceCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [voterId, setVoterId] = useState('');
  const [success, setSuccess] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg');

    const res = await fetch('/api/save-image', {
      method: 'POST',
      body: JSON.stringify({ voterId, image: dataUrl }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) setSuccess(true);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter Voter ID"
        value={voterId}
        onChange={(e) => setVoterId(e.target.value)}
        className="border px-2 py-1"
      />
      <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-1">Start Camera</button>
      <video ref={videoRef} autoPlay className="w-80 h-60 border" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={captureImage} className="bg-green-600 text-white px-4 py-1">Capture</button>
      {success && <p className="text-green-700">Image uploaded successfully!</p>}
    </div>
  );
}
