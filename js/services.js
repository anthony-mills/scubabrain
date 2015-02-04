angular.module('scubabrain.services', [])

/**
 * All the nitrox related functions live in here
 */
.factory('nitroxCalculations', function() {

	/**
	* Calculate the maximum operating depth for a Eanx blend
	*
	* @param object nitroxMix	
	*/
	function maxDepth(nitroxMix)
	{
		var depthUnit = localStorage.getItem("depthUnit");
	 	
	 	if ( depthUnit === 'metric') {
	 		var maxDepth = Math.floor(( nitroxMix.pressure / nitroxMix.mix) - 10);
        	var depthUnit = 'm';

        	var nitroxEad = metricEAD(maxDepth, nitroxMix.mix);
	 	} else {
	        if (nitroxMix.pressure === '16') {
	        	var maxDepth = Math.floor(( 52.8 / nitroxMix.mix) - 33);
	        } else {
	         	var maxDepth = Math.floor(( 46.2 / nitroxMix.mix) - 33);
	        }

	        var depthUnit = 'ft';
	        var nitroxEad = imperialEAD(maxDepth, nitroxMix.mix);
	 	}

	 	var maxDepth = {
	 			"depth" : maxDepth,
	 			"unit"	: depthUnit,
	 			"ead"	: nitroxEad
	 	}

	    return maxDepth;	 	
	}

	/**
	* Generate MOD tables in imperial and metric
	*
	* @return object tableData
	*/
	function modTable()
	{
		var depthUnit = localStorage.getItem("depthUnit");
	 	console.log('Here');
	 	var oxygenMixes = [
	 						.21, .22, .23, .24, .25, .26, .27, .28, .29,
	 						.30, .31, .32, .33, .34, .35, .36, .37, .38, .39, .40, 
	 						.45, .50, .55, .60, .65, .70, .75, .80, .85, .90, .95, 1.0
	 					  ];
	 	var tableData = [];

	 	if ( depthUnit === 'metric') {
	 		for ( var index=0; index < oxygenMixes.length; index++ ) {
		 		var maxDepth16 = Math.floor(( 16 / oxygenMixes[index] ) - 10);
		 		var maxDepth14 = Math.floor(( 14 / oxygenMixes[index] ) - 10);

	        	var mixMod = {
	        		'mix'	: Math.round(oxygenMixes[index] * 100) + '%',
	        		'mod16'	: maxDepth16 + ' m',
	        		'mod14'	: maxDepth14 + ' m'	        		
	        	}

	        	tableData.push(mixMod);
	        }
	 	} else {
	 		for ( var index=0; index < oxygenMixes.length; index++ ) {
		        var maxDepth16 = Math.floor(( 52.8 / oxygenMixes[index] ) - 33);
		        var maxDepth14 = Math.floor(( 46.2 / oxygenMixes[index] ) - 33);

	   	    	var mixMod = {
	        		'mix'	: Math.round(oxygenMixes[index] * 100) + '%',
	        		'mod16'	: maxDepth16 + ' ft',
	        		'mod14'	: maxDepth14 + ' ft'	        		
	        	}

	        	tableData.push(mixMod);		        
		    }
	 	}
	 	console.log(tableData);

	    return tableData;	 	
	} 

	/** 
	* Calculate the partial pressure of a blend at pressure
	*
	* @param integer mixContent
	* @param integer mixDepth
	*
	* return object partialPressure
	*/
	function partialPressure(mixDepth, mixContent)
	{
		var n2Fraction = 1 - mixContent;

		var depthUnit = localStorage.getItem("depthUnit");
	 	console.log(depthUnit);
	 	if ( depthUnit === 'metric') {
			var n2Pressure = Math.round(n2Fraction * (mixDepth / 10 + 1) * 100) / 100;	
			var o2Pressure = Math.round(mixContent * (mixDepth / 10 + 1) * 100) / 100;	
	 	} else {
	 		console.log('here');
			var n2Pressure = Math.round(n2Fraction * ((mixDepth / 33) + 1) * 100) / 100;	
			var o2Pressure = Math.round(mixContent * ((mixDepth / 33) + 1) * 100) / 100;	
	 	}

	 	var partialPressure = {
				"n2pp"	: n2Pressure,
				"o2pp"	: o2Pressure
		}

		if (o2Pressure > 1.6) {
			partialPressure.unsafe = true;
		}

		return partialPressure;
	}

	/**
	* Get the EAD for a nitrox mix
	*
	* @param integer mixDepth	
	* @param integer nitroxBlend
	*
	* @return object blendEad
	*/
	function mixEAD(mixDepth, nitroxBlend)
	{
		var depthUnit = localStorage.getItem("depthUnit");

	 	if ( depthUnit === 'metric') {
	 		var blendEad = metricEAD(mixDepth, nitroxBlend);
	 		var depthUnit = 'm';
	 		var mixPP = partialPressure(mixDepth, nitroxBlend);
	 	} else {
	 		var blendEad = imperialEAD(mixDepth, nitroxBlend);
	 		var depthUnit = 'ft';
	 		var mixPP = partialPressure(mixDepth, nitroxBlend);	 		
	 	}	

	 	var blendEad = {
	 		"unit"	: depthUnit,
	 		"ead"	: blendEad,
	 		"depth" : mixDepth,
	 		"mix"	: (nitroxBlend * 100),
	 		"pressure"	: mixPP	 		
	 	}
	 	console.log(blendEad);
	 	return blendEad;	
	}

	/**
	* Metric EAD
	*
	* Return the equivalent air depth (EAD) of a blend in metres		
	*
	* @param integer maxDepth
	* @param integer nitroxBlend  
	*
	* @return integer blendEad
	*/
	function metricEAD(maxDepth, nitroxBlend)
	{
		var blendEad = ( maxDepth + 10 ) * ( 1 - nitroxBlend ) / .79 - 10;

		return Math.floor( blendEad );
	}

	/**
	* Imperial EAD
	*
	* Return the equivalent air depth (EAD) of a blend in feet		
	*
	* @param integer maxDepth
	* @param integer nitroxBlend  
	*
	* @return integer blendEad
	*/
	function imperialEAD(maxDepth, nitroxBlend)
	{
		var blendEad = ( maxDepth + 33 ) * ( 1 - nitroxBlend ) / .79 - 33;

		return Math.floor( blendEad );			
	}

	return {
	    maxDepth: function(nitroxMix) {
	       	var modResult = maxDepth(nitroxMix);

	       	console.log( modResult );

	        return modResult; 
	    },
	    modTable: function() {
			return modTable();
	    },
	    partialPressure: function(nitroxData) {
	       	var modResult = mixEAD(nitroxData.depth, nitroxData.mix);

	       	console.log( modResult );

	        return modResult;
	    },	    	
	    mixEad: function(nitroxEad) {
	       	var modResult = mixEAD(nitroxEad.depth, nitroxEad.mix);

	       	console.log( modResult );

	        return modResult;
	    }	      
	} 
})