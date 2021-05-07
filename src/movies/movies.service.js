const knex = require("../db/connection");

function listAllMovies() {
  return knex("movies").select("*");
}
function listShowingMovies() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("*")
    .distinct("m.movie_id")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

function readMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function findTheatersForMovie(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "mt.created_at",
      "mt.updated_at",
      "mt.is_showing",
      "mt.movie_id"
    )
    .where(knex.raw(`m.movie_id = ${movieId}`))
    .where({ is_showing: true });
}

function findReviewsForMovie(movieId) {
  return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id"
    )
    .where(knex.raw(`m.movie_id = ${movieId}`));
  //return knex("reviews").select("*").where({movie_id : movieId})
}

function listCritics() {
  return knex("critics").select("*");
}
module.exports = {
  listAllMovies,
  listShowingMovies,
  readMovie,
  findTheatersForMovie,
  findReviewsForMovie,
  listCritics,
};
