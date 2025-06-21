const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// CRUD маршруты
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/slug/:slug', doctorController.getDoctorBySlug);
router.post('/', doctorController.createDoctor);
router.patch('/:id', doctorController.patchDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;