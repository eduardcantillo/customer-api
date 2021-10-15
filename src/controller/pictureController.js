const FotoPersona=require('../models/picturePersona');
const tamanioPermitidoId=24;

const PictureController={

    guardarPersona:(req, res)=>{

        console.log(req.body)
        const { foto }=req.body;
        
        let fotoNueva = new FotoPersona({
            foto,
            
        });
    
        fotoNueva.save((err, fotoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            if (!fotoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                foto: fotoDB.foto,
                id:fotoDB._id,
            });
        });

        
    },

    eliminar:(req,res)=>{

        const id=req.params.id;
        FotoPersona.findByIdAndRemove(id,(err, fotoDB)=>{
            
            if(err){
               
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            if (!fotoDB) {
                return res.status(400).json({
                    ok: false,
                    err:`el id :${id} no se encuentra en la base de datos`,
                });
            }

            res.json({
                ok: true,
                mensaje: "foto eliminada correctamente",
            });
        });



    },

    obtenerPorId:(req,res)=>{

        const id=req.params.id;
        FotoPersona.findOne({ _id:id },(err,fotoDB)=>{
            if(err || !fotoDB){
                return res.status(404).json({
                    ok:false,
                    err:`no se encontro el elemento con el id ${id}`
                })
            }

            res.json({

                ok:true,
                foto:fotoDB.foto
            })
        })
    },

    obtenerPorTodos:(req,res)=>{

        
        FotoPersona.find({},(err,fotoDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err:`Ha sucedido algun error`
                })
            }

            if(!fotoDB){
                return res.status(204).json({
                    ok:false,
                    err:`EL contenido ha sido vacio`
                })
            }

            res.json({

                ok:true,
                foto:fotoDB
            })
        })
    },

    obtenerPorIds:(req,res)=>{
        const ids=req.body.ids;


        FotoPersona.find({'_id':{ $in: ids.filter(id => id.length===tamanioPermitidoId)}},(err,fotos)=>{

            if(err){
                console.log(err)
                return res.status(500).json({
                    ok:false,
                    mensaje:"Ha ocurrido algun error inesperado"
                });
            }

            if(!fotos){

                return res.status(204).json({
                    ok:true,
                    mensaje:"no se encontraron concidencias"
                });
            }

            res.json({

                ok:true,
                fotos
            });
        })

    },

    actualizarPorId:(req,res)=>{
        const {foto} = req.body;
        const id=req.params.id;
        const fotoActualizar= { foto }

        FotoPersona.findByIdAndUpdate({_id:id},fotoActualizar,{ new: true, runValidators: true },
            (err, fotoDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
    
                res.json({
                    ok: true,
                    foto: fotoDB.foto,
                })
            })
        
    
    },
}
module.exports = PictureController;