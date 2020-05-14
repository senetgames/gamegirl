//GameGirl v0.01

function ttris(){	
	
	this.canvasttris = document.getElementById('ttris');
	this.context = canvasttris.getContext('2d');		
	this.estiloJuego = juegoSelec == 4;
	if(startScale){
		context.scale(10, 10);
		startScale = false;
	}
	this.dropCounter = 0;
	this.velocidad = 1000;
	this.lastTime = 0;
	this.pausado = false;
	this.colorFondo = '#817c14';
	
	this.puntuacion = 0;
	this.nivel = 1;
	this.lineas = 0;
	this.lineasCount = 0;
	
	this.stado = false;
	
	this.figura = {
		pos: {
			x: estiloJuego ? 0 : 5,
			y: estiloJuego ? 0 : 12
		},		
		matrix: null,
		score: 0
	};
	this.eleccionEstilo = estiloJuego ? 0 : 16;
	
	this.colors = [null, '#586f3f', '#435e50', '#586f3f', '#858118', '#31483f', '#586f3f', '#435e50'];

	this.area = createMatrix(12, 21);
	
	figuraReset(); 
	actualizarScore();
	actualizar();

}
	function senet() {
		var columnasCount = 1;
		
		arriba: for(var y = 0; y < area.length; ++y){
			for(var x = 0; x < area[y].length; ++x){
				if (area[y][x]===0){
					continue arriba;
					
				}
			}		
			var row = area.splice(y, 1)[0].fill(0);
			area.push(row);
			--y;
			figura.score += columnasCount * 10;
			columnasCount *= 2;
			lineasCount++;
		}
	}
	function arenaSweep() {
		var columnasCount = 1;
		
		outer: for (var y = area.length - 1; y > 0; --y) {
			for (var x = 0; x < area[y].length; ++x) {
				if (area[y][x] === 0) {
					continue outer;
				}
			}
			var row = area.splice(y, 1)[0].fill(0);
			area.unshift(row);
			++y;
			figura.score += columnasCount * 10;
			columnasCount *= 2;
			console.log(columnasCount);
			lineasCount++;
		}
	}
	
	function patronPieza(num){
		
		var piezas = {
			1 : [
					[0, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0],
				],
			2 : [
					[0, 2, 0],
					[0, 2, 0],
					[0, 2, 2],
				],
			3 : [
					[0, 3, 0],
					[0, 3, 0],
					[3, 3, 0],
				],
			4 : [
					[4, 4],
					[4, 4],
				],
			5 : [
					[5, 5, 0],
					[0, 5, 5],
					[0, 0, 0],
				],
			6 : [
					[0, 6, 6],
					[6, 6, 0],
					[0, 0, 0],
				],
			0 :	[
					[0, 7, 0],
					[7, 7, 7],
					[0, 0, 0],
				]
		}
		
		return piezas[num];
	}
	
	function figuraReset() {
    
		figura.matrix = patronPieza(7 * Math.random() | 0);
		figura.pos.y = eleccionEstilo;
		figura.pos.x = (area[0].length / 2 | 0) -
					   (figura.matrix[0].length / 2 | 0);
		if (collide(area, figura)) {
			area.forEach(function (row) {
					return row.fill(0);
				});
			figura.score = 0;
			actualizarScore();
		}
	}
	
	function collide(area, figura) {
		var m = figura.matrix;
		var o = figura.pos;

		for (var y = 0; y < m.length; ++y) {
			for (var x = 0; x < m[y].length; ++x) {
				if (m[y][x] !== 0 && (area[y + o.y] && area[y + o.y][x + o.x]) !== 0) {
					return true;
				}
			}
		}

		return false;
	}
	
	function createMatrix(w, h) {
		var matrix = [];

		while (h--) {
			matrix.push(new Array(w).fill(0));
		}

		return matrix;
	}
	
	function dibujaContenido(matrix, offset) {
		matrix.forEach(function (row, y) {
			row.forEach(function (value, x) {
				if (value !== 0) {
					context.fillStyle = "#31483f";
					context.fillRect(x + offset.x, y + offset.y, 1, 1);
					context.fillStyle = colors[value];
					context.fillRect(x + 0.1 + offset.x, y + 0.1 + offset.y, 0.8, 0.8);
					context.fillStyle = colors[value - 1];
					context.fillRect(x + 0.3 + offset.x, y + 0.3 + offset.y, 0.4, 0.4);
				}
			});
		});
	}
	
	function pausar(){
		pausado = pausado == false;
		if(pausado){
			canvasttris.style.display = "none";
			x.pause();
		} else {
			canvasttris.style.display = "block";
			x.play();
		}
		
	}

	function pintar() {
		context.fillStyle = colorFondo;
		context.fillRect(0, 0, canvasttris.width, canvasttris.height);
		dibujaContenido(area, {
			x: 0,
			y: 0
		});
		dibujaContenido(figura.matrix, figura.pos);
	}

	function merge(area, figura) {
		figura.matrix.forEach(function (row, y) {
			row.forEach(function (value, x) {
				if (value !== 0) {
					area[y + figura.pos.y][x + figura.pos.x] = value;
				}
			});
		});
	}
	
	function direccion(offset) {
		figura.pos.x += offset;
		if (collide(area, figura)) {
			figura.pos.x -= offset;
		}
	}

	
	function subir() {
		figura.pos.y--;
		if (collide(area, figura)) {
			figura.pos.y++;
			merge(area, figura);
			figuraReset();
			senet();
			actualizarScore();
		}
		dropCounter = 0;
	}
	
	function bajar() {
		figura.pos.y++;
		if (collide(area, figura)) {
			figura.pos.y--;
			merge(area, figura);
			figuraReset();
			arenaSweep();
			actualizarScore();
		}
		dropCounter = 0;
	}

	function rotar(dir) {
		var pos = figura.pos.x;
		var offset = 1;
		rotate(figura.matrix, dir);
		while (collide(area, figura)) {
			figura.pos.x += offset;
			offset = -(offset + (offset > 0 ? 1 : -1));
			if (offset > figura.matrix[0].length) {
				rotate(figura.matrix, -dir);
				figura.pos.x = pos;
				return;
			}
		}
	}
	
	function rotate(matrix, dir) {
		for (var y = 0; y < matrix.length; ++y) {
			for (var x = 0; x < y; ++x) {
				var _ref = [matrix[y][x], matrix[x][y]];
				matrix[x][y] = _ref[0];
				matrix[y][x] = _ref[1];
			}
		}

		if (dir > 0) {
			matrix.forEach(function (row) {
				return row.reverse();
			});
		} else {
			matrix.reverse();
		}
	}

	

	function actualizar() {
		var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		var deltaTime = time - lastTime;
		dropCounter += deltaTime;
		if(!pausado){
			if (dropCounter > velocidad) {
				if(estiloJuego){
					bajar();
				} else {
					subir();
				}
			}

			lastTime = time;
			pintar();
		}
		animation = requestAnimationFrame(actualizar);
	}

	function actualizarScore() {		
	
		puntuacion = figura.score;
		var subir = false;
		if(lineasCount >= 10) {
			nivel++;
			subir = true;
		}else{
			;subir = false;
		}
		lineas = lineasCount >= 10 ? lineasCount - 10 : lineasCount;
		lineasCount = lineas;
		velocidad = subir ? velocidad-100 : velocidad;
		puntuaciones();
	}

	var startScale = true;	
