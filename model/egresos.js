const mongoose =require('mongoose');


const egresoSchema = new mongoose.Schema({
    id:{
        type:Number,require:true,unique:true
    },
    descripcion:{
        type:String
    },
    valor:{
        type:Number,require:true
    
    },
    dia:{
        type:String,require:true
    
    }    

});

const Egreso = mongoose.model('Egreso',egresoSchema);
module.exports=Egreso;