// *********************************************************
// RTView - ClearBlade Sample Program

const ClearBlade = require("clearblade");
const constants = require("./constants.json");

var request = require('request');

// URL of RTView DataServer http port
var targetURL = 'http://localhost:3275';
var targetPostStr = targetURL + '/rtview/json/data/'
var targetCommandStr = targetURL + '/rtview/json/cache_processor/'

// Name of the cache created in this demo
var cacheName = 'ClearBladeCache';

var messaging1;
var messaging2;
var messaging3;
var messaging4;
var messaging5;
var messaging6;
var messaging7;
var messaging8;
var messaging9;
var messaging10;

var TOPIC_NAME1 = "MixingPlant/A/ExhaustAirTemp";
var TOPIC_NAME2 = "MixingPlant/A/DryingAggregateTemp";
var TOPIC_NAME3 = "MixingPlant/A/HeatingAirTemp";
var TOPIC_NAME4 = "MixingPlant/A/bearing/bearing1/bearingrpm";
var TOPIC_NAME5 = "MixingPlant/A/ExitAggregateTemp";
var TOPIC_NAME6 = "MixingPlant/A/DryingAirTemp";
var TOPIC_NAME7 = "MixingPlant/A/bearing/bearing1/bearingtemperature";
var TOPIC_NAME8 = "MixingPlant/A/CombustionAirTemp";
var TOPIC_NAME9 = "MixingPlant/A/HeatingAggregateTemp";
var TOPIC_NAME10 = "MixingPlant/A/EntryAggregateTemp";

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
	} else {
        messaging1 = ClearBlade.Messaging({}, messageInit1);
        messaging2 = ClearBlade.Messaging({}, messageInit2);
        messaging3 = ClearBlade.Messaging({}, messageInit3);
        messaging4 = ClearBlade.Messaging({}, messageInit4);
        messaging5 = ClearBlade.Messaging({}, messageInit5);
        messaging6 = ClearBlade.Messaging({}, messageInit6);
        messaging7 = ClearBlade.Messaging({}, messageInit7);
        messaging8 = ClearBlade.Messaging({}, messageInit8);
        messaging9 = ClearBlade.Messaging({}, messageInit9);
        messaging10 = ClearBlade.Messaging({}, messageInit10);
	}
}

function messageInit1 () {
    messaging1.subscribe(TOPIC_NAME1, {}, messageReceivedCb1);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME1}'`);
}

function messageInit2 () {
    messaging2.subscribe(TOPIC_NAME2, {}, messageReceivedCb2);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME2}'`);
}

function messageInit3 () {
    messaging3.subscribe(TOPIC_NAME3, {}, messageReceivedCb3);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME3}'`);
}

function messageInit4 () {
    messaging4.subscribe(TOPIC_NAME4, {}, messageReceivedCb4);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME4}'`);
}

function messageInit5 () {
    messaging5.subscribe(TOPIC_NAME5, {}, messageReceivedCb5);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME5}'`);
}

function messageInit6 () {
    messaging6.subscribe(TOPIC_NAME6, {}, messageReceivedCb6);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME6}'`);
}

function messageInit7 () {
    messaging7.subscribe(TOPIC_NAME7, {}, messageReceivedCb7);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME7}'`);
}

function messageInit8 () {
    messaging8.subscribe(TOPIC_NAME8, {}, messageReceivedCb8);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME8}'`);
}

function messageInit9 () {
    messaging9.subscribe(TOPIC_NAME9, {}, messageReceivedCb9);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME9}'`);
}

function messageInit10 () {
    messaging10.subscribe(TOPIC_NAME10, {}, messageReceivedCb10);
    console.log(`message init was successful; subscribing to '${TOPIC_NAME10}'`);
}

function messageReceivedCb1 (message) {
    //console.log('messageReceivedCb1', message.toString());
    var obj1 = JSON.parse(message.toString());  
    var data1 = {};
    data1.plant_name='MixingPlant';
    data1.plant_id='A';
    data1.metric_name='ExhaustAirTemp';
    data1.measurement=obj1.measurement;
    data1.unit=obj1.unit;
    //console.log('data1=' + JSON.stringify(data1));
    datatable_send(cacheName, clmetadata, data1);
    
    // Simulate data for Plant B
    data1.plant_id='B';
    data1.measurement=obj1.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data1);
    
    // Simulate data for Plant C
    data1.plant_id='C';
    data1.measurement=obj1.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data1);    
}

function messageReceivedCb2 (message) {
    //console.log('messageReceivedCb2', message.toString());
    var obj2 = JSON.parse(message.toString()); 
    var data2 = {};
    data2.plant_name='MixingPlant';
    data2.plant_id='A';
    data2.metric_name='DryingAggregateTemp';
    data2.measurement=obj2.measurement;
    data2.unit=obj2.unit;
    //console.log('data2=' + JSON.stringify(data2));
    datatable_send(cacheName, clmetadata, data2);
    
    // Simulate data for Plant B
    data2.plant_id='B';
    data2.measurement=obj2.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data2);
    
    // Simulate data for Plant C
    data2.plant_id='C';
    data2.measurement=obj2.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data2);    
}

function messageReceivedCb3 (message) {
    //console.log('messageReceivedCb3', message.toString());
    var obj3 = JSON.parse(message.toString()); 
    var data3 = {};
    data3.plant_name='MixingPlant';
    data3.plant_id='A';
    data3.metric_name='HeatingAirTemp';
    data3.measurement=obj3.measurement;
    data3.unit=obj3.unit;
    //console.log('data3=' + JSON.stringify(data3));
    datatable_send(cacheName, clmetadata, data3);
    
    // Simulate data for Plant B
    data3.plant_id='B';
    data3.measurement=obj3.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data3);
    
    // Simulate data for Plant C
    data3.plant_id='C';
    data3.measurement=obj3.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data3);    
}

function messageReceivedCb4 (message) {
    //console.log('messageReceivedCb4', message.toString());
    var obj4 = JSON.parse(message.toString());  
    var data4 = {};
    data4.plant_name='MixingPlant';
    data4.plant_id='A';
    data4.metric_name='bearing/bearing1/bearingrpm';
    data4.measurement=obj4.measurement;
    data4.unit=obj4.unit;
    //console.log('data4=' + JSON.stringify(data4));
    datatable_send(cacheName, clmetadata, data4);
    
    // Simulate data for Plant B
    data4.plant_id='B';
    data4.measurement=obj4.measurement + randomIntInc(-200,200);
    datatable_send(cacheName, clmetadata, data4);
    
    // Simulate data for Plant C
    data4.plant_id='C';
    data4.measurement=obj4.measurement + randomIntInc(-200,200);
    datatable_send(cacheName, clmetadata, data4);    
}

function messageReceivedCb5 (message) {
    //console.log('messageReceivedCb5', message.toString());
    var obj5 = JSON.parse(message.toString());  
    var data5 = {};
    data5.plant_name='MixingPlant';
    data5.plant_id='A';
    data5.metric_name='ExitAggregateTemp';
    data5.measurement=obj5.measurement;
    data5.unit=obj5.unit;
    //console.log('data5=' + JSON.stringify(data5));
    datatable_send(cacheName, clmetadata, data5);
    
    // Simulate data for Plant B
    data5.plant_id='B';
    data5.measurement=obj5.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data5);
    
    // Simulate data for Plant C
    data5.plant_id='C';
    data5.measurement=obj5.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data5);    
}

function messageReceivedCb6 (message) {
    //console.log('messageReceivedCb6', message.toString());
    var obj6 = JSON.parse(message.toString());  
    var data6 = {};
    data6.plant_name='MixingPlant';
    data6.plant_id='A';
    data6.metric_name='DryingAirTemp';
    data6.measurement=obj6.measurement;
    data6.unit=obj6.unit;
    //console.log('data6=' + JSON.stringify(data6));
    datatable_send(cacheName, clmetadata, data6);
    
    // Simulate data for Plant B
    data6.plant_id='B';
    data6.measurement=obj6.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data6);
    
    // Simulate data for Plant C
    data6.plant_id='C';
    data6.measurement=obj6.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data6);    
}

function messageReceivedCb7 (message) {
    //console.log('messageReceivedCb7', message.toString());
    var obj7 = JSON.parse(message.toString());  
    var data7 = {};
    data7.plant_name='MixingPlant';
    data7.plant_id='A';
    data7.metric_name='bearing/bearing1/bearingtemperature';
    data7.measurement=obj7.measurement;
    data7.unit=obj7.unit;
    //console.log('data7=' + JSON.stringify(data7));
    datatable_send(cacheName, clmetadata, data7);
    
    // Simulate data for Plant B
    data7.plant_id='B';
    data7.measurement=obj7.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data7);
    
    // Simulate data for Plant C
    data7.plant_id='C';
    data7.measurement=obj7.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data7);    
}

function messageReceivedCb8 (message) {
    //console.log('messageReceivedCb8', message.toString());
    var obj8 = JSON.parse(message.toString());  
    var data8 = {};
    data8.plant_name='MixingPlant';
    data8.plant_id='A';
    data8.metric_name='CombustionAirTemp';
    data8.measurement=obj8.measurement;
    data8.unit=obj8.unit;
    //console.log('data8=' + JSON.stringify(data8));
    datatable_send(cacheName, clmetadata, data8);
    
    // Simulate data for Plant B
    data8.plant_id='B';
    data8.measurement=obj8.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data8);
    
    // Simulate data for Plant C
    data8.plant_id='C';
    data8.measurement=obj8.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data8);    
}

function messageReceivedCb9 (message) {
    //console.log('messageReceivedCb9', message.toString());
    var obj9 = JSON.parse(message.toString());  
    var data9 = {};
    data9.plant_name='MixingPlant';
    data9.plant_id='A';
    data9.metric_name='HeatingAggregateTemp';
    data9.measurement=obj9.measurement;
    data9.unit=obj9.unit;
    //console.log('data9=' + JSON.stringify(data9));
    datatable_send(cacheName, clmetadata, data9);
    
    // Simulate data for Plant B
    data9.plant_id='B';
    data9.measurement=obj9.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data9);
    
    // Simulate data for Plant C
    data9.plant_id='C';
    data9.measurement=obj9.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data9);    
}

function messageReceivedCb10 (message) {
    //console.log('messageReceivedCb10', message.toString());
    var obj10 = JSON.parse(message.toString());  
    var data10 = {};
    data10.plant_name='MixingPlant';
    data10.plant_id='A';
    data10.metric_name='EntryAggregateTemp';
    data10.measurement=obj10.measurement;
    data10.unit=obj10.unit;
    //console.log('data10=' + JSON.stringify(data10));
    datatable_send(cacheName, clmetadata, data10);
    
    // Simulate data for Plant B
    data10.plant_id='B';
    data10.measurement=obj10.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data10);
    
    // Simulate data for Plant C
    data10.plant_id='C';
    data10.measurement=obj10.measurement + randomIntInc(-50,50);
    datatable_send(cacheName, clmetadata, data10);  
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

// Specific cache definition for sample data table
datacache_create(cacheName, {
    "indexColumnNames": "plant_name;plant_id;metric_name",
    "historyColumnNames": "measurement;unit"
});

// Specific metadata for the sample data    
var clmetadata = [
    { "plant_name": "string" },
    { "plant_id": "string" },
    { "metric_name": "string" },
    { "measurement": "double" },
    { "unit": "string" }
];

// ###################################################
// RTView Utility Functions

// Create a named data cache with the specified properties.
function datacache_create (cacheName, properties) {
    if (properties === null) return;     
    cachedef_metadata = [ { "name":"propName", "type":"string" },{ "name":"propValue", "type":"string" } ];  
    cachedef_data = []
    for (var propName in properties) {
        cachedef_data.push( { 'propName': propName, 'propValue': properties[propName] } );
    }
    send_to_rtview(targetCommandStr, 'replace/' + cacheName, cachedef_metadata, cachedef_data);
}

// Send a block of data to RTView
function datatable_send (cacheName, metadata, data) {
    if (data == null) return;
    if (metadata == null || metadata.length < 1) return;
    metadata2 = []
    for (var i = 0; i < metadata.length; i++) {
        for (var colName in metadata[i]) {
            metadata2.push( { "name": colName, "type": metadata[i][colName] } )
        }
    }
    send_to_rtview(targetPostStr, cacheName, metadata2, data);
}

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
