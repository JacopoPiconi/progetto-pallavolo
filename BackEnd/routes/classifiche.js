import express from 'express';
import { getClassifiche } from '../controlli/controllo_classifiche.js';

const router = express.Router();

router.get('/', getClassifiche);

export default router;