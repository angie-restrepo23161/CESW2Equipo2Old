    const mongoose = require('mongoose');
    const conexion = require('./conection');
    
    conexion.mongoose.connection;
    //mongoose.connect("mongodb://localhost/fotos")
    const Schema = mongoose.Schema;
    
    const proyectoSchema = new Schema({
        id: String,
        codigoProyecto : String,
        idCliente : Number,
        idLider : Number, 
        idResponsable : Number,
        idSoport : Number,
        nombre : String,
        clasificacion : String,
        fechaIngreso : Date,
        Descripcion : String
    });
    
    const proyecto = mongoose.model('Proyecto',proyectoSchema);


module.exports.Proyecto = proyecto;