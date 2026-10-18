import express from 'express';
const router = express.Router();

import { getCitiesFromSearch } from '../controller/locations.controller.js';

router.get('/city/:search', getCitiesFromSearch);

export default router;