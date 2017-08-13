// ==UserScript==
// @name Script definitivo para Espionaje
// @version 1.0
// @author Desconocido (adaptado a 0.73e por Croc)
// @include http://ogame*.de/game/messages.php*
// @description: Este script hara que se muestre, en cada informe de espionaje, el robo teorico a partir de los recursos, asi como las naves de carga que necesitas para recogerlos y su porcentaje de carga. De la misma manera, a partir de las naves en orbita, apareceran los escombros teoricos que producirias y los recicladores necesarios para recogerlos con su porcentaje de carga. Como complemento tambien se añade a todos los mensajes (no solo los de espionaje) un enlace que, al ser pulsado, hace que se oculte el cuerpo del mensaje.
// ==/UserScript==

window.addEventListener("load", function(e) {

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;        
	function find(xpath, xpres){
	        var ret = document.evaluate(xpath, document, null, xpres, null);
	        return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}
	function elem(tag){ return document.createElement(tag); }

	var naves = new Array();
	naves['Nave pequeña de carga'] 	= new Array(2000, 2000);
	naves['Nave grande de carga'] 	= new Array(6000, 6000);
	naves['Cazador ligero'] 	= new Array(3000, 1000);
	naves['Cazador pesado'] 	= new Array(6000, 4000);
	naves['Crucero'] 		= new Array(20000, 7000);
	naves['Nave de batalla'] 	= new Array(40000, 20000);
	naves['Colonizador'] 		= new Array(10000, 20000);
	naves['Reciclador'] 		= new Array(10000, 6000);
	naves['Sonda de espionaje'] 	= new Array(0, 1000);
	naves['Bombardero'] 		= new Array(50000, 25000);
	naves['Satélite solar'] 	= new Array(0, 2000);
	naves['Destructor'] 		= new Array(60000, 50000);
	naves['Estrella de la muerte'] 	= new Array(5000000, 4000000);

	var tables = find("//table[@width='400']", XPList);
	for (var i = 0; i < tables.snapshotLength; i++) {	
		var table = tables.snapshotItem(i);
		if (typeof(table.innerHTML) == 'undefined') continue;
		var matches = table.innerHTML.match(new RegExp("<tr><td>Metal:</td><td>([0-9]+)</td>\\s*<td>.*</td><td>([0-9]+)</td></tr>\\s*<tr><td>.*</td><td>([0-9]+)</td>\\s*<td>.*</td><td>([0-9]+)</td></tr>", "im"))
		if (matches){
			var metal 	= Math.floor(parseInt(matches[1]) / 2);
			var cristal 	= Math.floor(parseInt(matches[2]) / 2);
			var deuterio 	= Math.floor(parseInt(matches[3]) / 2);
			var total 	= metal + cristal + deuterio;
			var big 	= Math.ceil(total / 25000);
			var small 	= Math.ceil(total / 5000);
			var cargabig 	= Math.round(total / (big * 250));
			var cargasmall 	= Math.round(total / (small * 50));
			
			var tabla = elem("TABLE");
			var tr1 = elem("TR"); var tr2 = elem("TR"); var tr3 = elem("TR"); var tr4 = elem("TR");
			var td11 = elem("TD");
			var td21 = elem("TD"); var td22 = elem("TD"); var td23 = elem("TD"); var td24 = elem("TD");
			var td31 = elem("TD"); var td32 = elem("TD"); var td33 = elem("TD"); var td34 = elem("TD");
			var td41 = elem("TD"); var td42 = elem("TD"); var td43 = elem("TD"); var td44 = elem("TD"); 
			tr1.appendChild(td11);
			tr2.appendChild(td21); tr2.appendChild(td22); tr2.appendChild(td23); tr2.appendChild(td24);
			tr3.appendChild(td31); tr3.appendChild(td32); tr3.appendChild(td33); tr3.appendChild(td34);
			tr4.appendChild(td41); tr4.appendChild(td42); tr4.appendChild(td43); tr4.appendChild(td44);
			td11.className = "c"; td11.colSpan = "4"; td11.innerHTML = "Robo te&oacute;rico";
			td21.innerHTML = "Metal:"; td22.innerHTML = metal; td23.innerHTML = "Cristal:"; td24.innerHTML = cristal;
			td31.innerHTML = "Deuterio:"; td32.innerHTML = deuterio; td33.innerHTML = "Total:"; td34.innerHTML = total;
			td41.innerHTML = "Grandes:"; td42.innerHTML = big + ' (' + cargabig + '%)';
			td43.innerHTML = "Peque&ntilde;as:"; td44.innerHTML = small + ' (' + cargasmall + '%)';
			tabla.appendChild(tr1); tabla.appendChild(tr2); tabla.appendChild(tr3); tabla.appendChild(tr4);

			tabla.width = "400";
			table.parentNode.insertBefore(tabla, table);
		}else if(table.innerHTML.match(/<tr><td class="c" colspan="4">Flotas/i)){
			var tds = table.getElementsByTagName('td');
			if (tds.length < 3) continue;
			var metal = 0;
			var cristal = 0;
			for (var j = 1; j < tds.length; j += 2) {
				if (typeof(naves[tds[j].innerHTML]) == 'undefined') continue;
				metal += naves[tds[j].innerHTML][0] * tds[j+1].innerHTML;
				cristal += naves[tds[j].innerHTML][1] * tds[j+1].innerHTML;
			}
			metal = Math.floor(metal * 0.3);
			cristal = Math.floor(cristal * 0.3);
			var total = metal + cristal;
			var recicladores = Math.ceil(total / 20000);
			var carga = Math.round(total / (recicladores * 200));
			 
			var tabla = elem("TABLE");
			var tr1 = elem("TR"); var tr2 = elem("TR"); var tr3 = elem("TR");
			var td11 = elem("TD");
			var td21 = elem("TD"); var td22 = elem("TD"); var td23 = elem("TD"); var td24 = elem("TD");
			var td31 = elem("TD"); var td32 = elem("TD"); var td33 = elem("TD"); var td34 = elem("TD");
			tr1.appendChild(td11);
			tr2.appendChild(td21); tr2.appendChild(td22); tr2.appendChild(td23); tr2.appendChild(td24);
			tr3.appendChild(td31); tr3.appendChild(td32); tr3.appendChild(td33); tr3.appendChild(td34);
			td11.className = "c"; td11.colSpan = "4"; td11.innerHTML = "Escombros te&oacute;rico";
			td21.innerHTML = "Metal:"; td22.innerHTML = metal; td23.innerHTML = "Cristal:"; td24.innerHTML = cristal;
			td31.innerHTML = "Total:"; td32.innerHTML = total; td33.innerHTML = "Recicladores:"; td34.innerHTML = recicladores + ' (' + carga + '%)';
			
			tabla.appendChild(tr1); tabla.appendChild(tr2); tabla.appendChild(tr3);
			tabla.width = "400";
			table.parentNode.insertBefore(tabla, table);
		 }
	 }

	var trs = find("//table[@width='519']//tr", XPList);
	for (var i = 0; i < trs.snapshotLength; i++) {
		var tr = trs.snapshotItem(i);
		tr.id = 'tr' + i;
		if(tr.innerHTML.match(/<th><input.*type="checkbox".*<\/th>/i)){
			tr.firstChild.innerHTML += '<br><span style="cursor: pointer;" onclick="var tr = document.getElementById(\'tr'+(i+1)+'\'); if (typeof(tr.abierto) == \'undefined\' || tr.abierto) { tr.style.display = \'none\'; this.innerHTML = \'Mostrar\'; tr.abierto = false; } else { tr.style.display = \'\'; tr.abierto = true; this.innerHTML = \'Ocultar\'; }">Ocultar</span></th>';
		}
	 }

}, false);
