-- User Table
CREATE TABLE IF NOT EXISTS User (
    user_ID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    cell VARCHAR(15) NOT NULL,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL,
    street_Address VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(20) NOT NULL,
    zip VARCHAR(5) NOT NULL,
    password VARCHAR(200) NOT NULL,
    is_Trader BOOLEAN NOT NULL,
    is_Manager BOOLEAN NOT NULL,
    is_Client BOOLEAN NOT NULL,
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