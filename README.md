# RTView ClearBlade Project

## Overview
This project provides tools and examples that demonstrate how RTView Cloud can be used to display ClearBlade topics in graphical and highly configurable displays in the Cloud.

![](Images/MixingPlantA.jpg)

By following the steps, described below, you will be:
* Installing and running an RTView data server on your local computer, which will allow you to store the incoming data and persist it, using RTView caches.
* Installing and running a node script that subscribes to a few ClearBlade topics and pushes the data to the RTView data server.
* Viewing preexisting displays, populated by data which is coming via a servlet within RTView, through your free trial account on RTViewCloud.


### Requirements
* A free RTViewCloud trial account
* A copy of the RTViewDataServer package
* A copy of the RTView-ClearBlade project from GitHub


## Create an RTView Cloud account

* In a browser, go to [RTViewCloud](http://rtviewcloud.sl.com/).
* Click on Start Free Trial and follow the process to get your free trial account.
* Log in to your RTViewCloud account.

	Notice that you are automatically in your own private organization (e.g. JohnSPrivateOrg).

	
## Download, configure and run the RTViewDataServer	

* While in your RTViewCloud account, click on the ? icon on the top right corner of the RTView Cloud banner.
* In the RTView Cloud Support Home screen, click on the Downloads box.
* In the RTView Cloud Downloads screen, click on the Free Download button.
* Follow the instructions and download a copy of RTViewDataServer to your computer.
* On your computer, bring up a Command prompt.
* Create a new top-level directory (e.g. rtvdemos)

*cd rtvdemos*

*copy \sourcePath\RTViewDataServer_YYYYMMDD.zip*

	Where sourcePath is the location of your download.

Unzip the RTViewDataServer_YYYYMMDD.zip using your favorite zip/unzip utility.

	This will create a directory under rtvdemos, named RTViewDataServer.

*cd RTViewDataServer*

*start_server*

	This will start the RTView data server which will work as a receiver and cache storage 
	for the incoming data.

*cd ..*


## Download the RTView-ClearBlade project from GitHub

* Clone the RTView-ClearBlade project on your local computer.

*cd RTView-ClearBlade-Node*

*npm install*

	This will install the necessary node packages.

*node rtview_clearblade_feed*

	This will start the node script which subscribes to a few ClearBlade topics and pushes 
	the data into the RTView data server, which was set up in the previous section.


## Import and view the prebuilt RTView-ClearBlade displays

* In a browser, go to [RTViewCloud](http://rtviewcloud.sl.com/).
* On the top menu, click on Data.

	This will take you to the RTData Server List page in which you will create a connection 
	to the RTView data server that you previously started on your localhost.
	
* Click on the Add Server button.

* For Name, type:
CLEARBLADE-IOT-SERVER

* For Host/URL, type:
http://localhost:3270/rtvquery

* Click on Save Added Servers.
* To test the connection, click on the green magnifying glass next to the CLEARBLADE-IOT-SERVER.
	This will bring up the RTView DataServer - Cache Tables dialog.
	You should see "Connected" under Connection Status. 
	You should also see the ClearBladeCache in the CacheTable.
	
* Close the dialog.
* On the top menu, click on Design.

	This will bring up the RTDraw, which is RTViewCloud’s visual editor.
	
* Click on File in the menu.
* Click on Import ….
* In the file browser, change directory to RTView-ClearBlade-Displays.
* Select all displays and click Open.
* Click on File in the menu.
* Click on Open ….
* Double click on cb_mixing_plants.

	This will load the cb_mixing_plants display into the editor. 
	This display is configured to connect to your local RTView data server and collect data. This process then populates the display with live data that is being collected by the node script from ClearBlade.


## Achieved Goals
RTView-ClearBlade demo should have : 
* Shown how easy it is to display ClearBlade topics in graphical and highly configurable displays in the Cloud.
* Conveyed the structure of the node script, needed to send data to RTView, which subscribes to topics of interest.
* Allowed the users to enhance the existing RTView displays or create new ones.

**_Feel free to experiment with this project, modify it, enhance it and share your experience, comments, suggestions and/or enhancements with us._**

