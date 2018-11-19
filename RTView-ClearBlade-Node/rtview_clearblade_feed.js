// *********************************************************
// RTView - ClearBlade Sample Program

const ClearBlade = require("clearblade");
const constants = require("./constants.json");

// The rtview-utils package contains the API for communicating with RTView DataServer
var rtview_utils = require("rtview-utils");

// Default target URL
var target_url = "http://localhost:3275";            // this is the default
//var target_url = "http://localhost:3270/rtvpost";  // to use servlet instead of port

// utility function check arg str is a valid non blank string 
function isValidStr(str) {
    return (
        (typeof str != "undefined") &&
        (typeof str.valueOf() == "string") &&
        (str.length > 0) && (str.trim().length > 0));

}

// set target_url var using Environment variable "TARGET_URL" if set 
if (isValidStr(process.env.TARGET_URL)) {
    target_url = process.env.TARGET_URL;
}

// set target_url var using command line arg if set 
if (process.argv.length >=2 && isValidStr(process.argv[2])) {
    target_url = process.argv[2];
}

// Set target URL to post data to
rtview_utils.set_targeturl(target_url);         

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
    rtview_utils.send_datatable(cacheName, data);
    
    // Simulate data for Plant B
    data = {};
    data.plant_name='MixingPlant';
    data.plant_id='B';
    data.metric_name=topicsOfInterest[count].slice(14);
    data.measurement=obj.measurement + randomIntInc(-50,50);
    data.unit=obj.unit;
    console.log('... sending: ' + JSON.stringify(data));
    rtview_utils.send_datatable(cacheName, data);
    
    // Simulate data for Plant C
    data = {};
    data.plant_name='MixingPlant';
    data.plant_id='C';
    data.metric_name=topicsOfInterest[count].slice(14);
    data.measurement=obj.measurement + randomIntInc(-50,50);
    data.unit=obj.unit;
    console.log('... sending: ' + JSON.stringify(data));
    rtview_utils.send_datatable(cacheName, data);    
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Specific cache definition for sample data table
// Note: This is only called once on startup. 
// If data server is not running, cache will not be created correctly.
rtview_utils.create_datacache(cacheName,
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
