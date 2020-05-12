//GameGirl v0.01

//Realizado por Alain Forton aka. deadpixel 
//"Senet" desarrollo de videojuegos para dp.estudios

//canvas

this.colores = {
	color : ['#31483f','#858118','#435e50', '#586f3f', "#31483f"]
}

function dibujar(canv, tipo){
	this.canv = canv;
	canv.height = 209;
    canv.width = 242;	
	this.ctx = canv.getContext("2d");	
	var i = 0;
		
	if(tipo === "intro"){
		this.intro = setInterval(function(){
			limpiar();
			if(i != 107){
				setTexto(0, i);
				i++;				
			}else if(i == 107) {
				setTexto(0, 108);
				setTexto(1, 125);
				clearInterval(intro);
				playAudio(0);
			}		
		},15);
		estado = tipo;
		return this.intro;
	}
	
	if(tipo === "menu"){
		i = 0;
		var pos = 30;
		this.menu = setInterval(function(){			
			if(i === 0){
				playAudio(1);
				i++;
			}
			setTexto(2, pos-i, i);
			pos = pos == 100 ? 30 : pos + 1;
			i = i == 4 ? 1 : i+1;
			setTexto(3, 140);
			setTexto(4, 160);
			setFondo();
		},220);
		estado = tipo;
		return this.menu;		
	}
	
	if(tipo === "juego"){
		playAudio(5);
		
		estado = tipo;
		
		
		ttris();
		return;
	}
};

function setTexto(num, posx, fondo){
	
	var textos = {
		texto : ["Senet","dp.estudios", "TTRIS", "d - original", "f - senet      "],
		tamano : ['32px','10px', "29px", "12px" , "12px"]
	}
	estilo = num > 1 ? "" : 'bold ';
	ctx.font = estilo +textos.tamano[num]+' gamegirl';	
	ctx.fillStyle = fondo > 0 ? colores.color[fondo] : colores.color[0];		
	ctx.fillText(textos.texto[num], (canv.width/2) - (ctx.measureText(textos.texto[num]).width/2), posx);	
}

function setFondo(){
	
	fondo = {
		ejex : [-1, -8]
	}	
	ctx.beginPath();
	ctx.rect(26, 175, 200, 35);
	ctx.fillStyle = colores.color[3];
	ctx.fill();
	ctx.beginPath();
	ctx.rect(29, 174, 183, 3);
	ctx.fillStyle =colores.color[1];
	ctx.fill();

	for(var i = 0; i < colores.color.length - 1; i++){
		ctx.beginPath();
		ctx.rect(fondo.ejex[0], 1, 7, 210);
		ctx.fillStyle = colores.color[i];
		ctx.fill();
		fondo.ejex[0] += 7;		
		ctx.beginPath();
		ctx.rect(canv.width + fondo.ejex[1], 1, 7, 210);
		ctx.fillStyle = colores.color[i];
		ctx.fill();
		fondo.ejex[1] += -7;		
	}	
}

function setFondoJuego(){
	
}



