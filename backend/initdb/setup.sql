set
    client_encoding = 'UTF8';

create table users(
    id serial primary key,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    email text not null,
    password text not null
);

INSERT INTO
    users (email, password)
VALUES
    ('test@gmail.com', 'password');