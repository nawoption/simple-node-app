const router = require("express").Router();

router.use("/auth", require("./authRouter"));
router.use("/posts", require("./postRouter"));
router.use("/matches", require("./matchRouter"));

module.exports = router;
