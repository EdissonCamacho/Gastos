//conexion a mongo

const mongoose =require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/registros',{ useNewUrlParser: true, useUnifiedTopology: true })

.then(()=>{
 console.log('Conexion Exitosa');
})
.catch((error)=>{
console.log('No se pudo conectar '+error)
});


