'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const PeopleDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionRef = useRef<boolean>(true); // To stop detection loop

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      streamRef.current = stream;
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    detectionRef.current = false;
  };

  const detect = async () => {
    if (!videoRef.current || !model || !detectionRef.current) return;

    const predictions = await model.detect(videoRef.current);
    const people = predictions.filter((p) => p.class === 'person');

    if (people.length >= 2) {
      setAlertMsg(` ${people.length} people detected! .`);
      stopCamera();
      return;
    }

    requestAnimationFrame(detect);
  };

  useEffect(() => {
    const loadModelAndStart = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModelAndStart();
  }, []);

  useEffect(() => {
    if (model) {
      setupCamera().then(() => {
        detectionRef.current = true;
        detect();
      });
    }
  }, [model]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold text-blue-600">Live People Detection</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-[720px] h-auto border-4 border-blue-400 mt-4 rounded"
      />
      {alertMsg && (
        <p className="text-red-600 font-semibold mt-4">{alertMsg}</p>
      )}
    </div>
  );
};

export default PeopleDetector;
