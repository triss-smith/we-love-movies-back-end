const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res, next) {
  try {
    const theaters = await service.theatersList();
    const movies_theaters = await service.movies_theatersList();
    const movies = await service.moviesList();

    const finalArray = [];
    let moviesArray = [];
    theaters.forEach((theater) => {
      movies_theaters.forEach((element) => {
        moviesArray = [];
        if (element.theater_id == theater.theater_id) {
          moviesArray.push(movies[element.movie_id]);
        }
      });
      finalArray.push({ ...theater, movies: movies });
    });
    res.json({ data: finalArray });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
