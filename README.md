# Restaurant Web

## Prerequisites

Before getting started, ensure you have the following installed:

1. [Node.js](https://nodejs.org/) - Ensure Node.js is installed on your system.
2. [Visual Studio Code](https://code.visualstudio.com/) - Ensure Visual Studio Code is installed on your system.
3. [PostgreSQL and pgAdmin 4](https://www.pgadmin.org/download/) - Ensure PostgreSQL and pgAdmin 4 are installed on your system.
4. [Git](https://git-scm.com/) - Ensure Git is installed on your system

## Installation

Follow these steps to set up the repository and run the app:

1. Clone the repository to your local machine:
  - Open up VSCode, and type this in the terminal
```bash
git clone https://github.com/thorjy/restaurant-web.git
```
  - Look for the folder "**restaurant-web**" in your local system, and open it up on VSCode.


2. Set up backend:
  - Go to **restaurant-web/backend/src/datasources/postgres-ds.datasource.ts**, and amend the **config** object.
  - Change '**user**', '**password**' to match the credentials of your pgAdmin 4
3. Set up database:
- Go to pgAdmin 4 and manually create a new Database called "**menuDB**"
- Ensure that the name is exactly the same, as the backend server would be looking for this database
4. Install Dependencies for both frontend and backend, and start both servers.
  - In your terminal, navigate to **restaurant-web/backend** folder, type 
  ```bash
npm i
```
followed by
 ```bash
npm run migrate
```
This will run the migration scheme, and create the tables for the database. Once done, start the backend server by running
 ```bash
npm start
```
  - In your terminal, create a new terminal, and navigate to **restaurant-web/frontend** folder, type
 ```bash
npm i
```
followed by
 ```bash
npm start
```
6. Open up your browser (Google Chrome) and navigate to the website to explore!!! (http://localhost:4200/)


## Using the Web
In the database, I have initialised two users:
### user 1 
Username: test
Password: password

### user 2
Username: bot
Password: password

As a customer, you **MUST** sign in, before you are able to place orders and view your order history...
The web is user friendly and easy to navigate. Go ahead and have fun!
