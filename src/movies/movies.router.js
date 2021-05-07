const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:movieId/reviews")
  .get(controller.findReviewsForMovie)
  .all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(controller.findTheatersForMovie)
  .all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/").get(controller.list);

module.exports = router;
