var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var Proyecto = require("./models/Proyecto").Proyecto;

/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

const proyectoSchemaJSON = new Schema({
    codigoProyecto : Number,
    idCliente : Number,
    idLider : Number, 
    idResponsable : Number,
    idSoport : Number,
    nombre : String,
    clasificacion : String,
    fechaIngreso : Date,
    Descripcion : String
});

var proyect_schema = new Schema(proyectoSchemaJSON);
var Proyecto = mongoose.model("Proyecto",proyect_schema);
*/

//Middlewars
//Archivos estaticos (Css)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Temporalmente vistas en Jade
app.set("view engine","jade");

app.get("/",function(request, response){
    response.render("index");
});

app.get("/login", function(request,response){
    response.render("login");
});

app.post("/users",function(request,response){
    //var user = new User({email: request.body.email, password: request.body.contrasena});
    // Guardar
    //user.
    //response.render("proyectos");
});

//InfoListarProyectos
app.get("/proyectos", function(request,response){
    Proyecto.find(function(error, doc){
        response.render("proyectos",{
            proyecto: doc
        });
    });
});

//InfoEditarProyectos
app.get("/:idProyecto", function(request,response){
    const { idProyecto } = request.params;

    if(idProyecto == "proyectId"){

        Proyecto.findByIdAndUpdate(request.query.id, request.query, function(error, doc){
            if(error){
                console.log(String(error));
                response.send("No pudimos actualizar la información");
            }else{
                response.render("EditarProyecto",{
                    proyecto: Proyecto
                });
            }
        });
    }else{
        Proyecto.findById(idProyecto, function(error, doc){
            if(!error){
                response.render("EditarProyecto",{
                    proyecto: doc
                });
            }else{
                response.render("nuevoProyecto")
            }
        });
    }
});

// Guardar nuevo
app.post("/proyectById", function(request, response){
    var proyecto = new Proyecto({
                                    codigoProyecto : request.body.codigoProyecto,
                                    idCliente : request.body.idCliente,
                                    idLider : request.body.idLider,
                                    idResponsable : request.body.idResponsable,
                                    idSoport : request.body.idSoport,
                                    nombre : request.body.nombre,
                                    clasificacion : request.body.clasificacion,
                                    fechaIngreso : request.body.fechaIngreso,
                                    Descripcion : request.body.Descripcion
                                });

    proyecto.save().then(function(us){
        response.render("EditarProyecto",{
            proyecto: proyecto
        });
    },function(error){
        if(error){
            console.log(String(error))
            response.send("No pudimos guardar la información");
        }
    });

});

app.get("/Eliminar/:idProyecto", function(request,response){
    const {id} = request.params;

    Proyecto.findOneAndDelete().then(function(us){
        response.render("proyectos")
    }, function(error){
        if(error){
            response.send("No pudimos eliminar la información")
        }
    })

    /*Proyecto.findByIdAndDelete(id, function(error, doc){
        if(error){
            console.log(String(error));
            response.send("No se pudo eliminar el registro");
        }else{
            response.send("Registro Eliminado")
        }
    });*/

});

app.listen(8081);