
# [Health-Care Provider Search](https://github.com/elxkat/health-care/)

Project Architecture Overview:
* **FE Component:** Built with React and extensive use of Typescript.
SCSS modules for styling. Component are divided to Container, viewer and layout.
Redux is used as ADT state service. However in this demo app I've kept redux to a minimum to reduce unneeded boilerplate.
Redux-Actions is also used to reduce boilerplate, and because it's neat to use.
Redux-Thunk is also applied, and this is where I've placed the fetch. Also implemented is a nice 3 time retry mechanism for the search. 
Tests are currently incomplete, with most thing missing are Enzyme mounting tests to check clickables callback logic.
Run cli tests with yarn test --no-watch.
Also missing is the second bonus of the login screen. I sure can invest some more time and complete them, so please let me know.
* **BE Component:** Built as a serverless service over google cloud functions. Developed with express over node js. 
pg client as PostgreSQL api library.
The service of course register get to /providers url,
and basically convert the spec query params to a SQL query structure that is sent to the DB component.
Tests are implemented and can be run in cli with yarn test.
* **DB Component:** Deployed over Heroku. A Postgres instance with about 50% of the given cvs data (~80000+ records).

Limitations:
* **Data Size:** I've indexed only half the cvs file into Heroku, as even the 80K+ records are far above the 10K limit of the free tier. It shouldn't be a problem to query the records though.
* **google cloud functions:** Fetching of large queries hits 502 from the service. Any "small-medium" combination works with no issues. Using the Field Selection feature also "solves" the issue as it of course reduces the query size by much. 
Again - I'm probably hitting some quotas/limitations of google cloud free tier.
The service works perfectly when ran on a local node server.
To use the local implementation simply move the rootApi in the FE thunk to the localhost and uncomment the listen line @the server code. 
