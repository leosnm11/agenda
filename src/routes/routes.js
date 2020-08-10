import express from 'express';
import dbAgenda from '../server/agenda.js';

const router = express.Router();

router.get('/', dbAgenda.allFind);
router.get('/user', dbAgenda.findDistinctUser);
router.post('/', dbAgenda.createEvent);
router.put('/:id', dbAgenda.updateOne);
router.delete('/:id', dbAgenda.deleteOne);
router.get('/eventos', dbAgenda.findEventos);

export default router;
