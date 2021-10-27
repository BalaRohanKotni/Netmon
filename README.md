## This Project is in Work in Progress 👷 🚧 

## Project Name: Netmon
Netmon hosts a website on local network(A website where you can view speedtests data using plain text or graph, and sort speedtest data to your needs) and 
a speedtest logger.

### How Netmon works?
Netmon runs 2 js files simultaneously. One js file hosts a website on LAN, this website will be dashboard/control-panel for the project. The other js file runs a speedtest
every 30mins(interval length can be customizable) and stores it in db.

### Made Using
FRONT-END: JS, EJS, CSS <br>
BACK-END : NodeJS, ExpressJS, Mongoose<br>
DATABASE: MongoDB