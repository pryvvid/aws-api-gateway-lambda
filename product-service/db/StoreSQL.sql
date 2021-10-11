CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
	id uuid primary key DEFAULT uuid_generate_v4(),
	title TEXT NOT NULL,
	description text,
	price integer,
	img text
);

create table if not exists stocks (
	product_id uuid,
	count integer,
	foreign key ("product_id") references "products" ("id")
)

insert into products (title, description, price, img) values 
('Dark Souls', 'Action/RPG', 30, 'https://i.imgur.com/qN1ZtEv.jpg'),
('Disco Elysium', 'RPG', 20, 'https://i.imgur.com/TT2aBCG.jpg'),
('The Binding of Isaac', 'Rogue-lite', 10, 'https://i.imgur.com/H2VoEzg.jpg'),
('Hollow Knight', 'Metroidvania', 10, 'https://i.imgur.com/szzxtRw.png'),
('Hotline Miami', 'Top-down action', 10, 'https://i.imgur.com/BU3A92q.jpg')

select * from products;

insert into stocks (product_id, count) values
('c418913e-767a-41af-aac9-8bb0544a1de1', 10),
('f69f4899-4032-4ecf-81eb-7b1323569c0a', 8),
('54018b68-a190-41e4-841d-1f5269ac6dcf', 12),
('3c65332f-bf6d-4332-a980-1503384e4c4b', 11),
('bd993ba5-83d1-44cd-96c3-0414778ef4d3', 7)

select * from stocks;