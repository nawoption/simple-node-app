const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { postAdd } = require("../schemas/postSchema");
const idSchema = require("../schemas/idSchema");
const { validateBody, validateParam } = require("../middlewares/validator");
const auth = require("../middlewares/authMiddleware");

router.get("/", postController.getMatches);
router.post("/", auth, validateBody(postAdd), postController.createMatch);

//validate id parameter
router.param("id", validateParam(idSchema));
router
    .route("/:id")
    .get(auth, postController.getMatchById)
    .put(validateBody(postAdd), postController.updateMatch)
    .delete(postController.deleteMatch);

module.exports = router;
