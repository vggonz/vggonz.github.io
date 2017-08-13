// ==UserScript==
// @name Travian Beyond
// @author Victor Garcia (aka Croc)
// @include http://s*.travian.net/*.php*
// @exclude http://s*.travian.net/hilfe.php*
// @exclude http://s*.travian.net/log*.php*
// @exclude http://s*.travian.net/karte2.php*
// @version 1.6
// @description  Enables some Travian.net features
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */

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
	[935,115,650,290],
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
	[4155, 3635, 6230, 3535], 	// Level 17
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
	[2570,3020,4740,1965],
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
	[230,125,170,125],
	[295,160,215,160],
	[380,205,275,205],
	[485,265,350,265],
	[620,340,450,340],
	[795,430,575,430],
	[1015,555,740,555]
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
	[50,60,40,20],
	[65,75,50,25],
	[80,100,65,35],
	[105,125,85,40],
	[135,160,105,55],
	[170,205,135,70],
	[220,265,175,90],
	[280,340,225,115],
	[360,430,290,145],
	[460,555,370,185]
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
	[630,420,780,360],
	[805,540,1000,460],
	[1030,690,1280,590],
	[1320,880,1635,755],
	[1690,1125,2095,965],
	[2165,1445,2680,1235],
	[2770,1845,3430,1585],
	[3545,2365,4390,2025],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[4540,3025,5620,2595],
	[68600,45735,84935,39200]
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
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765],
	[7195,3875,6085,2765]
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


var buildingCost = new Array(31);
buildingCost[0] = lenyadorCost;
buildingCost[1] = barroCost;
buildingCost[2] = hierroCost;
buildingCost[3] = cerealCost;

//buildingCost[2] = wallRomansCost;
//buildingCost[3] = wallGaulsCost;
//buildingCost[4] = wallTeutonsCost;
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

var uc = new Array(); 

// Romanos 
uc[1] = [120,100,180,40]; 		// Legionario 
uc[2] = [100,130,160,70]; 		// Pretoriano 
uc[3] = [150,160,210,80]; 		// Imperano 
uc[4] = [140,160,20,40]; 		// Legati 
uc[5] = [550,440,320,100]; 		// Imperatoris 
uc[6] = [550,640,800,180]; 		// Caesaris 
uc[7] = [900,360,500,70]; 		// Carnero 
uc[8] = [950,1350,600,90]; 		// Catapulta 
uc[9] = [30750,27200,4500,37500]; 	// Senador 
uc[10] = [5800,5300,7200,5500]; 	// Descubridor 

// Germanos
uc[11] = [95,75,40,40]; 		// Lanzador porras 
uc[12] = [145,70,85,40]; 		// Luchador lanza 
uc[13] = [130,120,170,70]; 		// Luchador hacha 
uc[14] = [160,100,50,50]; 		// Emisario 
uc[15] = [370,270,290,75]; 		// Paladin 
uc[16] = [450,515,480,80]; 		// Caballista teutona 
uc[17] = [1000,300,350,70]; 		// Ariete 
uc[18] = [900,1200,600,60]; 		// Catapulta 
uc[19] = [35500,26600,25000,27200]; 	// Cabecilla 
uc[20] = [7200,5500,5800,6500]; 	// Descubridor 

// Galos
uc[21] = [100,130,55,30]; 		// Falange 
uc[22] = [140,150,185,60]; 		// Luchador espada 
uc[23] = [170,150,20,40]; 		// Batidor 
uc[24] = [350,450,230,60]; 		// Rayo 
uc[25] = [360,330,280,120]; 		// Druida 
uc[26] = [500,620,675,170]; 		// Haeduanos 
uc[27] = [950,555,330,75]; 		// Carnero 
uc[28] = [960,1450,630,90]; 		// Catapulta 
uc[29] = [30750,45400,31000,37500]; 	// Cacique / cola 
uc[30] = [5500,7000,5300,4900]; 	// Descubridor 

var actual = new Array(4);		// Informacion de recursos almacenados
var total = new Array(4);		// Capacidad de los almacenes y granero
var produccion = new Array(4);		// Produccion por segundo
var imagenes = new Array();		// Imagenes pre-cargadas

// Imagen de un sobre para enviar IGM
imagenes["igm"] = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
// Imagen compuesta para el mercado con 3 secciones: enviar recursos, compra y venta
imagenes["mercado"] = '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';
// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
imagenes["militar"] = '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';

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
function LZ(n){		return (n > 9 ? n : '0' + n); }

/**
 * Crea un nuevo elemento de tipo DIV con un contenido prefijado
 * 
 * Params:
 *	content	Contenido del nuevo elemento creado
 * 
 * Returns:
 * 	Referencia al nuevo elemento
 */
function div(content){ 	return elem("div", content); }

/**
 * Wrapper para la funcion getElementById
 *
 * Params:
 *	id	Texto del ID del elemento a buscar
 * 
 * Returns:
 * 	Elemento del documento con el ID especificado
 */
function get(id){ 	return document.getElementById(id); }

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
	node.parentNode.insertBefore(node, referenceNode.nextSibling);
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
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
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
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}else{ var expires = ""; }
	document.cookie = name + "=" + value + expires + "; path=/";
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
	var ca = document.cookie.split(';');
	var nameEQ = name + "=";
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length); //delete spaces
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
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
function img(ref){ return pack_grafico + ref; }

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
 * y anyadir los enlaces de construccion para el lazo de espera
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
			if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE') b.removeChild(b.firstChild);
			// Si faltan recursos se pone la informacion y el enlace al lazo de espera
			if (a != null){
				b.appendChild(div(a));
				if (celdas.snapshotLength == 1) b.appendChild(calculateLazo(recursos));
				k--;
			// Si hay recursos pero ya se esta construyendo se pone solo el enlace al lazo de espera
			}else{
				if (celdas.snapshotLength == 1)	b.appendChild(calculateLazo(recursos));
			}
		}
	}
}

/**
 * Agrega un nuevo edificio al lazo de espera
 *
 * Params:
 * 	titulo:	Nombre del edificio
 *	id:	Identificador del solar
 *	nivel:	Nuevo nivel a alcanzar
 *	recursos:	Array con los costes de la actualizacion
 */
function addLazo(titulo, id, nivel, recursos){
	var lazo;
	var a = readCookie("lazo" + id_aldea);
	if (!a) lazo = ''; else lazo = a;
	// Cada construccion se separa con un "-"
	if (lazo != '') lazo += '-';
	// Cada parametro del edificio se separa con "#"
	lazo += titulo + "#" + id + "#" + nivel + "#" + recursos[0] + "#" + recursos[1] + "#" + recursos[2] + "#" + recursos[3];
	// Existe un lazo por aldea con su identificador
	createCookie("lazo" + id_aldea, lazo, 1); 
}

/**
 * Elimina un edificio del lazo
 *
 * Params:
 *	pos:	Posicionen el lazo del edificio a borrar
 */
function deleteLazo(pos){
	var a = readCookie("lazo" + id_aldea);
	if (!a || a == '') return;
	b = a.split("-");
	if (b.length > 1) b.splice(pos, 1); else b[0] = '';
	createCookie("lazo" + id_aldea, b.join("-"), 1);
}

/**
 * Devuelve informacion sobre una posicion del lazo
 *
 * Params:
 *	pos	Posicion en el lazo de espera
 *
 * Returns:
 *	Array con la informacion del lazo
 */
function getLazo(pos){
	var a = readCookie("lazo" + id_aldea);
	if (!a || a == '') return;
	b = a.split("-");
	return b[pos].split("#");
}

/**
 * Cuenta el numero de elementos que hay en el lazo
 *
 * Returns:
 *	El numero de elementos del lazo
 */
function countLazo(){
	var a = readCookie("lazo" + id_aldea);
	if (!a || a == '') return 0;
	return a.split("-").length;
}

/**
 * Crea el enlace para anyadir un edificio al lazo de espera
 *
 * Params:
 *	recursos	Coste del edificio
 *
 * Returns:
 *	Referencia a un elemento de tipo DIV con la informacion adecuada
 */
function calculateLazo(recursos){
	location.href.search(/build.php\?g?id=(\d+)/) > 0;
	var id = RegExp.$1;

	var numLazo = countLazo();
	var yaAnyadido = false;
	// Comprueba si el edificio ya se encuentra anyadido al lazo
	for (var i = 0; i < numLazo; i++) if (getLazo(i)[1] == id) yaAnyadido = true;
	if (!yaAnyadido){
		// Recupera el nombre y nivel del edificio
		var titulo = find("//td[@class='s3']//h1//b", XPFirst).innerHTML;
		var palabras_titulo = titulo.split(" ");
		var nivel = parseInt(palabras_titulo.pop()) + 1;
		palabras_titulo.pop();
		titulo = palabras_titulo.join(" ");

		// Crea el enlace a la funcion que lo anyade al lazo
		var enlace = elem("A", "Ampliaci&oacute;n a grado " + nivel);
		enlace.setAttribute("href", "dorf" + (id < 19 ? "1" : "2") + ".php");
		enlace.addEventListener("click", function(){ addLazo(escape(titulo), id, nivel, recursos); }, 0);
		var textoLazo = document.createElement("DIV");
		textoLazo.appendChild(enlace);
		textoLazo.appendChild(elem("SPAN", ' (Lazo de espera)'));
	}else{
		var textoLazo = div('Ya est&aacute; en espera');
	}
	return textoLazo;
}

/**
 * Crea un enlace a un elemento del lazo
 *
 * Params:
 *	pos	Posicion del lazo
 *
 * Returns:
 *	Referencia a un elemento de tipo A con la informacion del edificio en cola
 */
function createLazoLink(pos){
		var enlace = elem("A", '<img src="' + img('img/es/a/del.gif') + '" width="12" height="12" border="0" title="cancelar">');
		enlace.setAttribute("href", document.location.href);
		enlace.addEventListener("click", function(){ deleteLazo(pos); }, 0);

		return enlace;
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

function longitudPantalla(){
	var pixelsPorLinea = 20;
	var lazo = countLazo() - 1;
	lazo = lazo > 0 ? lazo * pixelsPorLinea : 0;

	var enlaces = find("//li/a", XPList).snapshotLength - 23;
	enlaces = enlaces > 0 ? enlaces * pixelsPorLinea : 0;

	return lazo + enlaces;
}

function calculateResourceTime(necesario){
	var texto_restante = '';
	var tiempo_max = 0;
	var a = null;
	
	for (i = 0; i < 4; i++){
		restante = necesario[i] - actual[i];
	
		if (restante > 0){
			texto_restante += '<img src="' + img('img/es/r/' + (i+1) + '.gif') + '" width="18" height="12" border="0"><span id="timeout' + i + '">' + restante + '</span> | ';
			var tiempo = Math.round(restante / produccion[i]);
			if (tiempo > tiempo_max) tiempo_max = tiempo;
			if (tiempo < 0) tiempo_max = 'Infinity';
		}
	}
	
	if (tiempo_max == 'Infinity'){
		a = 'Falta ' + texto_restante + ' <img src="' + img('img/es/a/clock.gif') + '" width="18" height="12"> Nunca';
	}else if (tiempo_max > 0){
		var tiempo2 = formatear_tiempo(tiempo_max + 5);
		fecha = new Date();
		fecha.setTime(fecha.getTime() + (tiempo_max * 1000));

		ahora = new Date();
		horas = ((fecha.getTime() - ahora.getTime()) / 1000 / 60 / 60);
		horas += ahora.getHours() + (ahora.getMinutes() / 60);
		if (horas < 24){
			tiempo_restante = "hoy";
		}else if (horas < 48){
			tiempo_restante = "ma&ntilde;ana";
		}else if (horas < 72){
			tiempo_restante = "pasado ma&ntilde;ana";
		}else{
			tiempo_restante = "el " + LZ(fecha.getDate()) + "/" + LZ((fecha.getMonth()+1));
		}

		a = 'Falta ' + texto_restante + ' <img src="' + img('img/es/a/clock.gif') + '" width="18" height="12"> <span id="timeout">' + tiempo2 + '</span><br/> Todo listo ' + tiempo_restante + " a las " + LZ(fecha.getHours()) + ":" + LZ(fecha.getMinutes());
	}
	return a;
}

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

	if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatear_tiempo(tiempo_max + 5);
	return tiempo_max;
}

function calculateFillTime(){
	for (var i = 0; i < 4; i++){
		if (produccion[i] < 0){
			var tiempo = Math.round(actual[i] / -produccion[i]);
		}else if (produccion[i] == 0){
			var tiempo = -1;
		}else{
			var tiempo = Math.round((total[i] - actual[i]) / produccion[i]);
		}

		var celda = elem("span", formatear_tiempo(tiempo));
		celda.id = "timeouta";
		celda.className = 'f7 c slr3';
		celda.style.position = 'absolute';
		celda.style.top = '13px';
		var a = get('l'+(i+1)).previousSibling;
		if (a.nodeName == '#text') a = a.previousSibling;
		a.appendChild(celda);
	}
}

/**
 * Recupera informacion generica inicial para el resto de funciones
 */
function getGeneralData(){
	// Ruta al pack grafico
	pack_grafico = find("//link[@rel='stylesheet']", XPFirst).href.replace("es.css", "");
	// Identificador de aldea actual
	id_aldea = getIdAldea();
	// Por cada tipo de recurso: cantidad actual almacenada, capacidad total del almacen / granero y produccion por segundo
	for (var i = 0; i < 4; i++){
		actual[i] = get('l'+(i+1)).innerHTML.split("/")[0];
		total[i] = get('l'+(i+1)).innerHTML.split("/")[1];
		produccion[i] = get('l'+(i+1)).title/3600;
	}
}

/**
 * Oculta el anuncio de la version Plus
 */
function hideAd(){
	var ad = find("//table[@class='tbg']", XPFirst);
	if (ad && ad.style.width == "140px") ad.style.display = 'none';
}

/**
 * Crea nuevos enlaces en la barra de menu izquierda. Son enlaces internos y externos al juego separados por una linea
 */
function quickLinks(){
	var menu = find("//td[@class='menu']", XPFirst);
	menu.innerHTML += '<hr/>';
	menu.innerHTML += '<a href="allianz.php">Alianza</a>';
	menu.innerHTML += '<a href="spieler.php?s=1">Perfil</a>';
	menu.innerHTML += '<a href="warsim.php">Simulador</a>';
	menu.innerHTML += '<hr/>';
	menu.innerHTML += '<a href="http://www.denibol.com/~victor/travian_calc/" target="_blank">Calculadora</a>';
	menu.innerHTML += '<a href="http://www.denibol.com/proyectos/travian_beyond/" target="_blank">Travian Beyond</a>';
}

/**
 * Anyade un dialogo de confirmacion a los enlaces de cancelacion de construcciones
 */
function confirmDelete(){
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++){
		if(links[i].href.search(/\?d=(\d+)&a=(\d+)/) > 0) {
			links[i].setAttribute('onClick', 'javascript:return confirm("Estas seguro?");');
		}
	}
}

/**
 * Anyade nuevos enlaces a edificios en la barra superior
 */
function buildingLinks(){
	var barra = find("//div[@class='div2']",XPFirst);
	barra.innerHTML += '<map name="mercado"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="Enviar materias primas"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="Comprar materias primas"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="Vender materias primas"></map>';
	barra.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16" title="Punto de encuentro"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="Cuartel de infanteria"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="Corral de caballeria"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="Taller"></map>';
	barra.innerHTML += '<img usemap="#mercado" class="fl2" src="data:image/gif;base64,' + imagenes["mercado"] + '" border="0" title="Mercado">';
	barra.innerHTML += '<img usemap="#militar" class="fl2" src="data:image/gif;base64,' + imagenes["militar"] + '" border="0" title="Cuartel">';
	barra.style.left = 200;
	find("//div[@class='plus']", XPFirst).style.left = 50;
}

/**
 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, y crea un enlace de
 * ataque rapido cuando aparece un enlace a una ubicacion del mapa
 */
function playerLinks(){
	var links = document.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++){
		var igmlink = null;
		if(links[i].href.search(/spieler.php\?uid=(\d+)/) > 0) {
			igmlink = elem('a', "<img src='data:image/gif;base64," + imagenes["igm"] + "' style='margin:3px 0px 1px 3px; display: inline' title='Enviar IGM' alt='Msg' border=0>");
			igmlink.href = 'nachrichten.php?t=1&id=' + RegExp.$1;
		}
		if (links[i].href.search(/karte.php\?d=(\d+$)/) > 0){
			igmlink = elem('a',"<img src='" + img("img/es/a/att_all.gif") + "' style='margin:3px 0px 1px 3px; display: inline' height=10 width=10 title='Atacar' alt='Atk' border=0>");
			igmlink.href = 'a2b.php?z=' + RegExp.$1;
		}
		if(igmlink) links[i].parentNode.insertBefore(igmlink, links[i].nextSibling);
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
			boton.setAttribute("value", "Marcar todos");
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

// Codigo sugerido por Bafox
function reportBatalla(){ 
	var t = find("//table//table//table[@class='tbg']", XPList); 
	if (t.snapshotLength < 2) return;

	var botin = null;
	var a = find("//tr[@class='cbg1']", XPList);
	if (a.snapshotLength >= 3){
		if (a.snapshotItem(1).childNodes.length == 4){
			var b = a.snapshotItem(1).childNodes[3];
		}else{
			var b = a.snapshotItem(1).childNodes[1];
		}
		if (b.childNodes.length == 8) botin = parseInt(b.childNodes[1].nodeValue) + parseInt(b.childNodes[3].nodeValue) + parseInt(b.childNodes[5].nodeValue) + parseInt(b.childNodes[7].nodeValue);
	}

	var perds = new Array();
	for(var g = 0; g < t.snapshotLength; g++){ 
		var tt = t.snapshotItem(g); 
		for(var j = 1; j < 11; j++){ 
			var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')]; 
			var p = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0; 
			var ptu = arrayByN(u, p); 
			perds[g] = arrayAdd(perds[g], ptu); 
		}

		var informe = document.createElement("TD");
		for (var i = 0; i < 4; i++){
			informe.innerHTML += '<img src="' + img('img/es/r/' + (i + 1) + '.gif') + '" width="18" height="12" border="0">';
			informe.innerHTML += perds[g][i];
			if (i < 3) informe.innerHTML += ' + '; else informe.innerHTML += ' = ';
		}
		var perdidas = arrayToInt(perds[g]);
		informe.innerHTML += perdidas;
		if (g == 0 && botin != null){
			var rentabilidad = Math.round((botin - perdidas) * 100 / botin);
			if (botin == 0)	if (perdidas == 0) rentabilidad = 0; else rentabilidad = -100;	
			informe.innerHTML += "<br/>(Rentabilidad " + rentabilidad + "%)";
		}
		
		informe.colSpan = 10;
		var fila = document.createElement("TR");
		fila.class = "cbg1";
		fila.appendChild(elem("TD", "P&eacute;rdidas en materiales"));
		fila.appendChild(informe);
		tt.appendChild(fila);
	}
}

function preCalculate1(){
	var datos = 0;

	var grid = new Array(4);
	for(i = 0; i < 4; i ++) {
		grid[i] = new Array(11);
		for(j = 0; j < 11; j ++) {
			grid[i][j] = 0;
		}
	}

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
		var td1 = elem('TD', '<img src="' + img('img/es/r/' + (i+1) + '.gif') + '" width="18" height="12" border="0">');
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
				fila3.appendChild(elem('TD', '<img src="' + img('img/es/g/' + (i+1) + '/r' + (i+1) + '_' + j + '.gif') + '" width="50" height="60" border="0">'));
				
				var restante = calculateResourceTime(buildingCost[i][j+1]);
				var td3 = document.createElement('TD');
				td3.setAttribute('class', 'c f7');
				fila3.appendChild(td3);
				table2.appendChild(fila3);
				if (restante != null){
					td3.innerHTML = restante;
				}else{
					td3.innerHTML = 'Ya puedes subirlo de nivel';
				}
			}
		}
	}
	table.style.position = 'absolute';
	table.style.top = 580 + longitudPantalla() + 'px';
	if (datos == 1) document.body.appendChild(table);
}

function preCalculate2(){
	var edificiosPorFila = 2;
	var datos = 0;
	var buildingsImages = new Array();
	var buildingsDescs = new Array();
	var buildingsLinks = new Array();

	var xpathResult = find('//td[@class="s3"]/img/@src', XPIter);
	buildingsImages[0] = document.createTextNode(img("img/es/g/g16.gif"));
	while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}

	xpathResult = find('//map[@name="map1"]/area/@title', XPIter);
	while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

	xpathResult = find('//map[@name="map1"]/area/@href', XPIter);
	while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

	var table = document.createElement('TABLE');
	table.setAttribute("class", "tbg");
	table.setAttribute("align", "center");
	table.setAttribute("cellspacing", "1");
	table.setAttribute("cellpadding", "2");

	var j = 0;
	for(var i = 0; i < buildingsDescs.length - 4; i ++) {
		if(buildingsDescs[i] != null && buildingsDescs[i].nodeValue != "Solar") {
			buildingLevel = buildingsDescs[i].nodeValue.split(" ");
			buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

			buildingCode = buildingsImages[i].nodeValue.split("/");
			buildingCode = buildingCode[buildingCode.length-1].split(".");
			buildingCode = parseInt(buildingCode[0].substring(1, buildingCode[0].length));

			if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){
				if (j % edificiosPorFila == 0){
					var fila = document.createElement('TR');
					table.appendChild(fila);
				}
				j++;
				datos = 1;

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
					td3.innerHTML = "Ya puedes subirlo de nivel";
				}
			}
		}
	}
	if (j % edificiosPorFila != 0) fila.appendChild(document.createElement("TD"));
	table.style.position = 'absolute';
	table.style.top = 625 + longitudPantalla() + 'px';
	if (datos == 1) document.body.appendChild(table);
}

function preCalculate3(){
	var datos = 0;
	var a = find("//*/area[@onmouseover]", XPList);

	var table = document.createElement('TABLE');
	table.setAttribute("class", "tbg");
	table.setAttribute("align", "center");
	table.setAttribute("cellspacing", "1");
	table.setAttribute("cellpadding", "2");
	var fila = document.createElement('TR');
	fila.setAttribute('class', "rbg");
	fila.appendChild(elem('TD', 'Jugador'));
	fila.appendChild(elem('TD', 'Alianza'));
	fila.appendChild(elem('TD', 'Aldea'));
	fila.appendChild(elem('TD', 'Habitantes'));
	fila.appendChild(elem('TD', 'Coordenadas'));
	fila.appendChild(elem('TD', 'Acciones'));
	table.appendChild(fila);
	for(var i = 0; i < a.snapshotLength; i++) {
		var aldea = a.snapshotItem(i);
		var mouseOver = aldea.getAttribute("onmouseover");
		if(mouseOver.substring(0,1) != "x") {
			datos = 1;
			var fila = document.createElement('TR');
			table.appendChild(fila);
			datos_aldea = mouseOver.substring(4, mouseOver.length - 1).split(",");
			var href = aldea.getAttribute("href");
			fila.appendChild(elem('TD', datos_aldea[1].substring(1, datos_aldea[1].length - 1)));
			fila.appendChild(elem('TD', datos_aldea[3].substring(1, datos_aldea[3].length - 1)));
			fila.appendChild(elem('TD', datos_aldea[0].substring(1, datos_aldea[0].length - 1)));
			fila.appendChild(elem('TD', datos_aldea[2].substring(1, datos_aldea[2].length - 1)));
			fila.appendChild(elem('TD', '<a href="' + href + '">' + datos_aldea[4].substring(1, datos_aldea[4].length - 1) + ", " + datos_aldea[5].substring(1, datos_aldea[5].length - 1) + '</a>'));
			fila.appendChild(elem('TD', '<a href="' + href.replace("karte.php?d", "a2b.php?z") + '">Atacar</a> / <a href="' + href.replace("karte.php?d", "build.php?ze") + '&gid=17">Comerciar</a>'));
		}
	}
	table.style.position = 'absolute';
	table.style.top = 580 + longitudPantalla() + 'px';
	if (datos == 1) document.body.appendChild(table);
}

function createLazoFila(info, i){
	var tr = document.createElement("TR");
	tr.appendChild(createLazoLink(i));
	tr.appendChild(elem("TD", unescape(info[0]) + " (Grado " + info[2] + ")"));
	tr.appendChild(elem("TD", "En espera"));
	var tiempo = calculateTime(info.splice(3, 5));
	if (tiempo == 'Infinity'){
		tr.appendChild(elem("TD", 'Nunca'));
	}else if (tiempo != 0){
		tr.appendChild(elem("TD", 'Recursos en <span id="timeout">' + tiempo + '</span>'));
	}else if(!readCookie("c")){
		tr.appendChild(elem("TD", 'Construye algo antes'));
	}
	return tr;
}

function lazoEspera(){
	var b = countLazo();
	if (b <= 0) return;
	var a = find("//div[@id='ba']//p[@class='f10']//table[@class='f10']", XPFirst);
	
	if (!a){
		var lazo = document.createElement("DIV");
		var p = document.createElement("P");
		var table = document.createElement("TABLE");
		lazo.setAttribute("style", "position:absolute; width:450px; height:40px; z-index:2; border: 0px solid #000000; left:160px; top:" + (location.href.indexOf('dorf1') != -1 ? "450" : "535") + "px;");
		table.setAttribute("class", "f10");
		table.setAttribute("width", "100%");
		p.setAttribute("class", "f10");
		p.appendChild(elem("B", 'Orden de construcci&oacute;n:'));
		p.appendChild(table);
		lazo.appendChild(p);

		for (var i = 0; i < b; i++){
			var info = getLazo(i);
			table.appendChild(createLazoFila(arrayClone(info), i));
			if (info[1] < 19) var page = 1; else var page = 2;
			var c = readCookie("c");
			if (c && c!= '' && calculateTime(info.splice(3, 5)) == 0){
				deleteLazo(i);
				location.href = 'dorf' + page + '.php?a=' + info[1] + '&c=' + c;
				break;
			}
		}
		document.body.appendChild(lazo);
	}else{
		var table = a.firstChild;
		table.firstChild.firstChild.firstChild.getAttribute("href").search(/&c=(.*)?/);
		createCookie("c", RegExp.$1, 1);
		for (var i = 0; i < b; i++)	table.appendChild(createLazoFila(getLazo(i), i));
	}
}

function blocNotas(){
	var a = find("//form[@name='msg']", XPFirst);
	var notas = readCookie("notas");
	if (notas == null) notas = ''; else notas = unescape(notas);
	
	var tabla = document.createElement("TABLE");
	var tr = document.createElement("TR");
	var td = document.createElement("TD");
	var p1 = document.createElement("P");
	var p2 = document.createElement("P");
	var textarea = elem("TEXTAREA", notas);
	var input = document.createElement("INPUT");
	
	tabla.setAttribute("width", "430");
	td.setAttribute("align", "center");
	td.setAttribute("background", img('img/es/msg/block_bg.gif'));
	textarea.setAttribute("cols", "30");
	textarea.setAttribute("rows", "16");
	textarea.setAttribute("style", 'background-image: url(' + img('img/es/msg/underline.gif') + '); border : 0px; overflow:auto');
	input.setAttribute("type", "image");
	input.setAttribute("border", "0");
	input.setAttribute("src", img('img/es/b/s1.gif'));
	input.addEventListener("click", function(){ createCookie("notas", escape(textarea.value), 365); alert("Guardado"); }, 0);
	
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

function createEventoMapa(i){
	var funcion = function (){
		var despl = [-512, 1, 512, -1];
		var d = document.getElementsByName("desp")[0].value;
		if (d >= 1) createCookie("desp", d, 365);
		if (d > 1){
			var base = parseInt(this.href.split("=")[1]);
			this.href = this.href.replace(/z=(\d+)/, 'z=' + (base + (despl[i] * (d - 1))));
		}
	};
	return funcion;
}

function desplazarMapa(){
	var b = find("//form[@method='post']", XPFirst).parentNode;
	var tr = document.createElement("TR");
	var d = readCookie("desp");
	var td1 = elem("TD", "<b>Desp.</b>");
	var td2 = elem("TD", '<input name="desp" value="' + (d == null ? '1' : d) + '" size="2" maxlength="4" class="fm fm25">');
	td1.setAttribute("colspan", 2);
	td2.setAttribute("colspan", 2);
	tr.appendChild(td1);
	tr.appendChild(td2);
	b.appendChild(tr);

	var a = find("//map[@name='map2']", XPFirst);
	if (a.firstChild.nodeName != "AREA") var e = 1; else var e = 0;
	for (var i = 0; i < 4; i++){
		var link = a.childNodes[i + e];
		link.addEventListener("click", createEventoMapa(i), 0);
	}
}

window.addEventListener('load',function(e){
	getGeneralData();
	hideAd();
	quickLinks();
	buildingLinks();
	playerLinks();
	calculateFillTime();
	if (location.href.indexOf('build.php?') != -1)		quickCity();
	if (location.href.indexOf('build.php') != -1) 		calculateBuildTime();
	if (location.href.match(/dorf1.php($|\?newdid=(\d+)$)/) || location.href.match(/dorf2.php($|\?newdid=(\d+)$)/)) lazoEspera();	
	if (location.href.indexOf('dorf') != -1) 		confirmDelete();
	if (location.href.indexOf('dorf1') != -1)		preCalculate1();
	if (location.href.indexOf('dorf2') != -1)		preCalculate2();
	if (location.href.indexOf('berichte.php?id=') != -1)	reportBatalla();
	if (location.href.match(/karte.php($|\?z=)/)){		preCalculate3(); desplazarMapa(); }
	if (location.href.match(/nachrichten.php($|\?t=|\?s=)/) || location.href.match(/berichte.php($|\?t=|\?s=)/)) checkAll();
	if (location.href.match(/nachrichten.php$/))		blocNotas();

	var frecuencia = new Array(4);
	var contador = new Array(4);
	for (var i = 0; i < 4; i++){
		frecuencia[i] = (1/produccion[i])*1000;
		if (!isFinite(frecuencia[i]) || frecuencia[i] < 0) frecuencia[i] = Number.POSITIVE_INFINITE;
		contador[i] = 0;
	}
	setInterval(function () {
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

}, false);

/*
TODO:
	- Comentar el codigo
	- Recursos conseguidos en proporcion a lo que pueden cargar las tropas
	var carry = [   [ 40, 20, 50, 0, 100, 70],      // Romanos
        	        [ 30, 45, 0, 75, 35, 65],       // Galos
	                [ 60, 40, 50, 0, 110, 80]       // Germanos
        ];
	- Tiempo para conseguir puntos de cultura
	- Soporte para murallas en la lista de construcciones
	- Filtros en las ofertas del mercado (Los enlaces del plus no funcionan)
	- Tiempo y recursos restantes para las exploraciones
	- Soporte multilenguaje? (Cadenas pretraducidas)

FIXME:
	- El refresco de materiales falla cuando se produce mas de 3600 la hora (15 granjas del mismo tipo)
*/

