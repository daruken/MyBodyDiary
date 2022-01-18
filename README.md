# MyBodyDiary

MyBodyDiary

< DBMS scheme 생성 >
create table if not exists `mybodydiary`.`user_info` (
 `id` varchar(128) not null,
 `email` varchar(128) not null,
 `password` varchar(128) not null,
 createdAt datetime,
 updateTimestamp datetime,
 primary key (`id`))
 engine = innodb
 default character set = utf8;

create table if not exists `mybodydiary`.`event_diary` (
 `event_id` int not null auto_increment,
 `id` varchar(128) not null,
 `date` datetime,
 `title` varchar(50) not null,
 `content` text,
 `image` blob,
 createdAt datetime,
 updateTimestamp datetime,
 primary key (`event_id`),
 foreign key (`id`) references user_info(`id`))
 engine = innodb
 default character set = utf8;
