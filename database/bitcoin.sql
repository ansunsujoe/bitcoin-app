-- User Table
CREATE TABLE IF NOT EXISTS User (
    User_ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Phone_number VARCHAR(15) NOT NULL,
    Cell VARCHAR(15) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Street_Address VARCHAR(50) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(20) NOT NULL,
    Zip VARCHAR(5) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Is_Trader BOOLEAN NOT NULL,
    Is_Manager BOOLEAN NOT NULL,
    PRIMARY KEY (User_ID)
);

-- Transaction Table
CREATE TABLE IF NOT EXISTS Transaction (
	Transaction_id INT NOT NULL AUTO_INCREMENT,
    Trader_id INT NOT NULL,
	Commission_type VARCHAR(3) NOT NULL,
	Client_id INT NOT NULL,
	Status VARCHAR(10) NOT NULL,
    Date DATETIME NOT NULL,
    Action VARCHAR(10) NOT NULL,
	Amount DOUBLE(32, 10) NOT NULL,
	PRIMARY KEY (Transaction_id),
	FOREIGN KEY (Client_id) REFERENCES User(User_ID),
    FOREIGN KEY (Trader_id) REFERENCES User(User_ID)
);

-- Client table
CREATE TABLE IF NOT EXISTS Client (
    User_ID INT NOT NULL,
    Fiat_balance DOUBLE(32, 2) NOT NULL,
    BTC_balance DOUBLE(32, 10) NOT NULL,
    User_classification VARCHAR(10) NOT NULL,
    Last_classification_update DATETIME NOT NULL,
    PRIMARY KEY (User_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

-- Processed table
CREATE TABLE IF NOT EXISTS Processed (
	Trader_id INT NOT NULL,
    Transaction_id INT NOT NULL,
	Order_id INT NOT NULL AUTO_INCREMENT,
	Commission_paid DOUBLE(32, 10) NOT NULL,
    Date DATETIME NOT NULL,
    PRIMARY KEY (Order_id),
    FOREIGN KEY (Trader_id) REFERENCES User(User_ID),
    FOREIGN KEY (Transaction_id) REFERENCES Transaction(Transaction_id)
);

-- Issues table
CREATE TABLE IF NOT EXISTS IssuesTransaction (
    Transaction_id INT NOT NULL,
	Trader_id INT NOT NULL,
	Client_id INT NOT NULL,
	PRIMARY KEY (Transaction_id),
	FOREIGN KEY (Client_id, Trader_id) REFERENCES User
);

-- Transfer Table
CREATE TABLE IF NOT EXISTS Transfer (
	Transfer_id int NOT NULL AUTO_INCREMENT,
	Client_id NOT NULL, 	
    Trader_id int NOT NULL,
	Amount DOUBLE(32,2),
	Status VARCHAR(10),
    Date DATETIME NOT NULL,
    PRIMARY KEY (Transfer_id),
	FOREIGN KEY (Client_id) REFERENCES User(User_ID),
    FOREIGN KEY (Trader_id) REFERENCES User(User_ID)
);