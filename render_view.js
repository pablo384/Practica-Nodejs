function render (html,variables) {	

	for (var i = variables.length - 1; i >= 0; i--) {
		var variable = variables[i];

		html_string=html_string.replace("{"+variables[i]+"}", parametros[variable]);
	}
}