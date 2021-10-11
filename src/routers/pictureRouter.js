const express=require('express');
const router=express();
const PictureController=require('../controller/pictureController');

const ruta='/foto';

router.post(ruta,PictureController.guardarPersona);
router.delete(ruta+'/:id',PictureController.eliminar);
router.get(ruta+'/:id',PictureController.obtenerPorId);
router.get(ruta,PictureController.obtenerPorTodos);
router.put(ruta+'/:id',PictureController.actualizarPorId);
router.post(ruta+'/ids',PictureController.obtenerPorIds);

module.exports= router;