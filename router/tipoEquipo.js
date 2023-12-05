const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
  check('nombre', 'invalid.nombre').not().isEmpty(),
  check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])

], async function (req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() }); 
    }

    
    let tipoEquipo = new TipoEquipo(); 
 tipoEquipo.nombre = req.body.nombre;
 tipoEquipo.estado = req.body.estado;


 tipoEquipo.fechaCreacion = new Date();
 tipoEquipo.fechaActualizacion = new Date();

    // Guarda el tipoEquipo en la base de datos
 tipoEquipo = await tipoEquipo.save();

    
    res.send (tipoEquipo);

  } catch (error) {
    console.error(error);
    res.status(500).send('ocurrio un error');
  }
});

// Ruta para obtener todos los tipoEquipos
router.get('/', async function (req, res) {
  try {
    const tipoEquipos = await TipoEquipo.find();
    res.send (tipoEquipos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ocurrió un error');
  }
});


module.exports = router;
