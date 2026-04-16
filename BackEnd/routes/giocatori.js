import express from 'express';
import { getAllGiocatori } from '../controlli/controllo_giocatori.js';

const router = express.Router();

router.get('/', getAllGiocatori);

export default router;