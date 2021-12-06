# bitcoin-app
Bitcoin Application for CS 6360

## Contributors
Vashisht Gupta - vxg210001 
Caleb Jiang - cgj180000 
Ansun Sujoe - axs180210
Annika Hendrickson - alh190000 
Ashish Pratap - axp200189

## Backend
A Flask app is used to connect to MySQL
Details here: https://www.section.io/engineering-education/flask-database-integration-with-sqlalchemy/

## Docker Compose Run - Steps
1. A Docker installation is required.
2. Create an empty folder in the application root directory called "mysql_data". This will be the volume for the database.
3. Go to the application root directory and run the command "docker compose up".
4. The frontend will be accessible via "localhost:3000", and the backend will be running on localhost:5000.

## Docker Local - Steps
1. Change directory to "frontend" and run "npm install".