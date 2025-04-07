import GovProject from '../models/project.js';
import mongoose from 'mongoose';

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      contractors,
      stages,
      currentStage,
      totalFunds,
      status,
      startDate,
      completionDateExpected
    } = req.body;

    const supportingDocs = req.files?.map(file => file.location || file.path);

    const project = new GovProject({
      projectId: new mongoose.Types.ObjectId().toString(),
      title,
      description,
      department,
      contractors,
      stages,
      currentStage,
      totalFunds,
      status,
      startDate,
      completionDateExpected,
      supportingDocs
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Project creation error:", error);
    res.status(500).json({ message: "Error creating project", error });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await GovProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const project = await GovProject.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
    };

    // If new files are uploaded
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map(file => file.location); // assuming you're using S3
      updatedData.supportingDocs = fileUrls;
    }

    const updatedProject = await GovProject.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await GovProject.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};