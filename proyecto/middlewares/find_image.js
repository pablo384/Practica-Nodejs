var Imagen = require("../models/imagenes");

module.exports =  function (req,res,next) {
	Imagen.findById(req.params.id, function (err,img){
		if (img != null) {
			console.log("--------Encontre la imagen:"+ img.title);
			res.locals.imagen=img;
			next();
		}else {
			res.redirect("/app");
		}
	})
}