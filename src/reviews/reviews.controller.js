const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const correctUpdateData = ["content", "score", "movie_id"];

async function reviewExists(req, res, next) {
  try {
    const review = await service.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    const error = new Error("/cannot be found/i");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
}
function hasCorrectUpdateData(req, res, next) {
  const reviewData = req.body.data;
  const dataKeys = Object.keys(reviewData);
  if (dataKeys.every((element) => correctUpdateData.includes(element))) {
    return next();
  }
  next({
    status: 400,
    message: "Update data must only include approved fields.",
  });
}
async function update(req, res, next) {
  try {
    const review = res.locals.review;
    const updateData = req.body.data;
    const updatedReview = { updateData };
    const critic = await service.selectRelevantCritic(review.critic_id);
    await service.update(review.review_id, updateData);
    const newReview = await service.read(review.review_id);
    const finalObject = { ...newReview, critic: critic };
    res.json({ data: finalObject });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  const review = res.locals.review;
  await service.destroy(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    hasCorrectUpdateData,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
