CREATE TABLE movementAids(
  movementAidid int NOT NULL AUTO_INCREMENT,
  movementAidName VARCHAR(40) NOT NULL,
  PRIMARY KEY (movementAidid)
);

CREATE TABLE requestType(
  requestTypeid int NOT NULL AUTO_INCREMENT,
  requestName VARCHAR(40) NOT NULL,
  PRIMARY KEY (requestTypeid)
);

create table elders(
  elderid int not null auto_increment,
  elderName varchar(40) not null,
  address varchar(40) not null,
  postcode VARCHAR(40) not null,
  mobile VARCHAR(40) NULL,
  note VARCHAR(255) NULL,
  movementAidid INT NULL,
  primary key(elderid),
  foreign key(movementAidid) references movementAids(movementAidid)ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT UNIQUE (elderName)
);


create table volunteers(
  volunteerid int not null auto_increment,
  volunteerName varchar(40) not null,
  mon BOOLEAN NOT NULL,
  tue BOOLEAN NOT NULL,
  wed BOOLEAN NOT NULL,
  thu BOOLEAN NOT NULL,
  fri BOOLEAN NOT NULL,
  sat BOOLEAN NOT NULL,
  sun BOOLEAN NOT NULL,
  primary key(volunteerid),
  CONSTRAINT UNIQUE (volunteerName)
);

create table requests(
  requestid int not null auto_increment,
  elderid int not null,
  volunteerid int null,
  location varchar(40) not null,
  time datetime not null,
  timeback DATETIME NULL,
  requestTypeid int NOT NULL,
  retour BOOLEAN NOT NULL,
  note VARCHAR(40) NOT NULL,
  primary key(requestid),
  foreign key(elderid) references elders(elderid)ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(volunteerid) references volunteers(volunteerid)ON DELETE CASCADE ON UPDATE CASCADE,
  foreign key(requestTypeid) references requestType(requestTypeid)ON DELETE CASCADE ON UPDATE CASCADE
);