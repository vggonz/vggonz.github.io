<?php 
require_once("tb.php"); 
$a = array_keys($versiones);
$last = $a[0];
//function starts_with ($inputString, $startsWith){ return (substr ($inputString, 0, strlen($startsWith)) == $startsWith); }
//foreach($a as $b) if (starts_with($b, "1")){ $last_v1 = $b; break; }
//foreach($a as $b) if (starts_with($b, "2")){ $last_v2 = $b; break; }

$adsense = '<script type="text/javascript"><!--
google_ad_client = "pub-3452115484472483";
google_ad_width = 468;
google_ad_height = 15;
google_ad_format = "468x15_0ads_al_s";
//2006-12-13: Travian Beyond
google_ad_channel = "2626922895";
google_color_border = "000000";
google_color_bg = "e4f3ba";
google_color_link = "006600";
google_color_text = "000000";
google_color_url = "008000";
//--></script>
<script type="text/javascript"
  src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>';

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<title>denibol.com :: Travian Beyond</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script>
                <script type="text/javascript">
                        _uacct = "UA-88863-1";
                        urchinTracker();
                </script>
	</head>

	<body>
		<table width="39%" border="0" align="center" cellpadding="0" cellspacing="0">
			<tr><td><img src="img/header.jpg"/></td></tr>
			<tr><td valign="top" background="img/cuerpo.jpg">
				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
					<tr><td><div align="center"><img src="img/deco.jpg"/></div></td></tr>
					<tr><td>
						<p><strong>Este script proporciona nuevas funcionalidades y comodidades al juego de navegador <a href="http://www.travian.net">Travian</a>:</strong></p>
						<ul><?php foreach($features as $feature) print("<li>$feature</li>"); ?></ul>
					<td></tr>
					<tr><td>
						<p class="style1">Noticias:</p>
						<ul>
						<?php foreach($noticias as $noticia) print("<li><b>".$noticia[0]."</b>: ".$noticia[1]."</li>"); ?>
						</ul>
					</td></tr>
					<tr><td align="center">
						<table width="90%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td>
									<!--div align="center">Travian Beyond v<?=$last?></div-->
									<div align="center">Travian Beyond</div>
								</td>
							</tr>
							<tr>
								<td><div align="center">
									<!--a href="travian3.user.js"><img src="img/descarga.jpg" border="0"/></a-->
									<a href="http://userscripts.org/scripts/show/28129"><img src="img/descarga.jpg" border="0"/></a>
								</div></td>
							</tr>
							<tr align="center"><td colspan="2"><?=$adsense?></td></tr>
						</table>
					</td></tr>
					<tr><td>
						<p class="style1">Lista de cambios (Changelog):</p>
						<ul><?php $i = 0; foreach($versiones as $version => $data){ 
								if ($i++ >= 6) break;
								print("<li>".$version." (".$data[0].")<ul>");
								foreach($data[1] as $change) print("<li>$change</li>");
								print("</ul></li>");
							}
							?></ul>
					</td></tr>
				</table>
			</td></tr>
			<tr><td><img src="img/down.jpg"/></td></tr>
		</table>
	</body>
</html>
