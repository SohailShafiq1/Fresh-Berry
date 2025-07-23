import express from 'express';
import { createQuote, getQuotes, markQuoteDone } from '../controllers/quoteController.js';

const router = express.Router();

// POST /api/quotes
router.post('/', createQuote);

// GET /api/quotes (admin)
router.get('/', getQuotes);

// PATCH /api/quotes/:id/done (admin)
router.patch('/:id/done', markQuoteDone);

export default router;
