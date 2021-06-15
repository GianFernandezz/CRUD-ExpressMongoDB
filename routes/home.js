const express = require("express");
const router = express.Router();
const pais = require("../models/Pais");


// ROUTE FOR READ
router.get('/', (req, res) => {
    pais.find((err, docs) => {
        if (err) throw err;
        // console.log(docs);
        res.render('home', {
            pais: docs
        })
    }).catch(err => {
        console.log("Algo anda mal con mongodb");
    })
});

// Ruta para leer - CREAR
router.post("/add", (req, res, next) => {
  const { name, players, coach } = req.body;

  console.log(name, players, coach);

  const nomPais = new pais({
    name,
    players,
    coach,
  });
  nomPais.save((err) => {
    if (err) {
        console.log("Error al guardar datos en la Base de Datos.");
    } else {
        console.log("Los Datos se registran correctamente.")
        res.redirect("/");
    }
  });
  
});

// RUTA PARA MOSTRAR ELEMENTO DE ACTUALIZACIÓN
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    pais.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
        if(err){
            console.log("No puedo recuperar datos y editarlos debido a algún problema con la base de datos");
        }else{
            res.render('edit', {pais:docs});
        }
    });
});

// RUTA PARA ACTUALIZAR ELEMENTO
router.post('/edit/:id', (req, res, next) => { 

    pais.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
        if (err) {
            console.log("Algo salió mal para actualizar los datos");
            next(err);
        } else {
            console.log("Dato Actualizado Exitosamente..!");
            res.redirect('/');
        }
    }); 
});


// RUTA PARA ELIMINAR ELEMENTO                                     
router.get('/delete/:id',(req, res, nex)=>{
    pais.findByIdAndDelete({_id: req.params.id}, (err, docs)=>{
        if(err){
            console.log("Algo salió mal para eliminar los datos");
            next(err); 
        }else{
            console.log("Dato Eliminado Exitosamente..!");
            res.redirect('/');
        }
    });
});

module.exports = router;
