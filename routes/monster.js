const express = require("express");
const router = express.Router();
const monsterCtrl = require("../controllers/monster");

router.get("/get-monster/:id", monsterCtrl.getMonster);
router.get("/get-monsters/:id", monsterCtrl.getMonsters);
router.post("/update-monster/:id", monsterCtrl.updateMonster);
router.post("/add-friend", monsterCtrl.addFriend);
router.post("/delete-friend", monsterCtrl.deleteFriend);
router.get("/get-friends/:id", monsterCtrl.getFriends);
module.exports = router;