create table elders(
  elderid int not null auto_increment,
  name varchar(40) not null,
  location varchar(40) not null,
  primary key(elderid)
);

create table volunteers(
  volunteerid int not null auto_increment,
  name varchar(40) not null,
  primary key(volunteerid)
);

create table requests(
  elderid int not null,
  volunteerid int null,
  location varchar(40) not null,
  time datetime not null,
  requestid int not null auto_increment,
  primary key(requestid),
  foreign key(elderid) references elders(elderid),
  foreign key(volunteerid) references volunteers(volunteerid)
);