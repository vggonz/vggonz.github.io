<?php
putenv('GDFONTPATH='.realpath('.'));
function hex2gd($im, $color) {
	return imagecolorallocate($im,
        	hexdec($color{0}.$color{1}),
                hexdec($color{2}.$color{3}),
                hexdec($color{4}.$color{5}));
}

$im = imagecreate(300, 200);
hex2gd($im, "FFFFFF");
$x = 50;
$texto = array("Por problemas tecnicos, queda", "temporalmente suspendido el", "servicio para el servidor", "s3.travian.net");
foreach($texto as $frase) imagettftext($im, 12, 0, 5, $x += 20, hex2gd($im, "71CC00"), "verdanab.ttf", $frase);
header("Content-type: image/png");
imagepng($im);
imagedestroy($im);
?>
