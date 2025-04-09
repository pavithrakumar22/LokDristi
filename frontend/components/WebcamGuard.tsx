'use client';

import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export default function WebcamGuard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let model: cocoSsd.ObjectDetection | null = null;
    let interval: ReturnType<typeof setInterval>;

    const loadModel = async () => {
      model = await cocoSsd.load();
      startWebcam();
    };

    const startWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        interval = setInterval(async () => {
          if (videoRef.current && model) {
            const predictions = await model.detect(videoRef.current);
            const people = predictions.filter(p => p.class === 'person');

            if (people.length > 2) {
              stopWebcam();
              alert('🚨 More than 2 people detected. Video stopped.');

              // 👉 Send log to backend
              await fetch('/api/log-detection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  timestamp: new Date().toISOString(),
                  peopleCount: people.length,
                }),
              });
            }
          }
        }, 1000);
      }
    };

    const stopWebcam = () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        clearInterval(interval);
        setIsActive(false);
      }
    };

    loadModel();

    return () => {
      clearInterval(interval);
      stopWebcam();
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-semibold mb-4">Live Video Guard</h2>
      <video ref={videoRef} width="640" height="480" autoPlay muted className="border rounded" />
      {!isActive && <p className="mt-4 text-red-600 font-medium">Stream ended.</p>}
    </div>
  );
}
