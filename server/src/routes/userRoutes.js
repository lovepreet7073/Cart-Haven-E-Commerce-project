const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const upload = require('../Middleware/multer')
const { authenticate } = require('../Middleware/authenticate');
router.get('/profile',authenticate, userController.getUserProfile)
router.put('/update-user', upload.single('profile_pic'),userController.updateUser);
router.put('/update-address/:id',authenticate,userController.UpdateAddress);
router.delete('/remove-address/:addressId', authenticate, userController.RemoveAddress);

router.get('/',authenticate, userController.getAllUsers)

module.exports = router