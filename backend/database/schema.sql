CREATE DATABASE storedDB;
USE storedDB;

CREATE TABLE line(
    line_id int AUTO_INCREMENT,
    line_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(line_id)

);

CREATE TABLE station(
    station_id int AUTO_INCREMENT,
    station_name VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY KEY(station_id)
);

CREATE TABLE stations_in_line (
    line_id int NOT NULL,
    station_id int NOT NULL,
    station_pos_in_line int NOT NULL,
    FOREIGN KEY (line_id) REFERENCES line(line_id) ,
    FOREIGN KEY (station_id) REFERENCES station(station_id),
    UNIQUE(line_id, station_id),
    UNIQUE(line_id, station_pos_in_line)
);