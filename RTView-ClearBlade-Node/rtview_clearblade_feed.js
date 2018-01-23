// *********************************************************
// RTView - ClearBlade Sample Program

const ClearBlade = require("clearblade");
const constants = require("./constants.json");

var request = require('request');

// URL of RTView DataServer http port
var targetURL = 'http://localhost:3275';
//var targetURL = 'http://localhost:3270/rtvpost';  // to use servlet instead of port

var targetPostStr = targetURL + '/rtview/json/data/'
var targetCommandStr = targetURL + '/rtview/json/cache_processor/'

// Name of the RTView cache created in this demo
var cacheName = 'ClearBladeCache';

var topicsOfInterest = [
	"MixingPlant/A/ExhaustAirTemp",
	"MixingPlant/A/DryingAggregateTemp",
	"MixingPlant/A/HeatingAirTemp",
	"MixingPlant/A/bearing/bearing1/bearingrpm",
	"MixingPlant/A/ExitAggregateTemp",
	"MixingPlant/A/DryingAirTemp",
	"MixingPlant/A/bearing/bearing1/bearingtemperature",
	"MixingPlant/A/CombustionAirTemp",
	"MixingPlant/A/HeatingAggregateTemp",
	"MixingPlant/A/EntryAggregateTemp"
] ;

// Array of Messaging connections
var messagingArray = [];

// Array of topic-specific callback handlers
// Have to seed each handler with index of the topic
var handlerArray = [];
handlerArray.push( function(message) { message_create_and_send(message, 0); } );
handlerArray.push( function(message) { message_create_and_send(message, 1); } );
handlerArray.push( function(message) { message_create_and_send(message, 2); } );
handlerArray.push( function(message) { message_create_and_send(message, 3); } );
handlerArray.push( function(message) { message_create_and_send(message, 4); } );
handlerArray.push( function(message) { message_create_and_send(message, 5); } );
handlerArray.push( function(message) { message_create_and_send(message, 6); } );
handlerArray.push( function(message) { message_create_and_send(message, 7); } );
handlerArray.push( function(message) { message_create_and_send(message, 8); } );
handlerArray.push( function(message) { message_create_and_send(message, 9); } );

// Initialize connection to ClearBlade
ClearBlade.init({
	email: "sl@clearblade.com",
	password: "password",
	systemKey: constants.systemKey,
	systemSecret: constants.systemSecret,
	URI: constants.URL,
	messagingURI: constants.messageURL,
	callback: initCb
})

function initCb (err, body) {
	if (err) {
		console.error("ClearBlade init error", body);
		return;
	}
	
    // Establish connection to ClearBlade for each topic
	for (i = 0 ; i < topicsOfInterest.length ; i++) {
		var messaging = ClearBlade.Messaging( {}, function(){} );
		messagingArray.push(messaging);
	}
  
    // Subscribe to each topic with approriate handler
    for (i = 0 ; i < topicsOfInterest.length ; i++) {
        console.log('... subscribing to: ' + topicsOfInterest[i]);
        messagingArray[i].subscribe(topicsOfInterest[i], {}, handlerArray[i]);
	}
}
 
// This will create and send a message to RTView, containing the data for Plant A
// and it will create similar data for Plants B and C, strictly for demo purposes
function message_create_and_send (message, count) {
    
    // convert from message Buffer to JSON object
    obj = JSON.parse(message.toString())

    // copy object values for this topic to rtview data object
    var data = {};
    data.plant_name='MixingPlant';
    data.plant_id='A';
    data.metric_name=topicsOfInterest[count].slice(14);
    data.measurement=obj.measurement;
    data.unit=obj.unit;
    console.log('... sending: ' + JSON.stringify(data));
    datatable_send(cacheName, data);
    
    // Simulate data for Plant B
    data.plant_id='B';
    data.measurement=obj.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, data);
    
    // Simulate data for Plant C
    data.plant_id='C';
    data.measurement=obj.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, data);    
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Specific cache definition for sample data table
// Note: This is only called once on startup. 
// If data server is not running, cache will not be created correctly.
datacache_create(cacheName,
{   // cache properties
    "indexColumnNames": "plant_name;plant_id;metric_name",
    "historyColumnNames": "measurement;unit"
},[ // column metadata
    { "plant_name": "string" },
    { "plant_id": "string" },
    { "metric_name": "string" },
    { "measurement": "double" },
    { "unit": "string" }
]);

// #########################################################
// RTView Utility Functions

// Create a named data cache with the specified properties.
function datacache_create (cacheName, properties, metadata) {
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
function datatable_send (cacheName, data) {
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
