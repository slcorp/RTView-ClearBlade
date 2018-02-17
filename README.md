# RTView ClearBlade Project

## Overview
This project provides tools and examples that show how to use RTView Cloud with the ClearBlade Enterprise IoT Edge Platform to readily create and deploy rich graphical displays connected to real-time and historical ClearBlade data. 

![](Images/MixingPlantA.jpg)

By following the steps described below you will:

* Create an account on RTView Cloud.
* Download and run on your local computer an RTView DataServer, providing real-time data caching and historical archival.
* Run a Node.js connector program that subscribes to a few ClearBlade topics and populates the RTView DataServer.
* Import into RTView Cloud a few sample displays showing real-time data coming from ClearBlade.

## Requirements
To run this project, you will need to have installed on your computer:
```
Node.js version 6 or higher

Java version 1.7 or higher
```

## Create an RTView Cloud account
An RTView Cloud account provides the tools for creating, viewing and publishing rich graphical displays connected to real-time data sources.

* In a browser, go to [RTView Cloud](http://rtviewcloud.sl.com/).
* Click on Start Free Trial to create your account (skip if you have an account already).
* Login to your RTView Cloud account.

Note that you are automatically placed into your own private organization (e.g. JohnSPrivateOrg).
	
## Download and run the RTView DataServer	

* From your RTView Cloud account, click on the ? icon at upper right to go to the Support page.
* Select Downloads and elect to download the RTView DataServer to your computer.
* Unzip the downloaded **RTViewDataServer_YYYYMMDD.zip** file to a directory of your choice.
* Open a Command Window or Linux Shell in that directory.

To start the RTView DataServer:
```
cd RTViewDataServer

start_server          (or ./start_server.sh in Linux)
```
The RTView DataServer is now ready to receive data at the following http URL:
```
http(s)://localhost:3270/rtvpost
```
At any time you can stop the server:
```
stop_server           (or ./stop_server.sh in Linux)
```
## Download and run the RTView-ClearBlade connector 

Clone this RTView-ClearBlade project to your local computer and follow the steps below to install and run the RTView ClearBlade connector program. This simple Node.js program subscribes to public demo topics provided by ClearBlade and populates the RTView DataServer, which provides current and historical caching of incoming metric values for display purposes.

To install the connector program:
```
cd RTView-ClearBlade-Node

npm install
```
To start the program:
```
node rtview_clearblade_feed
```
This connector program can easily be modified to subscribe to topics relevant to your own application.

## Import and view the sample RTView-ClearBlade displays

* In a browser, go to [RTView Cloud](http://rtviewcloud.sl.com/).

* Define a connection to the RTView DataServer running on your local system:
```
On the RTView Cloud top menu bar, select Data.
Select the Add RTView Server button.
In the Add RTView Server dialog enter:

	Name:       CLEARBLADE-IOT-SERVER
	Host/URL:   http://localhost:3270/rtvquery

Click on Save Added Servers.
```
* Test that the connection is successful:
```
Click on the green magnifying glass icon next to the CLEARBLADE-IOT-SERVER entry.
This will invoke the RTView DataServer - Cache Tables dialog.
Verify that you see "Connected" under Connection Status. 
Verify that you see ClearBladeCache in the CacheTable.
Close the dialog.
```
* Import the sample displays:
```
On the RTView Cloud top menu bar, click on Design to invoke the RTDraw visual editing tool.
Select the File dropdown menu and click on Import... 
In the file browser, navigate to the RTView-ClearBlade-Displays directory within this project.
Select all displays and click Open.
```
* View or edit the sample displays:
```
Select the File dropdown menu and click on Open...
Double click the name of the display you would like to open and view in real-time.
```
The sample displays are configured to connect to your local RTView data server and present data changing in real-time.
You can experiment with the editing features of RTDraw to make changes to these displays or create your own.

## Achieved Goals
In this RTView-ClearBlade project you will have achieved the following: 
* Seen how easy it is to display ClearBlade topics in graphical and highly configurable displays in the Cloud.
* Launched the simple node program used to send data to RTView, subscribing to topics of interest.
* Seen how users are able to view or enhance the sample RTView displays or create new displays.

**Feel free to experiment with, modify or enhance this project, and share your experience, comments and suggestions with us. Please fork this repo and submit a pull request for any changes you would like to suggest.**

