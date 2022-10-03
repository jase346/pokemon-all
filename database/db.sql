CREATE DATABASE pokemon_all;

USE pokemon_all;

CREATE TABLE pokemons(
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    experience INT NOT NULL,
    image TEXT NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    speed   INTEGER NOT NULL,
    alias VARCHAR(20) NOT NULL,
    dni INTEGER UNIQUE
)

DESCRIBE pokemons;