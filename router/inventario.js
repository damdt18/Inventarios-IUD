const { Router } = require('express');
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
    check('precio', 'invalid.precio').not().not().isEmpty().isFloat({ min: 0 }),
    check('marca', 'invalid.marca').not().isEmpty(),
    check('tipoEquipo', 'invalid.estadoEquipo').not().isEmpty(),

], async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const existeInventarioPorSerial = await inventario.findOne({ serial: req.body.serial });
        if (existeInventarioPorSerial) {
            return res.status(400).send('serial ya existe para otro equipo');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id; // Corrected property name
        inventario.marca = req.body.marca._id; // Corrected property name
        inventario.estadoEquipo = req.body.estadoEquipo._id; // Corrected property name
        inventario.tipoEquipo = req.body.tipoEquipo._id; // Corrected property name
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        // Guarda el inventario en la base de datos
        inventario = await inventario.save();
        res.send(inventario);
 
    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error');
    }
});

// Ruta para obtener todos los inventarios
router.get('/', async function (req, res) {
    try {
        const inventarios = await Inventario.find();
        res.send(inventarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

//router.put('/:inventarioId')
// router.delete('/deleteId)


module.exports = router;
