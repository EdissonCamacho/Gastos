const express =require('express');
const path = require('path');
require('./conexion/connection');
const registrosController =require('./controller/registro');
const EgresoController=require('./controller/egreso');






const app = express();






app.use("/",express.static("./node_modules/bootstrap/dist/"));






const bodyParser = require('body-parser');

// Configuración de body-parser para analizar datos JSON y URL codificados
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Eliminar desde anchor
app.use( function( req, res, next ) {
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






//instalar boostrap
app.use("/",express.static("./node_modules/bootstrap/dist/"));



//pug view
app.set('view engine','pug');


//routers


const routerIngreso=require('./routes/ingresoRoute.js');
app.use('/ingresos',routerIngreso);
const routerEngreso=require('./routes/egresoRoute.js');
app.use('/Egreso',routerEngreso);




app.get('/', async function(req,res){

    const sum=await registrosController.consultar();
    const totalEgreso= await EgresoController.consultar();
    var valorTotal=0;
    var valorEgreso=0;

    sum.forEach(element => {
        valorTotal+=element.valor;
        
        
    }); 
    totalEgreso.forEach(element => {
        valorEgreso+=element.valor;
        
        
    }); 
    var valorCuenta=valorTotal-valorEgreso;




    



    

    res.status(200);
    res.render('index',{page:'home',valorI:valorTotal,valorE:valorEgreso,valorT:valorCuenta});
    



    //res.sendFile(path.join(__dirname,'/html/home.html'));


});












const PUERTO=3000;

app.listen(3000,()=>{

    console.log('corriendo '+PUERTO);
});


