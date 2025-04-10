import Project from '../models/project.js';
import mongoose from 'mongoose';

// Create a new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      contractors,
      location,
      stages,
      currentStage,
      totalFunds,
      allocatedFunds,
      expenditureSoFar,
      status,
      startDate,
      completionDate,
      updates,
      issues,
      documents, // optional if files uploaded
    } = req.body;

    let docEntries = documents || [];
    let updatesEntries = JSON.parse(req.body.updates || "[]");
    let issuesEntries = JSON.parse(req.body.issues || "[]");


    // If files are uploaded via multipart/form-data
    if (req.files && req.files.length > 0) {
      const fileDocs = req.files.map(file => ({
        name: file.originalname,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: 'Supporting', // default or derive from req.body
      }));
      docEntries = [...docEntries, ...fileDocs];
    }

    const project = new Project({
      projectId: new mongoose.Types.ObjectId(),
      title,
      description,
      department,
      contractors,
      location,
      stages,
      currentStage,
      totalFunds,
      allocatedFunds,
      expenditureSoFar,
      status,
      startDate,
      completionDate,
      documents: docEntries,
      updates: updatesEntries,
      issues: issuesEntries,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ projectId: req.params.id });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a project
export const updateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      contractors,
      location,
      stages,
      currentStage,
      totalFunds,
      allocatedFunds,
      expenditureSoFar,
      status,
      startDate,
      completionDate,
      updates,
      issues,
      documents,
    } = req.body;

    let updatedData = {
      title,
      description,
      department,
      contractors,
      location,
      stages,
      currentStage,
      totalFunds,
      allocatedFunds,
      expenditureSoFar,
      status,
      startDate,
      completionDate,
      updates,
      issues,
      documents,
    };

    if (req.files && req.files.length > 0) {
      const newDocs = req.files.map(file => ({
        name: file.originalname,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        type: 'Supporting',
      }));
      updatedData.documents = [...(documents || []), ...newDocs];
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
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

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ projectId: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
