-- User Table
CREATE TABLE IF NOT EXISTS User (
    User_ID VARCHAR(50) NOT NULL,
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
	Transaction_id VARCHAR(50) NOT NULL,
    Trader_id VARCHAR(50) NOT NULL,
	Commission_type VARCHAR(3),
	Client_id NOT NULL,
	Status VARCHAR(10),
    Date DATE,
    Currency_type VARCHAR(10),
	Amount DOUBLE(32, 10),
	PRIMARY KEY (Transaction_id),
	FOREIGN KEY (Client_id) REFERENCES User(User_ID),
    FOREIGN KEY (Trader_id) REFERENCES User(User_ID)
);

-- Client table
CREATE TABLE IF NOT EXISTS Client (
    User_ID VARCHAR(50) NOT NULL,
    Fiat_balance DOUBLE(32, 2) NOT NULL,
    BTC_balance DOUBLE(32, 10) NOT NULL,
    User_classification VARCHAR(10) NOT NULL,
    PRIMARY KEY (User_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

-- Processed table
CREATE TABLE IF NOT EXISTS Processed (
	Trader_id VARCHAR(50) NOT NULL,
    Transaction_id VARCHAR(50) NOT NULL,
	Order_id VARCHAR(50) NOT NULL,
	Commission_paid DOUBLE(32, 10) NOT NULL,
    PRIMARY KEY (Order_id),
    FOREIGN KEY (Trader_id) REFERENCES User(User_ID),
    FOREIGN KEY (Transaction_id) REFERENCES Transaction(Transaction_id)
);

-- Issues table
CREATE TABLE IF NOT EXISTS Issues_On_Behalf (
    Transaction_id INT,
	Trader_id INT,
	Client_id INT,
	PRIMARY KEY(Transaction_id)
	Foreign key (Client_id, Trader_id) REFERENCES User
);