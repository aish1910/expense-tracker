insert into "user" values (1,'Aishwarya', 'aishwarya.s1910@gmail.com');
insert into "user" values (2,'Hendricks', 'henry@gmail.com');
insert into "user" values (3,'Sujatha', 'sujatha1254@gmail.com');

insert into category values (1,'Travel');
insert into category values (2,'Home Loan');
insert into category values (3,'Food');

insert into expense(id, expense_date, description, location, category_id, user_id) values (100,'2019-06-16T17:00:00.000Z','New York Business Trip','Chennai',1,1);
insert into expense(id, expense_date, description, location, category_id, user_id) values (101,'2019-06-15T15:00:00.000Z','New House Purchase - Home Loan','Bangalore',2,2);
insert into expense(id, expense_date, description, location, category_id, user_id) values(102,'2019-06-15T15:00:00.000Z','Treat at McDonalds','Hyderabad',3,3);