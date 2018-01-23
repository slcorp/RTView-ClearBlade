// *********************************************************
// RTView - Utility functions for Data Handling

var request = require('request');

// URL of RTView DataServer http port
var targetURL = 'http://localhost:3275';
//var targetURL = 'http://localhost:3270/rtvpost';  // to use servlet instead of port

var targetPostStr = targetURL + '/rtview/json/data/'
var targetCommandStr = targetURL + '/rtview/json/cache_processor/'

// #########################################################
// RTView Utility Functions

// Assign RTView Target URL
function set_targeturl (url) {
    targetURL = url;
}
// Create a named data cache with the specified properties.
function create_datacache (cacheName, properties, metadata) {
    if (properties === null) return;     
    cachedef_metadata = [ { "name":"propName", "type":"string" },{ "name":"propValue", "type":"string" } ];  
    cachedef_data = []
    for (var propName in properties) {
        cachedef_data.push( { 'propName': propName, 'propValue': properties[propName] } );
    }
    send_to_rtview(targetCommandStr, 'replace/' + cacheName, cachedef_metadata, cachedef_data);   
    if (metadataMap === undefined) metadataMap = {};
    metadataMap[cacheName] = metadata;
}

// Send a block of data to RTView cache
function send_datatable (cacheName, data) {
    if (data == null) data = [];
    metadata = metadataMap[cacheName]
    if (metadata == null || metadata.length < 1) return;
    metadata2 = []
    for (var i = 0; i < metadata.length; i++) {
        for (var colName in metadata[i]) {
            metadata2.push( { "name": colName, "type": metadata[i][colName] } )
        }
    }
    send_to_rtview(targetPostStr, cacheName, metadata2, data);
}

var metadataMap;
var attempts = 0;
var error_count = 0;
var start = new Date().getTime();

// Post a command or block of data to an RTView DataServer at given URL    
function send_to_rtview(url, cacheName, metadata, body) {
    if (body === null) return;
	// console.log('data = ' + JSON.stringify(body));
	var objArray = [];
	if(Array.isArray(body))
		objArray = body;
	else
		objArray.push(body);
		
	var qsStr =  { post_time : new Date() };
	request({
		url: url + cacheName,         // RTView URL
		qs: qsStr,                    // Query string data
		method: 'POST',
		timeout: 5000,
		json: { metadata: metadata, data: objArray }
	}, function(error, response, body){
		var end = new Date().getTime();
		attempts += 1;
		if (error) {
			error_count += 1;
			if (error.code == "ECONNREFUSED") {
				var send_rate = 1000*attempts/(end-start);
				console.log('ERROR: RTView connection refused.');
				g_showErrConnMsg = false;   
			} else {
				console.log("RTView: %s", error);
			}
		} else {
			g_showErrConnMsg = true;      // reset
		}
	}); 
}

module.exports.set_targeturl = set_targeturl;
module.exports.create_datacache = create_datacache;
module.exports.send_datatable = send_datatable;
