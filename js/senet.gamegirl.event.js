//GameGirl v0.01

//Realizado por Alain Forton aka. deadpixel 
//"Senet" desarrollo de videojuegos para dp.estudios

//eventos

start((function(){
	console.warn("audio, video, disco!");
	
	var controlbtn = false;
	var start = document.getElementById("startgamegirl");	
	var botones = document.getElementById("btncontenedor");
	this.animation = undefined;
	this.interval = undefined;
	this.x = undefined;
	this.estado = undefined;
	this.juegoSelec = undefined;
	this.context = undefined;
	
	start.addEventListener("click", function(){

		controlbtn = controlbtn == false;
		
		this.canvas = new activarEfectos().start();
		
		if(!controlbtn){
			
			limpiarInterval(true);
			
			if(x !== undefined){ x.pause(); }

			if(context !== undefined){
				cancelAnimationFrame(animation);
				context.clearRect(0,0,120,210);
				
			}
		}else{
			interval = dibujar(canvas, "intro");			
		}		
	},false);

	
	botones.addEventListener("click", function(b){
		var targetId = b.target.id;
		
		if(estado == "menu" && controlbtn){
			if(targetId === "d" || targetId === "f"){
				
				juegoSelec = targetId == "d" ? 4 : 5;
				menuOpciones(juegoSelec);
				return;
			}
			
		}else if(estado == "juego" && controlbtn){
			controles(0, targetId);
		}		
	},false);
	
	document.addEventListener('keydown', function(e){
		var key = e.keyCode;
		if(estado == "menu" && controlbtn){
			if(key === 68 || key === 70){
				
				juegoSelec = key == 68 ? 4 : 5;
				menuOpciones(juegoSelec);
				return;
			}
		}else if(estado == "juego" && controlbtn){
			controles(1, key);
		}
		return;
	});// 32 para space y start o select
	
	
	function controles(control, key){
		
		var eventoId = [["xiz","yup","xde","ydo","d","f","start"],
						[37,38,39,40,68,70,32]];
						
		if (key === eventoId[control][0]) {
			direccion(-1);
			return;
		} else if (key === eventoId[control][1] && !estiloJuego) {
			subir();
			return;
		} else if (key === eventoId[control][2]) {
			direccion(1);
			return;
		} else if (key === eventoId[control][3] && estiloJuego) {
			bajar();
			return;
		} else if (key === eventoId[control][4]) {
			rotar(-1);
		} else if (key === eventoId[control][5]) {
			rotar(1);
		} else if (key === eventoId[control][6]) {
			//pausar();
			return;
		} else {
			return;
		}
		
		return playAudio(2);
	}
	
	/*Para hacer controles de gamepad
	window.addEventListener("gamepadconnected", function(e){
		console.log( "%d : %s. %d button %d axes", 
			e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length
		);
	});
	*/
	
}));


//ReadyState
function start(f){
	/in/.test(document.readyState)
		? setTimeout("start("+f+")",9)
		: f()
};
