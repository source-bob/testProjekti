DROP DATABASE IF EXISTS theDeck;
CREATE DATABASE theDeck;
USE theDeck;

-- Create a table for users
CREATE TABLE Users (
    user_id     INT             AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)     NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    email       VARCHAR(100)    NOT NULL UNIQUE,
    user_level  VARCHAR(40)     NOT NULL,
    registered_at  DATETIME        DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for posts
CREATE TABLE Posts (
    entry_id        INT               AUTO_INCREMENT PRIMARY KEY,
    user_id         INT,
    note           VARCHAR(300),
    created_at      DATETIME DEFAULT  CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES  Users(user_id) ON DELETE CASCADE
);