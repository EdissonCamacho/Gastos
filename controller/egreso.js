const Egreso =require('../model/egresos');// schema y modelo

async function agregarEgreso(datos) {
  try {
    const ultimo = await Egreso.findOne().sort({ id: -1 });
    const nuevoValor = ultimo && ultimo.id ? ultimo.id + 1 : 1;
    console.log(nuevoValor);
    console.log(datos);

    const nuevoRegistro = new Egreso({
      id: nuevoValor,
      descripcion: datos.descripcion,
      valor: datos.valor,
      dia: datos.dia,
    });

    console.log("objeto a guardar", nuevoRegistro);

    const guardado = await nuevoRegistro.save();
    return guardado;
  } catch (error) {
    console.log("error " + error);
    throw error;
  }
}

async function consultar() {

const datos = await Egreso.find({});

console.log(datos);
var info=datos;
return datos;
    
}

async function eliminar(id){
   const eliminar= await Egreso.deleteOne({_id:id})
   return eliminar;

}

module.exports = {
  agregarEgreso,consultar,eliminar
};

