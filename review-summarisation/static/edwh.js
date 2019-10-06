	
/***********************************************************************************************/
/* Following css is for Consors Finanz                                                         */
/* Developed by : Abhash Priyadarshi                                                           */
/* Do not copy and distribute. Request you to respect the developer effort and your own ethics */
/***********************************************************************************************/


// ------------------------------------------------------------------------------------------------------------ //
// ----------------------- C I R C U L A R     S T A T U S     B A R     F U N C T I O N S -------------------- //
// ------------------------------------------------------------------------------------------------------------ //

	// Global variables
	
	var rotTime = window.getComputedStyle(document.documentElement).getPropertyValue('--rotTm');
	var graphLnWdth = window.getComputedStyle(document.documentElement).getPropertyValue('--lnWdth');
	var L25 = '#e8280b', 
		L50 = '#f27a68', 
		L75 = '#fcca6f', 
		L100 = '#00965E';
	var meter_radius = 55;
	
	function spinWrapper() {
		var wrapArr = document.getElementsByClassName("wrapper");
		for (var j = 0; j < wrapArr.length; j++)
		{
			for (var k = 0; k < wrapArr[j].childNodes.length; k++) {
				if (wrapArr[j].childNodes[k].className == "circle") {
					var val = parseInt(wrapArr[j].childNodes[k].innerText) || parseInt(wrapArr[j].childNodes[k].textContent);
					countUp(wrapArr[j].childNodes[k], val);
					break;
				}
			}
			var id = wrapArr[j].getAttribute('id');
			appendClass(val, id);
		}
	}
	
	function countUp(node, val) {
		var v = 0;
		var t = ( val > 50 ) ? (2000 * rotTime) : (1000 * rotTime);
		var col = L100;
		
		if	(val <= 25) col = L25; else 
		if  (val > 25 && val <= 50) col = L50; else 
		if  (val > 50 && val <= 75) col = L75;
		
		var inc = parseInt(t/val);
		var id = setInterval(cprog, inc);
			
		function cprog()
		{		
			if (v >= val) {
				clearInterval(id);
			}
			else {
				v++;
				node.innerHTML = '<i><b style="color: '+ col +'">' + v + ' %</b></i>';
			}
		}
	}
	
	function appendClass(val, id) {
		var head  = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		
		// Calculate the rotation arguments
		var x_deg = ( val > 50 ) ? 180 : parseInt(( 18 * val ) / 5) ,
			y_deg = ( val > 50 ) ? parseInt(( 18 * (val - 50) ) / 5)  : 0,
			y_opac_start = ( val > 50 ) ? 0.2 : 0,
			y_opac_end = ( val > 50 ) ? 1 : 0;
		
		var css  = '.' + id + '_x_rotate { animation: ' + rotTime + 's linear forwards ' + id + '_x_rotate; transform-origin: 100% 50%; }';
			css += '@keyframes ' + id + '_x_rotate { from { opacity: 1; transform: rotate(0 deg) } to { opacity : 1; transform: rotate(' + x_deg + 'deg)} }';
			css += '.' + id + '_y_rotate { animation: ' + rotTime + 's linear forwards ' + id + '_y_rotate ' + rotTime + 's; transform-origin: 0% 50%; }';
			css += '@keyframes ' + id + '_y_rotate { from { opacity: ' + y_opac_start + '; transform: rotate(0 deg) } to { opacity : ' + y_opac_end + '; transform: rotate(' + y_deg + 'deg)} }';
		
		style.type = 'text/css';
		if (style.styleSheet) { 
			style.styleSheet.cssText = css; 
		} else { 
			style.appendChild(document.createTextNode(css)); 
		}
		
		head.appendChild(style);
	}
    
	// ------------------- H O R I Z O N T A L   P R O G R E S S   B A R ------------------------ //
	
	function moveBars() {
		var bars = document.getElementsByClassName("myBar");
		var barVals = document.getElementsByClassName("hor-bar-feature-val");
		
		for (var i = 0; i < bars.length; i++)
		{
			move(bars[i], barVals[i], bars[i].getAttribute("value"));
		}
	}
	
	function move(progressBar, barValue, val) {
		var width = 1;
		var v = parseInt(val);
		var id = setInterval(frame, 10);
		function frame() {
			if (width >= v) {
				clearInterval(id);
			} else {
				width++;
				progressBar.style.width = width + '%';
				barValue.innerText = width + '%';
			}
		}
	}

	// ------------------------------------------------------------------------------------------ //
	// ----------------------- G R A P H      P L O T      F U N C T I O N S -------------------- //
	// ------------------------------------------------------------------------------------------ //
	
	function setAxes(id, maxVal, vMaxHtml, step) {
		var node = document.getElementById(id);
		for (var i = step; i <= maxVal; i += step) {
			if (id == 'x-axis') {
				var txtNode = document.createElement('p');
				//var h = (i >= 12) ? ' PM' : ' AM';
				//txtNode.innerText = i + h;
				txtNode.innerText = i;
				var leftMargin = i * (vMaxHtml/maxVal);
				txtNode.style.cssText = "color: grey; text-align: right; font-family: Arial Narrow; font-style: verdana; font-size: 11px; margin: 325px 0 0 " + leftMargin + "px; position: absolute; "; 
			}
			else {
				var txtNode = document.createElement('p');
				txtNode.innerText = i + ' %';
				var topMargin = vMaxHtml - (i * (vMaxHtml/maxVal));
				txtNode.style.cssText = "color: grey; text-align: right; font-family: Arial Narrow; width: 20px; width: 30px; font-size: 11px; margin: " + topMargin + "px 0 0 -35px ; position: absolute; ";
				}
		node.appendChild(txtNode);
		}
	}
	
	function callPlotCurve() {
		var node = document.getElementById('DtDropDn');
		var opt  = document.getElementById('DtDropDn').options;
		var dt   = node.selectedIndex;
		
		// get line colors from head togglers
		var elem = document.getElementById('file_toggler').querySelector('div');
		lnCol_f = window.getComputedStyle(elem, null).getPropertyValue("background");
		
		var elem = document.getElementById('load_toggler').querySelector('div');
		lnCol_l = window.getComputedStyle(elem, null).getPropertyValue("background");
		
		var elem = document.getElementById('cpu_toggler').querySelector('div');
		lnCol_c = window.getComputedStyle(elem, null).getPropertyValue("background");
		
		// call the graph plot function
		plotCurve(opt[dt].text, 'f', lnCol_f);
		plotCurve(opt[dt].text, 'l', lnCol_l);
		plotCurve(opt[dt].text, 'c', lnCol_c);
	}

	function plotCurve(plotid, sfx, lnCol) {
		var prevX = 0,
			prevY = 0,
			prevTheta = 0,
			prevLen = 0,
			count = 0,
			graphHTML = "";

		var xMaxHtml = 500, yMaxHtml = 320;
		var graphText = document.getElementById(plotid + '_' + sfx).innerText;
		var arrCoord = graphText.split(";");

		var xFact = xMaxHtml / 24,   // The x axis is 24 hours day time
			yFact = yMaxHtml / 100;  // The y-axis is max 100 %

		for (pt in arrCoord) {
			var xCoord = parseInt(arrCoord[pt].split(",")[0]);
			var yCoord = parseInt(arrCoord[pt].split(",")[1]);
						
			var len = parseInt(Math.sqrt(Math.pow(xFact * Math.abs(prevX - xCoord), 2) + Math.pow(yFact * Math.abs(prevY - yCoord), 2)));
			var theta = Math.round((180 * Math.atan(( yFact * (yCoord - prevY)) / ( xFact * (xCoord - prevX)))) / Math.PI);
						
			graphHTML += createGraph(len, theta, prevX, prevY, yMaxHtml, prevTheta, prevLen, lnCol, count);
			count++;
			prevX = xCoord; prevY = yCoord; prevTheta = theta; prevLen = len;
		}

		var node = document.getElementById('graph_section_' + sfx);
		document.getElementById('graph_section_' + sfx).innerHTML = graphHTML;		
	}
	
	function createGraph(len, theta, prevX, prevY, yMaxHtml, prevTheta, prevLen, lnCol, count) {
		var str="";
		if (count == 0) {
			var angle = prevTheta - theta;
				str = '<div '; 
				str += 'class="graph_line" ';
				str += 'style="width       : '+  len + 'px;'; 
				str += '       height      : ' + graphLnWdth + ';';
				str += '       position    : absolute;';
				str += '       background  : ' + lnCol + ';';
				str += '       margin-top  : '+ (yMaxHtml - prevY) + 'px;';
				str += '       transform   : rotate(-' + theta + 'deg);">';
				str += '<div class="coord" style="background: ' + lnCol +  '; margin-left: ' + (len - 2) + 'px;"></div>';
		}
		else {
			var angle = prevTheta - theta;
				str = '<div '; 
				str += 'class="graph_line" ';
				str += 'style="width       : '+  len + 'px;'; 
				str += '       height      : ' + graphLnWdth + ';';
				str += '       position    : absolute;';
				str += '       background  : ' + lnCol + ';';
				str += '       margin-left : '+  prevLen + 'px;'; 
				str += '       transform   : rotate(' + angle + 'deg);">';
				str += '<div class="coord" style="background:' + lnCol +'; margin-left: ' + (len - 2) + 'px;"></div>'
			}
		return str;
	}
	
	function setChartBg(id, maxH, clsNm) {
		var node = document.getElementById(id);
		var step = maxH / 10;
		
		for (var i = 0; i < 10; i++) {
			var elem = document.createElement('div');
			elem.classList.add(clsNm);
			elem.style.marginTop = i * step + 'px';
			node.appendChild(elem);
		}
	}
	
	function getMax(arrCoord, idx) {
		var maxVal = arrCoord[0].split(',')[idx];
		
		for (var i = 1; i < arrCoord.length; i++) { 
			if ( maxVal - arrCoord[i].split(',')[idx] < 0)
				maxVal = arrCoord[i].split(',')[idx];
		}
		return maxVal;
	}
	
	function toggleGraph(id, caller) {
		var node = document.getElementById(id);
		node.classList.toggle('noDisp');
		caller.classList.toggle('opac');
	}
	
	// -----------------  D A T A    F R E S H N E S S    I N D I C A T O R   F U N C T I O N S  ----------------- //
	
	function rotateMeter() {
		var meters = document.getElementsByClassName('data-freshness-meter');
		
		var wedgeBlocks = document.getElementsByClassName('wedge-block');
		var wedges = document.getElementsByClassName('wedge');
		
		for(var i = 0; i < meters.length; i++) {
			rotate(wedgeBlocks[i], wedges[i], meter_radius, i);
		}
	}
	
	function rotate(node, wedge, r, id) {
		var val 			= parseInt(node.innerText);
		var theta           = val * Math.PI / 100;
		var rotDeg          = Math.floor(val * 180 / 100);
		var toDegWedge      = ( rotDeg <= 90 ) ? (-1 * (90 - rotDeg) - 2.5) : (rotDeg - 90 - 2.5);
		var toDegWedgeBlock = rotDeg - 195;
		
		var head = document.head || document.getElementByTagName('head')[0];
		var style = document.createElement('style');
		var rotTime = parseInt(node.innerText) * 1.9 / 100;   // percentage of maxTime = 2s
		
		var css  = '@keyframes rotateWedge_'      + id + ' { from { transform: rotate(-90deg) } to { transform: rotate(' + toDegWedge + 'deg)} }';
			css += '@keyframes rotateWedgeBlock_' + id;
			css += '           { from { transform: rotate(-180deg)          translateX(' + r + 'px) rotate(180deg) }';
			css += '             to   { transform: rotate(' + toDegWedgeBlock + 'deg) translateX(' + r + 'px) rotate(' + -toDegWedgeBlock + 'deg)} }';
		
			
		wedge.setAttribute("style", 'animation: ' + rotTime + 's ease-in forwards rotateWedge_' + id + ';');
		node.setAttribute("style", 'animation: ' + rotTime + 's ease-in forwards rotateWedgeBlock_' + id + ';');
		
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		}
		else {
			style.appendChild(document.createTextNode(css));
		}
		
		head.appendChild(style);
		var rad = r;
		var v = 0;
		var t = 1000 * (rotTime/val);
		var counter = setInterval(prog, t);
		
		function prog()
		{		
			if (v >= val) { clearInterval(counter); }
			else {
				v++;
				node.innerHTML = '<i><b>' + v + ' </b></i>';
			}
		}			
	}
