import express from 'express';
import { getAllSquadre } from '../controlli/controllo_squadre.js';

const router = express.Router();
router.get('/', getAllSquadre);

export default router;