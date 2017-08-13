<?php

function start_table($number, $page) {
        $entries_per_page = $_REQUEST["entries"];

        $to = ($page * $entries_per_page < $number) ? $page * $entries_per_page : $number;
        echo '<table width="95%" border="0" cellspacing="2" cellpadding="0" align="center" class="tbg">';
        if ($number > $entries_per_page){
        	echo '<tr class="cbg1"><td colspan="6" align="center">';
		draw_pagenumbers($page, $number, $entries_per_page, $_SERVER['REQUEST_URI'], "page");
        	echo '</td></tr>';
	}
        echo '<tr class="cbg1"><td align="center" colspan="6">Resultados: '.(($page - 1) * $entries_per_page + 1)."-".$to." de $number</td></tr>";
        echo '<tr class="cbg1">
		<td align="center">Coordenadas</td>
		<td align="center">Jugador</td>
		<td align="center">Aldea</td>
		<td align="center">Habitantes</td>
		<td align="center">Alianza</td>
		<td align="center">Acciones</td>
	</tr>';
}

function end_table($number, $page) {
        $entries_per_page = $_REQUEST["entries"];

        if ($number > $entries_per_page){
        	echo '<tr class="cbg1"><td colspan="6" align="center">';
		draw_pagenumbers($page, $number, $entries_per_page, $_SERVER['REQUEST_URI'], "page");
	        echo "</td></tr>";
	}
        echo "</table>";
}

function display_result($resultado){
	global $servidor;
         echo '
           <tr>
            <td width="100" align="center"><nobr><a target="_blank" href="http://'.$servidor.'/karte.php?z='.$resultado["id"].'">'.$resultado["x"].', '.$resultado["y"].'</a></nobr></td>
            <td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/spieler.php?uid='.$resultado["uid"].'">'.$resultado["spieler"].'</a></nobr></td>
            <td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/karte.php?d='.$resultado["id"].'">'.$resultado["dorfname"].'</a></nobr></td>
	    <td align="center">'.$resultado["einwohner"].'</td>
	    <td align="center"><nobr><a target="_blank" href="http://'.$servidor.'/allianz.php?aid='.$resultado["aid"].'">'.$resultado["allianz"].'</a></nobr></td>
	    <td align="center"><a target="_blank" href="http://'.$servidor.'/nachrichten.php?t=1&id='.$resultado["uid"].'">Enviar IGM</a> / <a target="_blank" href="http://'.$servidor.'/a2b.php?z='.$resultado["id"].'">Atacar</a> / <a target="_blank" href="http://'.$servidor.'/build.php?ze='.$resultado["id"].'&gid=17">Comerciar</a></td>
           </tr>';
}

function draw_pagenumbers($startpage, $entries, $entries_per_page, $page_uri, $varname) {
	$startpage = intval($startpage);
	$entries   = intval($entries);

	if ($entries_per_page <= 0) $entries_per_page = 25;

	$last = $entries % $entries_per_page;
	$max_page =  (int)($entries / $entries_per_page);
	if ($last > 0) $max_page++;
	$prepages = $startpage - 1;
	if ($prepages > 5) $prepages = 5;
	$followpages = 10 - 1 - $prepages;
	if ($followpages > 9) $followpages = 9;
	if (($followpages + $startpage) > $max_page) $followpages = $max_page - $startpage;
	if (($prepages + $followpages + 1) < $max_page) $prepages = 10 - $followpages - 1;
	if ($prepages >= $startpage) $prepages = $startpage - 1;

	$endpage = $startpage + $followpages;
	$urlbind = strpos($page_uri, "?");
	if ($urlbind === FALSE) $urlbind = "?";
	else $urlbind = "&";
	$page_uri = str_replace($urlbind.$varname."=".$startpage, "", $page_uri);

	if ((($startpage - 10) <= 0) && ($startpage > 2)) echo "<a href=\"".$page_uri.$urlbind.$varname."=1\">&lt;&lt;</a>&nbsp;";
	elseif ((($startpage - 10) > 0)) echo "<a href=\"".$page_uri.$urlbind.$varname."=".($startpage-10)."\">&lt;&lt;</a>&nbsp;";
	if ($startpage > 1) echo "<a href=\"".$page_uri.$urlbind.$varname."=".($startpage-1)."\">&lt;</a>&nbsp;";

	$pagenumber = $startpage - $prepages;
	while ($pagenumber <= $endpage) {
		if ($pagenumber != $startpage) echo "<a href=\"".$page_uri.$urlbind.$varname."=".$pagenumber."\">$pagenumber</a>&nbsp;";
		else echo "<span>".$pagenumber."&nbsp;</span>";
		$pagenumber++;
	}

	if ($startpage < $max_page) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage+1)."\">&gt;</a>&nbsp;";
	if ((($startpage + 10) >= $max_page) && ($startpage+1 < $max_page)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".$max_page."\">&gt;&gt;</a>&nbsp;";
        elseif ((($startpage + 10) < $max_page)) echo "<a class=\"pagelink\" href=\"".$page_uri.$urlbind.$varname."=".($startpage+10)."\">&gt;&gt;</a>&nbsp;";
}

?>
