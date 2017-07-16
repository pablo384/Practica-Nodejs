var Imagen = require("../models/imagenes");
var owner_check = require("./image_permission")

module.exports =  function (req,res,next) {
	Imagen.findById(req.params.id)
	.populate("creator")
	.exec(function (err,img){
		if (img != null && owner_check(img, req, res)) {
			console.log("Encontre la imagen del user id:"+ img.creator);
			res.locals.imagen=img;
			next();
		}else {
			res.redirect("/app");
		}
	})
}