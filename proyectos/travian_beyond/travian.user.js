// ==UserScript==
// @name Travian Beyond
// @author Victor Garcia (aka Croc)
// @include http://*.travian.*/*.php*
// @exclude http://*.travian.*/hilfe.php*
// @exclude http://*.travian.*/log*.php*
// @exclude http://*.travian.*/index.php*
// @exclude http://*.travian.*/anleitung.php*
// @exclude http://*.travian.*/impressum.php*
// @exclude http://*.travian.*/anmelden.php*
// @exclude http://*.travian.*/gutscheine.php*
// @exclude http://*.travian.*/spielregeln.php*
// @exclude http://*.travian.*/links.php*
// @exclude http://*.travian.*/geschichte.php*
// @exclude http://*.travian.*/tutorial.php*
// @exclude http://*.travian.*/ad/*
// @exclude http://*.travian.*/chat/*
// @exclude http://forum.travian.*
// @exclude http://shop.travian.*
// @version 1.10e
// @description  Enables some Travian features
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

// Funcion principal ejecutada cuando se ha cargado toda la pagina
function funcionPrincipal(e){

	var lang_es = new Array();
	lang_es['ALIANZA'] 	= 'Alianza';
	lang_es['PERFIL'] 	= 'Perfil';
	lang_es['SIM'] 		= 'Simulador';
	lang_es['CALC'] 	= 'Calculadora';
	lang_es['SEGURO'] 	= 'Estas seguro?';
	lang_es['MARK'] 	= 'Marcar Todos';
	lang_es['PERDIDAS'] 	= 'P&eacute;rdidas en materiales';
	lang_es['RENT'] 	= 'Rentabilidad';
	lang_es['SUBIR_NIVEL'] 	= 'Ya puedes subirlo de nivel';
	lang_es['JUGADOR'] 	= 'Jugador';
	lang_es['ALDEA'] 	= 'Aldea';
	lang_es['HAB'] 		= 'Habitantes';
	lang_es['COORD'] 	= 'Coordenadas';
	lang_es['ACCION'] 	= 'Acciones';
	lang_es['ATACAR'] 	= 'Atacar';
	lang_es['COMERCIAR'] 	= 'Comerciar';
	lang_es['GUARDADO'] 	= 'Guardado';
	lang_es['DESP_ABR'] 	= 'Desp.';
	lang_es['FALTA'] 	= 'Falta';
	lang_es['HOY'] 		= 'hoy';
	lang_es['MANYANA'] 	= 'ma&ntilde;ana';
	lang_es['PAS_MANYANA'] 	= 'pasado ma&ntilde;ana';
	lang_es['MERCADO']	= 'Mercado';
	lang_es['CUARTEL']	= 'Cuartel';
	lang_es['PUNTO']	= 'Punto de encuentro';
	lang_es['CORRAL']	= 'Corral de caballeria';
	lang_es['TALLER']	= 'Taller';
	lang_es['ENVIAR']	= 'Enviar materias primas';
	lang_es['COMPRAR']	= 'Comprar materias primas';
	lang_es['VENDER']	= 'Vender materias primas';
	lang_es['ENVIAR_IGM']	= 'Enviar IGM';
	lang_es['LISTO']	= 'Todo listo';
	lang_es['EL']		= 'el';
	lang_es['A_LAS']	= 'a las';
	lang_es['SOLAR']	= 'Solar';
	lang_es['EFICIENCIA']	= 'Eficiencia';
	lang_es['NUNCA']	= 'Nunca';
	lang_es['PC']		= 'punto(s) de cultura';
	lang_es['FUNDAR']	= 'Ya puedes fundar o conquistar';
	lang_es['ALDEAS']	= 'aldea(s)';
	lang_es['TROPAS']	= 'Enviar Tropas';
	lang_es['RECURSO1']	= 'Le&ntilde;a';
	lang_es['RECURSO2']	= 'Barro';
	lang_es['RECURSO3']	= 'Hierro';
	lang_es['RECURSO4']	= 'Cereales';
	lang_es['TIEMPO']	= 'Tiempo';
	lang_es['COMP']		= 'Compactador';
	lang_es['STAT']		= 'Estad&iacute;stica';
	lang_es['OFREZCO']	= 'Ofrezco';
	lang_es['BUSCO']	= 'Busco';
	lang_es['TIPO']		= 'Tipo';
	lang_es['CUALQUIERA']	= 'Cualquiera';
	lang_es['DETALLES']	= 'Detalles';
	lang_es['MAP_EXT']	= 'Mapa extendido';
        lang_es['DISPONIBLE']   = 'S&oacute;lo disponibles';
        lang_es['SI']           = 'S&iacute;';
        lang_es['NO']           = 'No';
        lang_es['MARCADORES']   = 'Marcadores';
        lang_es['ANYADIR']      = 'A&ntilde;adir';
        lang_es['ENLACE']       = 'Direccion del nuevo marcador';
        lang_es['TEXTO']        = 'Texto para el nuevo marcador';
	lang_es['ELIMINAR']	= 'Eliminar';

	// Por IcEye y Andres_age
	var lang_en = new Array();
	lang_en['ALIANZA'] 	= 'Alliance';
	lang_en['PERFIL'] 	= 'User Profile';
	lang_en['SIM'] 		= 'Combat simulator';
	lang_en['CALC'] 	= 'Travian Calc';
	lang_en['SEGURO'] 	= 'Are you sure?';
	lang_en['MARK'] 	= 'Select all';
	lang_en['PERDIDAS'] 	= 'Loss';
	lang_en['RENT'] 	= 'Profit';
	lang_en['SUBIR_NIVEL'] 	= 'Extension available';
	lang_en['JUGADOR'] 	= 'Player';
	lang_en['ALDEA'] 	= 'Village Name';
	lang_en['HAB'] 		= 'Population';
	lang_en['COORD'] 	= 'Coords';
	lang_en['ACCION'] 	= 'Actions';
	lang_en['ATACAR'] 	= 'Attack';
	lang_en['COMERCIAR'] 	= 'Send resources';
	lang_en['GUARDADO'] 	= 'Saved';
	lang_en['DESP_ABR'] 	= 'Mov.';
	lang_en['FALTA'] 	= 'You need';
	lang_en['HOY'] 		= 'today';
	lang_en['MANYANA'] 	= 'tomorrow';
	lang_en['PAS_MANYANA'] 	= 'day after tomorrow';
	lang_en['MERCADO'] 	= 'Marketplace';
	lang_en['CUARTEL'] 	= 'Barracks';
	lang_en['PUNTO'] 	= 'Rally point';
	lang_en['CORRAL'] 	= 'Stable';
	lang_en['TALLER'] 	= 'Workshop';
	lang_en['ENVIAR'] 	= 'Send resources';
	lang_en['COMPRAR'] 	= 'Buy';
	lang_en['VENDER'] 	= 'Sell';
	lang_en['ENVIAR_IGM'] 	= 'Send IGM';
	lang_en['LISTO'] 	= 'Extension available';
	lang_en['EL'] 		= 'on';
	lang_en['A_LAS'] 	= 'at';
	lang_en['SOLAR'] 	= 'Buildingplace';
	lang_en['EFICIENCIA'] 	= 'Efficiency'; 
	lang_en['NUNCA']	= 'Never';
	lang_en['PC']           = 'culture points';
	lang_en['FUNDAR']       = 'You can found or conquer a new village';
	lang_en['ALDEAS']       = 'Village(s)';
	lang_en['TROPAS']       = 'Send troops';
	lang_en['RECURSO1']     = 'Wood';
	lang_en['RECURSO2']     = 'Clay';
	lang_en['RECURSO3']     = 'Iron';
	lang_en['RECURSO4']     = 'Crop';
	lang_en['TIEMPO']       = 'Time';
	lang_en['COMP']         = 'Report Compressor';
	lang_en['STAT']		= 'Statistic';
	lang_en['CUALQUIERA']	= 'Any';
        lang_en['SI']           = 'Yes';
        lang_en['NO']           = 'No';
        lang_en['MARCADORES']   = 'Bookmarks';
        lang_en['ANYADIR']      = 'Add';
        lang_en['ENLACE']       = 'New Bookmark URL';
        lang_en['TEXTO']        = 'New Bookmark Text';
	lang_en['ELIMINAR']	= 'Delete';

	// Por IcEye
	var lang_it = new Array();
	lang_it['ALIANZA'] 	= 'Alleanza';
	lang_it['PERFIL'] 	= 'Profilo';
	lang_it['SIM'] 		= 'Combat simulator';
	lang_it['CALC'] 	= 'Travian Calc';
	lang_it['SEGURO'] 	= 'Sei sicuro?';
	lang_it['MARK'] 	= 'Seleziona tutto';
	lang_it['PERDIDAS'] 	= 'Perdita in materiale';
	lang_it['RENT'] 	= 'Guadagno';
	lang_it['SUBIR_NIVEL'] 	= 'Ampliamento disponibile';
	lang_it['JUGADOR'] 	= 'Proprietario';
	lang_it['ALDEA'] 	= 'Nome villaggio';
	lang_it['HAB'] 		= 'Popolazione';
	lang_it['COORD'] 	= 'Coorinate';
	lang_it['ACCION'] 	= 'Azioni';
	lang_it['ATACAR'] 	= 'Invia truppe';
	lang_it['COMERCIAR'] 	= 'Invia mercanti';
	lang_it['GUARDADO'] 	= 'Guardado';	// FIXME?
	lang_it['DESP_ABR'] 	= 'Desp.';	// FIXME?
	lang_it['FALTA'] 	= 'Mancano';
	lang_it['HOY'] 		= 'oggi';
	lang_it['MANYANA'] 	= 'domani';
	lang_it['PAS_MANYANA'] 	= 'dopodomani';
	lang_it['MERCADO'] 	= 'Mercato';
	lang_it['CUARTEL'] 	= 'Campo d&quot; addestramento';
	lang_it['PUNTO'] 	= 'Caserma';
	lang_it['CORRAL'] 	= 'Scuderia';
	lang_it['TALLER'] 	= 'Officina';
	lang_it['ENVIAR'] 	= 'Invia risorse';
	lang_it['COMPRAR'] 	= 'Compra risorse';
	lang_it['VENDER'] 	= 'Vendi risorse';
	lang_it['ENVIAR_IGM'] 	= 'Invia messaggio';
	lang_it['LISTO'] 	= 'Ampliamento disponibile';
	lang_it['EL'] 		= 'il';
	lang_it['A_LAS'] 	= 'alle';
	lang_it['SOLAR'] 	= 'Solar'; // FIXME?
	lang_it['EFICIENCIA'] 	= 'Efficienza';

	// Autor anonimo a peticion expresa
	var lang_de = new Array();
	lang_de['ALIANZA'] 	= 'Allianz';
	lang_de['PERFIL'] 	= 'Profil';
	lang_de['SIM'] 		= 'Kampfsimulator';
	lang_de['CALC'] 	= 'Marktplatzrechner';
	lang_de['SEGURO'] 	= 'Wirklich?';
	lang_de['MARK'] 	= 'Alle';
	lang_de['PERDIDAS'] 	= 'Rohstoff-Verluste';
	lang_de['RENT'] 	= 'Rentabilit&auml;t';
	lang_de['SUBIR_NIVEL'] 	= 'Ausbau m&ouml;glich';
	lang_de['JUGADOR'] 	= 'Spieler';
	lang_de['ALDEA'] 	= 'Dorf';
	lang_de['HAB'] 		= 'Einwohner';
	lang_de['COORD'] 	= 'Koordinaten';
	lang_de['ACCION'] 	= 'Aktion';
	lang_de['ATACAR'] 	= 'Angreifen';
	lang_de['COMERCIAR'] 	= 'Hýndler schicken';
	lang_de['GUARDADO'] 	= 'Gespeichert';
	lang_de['DESP_ABR'] 	= 'Felder';
	lang_de['FALTA'] 	= 'Ben&ouml;tige';
	lang_de['HOY'] 		= 'heute';
	lang_de['MANYANA'] 	= 'morgen';
	lang_de['PAS_MANYANA'] 	= '&uuml;bermorgen';
	lang_de['MERCADO'] 	= 'Marktplatz';
	lang_de['CUARTEL'] 	= 'Kaserne';
	lang_de['PUNTO'] 	= 'Versammlungsplatz';
	lang_de['CORRAL'] 	= 'Stall';
	lang_de['TALLER'] 	= 'Werkstatt';
	lang_de['ENVIAR'] 	= 'Marktplatz';
	lang_de['COMPRAR'] 	= 'Kaufen';
	lang_de['VENDER'] 	= 'Verkaufen';
	lang_de['ENVIAR_IGM'] 	= 'IGM schreiben';
	lang_de['LISTO'] 	= 'Genug';
	lang_de['EL'] 		= '';
	lang_de['A_LAS'] 	= 'um';
	lang_de['SOLAR'] 	= 'Bauplatz';
	lang_de['EFICIENCIA'] 	= 'Effektivit&auml;t';
	lang_de['NUNCA'] 	= 'Nie';
	lang_de['PC'] 		= 'Kulturpunkte';
	lang_de['FUNDAR'] 	= 'Genug Kulturpunkte für';
	lang_de['ALDEAS'] 	= 'weitere Siedlung(en)';
	lang_de['TROPAS'] 	= 'Truppen senden';
	lang_de['RECURSO1'] 	= 'Lehm';
	lang_de['RECURSO2'] 	= 'Holz';
	lang_de['RECURSO3'] 	= 'Eisen';
	lang_de['RECURSO4'] 	= 'Getreide';
	lang_de['TIEMPO'] 	= 'Zeit';
	lang_de['COMP'] 	= 'KB 2 BBCode';

	// Por Ferran -=(Killo)=- (ampliado y corregido por Prometeus)
	var lang_fr = new Array(); 
	lang_fr['ALIANZA'] 	= 'Alliance'; 
	lang_fr['PERFIL'] 	= 'Profil'; 
	lang_fr['SIM'] 		= 'Simulateur'; 
	lang_fr['CALC'] 	= 'Calculateur'; 
	lang_fr['SEGURO'] 	= 'Es-tu s&ucirc;r?'; 
	lang_fr['MARK'] 	= 'Marquer tous'; 
	lang_fr['PERDIDAS'] 	= 'Pertes en mat&eacute;riels'; 
	lang_fr['RENT'] 	= 'Rentabilit&eacute;'; 
	lang_fr['SUBIR_NIVEL'] 	= 'Tu peux d&eacute;j&agrave; augmenter son niveau'; 
	lang_fr['JUGADOR'] 	= 'Joueur'; 
	lang_fr['ALDEA'] 	= 'Village'; 
	lang_fr['HAB'] 		= 'Population'; 
	lang_fr['COORD'] 	= 'Coordonn&eacute;es'; 
	lang_fr['ACCION'] 	= 'Actions'; 
	lang_fr['ATACAR'] 	= 'Attaquer'; 
	lang_fr['COMERCIAR'] 	= 'Commercer'; 
	lang_fr['GUARDADO'] 	= 'Sauvegarde'; 
	lang_fr['DESP_ABR'] 	= 'D&eacute;placer'; 
	lang_fr['FALTA'] 	= 'Il manque'; 
	lang_fr['HOY'] 		= 'aujourd\'hui'; 
	lang_fr['MANYANA'] 	= 'demain'; 
	lang_fr['PAS_MANYANA'] 	= 'apr&egrave;s-demain'; 
	lang_fr['MERCADO'] 	= 'Place du march&eacute;'; 
	lang_fr['CUARTEL'] 	= 'Caserne'; 
	lang_fr['PUNTO'] 	= 'Place de rassemblement'; 
	lang_fr['CORRAL'] 	= 'Ecurie'; 
	lang_fr['TALLER'] 	= 'Atelier'; 
	lang_fr['ENVIAR'] 	= 'Envoyer des ressources'; 
	lang_fr['COMPRAR'] 	= 'Acheter des ressources'; 
	lang_fr['VENDER'] 	= 'Vendre des resources'; 
	lang_fr['ENVIAR_IGM'] 	= 'Envoyer MSG'; 
	lang_fr['LISTO'] 	= 'Pr&ecirc;t'; 
	lang_fr['EL'] 		= 'le'; 
	lang_fr['A_LAS'] 	= '&agrave;'; 
	lang_fr['SOLAR'] 	= 'Emplacement de construction'; 
	lang_fr['EFICIENCIA'] 	= 'Efficacit&eacute;'; 
	lang_fr['NUNCA'] 	= 'Jamais'; 
	lang_fr['PC'] 		= 'point(s) de culture'; 
	lang_fr['FUNDAR'] 	= 'Tu peux d&eacute;j&agrave; coloniser ou conqu&eacute;rir'; 
	lang_fr['ALDEAS'] 	= 'village(s)'; 
	lang_fr['TROPAS'] 	= 'Envoyer unit&eacute;s'; 
	lang_fr['RECURSO1'] 	= 'Bois'; 
	lang_fr['RECURSO2'] 	= 'Terre'; 
	lang_fr['RECURSO3'] 	= 'Fer'; 
	lang_fr['RECURSO4'] 	= 'C&eacute;r&eacute;ales'; 
	lang_fr['TIEMPO'] 	= 'Temps'; 
	lang_fr['COMP'] 	= 'Compresseur';
	lang_fr['STAT']		= 'Statistiques';
	lang_fr['OFREZCO']	= 'Offre';
	lang_fr['BUSCO']	= 'Recherche';
	lang_fr['TIPO']		= 'Type';
	lang_fr['CUALQUIERA']	= 'Toutes';
	lang_fr['DETALLES']	= 'D&eacute;tail';
	lang_fr['MAP_EXT']	= 'Carte etendue';
        lang_fr['DISPONIBLE']   = 'Disponible';
        lang_fr['SI']           = 'Oui';
        lang_fr['NO']           = 'Non';
        lang_fr['MARCADORES']   = 'Liens';
        lang_fr['ANYADIR']      = 'Ajouter';
        lang_fr['ENLACE']       = 'URL du nouveau lien';
        lang_fr['TEXTO']        = 'Texte du nouveau lien';

	// Por autor anonimo
	var lang_nl = new Array(); 
	lang_nl['ALIANZA'] 	= 'Alliantie';
	lang_nl['PERFIL'] 	= 'Speler Profiel';
	lang_nl['SIM'] 		= 'Gevecht simulator';
	lang_nl['CALC'] 	= 'Travian Calc';
	lang_nl['SEGURO'] 	= 'Ben je zeker?';
	lang_nl['MARK'] 	= 'Selecteer alles';
	lang_nl['PERDIDAS'] 	= 'Verlies';
	lang_nl['RENT'] 	= 'Winst';
	lang_nl['SUBIR_NIVEL'] 	= 'Uitbreiding beschikbaar';
	lang_nl['JUGADOR'] 	= 'Speler';
	lang_nl['ALDEA'] 	= 'Dorpsnaam';
	lang_nl['HAB'] 		= 'Populatie';
	lang_nl['COORD'] 	= 'Co&ouml;rd';
	lang_nl['ACCION'] 	= 'Acties';
	lang_nl['ATACAR'] 	= 'Aanvallen';
	lang_nl['COMERCIAR'] 	= 'Stuur handelaren';
	lang_nl['GUARDADO'] 	= 'Bewaard';
	lang_nl['DESP_ABR'] 	= 'Velden';
	lang_nl['FALTA'] 	= 'Nog nodig';
	lang_nl['HOY'] 		= 'vandaag';
	lang_nl['MANYANA'] 	= 'morgen';
	lang_nl['PAS_MANYANA'] 	= 'overmorgen';
	lang_nl['MERCADO'] 	= 'Marktplaats';
	lang_nl['CUARTEL'] 	= 'Barakken';
	lang_nl['PUNTO'] 	= 'Verzamelpunt';
	lang_nl['CORRAL'] 	= 'Stal';
	lang_nl['TALLER'] 	= 'Werkplaats';
	lang_nl['ENVIAR'] 	= 'Stuur handelaren';
	lang_nl['COMPRAR'] 	= 'Koop';
	lang_nl['VENDER'] 	= 'Verkoop';
	lang_nl['ENVIAR_IGM'] 	= 'Stuur IGM';
	lang_nl['LISTO'] 	= 'Uitbreiding beschikbaar';
	lang_nl['EL'] 		= 'om';
	lang_nl['A_LAS'] 	= 'om';
	lang_nl['SOLAR'] 	= 'Bouwplaats';
	lang_nl['EFICIENCIA'] 	= 'Effici&euml;ntie';
	lang_nl['NUNCA'] 	= 'Nooit';
	lang_nl['PC'] 		= 'cultuur punten';
	lang_nl['FUNDAR'] 	= 'Je kan een nieuwe stad oprichten of veroveren';
	lang_nl['ALDEAS'] 	= 'Dorp(en)';
	lang_nl['TROPAS'] 	= 'Stuur troepen';
	lang_nl['RECURSO1'] 	= 'Hout';
	lang_nl['RECURSO2'] 	= 'Klei';
	lang_nl['RECURSO3'] 	= 'Ijzer';
	lang_nl['RECURSO4'] 	= 'Graan';
	lang_nl['TIEMPO'] 	= 'Tijd';
	lang_nl['COMP'] 	= 'Gevechtsverslag Compressor';
	lang_nl['STAT'] 	= 'Statistieken';
	lang_nl['OFREZCO'] 	= 'Bieden';
	lang_nl['BUSCO'] 	= 'Zoeken';
	lang_nl['TIPO'] 	= 'Type';
	lang_nl['CUALQUIERA'] 	= 'Alles';
	lang_nl['DETALLES'] 	= 'Details';
	lang_nl['MAP_EXT'] 	= 'Grotere kaart';

	// Lenyador
	var lenyadorCost = [
		[0, 0, 0, 0],
		[40, 100, 50, 60],
		[65, 165, 85, 100],
		[110, 280, 140, 165],
		[185, 465, 235, 280],
		[310, 780, 390, 465],
		[520, 1300, 650, 780],
		[870, 2170, 1085, 1300],
		[1450, 3625, 1810, 2175],
		[2420, 6050, 3025, 3630],
		[4040, 10105, 5050, 6060],
		];

	// Barrera
	var barroCost = [
		[0, 0, 0, 0],
		[80, 40, 80, 50],
		[135, 65, 135, 85],
		[225, 110, 225, 140],
		[375, 185, 375, 235],
		[620, 310, 620, 390],
		[1040, 520, 1040, 650],
		[1735, 870, 1735, 1085],
		[2900, 1450, 2900, 1810],
		[4840, 2420, 4840, 3025],
		[8080, 4040, 8080, 5050],
		];

	// Mina de hierro
	var hierroCost = [
		[0, 0, 0, 0],
		[100, 80, 30, 60],
		[165, 135, 50, 100],
		[280, 225, 85, 165],
		[465, 375, 140, 280],
		[780, 620, 235, 465],
		[1300, 1040, 390, 780],
		[2170, 1735, 650, 1300],
		[3625, 2900, 1085, 2175],
		[6050, 4840, 1815, 3630],
		[10105, 8080, 3030, 6060],
		];

	// Granja
	var cerealCost = [
		[0, 0, 0, 0],
		[70, 90, 70, 20],
		[115, 150, 115, 35],
		[195, 250, 195, 55],
		[325, 420, 325, 95],
		[545, 700, 545, 155],
		[910, 1170, 910, 260],
		[1520, 1950, 1520, 435],
		[2535, 3260, 2535, 725],
		[4235, 5445, 4235, 1210],
		[7070, 9095, 7070, 2020],
		];

	// Almacen
	var warehouseCost = [
		[0, 0, 0, 0],
		[130,160,90,40],
		[165,205,115,50],
		[215,260,145,65],
		[275,335,190,85],
		[350,430,240,105],
		[445,550,310,135],
		[570,705,395,175],
		[730,900,505,225],
		[935,1115,650,290],
		[1200,1475,830,370],
		[1535,1890,1065,470],
		[1965,2420,1360,605],
		[2515,3095,1740,775],
		[3220,3960,2230,990],
		[4120,5070,2850,1270],
		[5275,6490,3650,1625],
		[6750,8310,4675,2075],
		[8640,10635,5980,2660],
		[11060,13610,7655,3405],
		[14155,17420,9800,4355]
			];

	// Academia
	var academyCost = [
		[0, 0, 0, 0], 			// Level 0
		[220, 160, 90, 40], 		// Level 1
		[280, 205, 115, 50], 		// Level 2
		[360, 260, 145, 65], 		// Level 3
		[460, 335, 190, 85], 		// Level 4
		[590, 430, 240, 105], 		// Level 5
		[755, 550, 310, 135], 		// Level 6
		[970, 705, 395, 175], 		// Level 7
		[1240, 900, 505, 225], 		// Level 8
		[1585, 1155, 650, 290], 	// Level 9
		[2030, 1475, 830, 370], 	// Level 10
		[2595, 1890, 1065, 470], 	// Level 11
		[3325, 2420, 1360, 605], 	// Level 12
		[4255, 3095, 1740, 775], 	// Level 13
		[5445, 3960, 2230, 990], 	// Level 14
		[6970, 5070, 2850, 1270], 	// Level 15
		[8925, 6490, 3650, 1625], 	// Level 16
		[11425, 8310, 4275, 2075], 	// Level 17
		[14620, 10635, 5980, 2660], 	// Level 18
		[18715, 13610, 7655, 3405], 	// Level 19
		[23955, 17420, 9800, 4355] 	// Level 20
			];

	// Molino
	var flourMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],  	// Level 1
		[900, 790, 685, 2230],  	// Level 2
		[1620, 1425, 1230, 4020],  	// Level 3
		[2915, 2565, 2215, 7230], 	// Level 4
		[5250, 4620, 3990, 13015], 	// Level 5
		];

	// Ladrillar
	var brickyardCost = [
		[0, 0, 0, 0], 			// Level 0
		[440, 480, 320, 50],  		// Level 1
		[790, 865, 575, 90],  		// Level 2
		[1425, 1555, 1035, 160],  	// Level 3
		[2565, 2800, 1865, 290], 	// Level 4
		[4620, 5040, 3360, 525], 	// Level 5
		];

	// Serreria
	var sawmillCost = [
		[0, 0, 0, 0], 			// Level 0
		[520, 380, 290, 90],  		// Level 1
		[935, 685, 520, 160],  		// Level 2
		[1685, 1230, 940, 290],  	// Level 3
		[3035, 2215, 1690, 525], 	// Level 4
		[5460, 3990, 3045, 945], 	// Level 5
		];

	// Fundicion de hierro
	var ironFoundryCost = [
		[0, 0, 0, 0], 			// Level 0
		[200, 450, 510, 120],  		// Level 1
		[360, 810, 920, 215],  		// Level 2
		[650, 1460, 1650, 390],  	// Level 3
		[1165, 2625, 2975, 700], 	// Level 4
		[2100, 4725, 5355, 1260], 	// Level 5
		];

	// Panaderia
	var bakeryCost = [
		[0, 0, 0, 0], 			// Level 0
		[1200, 1480, 870, 1600],  	// Level 1
		[2160, 2665, 1565, 2880],  	// Level 2
		[3890, 4795, 2820, 5185],  	// Level 3
		[7000, 8630, 5075, 9330], 	// Level 4
		[12595, 15535, 9135, 16795], 	// Level 5
		];

	// Mercado
	var marketplaceCost = [
		[0, 0, 0, 0], 			// Level 0
		[80, 70, 120, 70], 		// Level 1
		[100, 90, 155, 90], 		// Level 2
		[130, 115, 195, 115], 		// Level 3
		[170, 145, 250, 145], 		// Level 4
		[215, 190, 320, 190], 		// Level 5
		[275, 240, 410, 240], 		// Level 6
		[350, 310, 530, 310], 		// Level 7
		[450, 395, 675, 395], 		// Level 8
		[575, 505, 865, 505], 		// Level 9
		[740, 645, 1105, 645], 		// Level 10
		[945, 825, 1415, 825], 		// Level 11
		[1210, 1060, 1815, 1060], 	// Level 12
		[1545, 1355, 2320, 1355], 	// Level 13
		[1980, 1735, 2970, 1735], 	// Level 14
		[2535, 2220, 3805, 2220], 	// Level 15
		[3245, 2840, 4870, 2840], 	// Level 16
		[4155, 3635, 6230, 3635], 	// Level 17
		[5315, 4650, 7975, 4650], 	// Level 18
		[6805, 5955, 10210, 5955], 	// Level 19
		[8710, 7620, 13065, 7620], 	// Level 20
	];

	// Granero
	var granaryCost = [
		[0, 0, 0, 0],
		[80,100,70,20],
		[100,130,90,25],
		[130,165,115,35],
		[170,210,145,40],
		[215,270,190,55],
		[275,345,240,70],
		[350,440,310,90],
		[450,565,395,115],
		[575,720,505,145],
		[740,920,645,185],
		[945,1180,825,235],
		[1210,1510,1060,300],
		[1545,1935,1355,385],
		[1980,2475,1735,495],
		[2535,3170,2220,635],
		[3245,4055,2840,810],
		[4155,5190,3635,1040],
		[5315,6645,4650,1330],
		[6805,8505,5955,1700],
		[8710,10890,7620,2180]
			];

	// Armeria
	var blacksmithCost = [
		[0, 0, 0, 0],
		[170,200,380,130],
		[220,225,485,165],
		[280,330,625,215],
		[355,420,795,275],
		[455,535,1020,350],
		[585,685,1305,445],
		[750,880,1670,570],
		[955,1125,2140,730],
		[1225,1440,2740,935],
		[1570,1845,3505,1200],
		[2005,2360,4485,1535],
		[2570,3020,5740,1965],
		[3290,3870,7350,2515],
		[4210,4950,9410,3220],
		[5390,6340,12045,4120],
		[6895,8115,15415,5275],
		[8825,10385,19730,6750],
		[11300,13290,25255,8640],
		[14460,17015,32325,11060],
		[18510,21780,41380,14155]
			];

	// Armamentaria
	var armouryCost = [
		[0, 0, 0, 0],
		[130,210,410,130],
		[165,270,525,165],
		[215,345,670,215],
		[275,440,860,275],
		[350,565,1100,350],
		[445,720,1410,445],
		[570,925,1805,570],
		[730,1180,2310,730],
		[935,1515,2955,935],
		[1200,1935,3780,1200],
		[1535,2480,4840,1535],
		[1965,3175,6195,1965],
		[2515,4060,7930,2515],
		[3220,5200,10150,3220],
		[4120,6655,12995,4120],
		[5275,8520,16630,5275],
		[6750,10905,21290,6750],
		[8640,13955,27250,8640],
		[11060,17865,34880,11060],
		[14155,22865,44645,14155]
			];

	// Edificio principal
	var mainBuildingCost = [
		[0, 0, 0, 0],
		[70,40,60,20],
		[90,50,75,25],
		[115,65,100,35],
		[145,85,125,40],
		[190,105,160,55],
		[240,135,205,70],
		[310,175,265,90],
		[395,225,340,115],
		[505,290,430,145],
		[645,370,555,185],
		[825,470,710,235],
		[1060,605,905,300],
		[1355,775,1160,385],
		[1735,990,1485,495],
		[2220,1270,1900,635],
		[2840,1625,2435,810],
		[3635,2075,3115,1040],
		[4650,2660,3990,1330],
		[5955,3405,5105,1700],
		[7620,4355,6535,2180]
			];

	// Plaza de reuniones
	var rallyPointCost = [
		[0, 0, 0, 0],
		[110,60,80,60],
		[140,205,115,90],
		[180,260,145,115],
		[230,355,190,145],
		[295,160,215,160],
		[380,550,310,240],
		[485,705,395,310],
		[620,900,505,395],
		[795,430,575,430],
		[1015,1475,830,645]
			];

	// Embajada
	var embassyCost = [
		[0, 0, 0, 0],
		[180,130,150,80],
		[230,165,190,100],
		[295,215,245,130],
		[375,275,315,170],
		[485,350,405,215],
		[620,445,515,275],
		[790,570,660,350],
		[1015,730,845,450],
		[1295,935,1080,575],
		[1660,1200,1385,740],
		[2125,1535,1770,945],
		[2720,1965,2265,1210],
		[3480,2515,2900,1545],
		[4455,3220,3715,1980],
		[5705,4120,4755,2535],
		[7300,5275,6085,3245],
		[9345,6750,7790,4155],
		[11965,8640,9970,5315],
		[15315,11060,12760,6805],
		[19600,14155,16335,8710]
			];

	// Cuartel
	var barracksCost = [
		[0, 0, 0, 0],
		[210,140,260,120],
		[270,180,335,155],
		[345,230,425,195],
		[440,295,545,250],
		[565,375,700,320],
		[720,480,895,410],
		[925,615,1145,530],
		[1180,790,1465,675],
		[1515,1010,1875,865],
		[1935,1290,2400,1105],
		[2480,1655,3070,1415],
		[3175,2115,3930,1815],
		[4060,2710,5030,2320],
		[5200,3465,6435,2970],
		[6655,4435,8240,3805],
		[8520,5680,10545,4870],
		[10905,7270,13500,6230],
		[13955,9305,17280,7975],
		[17865,11910,22120,10210],
		[22865,15245,28310,13065]
			];

	// Corral / Establo
	var stableCost = [
		[0, 0, 0, 0],
		[260,140,220,100],
		[335,180,280,130],
		[425,230,360,165],
		[545,295,460,210],
		[700,375,590,270],
		[895,480,755,345],
		[1145,615,970,440],
		[1465,790,1240,565],
		[1875,1010,1585,720],
		[2400,1290,2030,920],
		[3070,1655,2595,1180],
		[3930,2115,3325,1510],
		[5030,2710,4255,1935],
		[6435,3465,5445,2475],
		[8240,4435,6970,3170],
		[10545,5680,8925,4055],
		[13500,7270,11425,5190],
		[17280,9305,14620,6645],
		[22120,11910,18715,8505],
		[28310,15245,23955,10890]
			];

	// Taller
	var workshopCost = [
		[0, 0, 0, 0],
		[460,510,600,320],
		[590,655,770,410],
		[755,835,985,525],
		[965,1070,1260,670],
		[1235,1370,1610,860],
		[1580,1750,2060,1100],
		[2025,2245,2640,1405],
		[2590,2870,3380,1800],
		[3315,3675,4325,2305],
		[4245,4705,5535,2950],
		[5430,6020,7085,3780],
		[6950,7705,9065,4835],
		[8900,9865,11605,6190],
		[11390,12625,14855,7925],
		[14580,16165,19015,10140],
		[18660,20690,24340,12980],
		[23885,26480,31155,16615],
		[30570,33895,39787,21270],
		[39130,43385,51040,27225],
		[50090,55535,65335,34845]
			];

	// Escondite
	var crannyCost = [
                [0, 0, 0, 0],
                [40,50,30,10],
                [50,65,40,15],
                [65,80,50,15],
                [85,105,65,20],
                [135,160,105,55],
                [170,205,135,70],
                [220,265,175,90],
                [280,340,225,115],
                [360,430,290,145],
                [370,460,275,90]	
	];

	// Ayuntamiento
	var ayuntamientoCost = [
		[0, 0, 0, 0],
		[1250,1110,1260,600],
		[1600,1420,1615,770],
		[2050,1820,2065,985],
		[2620,2330,2640,1260],
		[3355,2980,3380,1610],
		[4295,3815,4330,2060],
		[5500,4880,5540,2640],
		[7035,6250,7095,3380],
		[9005,8000,9080,4325],
		[11530,10240,11620,5535],
		[14755,13105,14875,7085],
		[18890,16775,19040,9065],
		[24180,21470,27370,11605],
		[30950,27480,31195,14885],
		[39615,35175,39930,19015],
		[40705,45025,51110,24340],
		[64905,57635,65425,31155],
		[83075,73770,83740,39875],
		[106340,94430,107190,51040],
		[136115,120870,137200,65335]
			];

	// Residencia
	var residenceCost = [
		[0, 0, 0, 0],
		[580,460,350,180],
		[740,590,450,230],
		[950,755,575,295],
		[1215,965,735,375],
		[1555,1235,940,485],
		[1995,1580,1205,620],
		[2550,2025,1540,790],
		[3265,2590,1970,1015],
		[4180,3315,2520,1295],
		[5350,4245,3230,1660],
		[6845,5430,4130,2125],
		[8765,6950,5290,2720],
		[11220,8900,6770,3480],
		[14360,11390,8665,4455],
		[18380,14580,11090,5705],
		[23530,18660,14200,7300],
		[30115,23885,18175,9345],
		[38550,30570,23260,11965],
		[49340,39130,29775,15315],
		[63155,50090,38110,19600]
			];

	// Palacio
	var palaceCost = [
		[0, 0, 0, 0],
		[550,800,750,250],
		[705,1025,960,320],
		[900,1310,1230,410],
		[1155,1680,1575,525],
		[1475,2145,2015,670],
		[1890,2750,2575,860],
		[2420,3520,3300,1100],
		[3095,4505,4220,1405],
		[3965,5765,5405,1800],
		[5075,7380,6920,2305],
		[6495,9445,8855,2950],
		[8310,12090,11335,3780],
		[10640,15478,14505,4835],
		[13150,19805,18570,6190],
		[17430,25355,23770,7925],
		[22310,32450,30425,10140],
		[28560,41540,38940,12980],
		[36555,53170,49845,16615],
		[46790,68055,63805,21270],
		[59890,87110,81670,27225]
			];

	// Plaza de torneos
	var tournamentSquareCost = [
		[0, 0, 0, 0],
		[1750,2250,1530,240],
		[2240,2880,1960,305],
		[2865,3685,2505,395],
		[3670,4720,3210,505],
		[4700,6040,4105,645],
		[6015,7730,5255,825],
		[7695,9895,6730,1055],
		[9850,12665,8615,1350],
		[12610,16215,11025,1730],
		[16140,20755,14110,2215],
		[20660,26565,18065,2835],
		[26445,34000,23120,3625],
		[33850,43520,29595,4640],
		[43330,55705,37880,5940],
		[55460,71305,48490,7605],
		[70990,91270,62065,9735],
		[90865,117000,79440,12460],
		[116000,150000,102000,15950],
		[149000,191000,130000,20415],
		[191000,245000,167000,26135]
			];

	// Tesoro
	var tesoroCost = [
		[0, 0, 0, 0],
		[2890,2740,2580,990],
		[3685,3505,3300,1265],
		[4720,4490,4225,1620],
		[6040,5745,5410,2075],
		[7730,7355,6925,2660],
		[9595,9415,8865,3400],
		[12665,12050,11345,4355],
		[16215,15425,14525,5575],
		[20755,19745,18590,7135],
		[26565,25270,23795,9130]
			];

	// Oficina de comercio
	var oficinaComercioCost = [
		[0, 0, 0, 0],
		[1400,1330,1200,400],
		[1790,1700,1535,510],
		[2295,2180,1965,655],
		[2935,2790,2515,840],
		[3760,3570,3220,1075],
		[4810,4570,4125,1375],
		[6155,5850,5280,1760],
		[7780,7485,6755,2250],
		[10090,9585,8645,2880],
		[12915,12265,11070,6390],
		[16530,15700,14165,4720],
		[21155,20100,18135,6045],
		[27080,25725,23210,9905],
		[34660,32930,29710,9905],
		[44370,42150,38030,12675],
		[56790,53950,48680,16225],
		[72690,69060,62310,20770],
		[93045,88395,79755,26585],
		[119100,113145,102085,34030],
		[152445,144825,130670,43555]
			];

	// Cuartel grande
	var greatBarrackCost = [
		[0, 0, 0, 0],
		[630,420,780,360],		// Level 1
		[805,540,1000,460],
		[1030,690,1280,590],
		[1320,880,1635,755],
		[1690,1125,2095,965],		// Level 5
		[2165,1445,2680,1235],
		[2770,1845,3430,1585],
		[3545,2365,4390,2025],
		[4540,3025,5620,2595],
		[5810,3875,7195,3320],		// Level 10
		[7440,4960,9210,4250],
		[9520,6345,11785,5440],
		[12185,8125,15085,6965],
		[15600,10400,19310,8915],
		[19965,13310,24270,11410],	// Level 15
		[25555,17035,31640,14605],
		[32710,21810,40500,18690],
		[41870,27915,51840,23925],
		[53595,35730,66355,30625],
		[68600,45735,84935,39200]	// Level 20
			];

	// Corral / Establo grande
	var greatStableCost = [
		[0, 0, 0, 0],
		[780,420,660,300],
		[1000,540,845,385],
		[1280,690,1080,490],
		[1635,880,1385,630],
		[2095,1125,1770,805],
		[2680,1445,2270,1030],
		[3430,1845,2905,1320],
		[4390,2365,3715,1690],
		[5620,3025,4755,2160],
		[7195,3875,6085,2765],
		[9210,4960,7790,3540],
		[11785,6345,9975,4535],
		[15085,8125,12765,5805],
		[19310,10400,16340,7430],
		[24720,13310,20915,9505],	// Level 15
		[31640,17035,26775,12170],
		[40500,21810,34270,15575],
		[51840,27915,43865,19940],
		[66355,35730,56145,25520],
		[84935,45735,71870,32665]
			];

	// Muralla
	var wallRomansCost = [
		[0, 0, 0, 0],
		[70, 90, 170, 70],
		[90, 115, 220, 90],
		[115, 145, 280, 115],
		[145, 190, 355, 145],
		[190, 240, 455, 190],
		[240, 310, 585, 240],
		[310, 395, 750, 310],
		[395, 505, 955, 395],
		[505, 650, 1225, 505],
		[645, 830, 1570, 645],
		[825, 1065, 2005, 825],
		[1060, 1360, 2570, 1060],
		[1355, 1740, 3290, 1355],
		[1735, 2230, 4210, 1735],
		[2220, 2850, 5390, 2220],
		[2840, 3650, 6895, 2840],
		[3635, 4675, 8825, 3635],
		[4650, 5980, 11300, 4650],
		[5955, 7655, 14160, 5955],
		[7620, 9800, 18510, 7620]
			];

	// Empalizada
	var wallGaulsCost = [
		[0, 0, 0, 0],
		[160, 100, 80, 60],
		[205, 130, 100, 75],
		[260, 165, 130, 100],
		[335, 210, 170, 125],
		[430, 270, 215, 160],
		[550, 345, 275, 205],
		[705, 440, 350, 265],
		[900, 565, 450, 340],
		[1155, 720, 575, 430],
		[1475, 920, 740, 555],
		[1890, 1180, 945, 710],
		[2420, 1510, 1210, 905],
		[3095, 1935, 1545, 1160],
		[3960, 2475, 1980, 1485],
		[5070, 3170, 2535, 1900],
		[6490, 4055, 3245, 2435],
		[8310, 5190, 4155, 3115],
		[10635, 6645, 5315, 3990],
		[13610, 8505, 6805, 5105],
		[17420, 10890, 8710, 6535]
			];

	// Terraplen
	var wallTeutonsCost = [
		[0, 0, 0, 0],
		[120, 200, 0, 80],
		[155, 255, 0, 100],
		[195, 330, 0, 130],
		[250, 420, 0, 170],
		[320, 535, 0, 215],
		[410, 685, 0, 275],
		[530, 880, 0, 350],
		[675, 1125, 0, 450],
		[865, 1440, 0, 575],
		[1105, 1845, 0, 740],
		[1415, 2360, 0, 945],
		[1815, 3020, 0, 1210],
		[2320, 3870, 0, 1545],
		[2970, 4950, 0, 1980],
		[3805, 6340, 0, 2535],
		[4870, 8115, 0, 3245],
		[6230, 10385, 0, 4155],
		[7975, 13290, 0, 5315],
		[10210, 17015, 0, 6805],
		[13065, 21780, 0, 8710]
	];

	var maravillaCost = [
		[0, 0, 0, 0],
		[49800, 52700, 54800, 4400],
		[50695, 53650, 55785, 4480],
		[51610, 54615, 56790, 4560],
		[52540, 55595, 57815, 4640],
		[53485, 56600, 58855, 4725], // Nivel 5
		[54445, 57615, 59915, 4810],
		[55425, 58655, 60990, 4895],
		[56425, 59710, 62090, 4985],
		[57440, 60785, 63205, 5075],
		[58475, 61880, 64345, 5165], // Nivel 10
		[59525, 62990, 65505, 5260],
		[60600, 64125, 66680, 5355],
		[61690, 65280, 67880, 5450],
		[62800, 66455, 69105, 5550],
		[63930, 67650, 70350, 5650], // Nivel 15
		[65080, 68870, 71615, 5750], // Interpolado
		[66250, 70110, 72905, 5855],
		[67445, 71370, 74215, 5960],
		[68660, 72655, 75550, 6065],
		[69895, 73965, 76910, 6175], // Nivel 20
		[71150, 75295, 78295, 6285],
		[72430, 76650, 79705, 6400],
		[73735, 78030, 81140, 6515],
		[75065, 79435, 82600, 6630],
		[76415, 80865, 84085, 6750], // Nivel 25
		[77790, 82320, 85600, 6875],
		[79190, 83800, 87140, 6995],
		[80615, 85310, 88710, 7125],
		[82065, 86845, 90305, 7250],
		[83545, 88410, 91930, 7380], // Nivel 30
		[85050, 90000, 93585, 7515],
		[86580, 91620, 95270, 7650],
		[88135, 93270, 96985, 7785],
		[89725, 94950, 98730, 7925],
		[91340, 96655, 101000, 8070], // Nivel 35
		[92985, 98395, 102000, 8215],
		[94655, 100000, 104000, 8365],
		[96360, 102000, 106000, 8515],
		[98095, 104000, 108000, 8665],
		[99860, 106000, 110000, 8825], // Nivel 40
		[102000, 108000, 112000, 8980],
		[103000, 110000, 114000, 9145],
		[105000, 111000, 116000, 9310],
		[107000, 113000, 118000, 9475],
		[109000, 116000, 120000, 9645], // Nivel 45
		[111000, 118000, 122000, 9820],
		[113000, 120000, 125000, 9995],
		[115000, 122000, 127000, 10175],
		[117000, 124000, 129000, 10360],
		[119000, 126000, 131000, 10545], // Nivel 50
		[122000, 129000, 134000, 10735],
		[124000, 131000, 136000, 10930],
		[126000, 133000, 139000, 11125],
		[128000, 136000, 141000, 11325],
		[131000, 138000, 144000, 11530], // Nivel 55
		[133000, 141000, 146000, 11740],
		[135000, 143000, 149000, 11950],
		[138000, 146000, 151000, 12165],
		[140000, 148000, 154000, 12385],
		[143000, 151000, 157000, 12605], // Nivel 60
		[145000, 154000, 160000, 12835],
		[148000, 156000, 163000, 13065],
		[151000, 159000, 166000, 13300],
		[153000, 162000, 169000, 13540],
		[156000, 165000, 172000, 13780], // Nivel 65
		[159000, 168000, 175000, 14030],
		[162000, 171000, 178000, 14285],
		[165000, 174000, 181000, 14540],
		[168000, 177000, 184000, 14800],
		[171000, 180000, 188000, 15070], // Nivel 70
		[174000, 184000, 191000, 15340],
		[177000, 187000, 194000, 15615],
		[180000, 190000, 198000, 15895],
		[183000, 194000, 202000, 16180],
		[186000, 197000, 205000, 16475], // Nivel 75
		[190000, 201000, 209000, 16770],
		[193000, 204000, 213000, 17070],
		[197000, 208000, 216000, 17380],
		[200000, 212000, 220000, 17690],
		[204000, 216000, 224000, 18010], // Nivel 80
		[208000, 220000, 228000, 18335],
		[211000, 224000, 232000, 18665],
		[215000, 228000, 237000, 19000],
		[219000, 232000, 241000, 19345],
		[223000, 236000, 245000, 19690], // Nivel 85
		[227000, 240000, 250000, 20045],
		[231000, 244000, 254000, 20405],
		[235000, 249000, 259000, 20775],
		[239000, 253000, 263000, 21145],
		[244000, 258000, 268000, 21530], // Nivel 90
		[248000, 262000, 273000, 21915],
		[253000, 267000, 278000, 22310],
		[257000, 272000, 283000, 22710],
		[262000, 277000, 288000, 23120],
		[266000, 282000, 293000, 23535], // Nivel 95
		[271000, 287000, 298000, 23960],
		[276000, 292000, 304000, 24390],
		[281000, 297000, 309000, 24830],
		[286000, 303000, 315000, 25280],
		[291000, 308000, 320000, 25735], // Nivel 100
	];

	var buildingCost = new Array(31);
	buildingCost[0] = lenyadorCost;
	buildingCost[1] = barroCost;
	buildingCost[2] = hierroCost;
	buildingCost[3] = cerealCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = flourMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = ayuntamientoCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = tesoroCost;
	buildingCost[28] = oficinaComercioCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = maravillaCost;

	// Costes de produccion de cada unidad y su carga
	var uc = new Array(); 

	// Romanos 
	uc[1] = [120,100,180,40,40]; 		// Legionario 
	uc[2] = [100,130,160,70,20]; 		// Pretoriano 
	uc[3] = [150,160,210,80,50]; 		// Imperano 
	uc[4] = [140,160,20,40,0]; 		// Legati 
	uc[5] = [550,440,320,100,100];	 	// Imperatoris 
	uc[6] = [550,640,800,180,70]; 		// Caesaris 
	uc[7] = [900,360,500,70,0]; 		// Carnero 
	uc[8] = [950,1350,600,90,0]; 		// Catapulta 
	uc[9] = [30750,27200,4500,37500,0]; 	// Senador 
	uc[10] = [5800,5300,7200,5500,0]; 	// Descubridor 

	// Germanos
	uc[11] = [95,75,40,40,60]; 		// Lanzador porras 
	uc[12] = [145,70,85,40,40]; 		// Luchador lanza 
	uc[13] = [130,120,170,70,50]; 		// Luchador hacha 
	uc[14] = [160,100,50,50,0]; 		// Emisario 
	uc[15] = [370,270,290,75,110]; 		// Paladin 
	uc[16] = [450,515,480,80,80]; 		// Caballista teutona 
	uc[17] = [1000,300,350,70,0]; 		// Ariete 
	uc[18] = [900,1200,600,60,0]; 		// Catapulta 
	uc[19] = [35500,26600,25000,27200,0]; 	// Cabecilla 
	uc[20] = [7200,5500,5800,6500,0]; 	// Descubridor 

	// Galos
	uc[21] = [100,130,55,30,30]; 		// Falange 
	uc[22] = [140,150,185,60,45]; 		// Luchador espada 
	uc[23] = [170,150,20,40,0]; 		// Batidor 
	uc[24] = [350,450,230,60,75]; 		// Rayo 
	uc[25] = [360,330,280,120,35]; 		// Druida 
	uc[26] = [500,620,675,170,65]; 		// Haeduanos 
	uc[27] = [950,555,330,75,0]; 		// Carnero 
	uc[28] = [960,1450,630,90,0]; 		// Catapulta 
	uc[29] = [30750,45400,31000,37500,0]; 	// Cacique
	uc[30] = [5500,7000,5300,4900,0]; 	// Descubridor 

	var actual = new Array(4);		// Informacion de recursos almacenados
	var total = new Array(4);		// Capacidad de los almacenes y granero
	var produccion = new Array(4);		// Produccion por segundo
	var imagenes = new Array();		// Imagenes pre-cargadas

	// Indica para que servidores esta disponible Travian World
	var tw_server = ["s2.travian.net"];

	// Imagen de un sobre para enviar IGM
	imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
	imagenes["mercado"] = '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';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	imagenes["militar"] = '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';
	// Imagen de una grafica para las estadisticas
	imagenes["stat"] = 'R0lGODlhDAAKAIABAAAAAP///yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=';

	// Imagenes de las murallas
	imagenes["muralla"] = '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';
	imagenes["empalizada"] = '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';
	imagenes["terraplen"] = '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';

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	/**
	 * Funcion que convierte un numero en su version de 2 digitos. Anyade un 0 si solo tiene un digito
	 *
	 * Params:
	 *	n	Numero a convertir
	 * 
	 * Returns:
	 * 	El numero convertido con al menos dos digitos
	 */
	function LZ(n){	return (n > 9 ? n : '0' + n); }

	/**
	 * Crea un nuevo elemento de tipo DIV con un contenido prefijado
	 * 
	 * Params:
	 *	content	Contenido del nuevo elemento creado
	 * 
	 * Returns:
	 * 	Referencia al nuevo elemento
	 */
	function div(content){ return elem("div", content); }

	/**
	 * Wrapper para la funcion getElementById
	 *
	 * Params:
	 *	id	Texto del ID del elemento a buscar
	 * 
	 * Returns:
	 * 	Elemento del documento con el ID especificado
	 */
	function get(id){ return document.getElementById(id); }

	/**
	 * Multiplica cada elemento de un array por un valor
	 *
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 *
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n){ 
		var b = arrayClone(a); 
		for(var i in b){ b[i] *= n; } 
		return b; 
	} 

	/**
	 * Realiza una copia por valor de un array
	 * 
	 * Params:
	 *	a	Array a copiar
	 *
	 * Returns:
	 *	Referencia a un nuevo array con el mismo contenido que el original
	 */
	function arrayClone(a){ 
		var b = new Array(); 
		for(var i in a){ b[i] = a[i]; } 
		return b; 
	} 

	/**
	 * Suma el contenido de dos arrays. Si cualquiera de los dos tiene valor nulo, se devuelve una copia del otro
	 * 
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 *
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b){ 
		if(!a){ return arrayClone(b); } 
		if(!b){ return arrayClone(a); } 
		var c = new Array(); 
		for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]); 
		return c; 
	}

	/**
	 * Comprueba si un valor esta presente en un array determinado
	 *
	 * Params:
	 *	array	Array a comprobar
	 *	value	Valor a buscar en el array
	 *
	 * Returns:
	 *	true si el valor esta en el array, false en caso contrario
	 */
	function arrayValueExist(array, value){
		for(var i = 0; i < array.length; i++) if (array[i] == value) return true;
		return false;
	}

	/**
	 * Elimina un elemento
	 *
	 * Param:
	 *	elem	El elemento a eliminar
	 */
	function removeElement(elem){ elem.parentNode.removeChild(elem) }

	/**
	 * Suma todos los valores de un array
	 * 
	 * Params:
	 *	a	Array a sumar
	 *
	 * Returns:
	 *	Valor con la suma de todos los elementos del array
	 */
	function arrayToInt(a){ 
		var h = 0; 
		for(var i in a){ h += a[i]; }
		return h; 
	}

	/**
	 * Inserta un nodo despues de otro
	 * 
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**
	 * Crea un elemento cualquiera con un contenido
	 * 
	 * Params:
	 *	tag	Etiqueta del nuevo elemento
	 *	content	Contenido del nuevo elemento en formato texto
	 *
	 * Returns:
	 *	Referencia al nuevo elemento creado
	 */
	function elem(tag, content){ 
		var ret = document.createElement(tag);  
		ret.innerHTML = content;  
		return ret;
	}

	/**
	 * Realiza una busqueda en el documento usando XPath
	 * 
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 *
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres){
		var ret = document.evaluate(xpath, document, null, xpres, null);
		return (xpres == XPFirst ? ret.singleNodeValue : ret);
	}

	/**
	 * Crea o actualiza el valor de una cookie con una determinada duracion
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *	value	Contenido de la cookie
	 *	days	Duracion de la validez de la cookie
	 */
	function createCookie(name, value, days){
		if (typeof GM_setValue == 'undefined'){
			if (days){
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}else{ var expires = ""; }
			document.cookie = name + "=" + value + expires + "; path=/";
		}else GM_setValue(name, value);
	}

	/**
	 * Recupera el valor de una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 *
	 * Returns:
	 *	Contenido de la cookie o null si no existe
	 */
	function readCookie(name){
		if (typeof GM_getValue == 'undefined'){
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}else return GM_getValue(name, null);
	}

	/**
	 * Elimina una cookie
	 * 
	 * Params:
	 *	name	Nombre de la cookie
	 */
	function eraseCookie(name){ createCookie(name, "", -1); }

	/**
	 * Crea una ruta a una imagen basandose en el path del pack grafico
	 * 
	 * Params:
	 *	ref	Ruta relativa a la imagen
	 *
	 * Returns:
	 *	Ruta absoluta a la imagen
	 */
	function img(ref){ return pack_grafico + "img/" + idioma + "/" + ref; }

	/**
	 * Calcula el identificador de una casilla partiendo de sus coordenadas X e Y
	 *
	 * Params:
	 *	x	Coordenada X
	 *	y	Coordenada Y
	 *
	 * Returns:
	 *	ID de la casilla correspondiente a las coordenadas
	 */
	function xy2id(x, y){ return (3079 + (parseInt(x) + 250) + (512 * Math.abs(parseInt(y) - 250))); }

	/**
	 * Calcula el numero de segundos de una hora expresada en formato xx:xx:xx
	 * 
	 * Params:
	 *	myElement	Texto con la hora a calcular
	 *
	 * Returns:
	 *	Numero de segundos que expresa la hora
	 */
	function calcular_segundos(myElement) {
		var p = myElement.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/**
	 * Convierte una cantidad en segundos en su representacion en horas. 
	 * Funcion inversa de "calcular_segundos"
	 * 
	 * Params:
	 *	s	Numero de segundos
	 *
	 * Returns:
	 *	Texto con la representacion en horas o la cadena "0:00:0?" si es negativo
	 */
	function formatear_tiempo(s){
		if(s > -1){
			var horas = Math.floor(s/3600);
			var minutos = Math.floor(s/60) % 60;
			var segundos = s % 60;
			var t = horas + ":" + LZ(minutos) + ":" + LZ(segundos);
		}else{
			var t = "0:00:0?";
		}
		return t;
	}

	/**
	 * Funcion encargada de mostrar el texto de recursos restantes para una construccion
	 */
	function calculateBuildTime(){
		// Las celdas son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var celdas = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
		var tablas = find("//table[@class='f10' and not(@width)]", XPList);
		var k = celdas.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for(j = tablas.snapshotLength - 1; j >= 0; j--) {
			var tabla = tablas.snapshotItem(j);
			var celda = tabla.rows[0].firstChild;
			var recursos = celda.textContent.split("|").splice(0,4);
			if(recursos.length != 4) continue;

			var a = calculateResourceTime(recursos);
			var b = celdas.snapshotItem(k);
			// Por si hay mas tablas que celdas
			if (b){
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'A') continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null){
					if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE') b.removeChild(b.firstChild);
					b.appendChild(div(a));
					k--;
				}
			}
		}
	}

	/**
	 * Recupera el identificador de la aldea activa
	 *
	 * Returns:
	 *	El ID de la aldea o 0 si es la unica aldea
	 */
	function getIdAldea(){
		var a = find("//li[@class='c2']/a", XPFirst);
		if (a){
			a.getAttribute("href").search(/\?newdid=(\d+)/);
			return RegExp.$1;
		}else{
			return 0;
		}
	}

	/**
	 * Calcula el desplazamiento en pixeles a partir del 23º enlace 
	 * lateral (aldeas o enlaces personalizados
	 *
	 * Returns:
	 *	El desplazamiento en pixeles
	 */
	function longitudPantalla(){
		// Se estima cada linea como una altura de 20 pixeles
		var pixelsPorLinea = 20;

		// Se estima que caben 23 enlaces hasta que empiecen a ser demasiados y
		// a ser tenidos en cuenta
		var enlaces = find("//li/a", XPList).snapshotLength - 23;
		enlaces = enlaces > 0 ? enlaces * pixelsPorLinea : 0;

		return enlaces;
	}

	/**
	 * Calcula los recursos restantes y el tiempo necesario para unas cantidades deseadas y devuelve
	 * una cadena de texto en HTML con esa informacion
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Cadena de texto en HTML con la informacion sobre el tiempo y recursos que faltan
	 */
	function calculateResourceTime(necesario){
		var texto_restante = '';
		var tiempo_max = 0;
		var a = null;

		// Calcula y crea una cadena con lo que falta de cada recurso
		for (i = 0; i < 4; i++){
			restante = necesario[i] - actual[i];

			if (restante > 0){
				texto_restante += '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"><span id="timeout' + i + '">' + restante + '</span> | ';
				var tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
				if (total[i] - actual[i] == 0) tiempo_max = 'Infinity';
			}
		}

		// Calcula y crea una cadena con el tiempo que falta hasta conseguir los recursos
		if (tiempo_max == 'Infinity'){
			a = T('FALTA') + ' ' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> ' + T('NUNCA');
		}else if (tiempo_max > 0){
			var tiempo2 = formatear_tiempo(tiempo_max + 5); // Introduce un margen de 5 segundos para compensar la desviancion de los temporizadores de javascript
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (tiempo_max * 1000));

			a = T('FALTA') + ' ' + texto_restante + ' <img src="' + img('a/clock.gif') + '" width="18" height="12" title="' + T('TIEMPO') + '"> <span id="timeout">' + tiempo2 + '</span><br/> ' + T('LISTO') + ' ' + calcularTextoTiempo(fecha);
		}
		return a;
	}

	/**
	 * Formatea el tiempo necesario hasta alcanzar determinada fecha
	 *
	 * Params:
	 *	fecha:	Objeto de tipo Date con la fecha futura
	 *
	 * Returns:
	 *	Cadena de texto con el calculo de tiempo restante
	 */
	function calcularTextoTiempo(fecha){
		ahora = new Date();

		// Calcula la diferencia de horas entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 horas
		horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		if (horas < 24){
			tiempo_restante = T('HOY');
		}else if (horas < 48){
			tiempo_restante = T('MANYANA');
		}else if (horas < 72){
			tiempo_restante = T('PAS_MANYANA');
		}else{
			tiempo_restante = T('EL') + " " + LZ(fecha.getDate()) + "/" + LZ((fecha.getMonth()+1));
		}
		return tiempo_restante + " " + T('A_LAS') + " " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes());
	}

	/**
	 * Calcula el tiempo maximo estimado hasta conseguir los recursos especificados basandose
	 * en la cantidad actual y en la produccion de cada tipo de recurso
	 *
	 * Params:
	 *	necesario:	Array con la cantidad deseada de cada tipo de recurso
	 *
	 * Returns:
	 *	Tiempo maximo en segundos hasta conseguir los recursos deseados
	 */
	function calculateTime(necesario){
		var tiempo_max = 0;
		var tiempo = 0;

		for (i = 0; i < 4; i++){
			var restante = necesario[i] - actual[i];	
			if (restante > 0){
				tiempo = Math.round(restante / produccion[i]);
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}

		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatear_tiempo(tiempo_max + 5); // Se introduce un margen de 5 segundos para compensar desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	/**
	 * Calcula y muestra el tiempo estimado hasta el llenado/vaciado de los almacenes y graneros
	 */
	function calculateFillTime(){
		// Por cada tipo de recurso calcula el tiempo hasta el llenao
		for (var i = 0; i < 4; i++){
			if (produccion[i] < 0) var tiempo = Math.round(actual[i] / -produccion[i]);
			// Si la produccion es 0, el tiempo es infinito
			else if (produccion[i] == 0) var tiempo = -1;
			// Si la produccion es negativa, se calcula el tiempo hasta el vaciado
			else var tiempo = Math.round((total[i] - actual[i]) / produccion[i]);

			var produccionHora = get('l' + (i+1)).title;
			var tiempoRestante = "<span id='timeouta' style='font-weight:bold'>" + formatear_tiempo(tiempo) + "</span>";
			var celda = elem("DIV", "<span style='font-size:9px; color:#909090; position: absolute; top:13px; height: 20px; text-align:left;'>(" + (produccionHora > 0 ? '+' : '') + produccionHora + ', ' + (produccionHora < 0 ? '<font color="#FF0000">' + tiempoRestante + '</font>' : tiempoRestante) + ')</span>');
			var a = get('l' + (i+1)).previousSibling;
			// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
			if (a.nodeName == '#text') a = a.previousSibling;
			a.appendChild(celda);
		}
	}

	/**
	 * Traduce una cadena de texto usando el idioma global detectado
	 *
	 * Params:
	 *	texto:	Cadena de texto a traducir
	 *
	 * Returns:
	 *	Cadena de texto traducida
	 */
	function T(texto){
		// Intenta usar el array del idioma, y si no esta disponible utiliza el castellano por defecto
		try{
			eval('var language = lang_' + idioma);
		}catch(e){
			eval('var language = lang_es');
		}
		// Si una cadena concreta no esta traducida en el idioma, utiliza por defecto el castellano
		if (language[texto] == undefined) return lang_es[texto]; else return language[texto];
	}

	/**
	 * Recupera informacion generica inicial para el resto de funciones
	 */
	function getGeneralData(){
		// Idioma
		find("//script[@type='text/javascript']", XPFirst).src.search(/\/([^\/]+)?.js$/);
		idioma = RegExp.$1;
		// Ruta al pack grafico
		pack_grafico = find("//link[@rel='stylesheet']", XPFirst).href.replace(idioma + ".css", "");
		// Identificador de aldea actual
		id_aldea = getIdAldea();
		// Nombre del servidor
		location.href.search(/http:\/\/(.*)\//);
		server = RegExp.$1;
		// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
		for (var i = 0; i < 4; i++){
			actual[i] = get('l'+(i+1)).innerHTML.split("/")[0];
			total[i] = get('l'+(i+1)).innerHTML.split("/")[1];
			produccion[i] = get('l'+(i+1)).title/3600;
		}
	}

	/**
	 * Funcion que devuelve la version del juego de Travian que esta tratando
	 *
	 * Returns:
	 *	La version del juego
	 */
	function getVersion(){
		find("//script[@type='text/javascript']", XPFirst).src.search(/(\d).js$/);
		return RegExp.$1;
	}

	/**
	 * Oculta el anuncio de la version Plus
	 */
	function hideAd(){
		var ads = find("//table[@class='tbg']", XPList);
		for (var i = 0; i < ads.snapshotLength; i++){
			var ad = ads.snapshotItem(i);	
			if (ad.style.width == "140px"){ ad.style.display = 'none'; break; }
		}
	}

	/**
	 * Crea nuevos enlaces en la barra de menu izquierda. Son enlaces internos y externos al juego separados por una linea
	 */
	function quickLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
                for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);
		menu.innerHTML += '<hr/>';
		menu.innerHTML += '<a href="allianz.php">' + T('ALIANZA') + '</a>';
		menu.innerHTML += '<a href="a2b.php">' + T('TROPAS') + '</a>';
		menu.innerHTML += '<a href="warsim.php">' + T('SIM') + '</a>';
		menu.innerHTML += '<a href="spieler.php?s=1">' + T('PERFIL') + '</a>';
		menu.innerHTML += '<hr/>';
		menu.innerHTML += '<a href="http://trcomp.sourceforge.net/?lang=' + idioma + '" target="_blank">' + T('COMP') + '</a>';
//		menu.innerHTML += '<a href="http://www.denibol.com/~victor/travian_calc/" target="_blank">' + T('CALC') + '</a>';
		menu.innerHTML += '<a href="http://www.denibol.com/proyectos/travian_beyond/" target="_blank">Travian Beyond</a>';
	}

	/**
	 * Anyade un dialogo de confirmacion a los enlaces de cancelacion de construcciones
	 */
	function confirmDelete(){
		var links = document.getElementsByTagName("a");
		for(var i = 0; i < links.length; i++){
			if(links[i].href.search(/\?d=(\d+)&a=(\d+)/) > 0) {
				links[i].setAttribute('onClick', 'javascript:return confirm("' + T('SEGURO') + '");');
			}
		}
	}

	/**
	 * Anyade nuevos enlaces a edificios en la barra superior
	 */
	function buildingLinks(){
		// Localiza la barra de enlaces superiores
		var barra = find("//div[@class='div2']",XPFirst);
		// Mapa para el mercado
		barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';
		// Mapa para los edificios militares
		barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="' + T('PUNTO') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('CUARTEL') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('CORRAL') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('TALLER') + '"></map>';
		// Asocia el mapa del mercado con la imagen especifica creada
		barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="' + T('MERCADO') + '">';
		// Asocia el mapa de los edificios militares con la imagen creada a tal efecto
		barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="' + T('CUARTEL') + '">';
		// Desplaza la barra superior ligeramente a la derecha para no tapar la hora del juego
		barra.style.left = 173;
		// Desplaza el menu del Plus a la izquierda para hacer hueco a las nuevas imagenes
		find("//div[@class='plus']", XPFirst).style.left = 50;
	}

	/**
	 * Crea un enlace al servicio de estadisticas de Travian World que recibe la busqueda como parametro
	 *
	 * Params:
	 *	param	Parametro de busqueda para la estadistica
	 */
	function createStatLink(param){
		var statlink = elem('a', "<img src='data:image/gif;base64," + imagenes["stat"] + "' style='margin:0px 1px 0px 1px; display: inline' title='" + T('STAT') + "' alt='Stat' border=0>");
		statlink.href = "javascript:void(0);";
		var ref = 'http://www.denibol.com/proyectos/travian_world/stat2.php?server=' + server + '&' + param;
		statlink.addEventListener("click", function(){ var popup = window.open(ref, 'popup', 'width=350, height=250'); popup.focus(); return false; }, 0);
		return statlink;
	}

	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el idioma del servidor activo
	 */
	function playerLinks(){
		var links = document.getElementsByTagName("a");
		for(var i = 0; i < links.length; i++){
			// Por cada enlace a una ficha de jugador 
			if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				if (RegExp.$1 == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('uid=' + RegExp.$1), links[i].nextSibling);

				// Introduce el enlace para enviar mensajes usando su ID	
				var igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='" + T('ENVIAR_IGM') + "' alt='Msg' border=0>");
				igmlink.href = 'nachrichten.php?t=1&id=' + RegExp.$1;
				links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
			// Por cada enlace a una localizacion del mapa
			}else if (links[i].href.search(/karte.php\?d=(\d+$)/) > 0){
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('id=' + RegExp.$1), links[i].nextSibling);

				// Agrega un enlace para lanzar un ataque usando su posicion
				var atklink = elem('a',"<img src='" + img("a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height=10 width=10 title='" + T('ATACAR') + "' alt='Atk' border=0>");
				atklink.href = 'a2b.php?z=' + RegExp.$1;
				links[i].parentNode.insertBefore(atklink, links[i].nextSibling);
			// Por cada enlace a la ficha de una alianza
			}else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				if (RegExp.$1 == 0) continue;
				if (arrayValueExist(tw_server, server)) links[i].parentNode.insertBefore(createStatLink('aid=' + RegExp.$1), links[i].nextSibling);
			}
		}
	}

	/**
	 * Anyade un nuevo boton en la vista de informes y mensajes para marcar todas las casillas
	 */
	function checkAll(){
		var a = find("//*[@class='s7']", XPList);
		for (var i = 0; i < a.snapshotLength - 1; i++){
			var fila = a.snapshotItem(i);
			if ((fila.firstChild != null) && (fila.firstChild.nodeName == "INPUT")){
				var boton = document.createElement("input");
				boton.setAttribute("type", "button");
				boton.setAttribute("value", T('MARK'));
				boton.setAttribute("name", "mtodo");
				boton.setAttribute("style", "font-weight:bold; font-size:8pt; height:14pt;");
				boton.setAttribute("onClick", "for(var x = 0; x < document.msg.elements.length; x++) document.msg.elements[x].checked = 'checked';");
				fila.appendChild(boton);
				return;
			}
		}
	}

	/**
	 * Crea eventos para enviar al formulario de envio de materias primas del mercado las coordenadas 
	 * de las propias aldeas.
	 *
	 * Codigo sugerido por Bafox
	 */
	function quickCity(){ 
		// Comprueba si esta el formulario de envio
		if (find("//form[@name='snd']", XPFirst) == null) return;
		var ciudades = new Array(); 

		// Recupera la coordenada X
		var n = find("//table[@class='f8']//*/td[@align='right']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){
			ciudades[i] = new Object();
			try{ ciudades[i].x = n.snapshotItem(i).innerHTML.split('(')[1]; }catch(e){}
		} 

		// Recupera la coordenada Y
		n = find("//table[@class='f8']//*/td[@align='left']", XPList); 
		for(var i = 0; i < n.snapshotLength; i++){ 
			try{ ciudades[i].y = n.snapshotItem(i).innerHTML.split(')')[0]; } catch(e){}
		} 

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='f8']//tr", XPList);
		for (var i = 0; i < ciudades.length; i++){
			var elem = n.snapshotItem(i);
			elem.setAttribute('onClick',"snd.x.value='" + ciudades[i].x + "';snd.y.value='" + ciudades[i].y + "'");
			elem.setAttribute('onMouseOver', 'this.style.color="red"');
			elem.setAttribute('onMouseOut', 'this.style.color="black"');
			elem.style.cursor = "pointer";
		}
	}

	/**
	 * Calcula y muestra informacion adicional en los informes de los ataques
	 * Codigo inicial de Bafox
	 */
	function reportBatalla(){ 
		var t = find("//table//table//table[@class='tbg']", XPList); 
		if (t.snapshotLength < 2) return;

		// Encuentra y suma todas las cantidades del botin
		var botin = null;
		var a = find("//tr[@class='cbg1']", XPList);
		if (a.snapshotLength >= 3){
			// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
			if (a.snapshotItem(1).childNodes.length == 4){
				var b = a.snapshotItem(1).childNodes[3];
			}else{
				var b = a.snapshotItem(1).childNodes[1];
			}
			if (b.childNodes.length == 8){ 
				var cantidades_botin = new Array();
				cantidades_botin[0] = parseInt(b.childNodes[1].nodeValue);
				cantidades_botin[1] = parseInt(b.childNodes[3].nodeValue);
				cantidades_botin[2] = parseInt(b.childNodes[5].nodeValue);
				cantidades_botin[3] = parseInt(b.childNodes[7].nodeValue);
				botin = arrayToInt(cantidades_botin);
				var info_botin = '';
				for (var i = 0; i < 4; i++){
					info_botin += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					info_botin += cantidades_botin[i];
					if (i < 3) info_botin += ' + '; else info_botin += ' = ';
				}
				info_botin += botin;
				b.innerHTML = info_botin;
			}
		}

		var perds = new Array();
		var carry = new Array();
		// Por cada participante en la batalla (atacante, defensor y posibles apoyos)
		for(var g = 0; g < t.snapshotLength; g++){ 
			carry[g] = 0;	
			var tt = t.snapshotItem(g); 
			for(var j = 1; j < 11; j++){ 
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')]; 
					var p = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0; 
				// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
				var ptu = arrayByN(u, p);
				perds[g] = arrayAdd(perds[g], ptu.slice(0, 4)); 
				carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}

			// Anyade la nueva informacion como una fila adicional en cada tabla
			var informe = document.createElement("TD");
			for (var i = 0; i < 4; i++){
				informe.innerHTML += '<img src="' + img('r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
				informe.innerHTML += perds[g][i];
				if (i < 3) informe.innerHTML += ' + '; else informe.innerHTML += ' = ';
			}		
			var perdidas = arrayToInt(perds[g]);
			informe.innerHTML += perdidas;
			informe.colSpan = 10;
			informe.className = "s7";
			var fila = document.createElement("TR");
			fila.className = "cbg1";
			fila.appendChild(elem("TD", T('PERDIDAS')));
			fila.appendChild(informe);
			tt.appendChild(fila);

			// Solo para el atacante se calcula y muestra la rentabilidad y eficiencia del ataque
			if (g == 0 && botin != null){
				var datos = document.createElement("TD");
				var fila_datos = document.createElement("TR");
				datos.colSpan = 10;

				// La rentabilidad muestra el botin en comparacion con las perdidas
				var rentabilidad = Math.round((botin - perdidas) * 100 / botin);
				if (botin == 0)	if (perdidas == 0) rentabilidad = 0; else rentabilidad = -100;	
				datos.innerHTML = rentabilidad + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('RENT')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);

				var datos = document.createElement("TD");
				var fila_datos = document.createElement("TR");
				datos.colSpan = 10;

				// La eficiencia muestra el botin en comparacion con la cantidad de tropas utilizadas
				var eficiencia = 100 - Math.round((carry[g] - botin) * 100 / carry[g]);			
				if (carry[g] == 0) eficiencia = 0;
				datos.innerHTML = eficiencia + "%";
				datos.className = "s7";
				fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('EFICIENCIA')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);
			}
		}
	}

	/**
	 * Realiza un resumen de la pagina de produccion
	 */
	function preCalculate1(){
		var datos = 0;

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de recurso
		var grid = new Array(4);
		for(i = 0; i < 4; i ++) {
			grid[i] = new Array(11);
			for(j = 0; j < 11; j ++) {
				grid[i][j] = 0;
			}
		}

		// Recupera todas las casillas y rellena la matriz con los niveles detectados
		var edificios = find('//*[@class = "d01" or @class="d02" or @class="d03" or @class="d04" or @class="d05"]/a/img/@src', XPList);
		for (var i = 0; i < edificios.snapshotLength; i++){

			var tmp = edificios.snapshotItem(i).nodeValue.split("/");
			var image = tmp[tmp.length-1];
			tmp = image.split(".");
			var name = tmp[0];

			if(name != "dorf") {
				var farm = name.split("_");
				farm[0] = parseInt(farm[0].substring(1, 2)) - 1;

				grid[farm[0]][farm[1]]++;
			}
		}

		// Crea una tabla mostrando por cada tipo de recurso un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los recursos y tiempo restantes hasta poder subirlo de nivel
		var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var fila1 = document.createElement('TR');
		var fila2 = document.createElement('TR');
		fila1.setAttribute("class", "rbg");	
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++){
			var td1 = elem('TD', '<img src="' + img('r/' + (i+1) + '.gif') + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">');
			fila1.appendChild(td1);

			var td2 = document.createElement('TD');
			fila2.appendChild(td2);

			var table2 = document.createElement('TABLE');
			table2.setAttribute("align", "center");
			td2.appendChild(table2);
			for (var j = 0; j < 10; j++){
				if (grid[i][j] > 0){
					datos = 1;
					var fila3 = document.createElement('TR');
					fila3.appendChild(elem('TD', '<img src="' + img('g/' + (i+1) + '/r' + (i+1) + '_' + j + '.gif') + '" width="50" height="60" border="0">'));

					var restante = calculateResourceTime(buildingCost[i][j+1]);
					var td3 = document.createElement('TD');
					td3.setAttribute('class', 'c f7');
					fila3.appendChild(td3);
					table2.appendChild(fila3);
					if (restante != null){
						td3.innerHTML = restante;
					}else{
						td3.innerHTML = T('SUBIR_NIVEL');
					}
				}
			}
		}
		table.style.position = 'absolute';
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	/**
	 * Realiza un resumen de la pagina de edificios de la aldea
	 */
	function preCalculate2(){
		var edificiosPorFila = 2;
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		// Procesa primero las imagenes de los edificios
		var xpathResult = find('//td[@class="s3"]/img/@src', XPIter);
		buildingsImages[0] = document.createTextNode(img("g/g16.gif"));
		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}
                // Soporte para murallas
		var a = find("//img[@usemap='#map2']", XPFirst);
		if (a){
			a = a.parentNode.className;
			switch(a){
				case 'd2_x d2_0': break;
				case 'd2_x d2_1': var b = "g/g31.gif"; break;
				case 'd2_x d2_11': var b = "g/g32.gif"; break;
	                        case 'd2_x d2_12': var b = "g/g33.gif"; break;
        	        }
                	if (b) buildingsImages[buildingsImages.length - 3] = document.createTextNode(img(b));
		}

		// Despues recoge los nombres de cada uno
		xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// Y por ultimo los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		var table = document.createElement('TABLE');
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		var j = 0;
		for(var i = 0; i < buildingsDescs.length - (b ? 3 : 4); i++) {
			// FIXME: Se identifica una casilla con edificio si su nombre es distinto al de "Solar"
			if(buildingsDescs[i] != null && buildingsDescs[i].nodeValue != T('SOLAR')) {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

				buildingCode = buildingsImages[i].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

				// Si es actualizable se muestra junto con los recursos que necesita
				if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){
					// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
					if (j % edificiosPorFila == 0){
						var fila = document.createElement('TR');
						table.appendChild(fila);
					}
					j++;
					datos = 1;

					// Soporte para murallas
					switch(buildingCode){
						case 31: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["empalizada"]; break;
                                                case 32: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["muralla"]; break;
                                                case 33: buildingsImages[i].nodeValue = 'data:image/gif;base64,' + imagenes["terraplen"]; break;
                                        }

					var td = document.createElement("TD");
					fila.appendChild(td);

					var table2 = document.createElement('TABLE');
					table2.setAttribute("align", "center");
					td.appendChild(table2);

					var fila2 = document.createElement('TR');
					table2.appendChild(fila2);

					var td2 = document.createElement("TD");
					td2.setAttribute('class', 'f10');
					td2.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue + '<br/><img src="' + buildingsImages[i].nodeValue  + '" border="0"></a>';
					fila2.appendChild(td2);

					var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1]);
					var td3 = document.createElement("TD");
					td3.setAttribute('class', 'c f7');
					fila2.appendChild(td3);
					if (restante != null){
						td3.innerHTML = restante;
					}else{
						td3.innerHTML = T('SUBIR_NIVEL');
					}
				}
			}
		}
		if (j % edificiosPorFila != 0) fila.appendChild(document.createElement("TD"));
		table.style.position = 'absolute';
		// Se desplaza la tabla hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		table.style.top = 625 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

        /**
         * Realiza un resumen de la pagina del mapa
         */
	function preCalculate3(){
		var datos = 0;
		var a = find("//*/area[@onmouseover]", XPList);

		var table = document.createElement('TABLE');
		table.setAttribute("id", "tabla_mapa");
		table.setAttribute("sortCol", -1);
		table.setAttribute("class", "tbg");
		table.setAttribute("align", "center");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");
		var thead = document.createElement("THEAD");
		var tbody = document.createElement("TBODY");
		var fila = document.createElement('TR');
		fila.setAttribute('class', "rbg");
		thead.appendChild(fila);
		table.appendChild(thead);
		var etiquetas_tabla = ["JUGADOR", "ALIANZA", "ALDEA", "HAB", "COORD", "ACCION"];
		for (var i = 0; i < 6; i++){
			var td = elem('TD', T(etiquetas_tabla[i]));
			if (i < 4){
				switch(i){
					case 3: td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0); break;
					default: td.addEventListener("click", sortTable('tabla_mapa', i), 0);
				}
				td.style.cursor = "pointer";
			}
			fila.appendChild(td);
		}
		// Procesa todas las casillas visibles del mapa
		for(var i = 0; i < a.snapshotLength; i++) {
			var aldea = a.snapshotItem(i);
			var mouseOver = aldea.getAttribute("onmouseover");
			// Por cada aldea se muestra toda la informacion posible y enlaces rapidos para atacar y enviar recursos
			if(mouseOver.substring(0,1) != "x") {
				datos = 1;
				var fila = document.createElement('TR');
				tbody.appendChild(fila);
				datos_aldea = mouseOver.substring(4, mouseOver.length - 1).split(",");
				var href = aldea.getAttribute("href");
				fila.appendChild(elem('TD', datos_aldea[1].substring(1, datos_aldea[1].length - 1)));
				fila.appendChild(elem('TD', datos_aldea[3].substring(1, datos_aldea[3].length - 1)));
				fila.appendChild(elem('TD', datos_aldea[0].substring(1, datos_aldea[0].length - 1)));
				fila.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
				fila.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
				fila.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">' + T('ATACAR') + '</a> / <a href="' + href.replace("karte.php?d", "build.php?ze") + '&gid=17">' + T('COMERCIAR') + '</a>'));
			}
		}
		table.appendChild(tbody);
		table.style.position = 'absolute';
		table.style.top = 580 + longitudPantalla() + 'px';
		if (datos == 1) document.body.appendChild(table);
	}

	/**
	 * Ordena en orden ascendete y descendente
	 *
	 * Params:
	 *       sTableID:       ID de la tabla a ordenar
	 *       iCol:           Indice de la columna a ordenar
	 *       sDataType:      Tipo de datos de la columna, valor por defecto:texto
	 */
	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTable = document.getElementById(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse();
			else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		};
	}

	function convert(element, sDataType) {
		switch(sDataType) {
			case "int": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseInt(element.nodeValue);
			case "float": return ((element.nodeValue == null) || !element.nodeValue.match(/\d+/)) ? 0 : parseFloat(element.nodeValue);
			default: return (element == null) ? '' : element.nodeValue.toString().toLowerCase(); 
		}
	}

	function generateCompareTRs(iCol, sDataType) {
		return  function compareTRs(oTR1, oTR2) {
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2) return -1;
			else if (vValue1 > vValue2) return 1;
			else return 0;
		};
	}

	/**
	 * Implementa y muestra un bloc de notas. Guarda las notas como cookies en el navegador local
	 */
	function blocNotas(){
		var a = find("//form[@name='msg']", XPFirst);
		// Carga las notas previas si existen
		var notas = readCookie("notas");
		if (notas == null) notas = ''; else notas = unescape(notas);

		// Crea la estructura HTML del bloc
		var tabla = document.createElement("TABLE");
		var tr = document.createElement("TR");
		var td = document.createElement("TD");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var textarea = elem("TEXTAREA", notas);
		var input = document.createElement("INPUT");

		tabla.setAttribute("width", "430");
		td.setAttribute("align", "center");
		td.setAttribute("background", img('msg/block_bg.gif'));
		textarea.setAttribute("cols", "30");
		textarea.setAttribute("rows", "16");
		textarea.setAttribute("style", 'background-image: url(' + img('msg/underline.gif') + '); border : 0px; overflow:auto');
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", img('b/s1.gif'));
		// En el evento del boton de guardado actualiza el valor de la cookie (1 año de duracion por defecto)
		input.addEventListener("click", function(){ createCookie("notas", escape(textarea.value), 365); alert(T('GUARDADO')); }, 0);

		td.appendChild(elem("P", "&nbsp;"));
		p1.appendChild(textarea);
		td.appendChild(p1);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		tabla.appendChild(tr);
		a.parentNode.appendChild(document.createElement("P"));
		a.parentNode.appendChild(tabla);
	}

	/**
	 * Crea una funcion que se encarga del evento al desplazarse en el mapa. Actualiza la direccion destino en
	 * base al desplazamiento configurado
	 *
	 * Params:
	 * 	i:	Ordinal sobre la orientacion de la flecha
	 * 
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function createEventoMapa(i){
		var funcion = function (){
			var despl = [-512, 1, 512, -1];
			var d = document.getElementsByName("desp")[0].value;
			// Actualiza el valor de la cookie si se ha introducido un cantidad correcta
			if (d >= 1) createCookie("desp", d, 365);
			if (d > 1){
				var base = parseInt(this.href.split("=")[1]);
				this.href = this.href.replace(/z=(\d+)/, 'z=' + (base + (despl[i] * (d - 1))));
			}
		};
		return funcion;
	}

	/**
	 * Crea una casilla para introducir el desplazamiento deseado en el mapa e inserta los
	 * eventos en las flechas de direccion
	 */
	function desplazarMapa(){
		// Crea y anyade la casilla del desplazamiento
		var b = find("//form[@method='post']", XPFirst).parentNode;
		var tr = document.createElement("TR");
		// Carga el ultimo valor utilizado si existe
		var d = readCookie("desp");
		var td1 = elem("TD", "<b>" + T('DESP_ABR') + "</b>");
		var td2 = elem("TD", '<input name="desp" value="' + (d == null ? '1' : d) + '" size="2" maxlength="4" class="fm fm25">');
		td1.setAttribute("colspan", 2);
		td2.setAttribute("colspan", 2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		b.appendChild(tr);

		if (arrayValueExist(tw_server, server)){
			var center_id = xy2id(find("//input[@name='xp']", XPFirst).value, find("//input[@name='yp']", XPFirst).value);
			var href = "http://www.denibol.com/proyectos/travian_world/karte2.php?z=" + center_id + "&server=" + server;
			if (id_aldea != 0) href += "&did=" + id_aldea;
			var td3 = elem("TD", '<a href="' + href + '" onClick="pop(\'' + href + '\'); return false;" target="_blank"><img src="' + img('m/max.gif') + '" width="33" height="25" border="0" alt="' + T('MAP_EXT') + '" title="' + T('MAP_EXT') + '"></a>');
			td3.setAttribute("colspan", 2);
			tr.appendChild(td3);
		}

		// Inserta los eventos para manipular los desplazamientos
		var a = find("//map[@name='map2']", XPFirst);
		// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
		if (a.firstChild.nodeName != "AREA") var e = 1; else var e = 0;
		for (var i = 0; i < 4; i++){
			var link = a.childNodes[i + e];
			link.addEventListener("click", createEventoMapa(i), 0);
		}
	}

	/**
	 * Crea una nueva columna en las ofertas del mercado para mostrar la alianza de los
	 * vendedores
	 */
	function alianzaMercado(){
		var a = find("//tr[@class='rbg']", XPFirst).parentNode;

		// Prepara la insercion de la nueva columna
		var b = a.getElementsByTagName("TR");
		// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '8');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "8");

		// Crea e inserta la columna
		var columna = document.createElement("TD");
		columna.innerHTML = T('ALIANZA');
		b[1].appendChild(columna);

		// Rellena la columna con los nombres de las alianzas
		for(var i = 2; i < b.length - 1; i++){
			var alianza = document.createElement("TD");
			// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
			var alianza_txt = b[i].childNodes[b[i].childNodes.length == 12 ? 8 : 4].getAttribute('title');
			if (alianza_txt != null) alianza.innerHTML = alianza_txt;
			b[i].appendChild(alianza);
		}
	}

	/**
	 * Crea una funcion que procesa el evento al seleccionar una cantidad de un recurso al enviar materias primas
	 * desde el mercado
	 *
	 * Params:
	 *	recurso:	Ordinal del recurso
	 *	cantidad:	Cantidad a incrementar del determinado recurso
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function crearEventoRecursosMercado(recurso, cantidad){
		return function(){
			var suma = parseInt(document.getElementsByTagName('input')[recurso + 2].value);
			suma += cantidad;
			// La cantidad a enviar no puede superar lo disponible
			if (suma > actual[recurso]) suma = actual[recurso];
			// La cantidad a enviar no debe poder superar la capacidad de los comerciantes disponibles
			var max_capacidad = parseInt(find("//p/b", XPFirst).innerHTML);
			var max_comercian = parseInt(find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst).innerHTML.split(' ')[1].split('/')[0]);
			var max_transport = max_capacidad * max_comercian;
			if (suma > max_transport) suma = max_transport;

			document.getElementsByTagName('input')[recurso + 2].value = suma;
		}
	}

	/**
	 * Inserta nuevas cantidades seleccionables al enviar recursos desde el mercado
	 */
	function recursosMercado(){
		if (find("//form[@name='snd']//input[@type='text']", XPList).snapshotLength != 7) return;

		// Array con las nuevas cantidades	
		var max_capacidad = parseInt(find("//p/b", XPFirst).innerHTML);
		var cantidades = [100, 250, 500, 1000];
		var repetido = false;
		for (var i = 0; i < cantidades.length; i++) if (max_capacidad == cantidades[i]){ repetido = true; break; }
		if (!repetido) cantidades = [100, 500, 1000, max_capacidad];
		var a = find("//form[@name='snd']//table[@class='f10']", XPFirst);
		var k = 0;
		// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
		a = a.childNodes[a.childNodes.length == 2 ? 1 : 0].childNodes;
		for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
			// Se eliminan las posibilidades originales
			// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
			a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);

			// Por cada nueva cantidad y recurso se crea un enlace con el evento asociado
			for(var j = 0; j < cantidades.length; j++){
				var enlace = document.createElement('A');
				enlace.href = "javascript:void(0)";
				enlace.innerHTML = '(' + cantidades[j] + ')';
				enlace.addEventListener('click', crearEventoRecursosMercado(k, cantidades[j]), false);

				a[i].appendChild(enlace);
			}
			k++;
		}
	}

	/**
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente aldea y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function puntosCultura(){
		var a = find("//td[@class='s3']//b", XPList);
		if (a.snapshotLength != 5) return;

		// Produccion de puntos de cultura de todas las aldeas
		var pc_prod_total = parseInt(a.snapshotItem(2).innerHTML);
		// Cantidad de puntos de cultura actuales
		var pc_actual = parseInt(a.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente aldea
		var pc_aldea_prox = parseInt(a.snapshotItem(4).innerHTML);

		// Numero de aldeas actuales
		var aldeas_actuales = Math.floor(Math.sqrt(pc_aldea_prox / 2000));
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = Math.floor(Math.sqrt(pc_actual / 2000));
		// PC necesarios para conseguir la siguiente aldea
		var pc_necesarios = pc_aldea_prox - pc_actual;
		// Tiempo en segundos hasta conseguir los puntos de cultura necesarios
		var tiempo = (pc_necesarios / pc_prod_total) * 86400;

		var fecha = new Date();
		fecha.setTime(fecha.getTime() + (tiempo * 1000));
		var texto_tiempo = calcularTextoTiempo(fecha);

		var texto = '';
		// Si hay PC de sobra
		if (pc_aldea_prox < pc_actual){
			texto += T('FUNDAR') + ' <b>' + (aldeas_posibles - aldeas_actuales + 1) + '</b> ' + T('ALDEAS');
		}else{
			texto += T('FALTA') + ' <b>' + pc_necesarios + '</b> ' + T('PC') +'<br/>';
			texto += T('LISTO') + " " + texto_tiempo;
		}

		a.snapshotItem(4).parentNode.innerHTML += "<p>" + texto + "</p>";
	}

	/**
	 * Crea la funcion que gestiona el evento de los filtros en el mercado
	 *
	 * Param:
	 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
	 *	recurso	Recurso del filtro (0-4 recursos basicos, 5 para cualquiera)
	 *
	 * Returns:
	 *	La funcion que gestiona el evento
	 */
	function funcionFiltrosMercado(tipo, recurso){
		var funcion = function (){
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList);
			for (var i = 0; i < a.snapshotLength - 1; i++){
				var b = a.snapshotItem(i);		
				// FIXME: Apaño para Firefox. FF mete nodos de tipo texto vacios
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;

				// Para mantener 3 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
                                switch(tipo){
                                        case 0: if ((ofrezco != recurso) && recurso != 5){
                                                        b.setAttribute("style", "display:none");
                                                        b.setAttribute("filtroOfrezco", "on");
                                                }else if (b.getAttribute("filtroOfrezco") == "on"){
                                                        b.removeAttribute("filtroOfrezco");
                                                        if (b.getAttribute("filtroBusco") != "on" && b.getAttribute("filtroTipo") != "on" && b.getAttribute("filtroCarencia") != "on") b.removeAttribute("style");
                                                } break;
                                        case 1: if ((busco != recurso) && recurso != 5){
                                                        b.setAttribute("style", "display:none");
                                                        b.setAttribute("filtroBusco", "on");
                                                }else if (b.getAttribute("filtroBusco") == "on"){
                                                        b.removeAttribute("filtroBusco");
                                                        if (b.getAttribute("filtroOfrezco") != "on" && b.getAttribute("filtroTipo") != "on" && b.getAttribute("filtroCarencia") != "on") b.removeAttribute("style");
                                                } break;
                                        case 2: switch(recurso){
                                                        case 1: if (ofrezco_cantidad < busco_cantidad){
                                                                        b.setAttribute("style", "display:none");
                                                                        b.setAttribute("filtroTipo", "on");
                                                                }else if (b.getAttribute("filtroTipo") == "on"){
                                                                        b.removeAttribute("filtroTipo");
                                                                        if (b.getAttribute("filtroOfrezco") != "on" && b.getAttribute("filtroBusco") != "on" && b.getAttribute("filtroCarencia") != "on") b.removeAttribute("style");
                                                                } break;
                                                        case 2: b.removeAttribute("filtroTipo");
                                                                if (b.getAttribute("filtroOfrezco") != "on" && b.getAttribute("filtroBusco") != "on" && b.getAttribute("filtroCarencia") != "on") b.removeAttribute("style");
                                                                break;
                                                } break;
                                        case 3: switch(recurso){
                                                        case 1: if (carencia == true){
                                                                        b.setAttribute("style", "display:none");
                                                                        b.setAttribute("filtroCarencia", "on");
                                                                }else if(b.getAttribute("filtroCarencia") == "on"){
                                                                        b.removeAttribute("filtroCarencia");
                                                                        if (b.getAttribute("filtroOfrezco") != "on" && b.getAttribute("filtroBusco") != "on" && b.getAttribute("filtroTipo") != "on") b.removeAttribute("style");
                                                                } break;
                                                        case 2: b.removeAttribute("filtroCarencia");
                                                                if (b.getAttribute("filtroOfrezco") != "on" && b.getAttribute("filtroBusco") != "on" && b.getAttribute("filtroTipo") != "on") b.removeAttribute("style");
                                                                break;
                                                } break;
                                }
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 4; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (recurso - 1)){
							a.setAttribute("style", "background-color:#F5F5F5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
		};
		return funcion;
	}

	/**
	 * Establece filtros por tipo de recurso y proporcion de intercambio en las oferta de venta del 
	 * mercado
	 */
	function filtrosMercado(){
		var table = document.createElement("TABLE");
		table.setAttribute("class", "tbg");
		table.setAttribute("style", "width:100%");
		table.setAttribute("cellspacing", "1");
		table.setAttribute("cellpadding", "2");

		// Se crea la tabla con 3 filas, Ofrezco, Busco y Tipo
		var etiquetas = [T('OFREZCO'), T('BUSCO')];
		for (var j = 0; j < 2; j++){
			var tr = document.createElement("TR");
			tr.appendChild(elem("TD", etiquetas[j]));
			// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
			for (var i = 0; i < 4; i++){
				var td = document.createElement("TD");
				td.setAttribute("id", "filtro" + j + i);
				var ref = elem("A", "<img src='" + img('r/' + (i+1) + '.gif') + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "'>");
				td.addEventListener("click", funcionFiltrosMercado(j, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			var td = document.createElement("TD");
			td.setAttribute("style", "background-color:#F5F5F5");
			td.setAttribute("id", "filtro" + j + "4");
			var ref = elem("A", T('CUALQUIERA'));
			ref.setAttribute("href", "javascript:void(0)");
			td.addEventListener("click", funcionFiltrosMercado(j, 5), 0);
			td.appendChild(ref);
			tr.appendChild(td);
			table.appendChild(tr);
		}

		// La fila del tipo especifica transacciones 1:1 o 1:x
		var tr = document.createElement("TR");
		tr.appendChild(elem("TD", T('TIPO')));
		table.appendChild(tr);
		var etiquetas_tipo = ["1:1", "1:x"];
		for (var i = 0; i < 2; i++){
			var td = document.createElement("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("id", "filtro" + 2 + i);
			if (i == 1) td.setAttribute("style", "background-color:#F5F5F5");
			var ref = elem("A", etiquetas_tipo[i]); 
			ref.setAttribute("href", "javascript:void(0)"); 
			td.addEventListener("click", funcionFiltrosMercado(2, (i+1)), 0);
			td.appendChild(ref); 
			tr.appendChild(td);
		}
		tr.appendChild(document.createElement("TD"));

                var tr = document.createElement("TR");
                tr.appendChild(elem("TD", T('DISPONIBLE')));
                table.appendChild(tr);
                var etiquetas_carencia = [T('SI'), T('NO')];
                for (var i = 0; i < 2; i++){
                        var td = document.createElement("TD");
                        td.setAttribute("colspan", "2");
                        td.setAttribute("id", "filtro" + 3 + i);
                        if (i == 1) td.setAttribute("style", "background-color:#F5F5F5");
                        var ref = elem("A", etiquetas_carencia[i]);
                        ref.setAttribute("href", "javascript:void(0)");
                        td.addEventListener("click", funcionFiltrosMercado(3, (i+1)), 0);
                        td.appendChild(ref);
                        tr.appendChild(td);
                }
                tr.appendChild(document.createElement("TD"));

		// Busca la tabla de ofertas y la inserta justo antes
		var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
		var p = document.createElement("P");
		p.appendChild(table);
		a.parentNode.insertBefore(p, a);
	}

	/**
	 * Muestra una opcion adicional oculta en los resumenes de aldeas del Plus
	 */
	function opcionMenuPlus(){
		var a = find("//td[@class='s3']/p", XPFirst);
		if (a) a.innerHTML += ' | <a href="dorf3.php?s=4">' + T('DETALLES') + '</a>';
	}

	function crearFuncionExplorarUnidades(id, coste){
		var funcion = function (){
			var a = find("//input[@type='text']", XPList).snapshotItem(id - 1);
			var b = find("//div[@name='exp" + id + "']", XPFirst);
			var c = calculateResourceTime(arrayByN(coste, a.value));
			if (c) b.innerHTML = c; else b.innerHTML = '';
		};
		return funcion;
	}

	function tiempoExplorarUnidades(){
		if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
		var a = find("//table[@class='tbg']//tr[@bgcolor]", XPList);
		for (var i = 0; i < a.snapshotLength; i++){
			var b = a.snapshotItem(i);
			var c = b.getElementsByTagName("TABLE")[0].getElementsByTagName("TD")[2].textContent.split("|").splice(0,4);
			
			var div = document.createElement("DIV");
			div.setAttribute("name", "exp" + (i+1));
			var tr = document.createElement("TR");
			var td = document.createElement("TD");
			td.setAttribute("colspan", "2");
			td.setAttribute("class", "c f7 s7");
			td.appendChild(div);
			tr.appendChild(td);

			// FIXME: Apaño para Firefox. FF mete un nodo extra al principio de la tabla
			var d = b.getElementsByTagName("TABLE")[0].childNodes;
			d[d.length - 1].appendChild(tr);

			b.getElementsByTagName("INPUT")[0].addEventListener("keyup", crearFuncionExplorarUnidades((i+1), c), 0);
		}
	}

	function tiempoExplorar(){
		var a = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
		// FIXME: Apaño para Firefox. FF mete varios nodos extras entre las columnas
		if (a == null || (a.childNodes.length != 2 && a.childNodes.length != 4)) return;

		var a = a.parentNode.childNodes;
		for (var i = 1; i < a.length; i++){
			var b = a[i];
			var c = b.getElementsByTagName("DIV");
			if (c.length == 2 && c[1].className == 'c'){
				var d = b.getElementsByTagName("TD")[3].textContent.split("|").splice(0,4);
				var e = calculateResourceTime(d);
				if (e) c[1].innerHTML = e;
			}
		}
	}

	/**
	 * Modifica el valor por defecto del tipo de ataque a enviar
	 */
	function ataqueDefecto(){
		var accion = 4; // 2 -> Apoyo, 3 -> Ataque, 4 -> Atraco

                var cities = find("//div[preceding-sibling::div[@class='div4']]//table[@class='f10']", XPFirst);
		if(cities && location.href.search(/z=(\d+)/) >= 0){
			var z = RegExp.$1;
			cities = cities.firstChild;
			for (var i = 0; i < cities.childNodes.length; i++){
				var city = cities.childNodes[i];
				city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
				var id = xy2id(RegExp.$1, RegExp.$2);
				if (id == z) accion = 2;
			}
		}

		find("//input[@name='c' and @value='" + accion + "']", XPFirst).checked = true;
	}

        /**
         * Inserta un nuevo marcador y lo almacena
         *
         * Params:
         *      texto:  Texto del marcador
         *      enlace: Enlace a donde apunta el marcador
         */
        function agregarMarcador(texto, enlace){
                var marc = readCookie("marcadores");
                var nuevo = texto + "$" + enlace;
                if (marc != null && marc != '') marc += "$$" + nuevo;
                else marc = nuevo;
                createCookie("marcadores", marc);
        }

        /**
         * Crea el evento de eliminar un marcador. Lo elimina y ademas refresca la lista donde estan mostrados
         *
         * Params:
         *      num:    Identificador de marcador a eliminar
         */
        function crearEventoEliminarMarcador(num){
                return function(){
                        var marc = readCookie("marcadores");
                        if (marc != null){
                                marc = marc.split("$$");
                                marc.splice(num, 1);
                                createCookie("marcadores", marc.join("$$"));
                                removeElement(find("//p[@id='marcadores']", XPFirst));
                                mostrarMarcadores();
                        }
                }
        }

        /**
         * Recupera los marcadores almacenados. Dos marcadores estan separados por el simbolo $$ y
         * en cada marcador el enlace y el texto estan separados por $. No se espera encontrar esos simbolos
         * en el texto o en los enlaces, ya que de lo contrario fallaria.
         *
         * Returns:
         *      Un array con cada uno de los marcadores
         */
        function obtenerMarcadores(){
                var marcadores = new Array();
                var marc = readCookie("marcadores");
                if (marc != null && marc != ''){
                        marc = marc.split("$$");
                        for (var i = 0; i < marc.length; i++) marcadores[i] = marc[i].split("$");
                }
                return marcadores;
        }

        /**
         * Muestra los marcadores almacenados
         */
        function mostrarMarcadores(){
                // Intenta insertarlos en la lista derecha, si no existe la crea
                var ba = find("//div[preceding-sibling::div[@class='div4']]", XPFirst);
                if (!ba){
                        ba = document.createElement("DIV");
                        ba.setAttribute("style","position:absolute; z-index:5; border: 0px solid #000000; left: 700px; top: 100px;");
                        ba.setAttribute("id","ba");
                        insertAfter(find("//div[@class='div4']", XPFirst), ba);
                }
                var div = document.createElement("P");
                var titulo = elem("B", T('MARCADORES') + ":");
                var enlace = elem("A", T('ANYADIR'));
                var tabla = document.createElement("TABLE");
                tabla.setAttribute("class","f10");
                div.setAttribute("id","marcadores");
                enlace.href = "javascript:void(0);";
                // Al anyadir se pide el texto y el enlace, si se cancela o se deja vacio alguno se aborta
                // Despues de insertar se refresca la lista volviendola a insertar
                enlace.addEventListener("click", function(){
                                                                var a = prompt(T('ENLACE'));
                                                                if (a == null || a == '') return;
                                                                var b = prompt(T('TEXTO'));
                                                                if (b == null || b == '') return;
                                                                agregarMarcador(b, a);
                                                                removeElement(find("//p[@id='marcadores']", XPFirst));
                                                                mostrarMarcadores();
                                                }, 0);
                titulo.setAttribute("class","f10");
                div.appendChild(titulo);
                div.appendChild(document.createTextNode(" (")); div.appendChild(enlace); div.appendChild(document.createTextNode(")"));
                div.appendChild(tabla);
                ba.appendChild(div);

                // Se obtienen los marcadores y se insertan junto con un enlace para eliminarlos
                var marcadores = obtenerMarcadores();
                for (var i = 0; i < marcadores.length; i++){
                        var tr = document.createElement("TR");
                        var td = elem("TD", "<span>&#8226;</span>&nbsp; <a href='" + marcadores[i][1] + "'>" + marcadores[i][0] + "</a>");
                        var enlace = elem("A", " <img src='" + img('a/del.gif') + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
                        enlace.href = "javascript:void(0);";
                        enlace.addEventListener("click", crearEventoEliminarMarcador(i), 0);
                        td.appendChild(enlace);
                        tr.appendChild(td);
                        tabla.appendChild(tr);
                }
        }

	function cityLinks(){
                var cities = find("//div[preceding-sibling::div[@class='div4']]//table[@class='f10']", XPFirst);
                if (!cities) return;

		cities = cities.firstChild;
		for (var i = 0; i < cities.childNodes.length; i++){
			var city = cities.childNodes[i];
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			var id = xy2id(RegExp.$1, RegExp.$2);
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + id + "'><img src='" + img('a/def1.gif') + "' width='12' border='0' title='" + T('TROPAS') + "'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?ze=" + id + "&gid=17'><img src='" + img('r/4.gif') + "' height='12' border='0' title='" + T('ENVIAR') + "'></a>"));
		}
	}

	function sanearEnlaces(){
		var a = find("//a[@href='#']", XPList);
		for (var i = 0; i < a.snapshotLength; i++) a.snapshotItem(i).href = 'javascript:void(0)';
	}

	function mostrarConfiguracion(){
		var a = find("//form", XPFirst);
		var tabla = document.createElement("TABLE");
		tabla.setAttribute("cellspacing", "1");
		tabla.setAttribute("cellpadding", "2");
		tabla.setAttribute("class", "tbg");
		tabla.setAttribute("id", "configuracion");

		var fila = document.createElement("TR");
		var td = elem("TD", "Travian Beyond");
		td.setAttribute("class", "rbg");
		td.setAttribute("colspan", "2");
		fila.appendChild(td);
		tabla.appendChild(fila);

		var parametros = ["desp", "marcadores", "notas"];
		for (var i = 0; i < parametros.length; i++){
			fila = document.createElement("TR");
			fila.appendChild(elem("TD", parametros[i]));
			var valor = readCookie(parametros[i]);
			fila.appendChild(elem("TD", "<input type='text' name='" + parametros[i] + "' value='" + (valor != null ? valor : '') + "' class='fm'/>"));
			tabla.appendChild(fila);
		}
		insertAfter(a, tabla);

		var imagen = document.createElement("IMG");
		imagen.setAttribute("src", img('b/s1.gif', true));
		imagen.addEventListener("click", function(){ 
			var parametros = get('configuracion').getElementsByTagName("INPUT");
			for (var i = 0; i < parametros.length; i++) createCookie(parametros[i].name, parametros[i].value);
			alert(T('GUARDADO')); 
		}, 0);
		var p = document.createElement("P");
		p.setAttribute("align", "center");
		p.appendChild(imagen);
		insertAfter(tabla, p);
	}

	/**
	 * Crea el temporizador encargado de actualizar los nuevos relojes y las cantidades de recursos que faltan
	 */
	function setTimers(){
		// Calcula cada cuantos segundos debe actualizar cada contador de recursos restantes para aprovechar el temporizador
		// del resto de relojes
		var frecuencia = new Array(4);
		var contador = new Array(4);
		for (var i = 0; i < 4; i++){
			frecuencia[i] = (1 / produccion[i]) * 1000;
			if (!isFinite(frecuencia[i]) || frecuencia[i] < 0) frecuencia[i] = Number.POSITIVE_INFINITE;
			if (total[i] - actual[i] == 0) frecuencia[i] = Number.POSITIVE_INFINITE;
			contador[i] = 0;
		}

		setInterval(function () {
			/*
			 * Se distinguen dos tipos de temporizadores, timeout y timeouta. Solo los primeros provocan que la pagina se actualice
			 * al llegar a 0.
			 */
			var relojes = find("//*[@id='timeout' or @id='timeouta']", XPList);
			for (var i = 0; i < relojes.snapshotLength; i++){
				var tiempo = calcular_segundos(relojes.snapshotItem(i).innerHTML) - 1;
				if (tiempo >= 0){
					relojes.snapshotItem(i).innerHTML = formatear_tiempo(tiempo);
				}else{
					if (relojes.snapshotItem(i).id == 'timeout'){
						document.location.reload();
					}
				}
			}

			/*
			 * Actualiza las cantidades restantes por cada tipo de recurso si corresponde hacerlo en este
			 * ciclo de reloj segun la adaptacion de frecuencias anterior
			 */
			for (var i = 0; i < 4; i++){
				if (contador[i] >= frecuencia[i]){
					var recursos = find("//*[@id='timeout" + i + "']", XPList);
					for (var j = 0; j < recursos.snapshotLength; j++){
						var cantidad = recursos.snapshotItem(j).innerHTML - 1;
						if (cantidad >= 0){
							recursos.snapshotItem(j).innerHTML = cantidad;
						}else{
							document.location.reload();
						}
					}
					contador[i] = 0;
				}else{
					contador[i] += 1000;
				}
			}
		},1000);
	}

	if (getVersion() == 3)					return;
	if (location.href.match(/karte2.php($|\?z=)/)){		desplazarMapa(); return; }

	/* Acciones generales a todas las paginas */
	getGeneralData();
	hideAd();
	quickLinks();
	buildingLinks();
	playerLinks();
	calculateFillTime();
	cityLinks();

	/* Acciones especificas para algunas paginas */
	if (location.href.indexOf('build.php?') != -1){		quickCity(); recursosMercado(); tiempoExplorarUnidades(); tiempoExplorar(); }
	if (location.href.indexOf('build.php') != -1){ 		calculateBuildTime(); tiempoExplorarUnidades(); tiempoExplorar(); }
	if (location.href.indexOf('dorf') != -1) 		confirmDelete();
	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
	if (location.href.indexOf('dorf2') != -1)		preCalculate2();
	if (location.href.indexOf('dorf3') != -1)		opcionMenuPlus();
	if (location.href.indexOf('berichte.php?id=') != -1)	reportBatalla();
	if (location.href.indexOf('a2b.php') != -1){		quickCity(); ataqueDefecto(); }
	if (location.href.match(/build.php\?(.*)&s=2/))		puntosCultura();
	if (location.href.match(/build.php\?(.*)&t=1/)){	alianzaMercado(); filtrosMercado(); }
	if (location.href.match(/karte.php($|\?z=)/)){		preCalculate3(); desplazarMapa(); }
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) checkAll();
	if (location.href.match(/nachrichten.php$/))		blocNotas();
	if (location.href.match(/spieler.php\?s=2/))		mostrarConfiguracion();

	/* Mas acciones generales */
	mostrarMarcadores();
	sanearEnlaces();
	setTimers();
};

// GreaseMonkey ejecuta sus scripts en el evento DOMContentLoaded, por lo que se puede ejecutar directamente,
// Opera por el contrario necesita agregar la funcion al evento
window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();

/*
TODO:
	- Bloc de notas para cada aldea o jugador
        - Conseguir enlace a una calculadora multilenguaje
	- Enlace directo a la batalla compactada

FIXME:
	- El refresco de materiales falla cuando se produce mas de 3600 la hora de un material concreto
	- Comprobar los costes de los niveles de todos los edificios asi como las diferencias entre servidores (http://help.travian.com)
	- Refinar las traducciones en ingles, italiano, aleman, frances y holandes
	- Mejorar los apaños en el codigo marcados por FIXMEs
	- Comentar mas en detalle algunas cosas
*/
