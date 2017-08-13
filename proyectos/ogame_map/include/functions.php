<?php

function start_table($number, $page) {
	$entries_per_page = $_REQUEST["entries"];

	$to = ($page * $entries_per_page < $number) ? $page * $entries_per_page : $number;
	echo '<table width="95%" border="0" cellspacing="2" cellpadding="0" align="center">';
	if ($number > $entries_per_page){
		echo "<tr class=\"firstcolor\"><td colspan=\"10\" align=\"center\">";
		draw_pagenumbers($page, $number, $entries_per_page, $_SERVER['REQUEST_URI'], "page");
		echo "</td></tr>";
	}
	echo "<tr><td align=\"center\" class=\"tblhead\" colspan=\"10\">Resultados: ".(($page - 1) * $entries_per_page + 1)."-".$to." de $number</td></tr>\n";
	echo'
		<tr>
		<td align="center" class="tblhead">Direccion</td>
		<td align="center" class="tblhead">Luna</td>
		<td align="center" class="tblhead">Planeta</td>
		<td align="center" class="tblhead">Jugador</td>
		<td align="center" class="tblhead">Alianza</td>
		<td align="center" class="tblhead">Fecha</td>
		</tr>';
}

function end_table($number, $page) {
	$entries_per_page = $_REQUEST["entries"];

	if ($number > $entries_per_page){
		echo "<tr class=\"firstcolor\"><td colspan=\"10\" align=\"center\">";
		draw_pagenumbers($page, $number, $entries_per_page, $_SERVER['REQUEST_URI'], "page");
		echo "</td></tr>";
	}
	echo "</table>";
}

function display_result($resultado){

	if ($resultado["luna"] > 0) {
		$luna = "Si";
		$luna_alt = number_format($resultado["luna"],0,",",".")." km";
	}else{
		$luna = "&nbsp;";
		$luna_alt = "&nbsp;";
	}

	if ($resultado["inactivo"] == 1) $inactivo = "<tr><td><b>Inactivo</b>: Si</td></tr>";
	if ($resultado["muy_inactivo"] == 1) $muy_inactivo = "<tr><td><b>Muy Inactivo</b>: Si</td></tr>";
	if ($resultado["vacaciones"] == 1) $vacaciones = "<tr><td><b>Vacaciones</b>: Si</td></tr>";
	if ($resultado["suspendido"] == 1) $suspendido = "<tr><td><b>Suspendido</b>: Si</td></tr>";
	if ($resultado["alianza_url"] != '') $alianza_url = "<tr><td><a href=\'".$resultado["alianza_url"]."\' target=\'_new\'>Página principal de la alianza</a></td></tr>";
	if ($resultado["alianza_ranking"] != 0) $alianza_ranking = "<tr><td><b>Ranking</b>: ".$resultado["alianza_ranking"]."</td></tr>";
	if ($resultado["jugador_ranking"] != 0) $jugador_ranking = "<tr><td><b>Ranking</b>: ".$resultado["jugador_ranking"]."</td></tr>";

	echo"
		<tr class=\"firstcolor\">
		<td width=\"100\" align=\"center\"><div class=\"resultlink\"><nobr>".$resultado["galaxia"].":".$resultado["sistema"].":".$resultado["planeta"]."</nobr></div></td>
		<td align=\"center\" title=\"".$luna_alt."\">".$luna."</td>
		<td align=\"center\"><nobr>".$resultado["nombre_planeta"]."</nobr></td>
		<td align=\"center\"><a style=\"cursor:pointer\" onmouseover=\"this.T_WIDTH=200;this.T_OFFSETX=-20;this.T_OFFSETY=-30;this.T_STICKY=true;this.T_TEMP=5000;return escape('<table width=\'190\'><tr><td class=\'c\'>Jugador ".$resultado["jugador_nombre"]."</td></tr><th><table>$jugador_ranking $inactivo $muy_inactivo $vacaciones $suspendido</table></th></table>');\">".$resultado["jugador_nombre"]."</a></td>
		<td align=\"center\"><a style=\"cursor:pointer\" onmouseover=\"this.T_WIDTH=250;this.T_OFFSETX=-30;this.T_OFFSETY=-30;this.T_STICKY=true;this.T_TEMP=5000;return escape('<table width=\'240\'><tr><td class=\'c\'>Alianza ".$resultado["alianza_nombre"]."</td></tr><th><table>$alianza_ranking<tr><td><b>Miembros</b>: ".$resultado["alianza_miembros"]."</td></tr>$alianza_url</table></th></table>');\">".$resultado["alianza_nombre"]."</a></td>
		<td align=\"center\">".$resultado["timestamp"]."</td>
		</tr>\n";
}

function draw_pagenumbers($startpage, $entries, $entries_per_page, $page_uri, $varname) {
	$startpage = intval($startpage);
	$entries   = intval($entries);

	if ($entries_per_page <= 0) $entries_per_page = 25;

	$last = $entries % $entries_per_page;
	$max_page =  (int)($entries / $entries_per_page);
	if ($last > 0) $max_page++;
	$prepages = $startpage-1;
	if ($prepages > 5) $prepages = 5;
	$followpages = 10-1-$prepages;
	if ($followpages > 9) $followpages = 9;
	if (($followpages + $startpage) > $max_page) $followpages = $max_page - $startpage;
	if (($prepages + $followpages + 1) < $max_page) $prepages = 10 - $followpages - 1;
	if ($prepages >= $startpage) $prepages = $startpage - 1;

	$endpage = $startpage + $followpages;
	$urlbind = strpos($page_uri, "?");
	if ($urlbind === FALSE) $urlbind = "?";
	else $urlbind = "&";
	$page_uri = str_replace($urlbind.$varname."=".$startpage, "", $page_uri);

	if ((($startpage - 10) <= 0) && ($startpage > 2)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=1\">&lt;&lt;</a>&nbsp;";
	elseif ((($startpage - 10) > 0)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage-10)."\">&lt;&lt;</a>&nbsp;";
	if ($startpage > 1) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage-1)."\">&lt;</a>&nbsp;";

	$pagenumber = $startpage - $prepages;
	while ($pagenumber <= $endpage) {
		if ($pagenumber != $startpage) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".$pagenumber."\">$pagenumber</a>&nbsp;";
		else echo "<span class=\"currentpage\">".$pagenumber."&nbsp;</span>";
		$pagenumber++;
	}

	if ($startpage < $max_page) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage+1)."\">&gt;</a>&nbsp;";
	if ((($startpage + 10) >= $max_page) && ($startpage+1 < $max_page)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".$max_page."\">&gt;&gt;</a>&nbsp;";
	elseif ((($startpage + 10) < $max_page)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage+10)."\">&gt;&gt;</a>&nbsp;";
}

?>
