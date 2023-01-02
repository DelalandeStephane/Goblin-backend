const bcrypt = require("bcrypt");
const Monster = require("../models/monster");
const jwt = require('jsonwebtoken');


exports.signUp = (req, res) => {
        // check if the email is already use
        Monster.findOne({ email: req.body.email }).then((monster) => {
          if(monster) {
            return res.status(200).json({AlreadyUse:true});
          } 

          bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
              req.body.password = hash;
                const monster_one = new Monster({
                  ...req.body
                });
                monster_one
                  .save()
                  .then((user) => res.status(201).json())
                  .catch(error => res.status(500).json({  error }));
              });
      })

};

exports.signIn = (req, res) => {
  Monster.findOne({email:req.body.email})
  .then(monster => {
    if(!monster) {
      return res.status(401).json({ error:'Utilisateur non trouvé'})
    }
    bcrypt.compare(req.body.password, monster.password)
    .then( valid => {
      if(!valid){
        return res.status(401).json({ error:'Identifiant incorrect'})
      }
      res.status(200).json({
        userId: monster._id,
        token: jwt.sign(
          {userId: monster._id},
          'RANDOM_TOKEN_SECRET',
          { expiresIn:'24h' }
        )
      });
    })
    .catch(error => { res.status(500).json({ error}) })
  })
  .catch( error => res.status(500).json({ error }));
}

exports.verifyEmail = (req, res) => {
  User.findOne({ email: req.params.email }).then((user) => {
      res.status(200).json(user);
  })
}