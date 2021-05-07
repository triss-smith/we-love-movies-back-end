const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}
function update(reviewId, review) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .update(review)
    .returning("*");
}

function selectRelevantCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}
module.exports = {
  destroy,
  update,
  read,
  selectRelevantCritic,
};
