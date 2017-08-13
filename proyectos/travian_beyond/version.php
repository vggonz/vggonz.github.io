<?php
require_once("tb.php");
$keys = array_keys($versiones);
$version = $keys[0];

header ("Content-type: image/png");
$font_type = "../travian_world/verdanab.ttf";
$string_info = imagettfbbox(10, 0, $font_type, $version);
$handle = imagecreate ($string_info[2], 15) or die ("Cannot Create image"); 
$bg_color = imagecolorallocate ($handle, 255, 255, 255); 
$txt_color = imagecolorallocate ($handle, 0, 0, 0); 
imagettftext ($handle, 10, 0, 0, 12, $txt_color, $font_type, $version); 
imagepng($handle);
imagedestroy($handle);
?>
