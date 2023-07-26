const express = require('express');
const routerEgreso = express.Router();
const EgresoController =require('../controller/egreso.js');

routerEgreso.use( function( req, res, next ) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    // then we know, clients need to call DELETE request instead
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }       
    next(); 
});


// Configuración de body-parser para analizar datos JSON y URL codificados



routerEgreso.get('/',async function (req,res){
    const datos = await EgresoController.consultar();
    console.log('ss '+datos);
   //res.json(datos);


    
   //var data= JSON.stringify(datos);
   var url='/egreso';
   
    res.status(200);
    res.render('index',{page:'egreso',titulo:'Egreso',registros:datos,ruta:url});

});

routerEgreso.post('/',async function(req,res){

    try {
        const datos=req.body;
        const usuarioG= await EgresoController.agregarEgreso(datos);
        res.redirect('/egreso');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar el usuario' });
        
    }


}); 

routerEgreso.delete('/:id',async function(req,res){
    var id =req.params.id;

    const eliminar = await EgresoController.eliminar(id);
    res.redirect('/egreso');

    




});




module.exports=routerEgreso;