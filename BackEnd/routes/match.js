import express from 'express';
import { predictMatch } from '../controlli/controllo_match.js';

const router = express.Router();

// L'URL completo sarà http://localhost:3000/api/match/predict
router.post('/predict', predictMatch);

export default router;