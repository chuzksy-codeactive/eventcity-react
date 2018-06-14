import centerControllers from '../controllers/centerControllers';

const passportService = require('../services/passport');
const passport = require('passport');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const express = require('express');

const router = express.Router();

const requireAuth = passport.authenticate('jwt', { session: false });

router.post('/', requireAuth, upload.single('file'), centerControllers.createCenters);
router.get('/', requireAuth, centerControllers.getAllCenters);
router.get('/page/:page', centerControllers.getCenterPerPage);
router.get('/:id', centerControllers.getCenterById);
router.delete('/:id', requireAuth, centerControllers.deleteCenter);
router.put('/:id', requireAuth, upload.single('file'), centerControllers.updateCenter);
router.get('/event/:id', centerControllers.getCentersEvents);
export default router;
