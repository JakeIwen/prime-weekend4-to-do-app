CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task VARCHAR(150),
  completed BOOLEAN DEFAULT false
);

INSERT INTO tasks (task)
VALUES ('make to-do list'),
('clean room'),
('learn to code');

--UPDATE tasks SET completed=NOT completed WHERE id=2;
--
--drop table tasks;
--
--INSERT INTO tasks (task) VALUES ('sdvsdv');
