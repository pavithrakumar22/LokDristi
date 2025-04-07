import express from 'express';
import upload from '../middleware/multer.js';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', upload.array('files'), createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;


