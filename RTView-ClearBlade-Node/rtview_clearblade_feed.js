const constants = require("./constants.json");
//const ClearBlade = require("ClearBlade"); The folder name under node_modules is all lower case
const ClearBlade = require("clearblade");
//console.log('const', constants);


var request = require('request');

var targetURL = 'http://localhost:3275';
//var cacheName = 'CBPlantData';
var cacheName = 'ClearBladeCache';
 
//var targetPostStr = targetURL + '/rtview/write/cache/';
//var targetPostStr = targetURL + '/rtview/json/cache_processor/';
var targetPostStr = targetURL + '/rtview/json/data/'
console.log("target post string = "  + targetPostStr);

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
    data1.plant_name__I='MixingPlant';
    data1.plant_id__I='A';
    data1.metric_name__I='ExhaustAirTemp';
    data1.measurement__H=obj1.measurement;
    data1.unit__H=obj1.unit;
    //console.log('data1=' + JSON.stringify(data1));
    send(targetPostStr, cacheName, clmetadata, data1);
}

function messageReceivedCb2 (message) {
    //console.log('messageReceivedCb2', message.toString());
    var obj2 = JSON.parse(message.toString()); 
    var data2 = {};
    data2.plant_name__I='MixingPlant';
    data2.plant_id__I='A';
    data2.metric_name__I='DryingAggregateTemp';
    data2.measurement__H=obj2.measurement;
    data2.unit__H=obj2.unit;
    //console.log('data2=' + JSON.stringify(data2));
    send(targetPostStr, cacheName, clmetadata, data2);
}

function messageReceivedCb3 (message) {
    //console.log('messageReceivedCb3', message.toString());
    var obj3 = JSON.parse(message.toString()); 
    var data3 = {};
    data3.plant_name__I='MixingPlant';
    data3.plant_id__I='A';
    data3.metric_name__I='HeatingAirTemp';
    data3.measurement__H=obj3.measurement;
    data3.unit__H=obj3.unit;
    //console.log('data3=' + JSON.stringify(data3));
    send(targetPostStr, cacheName, clmetadata, data3);
}

function messageReceivedCb4 (message) {
    //console.log('messageReceivedCb4', message.toString());
    var obj4 = JSON.parse(message.toString());  
    var data4 = {};
    data4.plant_name__I='MixingPlant';
    data4.plant_id__I='A';
    data4.metric_name__I='bearing/bearing1/bearingrpm';
    data4.measurement__H=obj4.measurement;
    data4.unit__H=obj4.unit;
    //console.log('data4=' + JSON.stringify(data4));
    send(targetPostStr, cacheName, clmetadata, data4);
}

function messageReceivedCb5 (message) {
    //console.log('messageReceivedCb5', message.toString());
    var obj5 = JSON.parse(message.toString());  
    var data5 = {};
    data5.plant_name__I='MixingPlant';
    data5.plant_id__I='A';
    data5.metric_name__I='ExitAggregateTemp';
    data5.measurement__H=obj5.measurement;
    data5.unit__H=obj5.unit;
    //console.log('data5=' + JSON.stringify(data5));
    send(targetPostStr, cacheName, clmetadata, data5);
}

function messageReceivedCb6 (message) {
    //console.log('messageReceivedCb6', message.toString());
    var obj6 = JSON.parse(message.toString());  
    var data6 = {};
    data6.plant_name__I='MixingPlant';
    data6.plant_id__I='A';
    data6.metric_name__I='DryingAirTemp';
    data6.measurement__H=obj6.measurement;
    data6.unit__H=obj6.unit;
    //console.log('data6=' + JSON.stringify(data6));
    send(targetPostStr, cacheName, clmetadata, data6);
}

function messageReceivedCb7 (message) {
    //console.log('messageReceivedCb7', message.toString());
    var obj7 = JSON.parse(message.toString());  
    var data7 = {};
    data7.plant_name__I='MixingPlant';
    data7.plant_id__I='A';
    data7.metric_name__I='bearing/bearing1/bearingtemperature';
    data7.measurement__H=obj7.measurement;
    data7.unit__H=obj7.unit;
    //console.log('data7=' + JSON.stringify(data7));
    send(targetPostStr, cacheName, clmetadata, data7);
}

function messageReceivedCb8 (message) {
    //console.log('messageReceivedCb8', message.toString());
    var obj8 = JSON.parse(message.toString());  
    var data8 = {};
    data8.plant_name__I='MixingPlant';
    data8.plant_id__I='A';
    data8.metric_name__I='CombustionAirTemp';
    data8.measurement__H=obj8.measurement;
    data8.unit__H=obj8.unit;
    //console.log('data8=' + JSON.stringify(data8));
    send(targetPostStr, cacheName, clmetadata, data8);
}

function messageReceivedCb9 (message) {
    //console.log('messageReceivedCb9', message.toString());
    var obj9 = JSON.parse(message.toString());  
    var data9 = {};
    data9.plant_name__I='MixingPlant';
    data9.plant_id__I='A';
    data9.metric_name__I='HeatingAggregateTemp';
    data9.measurement__H=obj9.measurement;
    data9.unit__H=obj9.unit;
    //console.log('data9=' + JSON.stringify(data9));
    send(targetPostStr, cacheName, clmetadata, data9);
}

function messageReceivedCb10 (message) {
    //console.log('messageReceivedCb10', message.toString());
    var obj10 = JSON.parse(message.toString());  
    var data10 = {};
    data10.plant_name__I='MixingPlant';
    data10.plant_id__I='A';
    data10.metric_name__I='EntryAggregateTemp';
    data10.measurement__H=obj10.measurement;
    data10.unit__H=obj10.unit;
    //console.log('data10=' + JSON.stringify(data10));
    send(targetPostStr, cacheName, clmetadata, data10);
}

var clmetadata = [
		// "metadata":
		{"name" : "plant_name__I", "type" : "string"},
                {"name" : "plant_id__I", "type" : "string"},
                {"name" : "metric_name__I", "type" : "string"},
                {"name" : "measurement__H", "type" : "double"},
                {"name" : "unit__H", "type" : "string"}
];

var attempts = 0;
var error_count = 0;
var start = new Date().getTime();
         
function send(url, cacheName, metadata, body) {

	//console.log('metadata = ' + JSON.stringify(metadata));
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
		json: { 
			metadata: metadata,
			data: objArray
		}
	}, function(error, response, body){
		var end = new Date().getTime();
		attempts += 1;
		if (error) {
			error_count += 1;
			if (error.code == "ECONNREFUSED") {
				var send_rate = 1000*attempts/(end-start);
				console.log('RTView refused connection');
				g_showErrConnMsg = false;   
			} else {
				console.log("RTView: %s", error);
			}
		} else {
			g_showErrConnMsg = true;      // reset
		}
	}); 
}
