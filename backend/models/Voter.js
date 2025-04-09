import Face from './Face.js';

export const getVoterImageUrl = async (voterId) => {
  const voter = await Face.findOne({ voterId });
  return voter?.imageUrl || null;
};
