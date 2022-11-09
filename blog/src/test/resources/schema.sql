create table category
(
 id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
 name varchar(50),
 type varchar(5)
);

create table article
(
 id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
 type varchar(5),
 title varchar(30),
 contents varchar(30),
 images varchar(255),
 tags varchar(40),
 created_time date,
 category_id bigint,
 FOREIGN KEY (category_id) REFERENCES category(id)
);