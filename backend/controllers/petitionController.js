import Petition from '../models/petition.js';
import { v4 as uuidv4 } from 'uuid';
// import {nextResponse} from "next/server"

// Submit petition
const submitPetition = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const docUrls = req.files?.map(file => file.location) || [];

    const petition = new Petition({
      petitionId: `P-${uuidv4()}`,
      petitioner: req.user._id,
      title,
      description,
      tags,
      supportingDocs: docUrls,
      shareLink: `https://lokdristi.vercel.app/petition/${uuidv4()}`
    });

    await petition.save();
    res.status(201).json({ message: 'Petition submitted successfully', petition });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting petition', error });
  // return new nextResponse("Submit petition route is running...")

  }
};

// Get all petitions
const getAllPetitions = async (req, res) => {
  try {
    const petitions = await Petition.find().populate('petitioner', 'name email');
    res.json(petitions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching petitions', error });
  }
};

// Support a petition
const supportPetition = async (req, res) => {
  try {
    const { id } = req.params;
    const petition = await Petition.findById(id);

    if (!petition) return res.status(404).json({ message: 'Petition not found' });

    if (petition.usersSupported.includes(req.user._id)) {
      return res.status(400).json({ message: 'You already supported this petition' });
    }

    petition.usersSupported.push(req.user._id);
    petition.noOfSigns += 1;

    await petition.save();
    res.json({ message: 'Supported petition successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error supporting petition', error });
  }
};

export {
  submitPetition,
  getAllPetitions,
  supportPetition
};
