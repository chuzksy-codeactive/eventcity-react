import eventControllers from '../controllers/eventControllers';
import centerControllers from '../controllers/centerControllers';

const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const express = require('express');

const router = express.Router();

router.get('/', requireAuth, eventControllers.getAllEvents);
router.get('/page/:page', eventControllers.getEventPerPage);
router.post('/', requireAuth, eventControllers.createEvent);
router.get('/:id', requireAuth, eventControllers.getEventsById);
router.put('/:id', requireAuth, eventControllers.updateEventById);
router.delete('/:id', requireAuth, eventControllers.deleteEventById);

export default router;
