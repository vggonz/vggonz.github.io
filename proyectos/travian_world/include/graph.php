<?php

putenv('GDFONTPATH='.realpath('.'));
DEFINE('RED', 'FF0000');
DEFINE('GREEN', '00FF00');
DEFINE('BLUE', '0000FF');
DEFINE('FONT_VERDANA_BOLD', "verdanab.ttf");

class Grafico{

	// Configuracion
	var $ancho 		= 300;			// El ancho de la grafica
	var $alto 		= 200;			// El alto de la grafica

	var $margen_der 	= 5;			// Margen derecho en pixels (rectangulo estadisticas)
	var $margen_inf 	= 65;			// Margen inferior en pixels (rectangulo estadisticas)
	var $margen_izq 	= 65;			// Margen izquierdo en pixels (rectangulo estadisticas)
	var $margen_sup 	= 23;			// Margen superior en pixels (rectangulo estadisticas)

	var $color_titulo 	= 'FF8000';		// Color del titulo
	var $fuente_titulo 	= FONT_VERDANA_BOLD;	// Archivo del tipo de letra del titulo
	var $tam_titulo 	= 10;			// Tamaño de la fuente del titulo
	var $margensup_titulo 	= 7;			// Margen superior que deja el titulo

	var $color_ejex 	= '71CC00';		// El color del texto del eje X
	var $fuente_ejex 	= FONT_VERDANA_BOLD;	// Archivo del tipo de letra del eje X
	var $tamejextext 	= 8;			// Tamaño de la fuente del eje X

	var $divisiones 	= 3;			// Cantidad maxima de divisiones horizontales
	var $lineas_hor_color 	= 'F0F0F0';		// Color de las barras horizontales
	var $color_ejey 	= '71D000';		// Color de los habitantes (Eje y)
	var $tam_ejey 		= 3;			// Tamaño de la fuente del eje Y 

	var $rectangulo_color 	= '000000';		// El color en hexadecimal del rectangulo principal
	var $rectangulo2_color 	= 'CCCCCC';		// El color en hexadecimal del rectángulo de las estadísticas
	var $color_fondo 	= 'FFFFFF';		// Color de fondo del grafico

	var $formato 	= 'png';			// Formato de salida. Puede ser "png", "gif" o "jpeg"
	var $max_age 	= 43200; 			// Tiempo maximo en cache en segundos, por defcto 12 horas
	var $temp_path 	= "/tmp/jpgraph_cache/"; 	// Path de la cache (con barra final)
	var $basename	= null;				// Nombre del fichero de salida. Usado para el sistema de cache
	var $grafico 	= null;				// Referencia al objeto imagen
	var $xdata 	= array();			// Datos del eje X
	var $ydata 	= array();			// Array con los datos del Y
	var $color_grafico 	= array();		// Colores de cada conjunto de datos

	function Grafico($ancho, $alto, $nombre){
		$this->ancho = $ancho;
		$this->alto = $alto;
		$this->basename = $nombre;

		// Se crea la imagen
		$this->grafico = imagecreate($this->ancho, $this->alto); 
	}

	function cache_valida(){
                clearstatcache();
		$file = $this->temp_path.$this->basename.".".$this->formato;
                $filetime = @filemtime($file);
                if ((time() - $filetime) < $this->max_age){
			header("Expires: ".$this->gmt_string($filetime + $this->max_age));
			header("Content-Type: image/".$this->formato);
			readfile($file);
			exit;
		} else header("Expires: ".$this->gmt_string(time() + $this->max_age));
	}

	function not_modified_since(){
		$headers = apache_request_headers();
		$if_modified_since = preg_replace('/;.*$/', '', $headers['If-Modified-Since']);
		if ($if_modified_since){
			clearstatcache();
			$filetime = @filemtime($this->temp_path.$this->basename.".".$this->formato);

			if (strtotime($if_modified_since) >= $filetime){
				header("HTTP/1.1 304 Not Modified");
				exit;
			}else{
				header("Last-Modified: ".$this->gmt_string($filetime));
			}
		}
	}

	function gmt_string($tiempo){ return (gmdate("D, d M Y H:i:s", $tiempo) . " GMT"); }

	function hex2gd($color) {
		return imagecolorallocate($this->grafico, 
				hexdec($color{0}.$color{1}),
				hexdec($color{2}.$color{3}), 
				hexdec($color{4}.$color{5}));
	}

	function SetX($xdata, $color = null, $fuente = null, $tam = null){ 
		if ($color) $this->color_ejey = $color;
		if ($fuente) $this->fuente_ejex = $fuente;
		if ($tam) $this->tamejextext = $tam;
		$this->xdata = $xdata; 
	}

	function SetTitulo($titulo, $color = null, $fuente = null, $tam = null){
		if ($color) $this->color_titulo = $color;
		if ($fuente) $this->fuente_titulo = $fuente;
		if ($tam) $this->tam_titulo = $tam;
		$this->titulo = $titulo;
	}

	function AddY($ydata, $color){
		$this->ydata[] = $ydata;
		$this->color_grafico[] = $color;
	}

	function flattenArray($array) {
		$flatArray = array();
		foreach( $array as $subElement ) {
			if(is_array($subElement)) $flatArray = array_merge($flatArray, $this->flattenArray($subElement));
			else $flatArray[] = $subElement;
		}
		return $flatArray;
	}

	function dibujar($formato = null){
		if ($formato) $this->formato = $formato;

		$this->not_modified_since();
		$this->cache_valida();
		$file = $this->temp_path.$this->basename.".".$this->formato;
		header("Content-Type: image/".$this->formato);

		// Color de fondo
		$this->hex2gd($this->color_fondo);

		// Eje X
		$inicioejex = $this->margen_izq - 40;
		for ($i = 0; $i < count($this->xdata); $i++) {
			// En la linea siguiente el 37 son los grados de inclinacion (no es aconsejable cambiarlo)
			imagettftext($this->grafico, 
				$this->tamejextext, 37, 
				$inicioejex - 15, 
				$this->alto - $this->margen_inf + 60, 
				$this->hex2gd($this->color_ejex), 
				$this->fuente_ejex, 
				$this->xdata[$i]);
			// Lineas verticales del eje x
			imageline($this->grafico, 
				$this->margen_izq + $inicioejex - ($this->margen_izq - 40), 
				$this->alto - $this->margen_inf, 
				$this->margen_izq + $inicioejex - ($this->margen_izq - 40), 
				$this->alto - $this->margen_inf - 5, 
				$this->hex2gd($this->rectangulo2_color)); 
			$inicioejex = $inicioejex + ((($this->ancho - $this->margen_der) - $this->margen_izq) / (count($this->xdata) - 1));
		}

		// Eje Y
		$ydata = $this->flattenArray($this->ydata);
		$maxy = max($ydata);
		$miny = min($ydata);

		// Ajuste de las cantidades en las divisiones horizontales. Las cantidades son
		// totalmente arbitrarias y elegidas por cuestion estetica
		if (($maxy - $miny) <= 10) $multiplos = 1;
		elseif (($maxy - $miny) <= 1000) $multiplos = 5;
		elseif (($maxy - $miny) <= 10000) $multiplos = 50;
		elseif (($maxy - $miny) <= 100000) $multiplos = 100;
		else $multiplos = 1000;

		$maxyround = ceil(($maxy + $multiplos) / $multiplos) * $multiplos;
		$minyround = floor(($miny - $multiplos) / $multiplos) * $multiplos;

		$this->divisiones = $this->divisiones + 1;
		$dify = abs($maxy - $miny);
		$difyround = abs($maxyround - $minyround);

		// Ajuste del numero de divisiones horizontales
		$exito = false;
		while($this->divisiones >= 2 && !$exito){
			$divy = $difyround / $this->divisiones;
			$divy = ceil($divy / $multiplos) * $multiplos;

			if ((($minyround - ($maxyround - ($divy * $this->divisiones))) / $divy) >= 1) $this->divisiones--; else $exito = true;
		}

		// Correccion del valor minimo del ejeY para ajustarlo al redondeo
		$minyround = $maxyround - ($divy * $this->divisiones);
		$difyround = abs($maxyround - $minyround);

		$barrav = $this->alto - $this->margen_inf - $this->margen_sup;
		$inicioejey = $this->margen_sup;
		$dato = $maxyround;
		for ($i = 0; $i <= $this->divisiones; $i++) {
			if ($i != 0 && $i != $this->divisiones) {
				imageline($this->grafico, 
					$this->margen_izq, 
					$inicioejey, 
					$this->margen_izq + 5, 
					$inicioejey, 
					$this->hex2gd($this->rectangulo2_color));
				imageline($this->grafico, 
					$this->margen_izq + 6, 
					$inicioejey, 
					$this->ancho - $this->margen_der - 1, 
					$inicioejey, 
					$this->hex2gd($this->lineas_hor_color));
			}
			imagestring($this->grafico, 
				$this->tam_ejey, 
				$this->margen_izq - 5 - (strlen($dato) * imagefontwidth($this->tam_ejey)), 
				$inicioejey - (imagefontheight($this->tam_ejey) / 2), 
				$dato, 
				$this->hex2gd($this->color_ejey));
			$dato = $dato - $divy;
			$inicioejey = $inicioejey + (($this->alto - $this->margen_inf - $this->margen_sup) / $this->divisiones);
		}

		// Lineas de datos
		for($i = 0; $i < count($this->ydata); $i++){
			$inicioejex = $this->margen_izq;
			for ($j = 0; $j < count($this->xdata) - 1; $j++) {
				$valorejeypix = ($this->alto - $this->margen_inf) - (($this->ydata[$i][$j] - $minyround) * $barrav / $difyround);
				$valorejeypix2 = ($this->alto - $this->margen_inf) - (($this->ydata[$i][$j+1] - $minyround) * $barrav / $difyround);
				imageline($this->grafico, 
						$inicioejex, 
						$valorejeypix, 
						$inicioejex + (($this->ancho - $this->margen_izq - $this->margen_der) / (count($this->xdata) - 1)), 
						$valorejeypix2, 
						$this->hex2gd($this->color_grafico[$i]));
				$inicioejex = $inicioejex + (($this->ancho - $this->margen_izq - $this->margen_der) / (count($this->xdata) - 1));
			}
		}

		// Rectangulo principal para bordear la imagen
		imagerectangle($this->grafico, 
			0, 
			0, 
			$this->ancho - 1, 
			$this->alto - 1, 
			$this->hex2gd($this->rectangulo_color));
		// Rectangulo donde van las estadisticas
		imagerectangle($this->grafico, 
			$this->margen_izq, 
			$this->margen_sup, 
			$this->ancho - $this->margen_der, 
			$this->alto - $this->margen_inf, 
			$this->hex2gd($this->rectangulo2_color));

		// Titulo
		$box = imagettfbbox($this->tam_titulo, 
				0, 
				$this->fuente_titulo, 
				$this->titulo);
		imagettftext($this->grafico, 
				$this->tam_titulo, 
				0, 
				($this->ancho / 2) - (abs($box[4] - $box[0]) / 2), 
				$this->tam_titulo + $this->margensup_titulo, 
				$this->hex2gd($this->color_titulo), 
				$this->fuente_titulo, 
				$this->titulo);

		// Salida a fichero y redireccion por salida estandar
		$funcionimage = 'image'.$this->formato;
		if ($this->max_age > 0){
			$funcionimage($this->grafico, $file);
			readfile($file);
		}else $funcionimage($this->grafico);
		imagedestroy($this->grafico);
	}
}
?>
