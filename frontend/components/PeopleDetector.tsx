'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const candidates = [
  { id: 'c1', name: 'Aryan Singh' },
  { id: 'c2', name: 'Divya Patel' },
  { id: 'c3', name: 'Ravi Kumar' },
];

const PeopleDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const detectionRef = useRef<boolean>(true);

  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [showVoting, setShowVoting] = useState(false);

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
      setAlertMsg(`🚨 ${people.length} people detected! Voting disabled.`);
      stopCamera();
      setShowVoting(false);
      return;
    } else if (people.length === 1) {
      setShowVoting(true);
      setAlertMsg('');
    } else {
      setShowVoting(false);
      setAlertMsg('🧍 No person detected.');
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

  const handleVoteSubmit = () => {
    if (!selectedCandidate) {
      alert('⚠️ Please select a candidate before submitting!');
      return;
    }
    setShowConfirm(true);
  };

  const confirmVote = () => {
    setVoteSubmitted(true);
    setShowConfirm(false);
    console.log('✅ Voted for:', selectedCandidate);
    // TODO: Send vote to backend if needed
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold text-blue-600">Surveillance Voting Booth</h2>

      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-[720px] h-auto border-4 border-blue-400 mt-4 rounded"
      />

      {/* Alerts */}
      {alertMsg && (
        <p className="text-red-600 font-semibold mt-4">{alertMsg}</p>
      )}

      {/* Voting Section */}
      {!voteSubmitted && showVoting && (
        <div className="mt-8 w-full max-w-xl bg-white shadow p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Choose your candidate</h3>
          <form className="space-y-4">
            {candidates.map((candidate) => (
              <label key={candidate.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id}
                  checked={selectedCandidate === candidate.id}
                  onChange={(e) => setSelectedCandidate(e.target.value)}
                  className="form-radio text-blue-600"
                />
                <span className="text-gray-700">{candidate.name}</span>
              </label>
            ))}
          </form>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleVoteSubmit}
          >
            Submit Vote
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="mt-4 text-center bg-yellow-100 border border-yellow-300 p-4 rounded-lg">
          <p className="mb-2 text-yellow-800">
            Are you sure you want to vote for{' '}
            <strong>
              {candidates.find((c) => c.id === selectedCandidate)?.name}
            </strong>
            ?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={confirmVote}
              className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {voteSubmitted && (
        <div className="mt-6 text-green-700 font-semibold">
          ✅ Thank you! Your vote has been submitted successfully.
        </div>
      )}
    </div>
  );
};

export default PeopleDetector;
