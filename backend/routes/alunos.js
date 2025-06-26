const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/AlunoController');
router.get('/', ctrl.listar);
router.post('/', ctrl.criar);
router.delete('/:id', ctrl.apagar);
module.exports = router;
