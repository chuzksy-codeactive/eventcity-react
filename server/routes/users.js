import userControllers from '../controllers/usersControllers';

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const express = require('express');

const app = express();
const router = express.Router();

/* GET users listing. */
router.get('/', userControllers.getAllUsers);
router.post('/', upload.single('image'), userControllers.createUser);
router.post('/login', userControllers.userLogin);

export default router;
