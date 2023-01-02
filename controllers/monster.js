
const Monster =  require("../models/monster");
const bcrypt = require("bcrypt");
const {ObjectId} =require("mongodb");

exports.getMonster = (req, res, next) => {
  const id = req.params.id;
  Monster.findOne({_id:id}).then((monster) => {
    res.status(200).json(monster);
  })
  .catch((error) => {
    res.status(400).json({
      error: error,
    });
  });
}

exports.getMonsters = (req, res, next) => {
  Monster.findById(req.params.id).then(friendsListId => {
    Monster.find({ _id: { $nin: friendsListId.friends } }).then(FriendsList =>{
      res.status(201).json(FriendsList);
    })
  }).catch(error => {
    res.status(400).json(error);
  })

}

exports.addFriend = (req, res, next) =>{
    const data = req.body
    const userId = ObjectId(data.userId);
    const friendId = ObjectId(data.friendId);

      Monster.updateOne(
        { _id: userId }, 
        { $push: { friends: friendId } }  
      ).then(() => {
          res.status(200).json(true);

      }).catch(error => {
      })

}

exports.deleteFriend = (req, res, next) =>{
  const data = req.body
  const userId = ObjectId(data.userId);
  const friendId = ObjectId(data.friendId);

    Monster.updateOne(
      { _id: userId }, 
      { $pull: { friends: friendId } }  
    ).then(() => {
        res.status(200).json(false);

    }).catch(error => {
    })
}
 

exports.getFriends = (req, res, next) => {
  Monster.findById(req.params.id).then(friendsListId => {
    Monster.find({ _id: { $in: friendsListId.friends } }).then(FriendsList =>{
      res.status(201).json(FriendsList);
    })
  }).catch(error => {
    res.status(400).json(error);
  })
}





exports.updateMonster = (req,res,next) =>{
  Monster.findOneAndUpdate({id: req.params.id}, {role : req.body.update}).then(() =>{
    res.status(201).json({success : ' top'})
  }).catch(err => {
    res.status('400').json(error);
  })
}






exports.verifyPassword = (req, res, next) => {
  const id = req.params.id;
   User.findById({_id : id},{_id:0 , password: 1})
   .then((user) =>{
    bcrypt.compare(req.body.password, user.password)
    .then( valid => {
      res.status(201).json(valid);
    })
     
   })
 };

