import mongoose from 'mongoose';

const faceSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Face = mongoose.model('Face', faceSchema);
export default Face;
