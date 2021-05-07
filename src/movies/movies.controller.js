const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function movieExists(req, res, next) {
  try {
    const data = await service.readMovie(req.params.movieId);

    if (data) {
      res.locals.movie = data;
      return next();
    }
    const error = new Error("Movie not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
}
async function list(req, res, next) {
  try {
    if (req.query.is_showing === "true") {
      const data = await service.listShowingMovies();
      return res.json({ data });
    } else {
      const data = await service.listAllMovies();
      return res.json({ data });
    }
  } catch (error) {
    next(error);
  }
}

function read(req, res, next) {
  const movie = res.locals.movie;
  res.json({ data: movie });
}

async function findTheatersForMovie(req, res, next) {
  const movie = res.locals.movie;
  try {
    const theaters = await service.findTheatersForMovie(movie.movie_id);
    if (theaters) {
      res.send({ data: theaters });
    }
    const error = new Error("No theaters found!");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
}

async function findReviewsForMovie(req, res, next) {
  try {
    const reviews = await service.findReviewsForMovie(req.params.movieId);
    const critics = await service.listCritics();
    const reviewsWithCritics = reviews.map((element) => {
      const critic = critics.find(
        (criticElement) => criticElement.critic_id === element.critic_id
      );
      return { ...element, critic: critic };
    });
    res.json({ data: reviewsWithCritics });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  findTheatersForMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(findTheatersForMovie),
  ],
  findReviewsForMovie: asyncErrorBoundary(findReviewsForMovie),
};
