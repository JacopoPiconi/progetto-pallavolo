import express from 'express';
import { getAllPartite } from '../controlli/controllo_partite.js';

const router = express.Router();

// Definiamo la rotta GET per ottenere tutte le partite
router.get('/', getAllPartite);

export default router;