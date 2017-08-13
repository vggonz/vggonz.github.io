
function countdown(){
	v = new Date();
	var bxx = document.getElementById('tiempo_restante');
	n = new Date();
	s = time - Math.round((n.getTime() - v.getTime())/1000.);
	m = 0;
	h = 0;
	if((s < 0) || (fin == true)){
		bxx.innerHTML = "<font color='#00FF00'>OK!</font>"
	}else{
		if(s > 59){
			m = Math.floor(s/60);
			s = s - m * 60
		}
		if(m > 59){
			h = Math.floor(m/60);
			m = m - h * 60
		}
		if(s < 10){
			s = "0" + s
		}
		if(m < 10){
			m = "0" + m
		}
		bxx.innerHTML = h + ":" + m + ":" + s
		time = time - 1;
		window.setTimeout("countdown();", 999);
	}
}

function set_range(galaxia1, galaxia2, sistema1, sistema2){
	document.getElementById("galaxia1").value = galaxia1;
	document.getElementById("galaxia2").value = galaxia2;
	document.getElementById("sistema1").value = sistema1;
	document.getElementById("sistema2").value = sistema2;

	check_recursos();
}

function check_recursos(){
	galaxia1 = eval(document.getElementById("galaxia1").value);
	galaxia2 = eval(document.getElementById("galaxia2").value);
	sistema1 = eval(document.getElementById("sistema1").value);
	sistema2 = eval(document.getElementById("sistema2").value);

	if (galaxia1 < 1 || galaxia1 > 9 || galaxia1 > galaxia2){ 
		if (galaxia1 >= 1 && galaxia1 <= 9){
			galaxia2 = galaxia1;
			document.getElementById("galaxia2").value = galaxia2; 
		}else{
			galaxia1 = 1; 
			document.getElementById("galaxia1").value = galaxia1; 
		}
	}
	if (galaxia2 < 1 || galaxia2 > 9 || galaxia2 < galaxia1){
		if (galaxia2 < galaxia1){ 
			galaxia2 = galaxia1; 
		}else{
			galaxia2 = 9;
		}
		document.getElementById("galaxia2").value = galaxia2; 
	}
	if (sistema1 < 1 || sistema1 > 499 || sistema1 > sistema2){ 
		if (sistema1 >= 1 && sistema1 <= 499){
			sistema2 = sistema1;
			document.getElementById("sistema2").value = sistema1; 
		}else{
			sistema1 = 1; 
			document.getElementById("sistema1").value = sistema1; 
		}
	}
	if (sistema2 < 1 || sistema2 > 499){
		if (sistema2 < sistema1){ 
			sistema2 = sistema1; 
		}else{
			sistema2 = 499;
		}
		document.getElementById("sistema2").value = sistema2; 
	}

	deuterio = document.getElementById("deuterio");
	deuterio.innerHTML = "<font color='red'>" + ((galaxia2 - galaxia1 + 1) * (sistema2 - sistema1 + 1) * 10) + "</font> de deuterio";
	
	tiempo = document.getElementById("tiempo");
	segundos = ((galaxia2 - galaxia1 + 1) * (sistema2 - sistema1 + 1) * 3);
	minutos = Math.round(segundos / 60); if (minutos > 0) segundos -= minutos * 60;
	horas = Math.round(minutos / 60); if (horas > 0) minutos -= horas * 60;
	tiempo_texto = "";
	if (horas > 0) tiempo_texto += horas + " horas";
	if (minutos > 0) tiempo_texto += " " + minutos + " minutos";
	if (segundos > 0) tiempo_texto += " " + segundos + " segundos";
	tiempo.innerHTML = "<font color='red'>" + tiempo_texto + "</font> aproximadamente";
}

function calcular_tiempo(){
	galaxia1 = eval(document.getElementById("galaxia1").value);
	galaxia2 = eval(document.getElementById("galaxia2").value);
	sistema1 = eval(document.getElementById("sistema1").value);
	sistema2 = eval(document.getElementById("sistema2").value);

	segundos = ((galaxia2 - galaxia1 + 1) * (sistema2 - sistema1 + 1) * 3);
	return segundos;
}

function checkForm(){
	status3 = document.getElementById("status3");
	status4 = document.getElementById("status4");

	if (status4.checked == true) status3.checked = true;
}
