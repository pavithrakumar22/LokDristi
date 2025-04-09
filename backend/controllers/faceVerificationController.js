import { getVoterImageUrl } from '../models/Voter.js';
import { verifyImageWithStored } from '../utils/deepface.js';

export const verifyFace = async (req, res) => {
  const { voterId, capturedImages } = req.body;

  if (!voterId || !capturedImages || capturedImages.length === 0) {
    return res.status(400).json({ message: 'Missing voterId or images' });
  }

  try {
    const storedImageUrl = await getVoterImageUrl(voterId);
    if (!storedImageUrl) return res.status(404).json({ message: 'Voter not registered' });

    let matchCount = 0;

    for (const image of capturedImages) {
      const isMatch = await verifyImageWithStored(image, storedImageUrl);
      if (isMatch) matchCount++;
    }

    const result = matchCount >= 3;
    return res.status(200).json({ verified: result, matchCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
