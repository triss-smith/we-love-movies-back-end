const knex = require("../db/connection");

function theatersList() {
  return knex("theaters").select("*");
}

function movies_theatersList() {
  return knex("movies_theaters").select("*").where({ is_showing: true });
}

function moviesList() {
  return knex("movies").select("*");
}
module.exports = {
  theatersList,
  movies_theatersList,
  moviesList,
};
