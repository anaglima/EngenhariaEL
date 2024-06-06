create database engenhariael;

use engenhariael;

create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name,contactNumber,email,password,status,role) values('Admin', '1699999999', 'analima.dev@gmail.com', 'admin', 'true', 'admin');

create table construction(
    id int not NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    local varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    responsible varchar(255) NOT NULL,
    primary key(id)
);

insert into construction(name,local,status,responsible) values('Escola', 'Taquaritinga', 'Iniciada', 'Antonio');

create table material(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    constructionId integer NOT NULL,
    description varchar(255) NOT NULL,
    supplier varchar(255) NOT NULL,
    quantity int NOT NULL,
    primary key(id)
);

