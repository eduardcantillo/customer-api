const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FotoPersona =new Schema({

    foto:{
        type:String,
        required:[true,'El contenido de la foto es necesario']
    }
});

module.exports=mongoose.model('FotoPersona',FotoPersona);