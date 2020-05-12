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
	
	start.addEventListener("click", function(){

		controlbtn = controlbtn == false ? true : false;
		
		this.canvas = new activarEfectos().start();
		
		if(!controlbtn){
			
			limpiarInterval()
			
			if(x !== undefined){ x.pause(); }

			if(animation !== undefined){
				window.cancelAnimationFrame(animation);
				context.clearRect(0,0,120,210);
			}
		}else{
			interval = dibujar(canvas, "intro");			
		}		
	},false);

	
	botones.addEventListener("click", function(b){
		if(estado == "menu" && controlbtn){
			if(b.target.id == "d" || "f"){
				menuOpciones();
				return;
			}
			
		}		
	},false);
	
	document.addEventListener('keydown', function(e){
		if(estado == "menu" && controlbtn){
			if(e.keyCode == 68 || 70){
				menuOpciones();
			}
		}else if(estado == "juego" && controlbtn){
			
		}
		return console.log(e.keyCode);
	});
	
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
