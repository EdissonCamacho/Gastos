const express = require('express');
const routerIngreso = express.Router();
const registrosController =require('../controller/registro');
const routerEgreso = require('./egresoRoute');

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



routerIngreso.get('/',async function (req,res){
    const datos = await registrosController.consultar();
    console.log('ss '+datos);
   //res.json(datos);


    
   //var data= JSON.stringify(datos);
   var url='/ingresos';
   
    res.status(200);
    res.render('index',{page:'ingreso',titulo:'Ingresos',registros:datos,ruta:url});

});

routerIngreso.post('/',async function(req,res){

    try {
        const datos=req.body;
        const usuarioG= await registrosController.agregarRegistro(datos);
        res.redirect('/ingresos');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al guardar el usuario' });
        
    }


}); 

routerIngreso.delete('/:id',async function(req,res){
    var id =req.params.id;

    const eliminar = await registrosController.eliminar(id);
    res.redirect('/ingresos');

    




});

module.exports =routerIngreso;