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

// Name of the cache created in this demo
var cacheName = 'ClearBladeCache';

var messaging;

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

var numOfTopics = 10;
var topicNum = 0;

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

// Setup subscriptions to multiple topics
function initCb (err, body) {
	if (err) {
		console.error("init error", body);
	} else 
		messaging = ClearBlade.Messaging({}, messageInit);
}

function messageInit () {
	messaging.subscribe(topicsOfInterest[0], {}, messageReceivedCb1);
	messaging.subscribe(topicsOfInterest[1], {}, messageReceivedCb2);
	messaging.subscribe(topicsOfInterest[2], {}, messageReceivedCb3);
	messaging.subscribe(topicsOfInterest[3], {}, messageReceivedCb4);
	messaging.subscribe(topicsOfInterest[4], {}, messageReceivedCb5);
	messaging.subscribe(topicsOfInterest[5], {}, messageReceivedCb6);
	messaging.subscribe(topicsOfInterest[6], {}, messageReceivedCb7);
	messaging.subscribe(topicsOfInterest[7], {}, messageReceivedCb8);
	messaging.subscribe(topicsOfInterest[8], {}, messageReceivedCb9);
	messaging.subscribe(topicsOfInterest[9], {}, messageReceivedCb10);
	for (topicNum=0 ; topicNum < numOfTopics ; topicNum++)
		console.log(`message init was successful; subscribing to '${topicsOfInterest[topicNum]}'`);
}

function messageReceivedCb1 (message) {
    //console.log('messageReceivedCb1', message.toString());
    message_create(JSON.parse(message.toString()), 0);
}    

function messageReceivedCb2 (message) {
    //console.log('messageReceivedCb2', message.toString());
    message_create(JSON.parse(message.toString()), 1);
}    

function messageReceivedCb3 (message) {
    //console.log('messageReceivedCb3', message.toString());
    message_create(JSON.parse(message.toString()), 2);
}    

function messageReceivedCb4 (message) {
    //console.log('messageReceivedCb4', message.toString());
    message_create(JSON.parse(message.toString()), 3);
}    

function messageReceivedCb5 (message) {
    //console.log('messageReceivedCb5', message.toString());
    message_create(JSON.parse(message.toString()), 4);
}    

function messageReceivedCb6 (message) {
    //console.log('messageReceivedCb6', message.toString());
    message_create(JSON.parse(message.toString()), 5);
}    

function messageReceivedCb7 (message) {
    //console.log('messageReceivedCb7', message.toString());
    message_create(JSON.parse(message.toString()), 6);
}    

function messageReceivedCb8 (message) {
    //console.log('messageReceivedCb8', message.toString());
    message_create(JSON.parse(message.toString()), 7);
}    

function messageReceivedCb9 (message) {
    //console.log('messageReceivedCb9', message.toString());
    message_create(JSON.parse(message.toString()), 8);
}    

function messageReceivedCb10 (message) {
    //console.log('messageReceivedCb10', message.toString());
    message_create(JSON.parse(message.toString()), 9);
}    

function message_create (obj, count) {

    var data = {};
    data.plant_name='MixingPlant';
    data.plant_id='A';
    data.metric_name=topicsOfInterest[count].slice(14);
    //console.log(`Metric Name = ` + data.metric_name);
    data.measurement=obj.measurement;
    data.unit=obj.unit;
    //console.log('data1=' + JSON.stringify(data1));
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

// ###################################################
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
    console.log('... sending: ' + JSON.stringify(data));
    send_to_rtview(targetPostStr, cacheName, metadata2, data);
}

var metadataMap;
var attempts = 0;
var error_count = 0;
var start = new Date().getTime();

// Post a command or block of data to an RTView DataServer at given URL    
function send_to_rtview(url, cacheName, metadata, body) {
    if (body === null) return;
	console.log('data = ' + JSON.stringify(body));
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
