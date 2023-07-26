const mongoose =require('mongoose');


const registroSchema = new mongoose.Schema({
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

const Registro =mongoose.model('Registro',registroSchema);
module.exports=Registro;