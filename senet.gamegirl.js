//GameGirl v0.01

/*borrar el html si abren la consola
(function(){
	<script>
	var chksts, ele = new Image();
	Object.defineProperty(ele, 'id', {
		get: function() {
			chksts = 'on';
		}
	});
	requestAnimationFrame(function check() {
		chksts = 'off';
		var texto = "si quieres el codigo fuente contactame!";
		console.dir(ele);
		console.warn(texto);
		if (chksts == 'on') {
			document.querySelector('html').innerHTML = '';
		}
		requestAnimationFrame(check);
	});
	</script>
	
})();

//cargar script dinamicamente
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "js/senet.gamegirl.event.js";

document.getElementById("testing").appendChild(script);
if(script.complete) {
    document.write = document._write
}else { 
    script.addEventListener( "load", function() { 
    // Goes to the end of the run queue so that the script
    // is guaranteed to run before this code
    console.log(script);
    setTimeout(function(){document.write = document._write;},0);
})};
*/
