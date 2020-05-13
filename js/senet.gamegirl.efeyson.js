//GameGirl v0.01

//Realizado por Alain Forton aka. deadpixel 
//"Senet" desarrollo de videojuegos para dp.estudios

//efectos y sonido


function activarEfectos(){
	
	this.start = function(){
		var elementos = ["onoffbat", "onoffbtn","divcanvas"];
		var clases = document.getElementById(elementos[1]).classList[1] == "off" ? ["encendido","on","pantallaon"] : ["off","off","off"];
		for(var i = 0; i<elementos.length; i++){	
			document.getElementById(elementos[i]).classList.replace(document.getElementById(elementos[i]).classList[1],clases[i]);	
		}		
		return document.getElementById("canvas");
	}
	
	this.btn = function(){
		return;
	}
}



function playAudio(audio) { 
  
	var audios = ["intro","menu","mov","lvup","original","senet"];
	
	if(audio === 3 || audio === 2){
		m = document.getElementById(audios[audio]);
		m.play();
	} else {
		x = document.getElementById(audios[audio]); 
	}

	if (audio === 0){
		x.currentTime = 0.4;
		x.play(); 
		x.onended = function() {
			interval = dibujar(canvas, "menu");
			return;  
		}
	} else if(audio === 5){
		x.currentTime = 0.6;
		x.onended = function() {
			x.play(); 
			return;  
		}
	} else if(audio === 4 || audio === 1){
		x.currentTime = 0.1;
		x.onended = function() {
			x.play(); 
			return;  
		}
	}
	return x.play();
}

function limpiarInterval(bol){
	if(bol){
		clearInterval(interval);
	}
	ctx.clearRect(0,0,249,212);	
	return;
}

function menuOpciones(num){
	x.pause();
	playAudio(num);
	limpiarInterval(true);
	interval = dibujar(canvas, "juego");	
	return;
}











