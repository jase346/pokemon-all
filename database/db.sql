CREATE DATABASE pokemon_all;

USE pokemon_all;

CREATE TABLE pokemons(
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    base_experience INT NOT NULL,
    img TEXT NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    speed   INTEGER NOT NULL,
    type    TEXT NOT NULL,
    alias UNIQUE NOT NULL,
    gender TEXT NOT NULL,
    dni INTEGER UNIQUE
)

DESCRIBE pokemons;