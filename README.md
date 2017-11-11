**_WORK IN PROGRESS_**

# RTView ClearBlade Demo

## Goals
RTView-ClearBlade demo will: 
* Show how easy it is to display ClearBlade topics in graphical and highly configurable displays in the Cloud.
* Convey the structure of the node script, needed to send data to RTView, which subscribes to topics of interest.
* Allow the users to enhance the existing RTView displays or create new ones.


## Prerequisites

### Hardware Requirements
A computer with:
* 2.8 GHz Core 2 Duo equivalent or faster
* 30 MB disk space for installation
* 2 GB Memory


### Software Requirements
A computer with:
* Node.js Version 6.9.0 or newer

* Google Chrome 57.x+
or
* Microsoft Internet Explorer 11.x, Edge
or
* Mozilla Firefox 50.x+

* RTViewDataServer-Mini package (a zip file, which will be available through SL Corporation)
* RTView_ClearBlade_Displays package (a directory, which is available through GitHub)
* RTView_ClearBlade_Node package (a directory, which is available through GitHub)

* A free trial subscription to RTViewCloud services


## Installation of the packages

On your computer:

* Create a directory and name it rtvdemos.
* Download the RTViewDataServer-Mini.zip (THE DOWNLOAD LOCATION HAS NOT BEEN DEFINED, YET!)
* Download the RTView-ClearBlade repository to your computer (i.e., RTView-ClearBlade-master.zip)

### Installation and execution of the RTViewDataServer-Mini package
Bring up a Command prompt.

*cd rtvdemos*

*copy \sourcePath\RTViewDataServer-Mini.zip*

	Where sourcePath is the location of your download

*unzip RTViewDataServer-Mini.zip*

	This will create a directory under rtvdemos by the same name (i.e., RTViewDataServer-Mini).

*cd RTViewDataServer-Mini*

*start_server*

	This will start the RTView data server which will work as the receiver and cache storage 
	for the incoming data.

*cd ..*


### Installation of the RTView_ClearBlade_Displays package

* Make sure you are in rtvdemos directory.
* Extract the RTView_ClearBlade_Displays directory out of the RTView-ClearBlade-master.zip into rtvdemos.


### Installation and execution of the RTView_ClearBlade_Node package

* Make sure you are in rtvdemos directory.
* Extract the RTView_ClearBlade_Node directory out of the RTView-ClearBlade-master.zip into rtvdemos.

*cd RTView_ClearBlade_Node*

*npm install*

	This will install the necessary node packages.

*node rtview_clearblade_feed*

	This will start the node script which subscribes to a few ClearBlade topics and pushes 
	the data into the RTView data server, which was set up in the previous section.


### Subscription, configuration and execution of the RTViewCloud Services

* In a browser, go to [RTViewCloud](http://rtviewcloud.sl.com/).

* Click on Start Free Trial and follow the process to get your free trial account.

* Log in to your RTViewCloud account.

	Notice that you are automatically in your own private organization (e.g. JohnSPrivateOrg).
	
* On the top menu, click on Data.

	This will take you to the RTData Server List page in which you will create a connection 
	to your RTView data server.
	
* Click on the Add Server button.

* For Name, type:
LOCAL-CLEARBLADE

* For Host/URL, type:
http://localhost:3270/rtvquery

* Click on Save Added Servers.

* To test the connection, click on the green magnifying glass next to the LOCAL-CLEARBLADE.
	This will bring up the RTView DataServer - Cache Tables dialog.
	You should see "Connected" under Connection Status. 
	You should also see the ClearBladeCache in the CacheTable.
	
* Close the dialog.

* On the top menu, click on Design.

	This will bring up the RTDraw, which is RTViewCloud’s visual editor.
	
* Click on File in the menu.

* Click on Import ….

* In the file browser, change directory to \rtvdemos\RTView_ClearBlade_Displays.

* Pick one of the displays (e.g. cb_mixing_plant_chicago_l.json) and click Open.

* Click on File in the menu.

* Click on Open ….

* Double click on cb_mixing_plant_chicago_l.

	This will load the cb_mixing_plant_chicago_l display into the editor. 
	This display is configured to connect to your local RTView data server and collect data. This process then populates the display with live data that is being collected by the node script from ClearBlade.


**_Feel free to experiment with this project, modify it, enhance it and share your experience, comments, suggestions and/or enhancements with us._**
