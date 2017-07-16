var Imagen = require("../models/imagenes");

module.exports = function (image, req, res) {
	//true = tienes permisos
	//falso = no tienes permisos


	if (req.method == "get" && req.path.indexOf("edit")<0) {
		return true;
	}

	if (typeof image.creator=="undefined") {return false}

	if (image.creator._id.toString()==res.locals.user._id) {
 		//esta img yo la subi
		return true;
	}

	return false;
}