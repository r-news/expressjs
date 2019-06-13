const User = require('../helpers/db.helper').models.User;
const Op = require('../helpers/db.helper').models.Op;

const create = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'No data received'
    });
  }
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'state',
      'createdAt',
      'updatedAt'
    ],
    defaults: req.body
  })
    .then(([user, created]) => {
      if(created) {
        console.log('SEEEE '+user, created);
        user.hashed_password = undefined;
        user.password = undefined;
        return res.status(200).json(user);
      }
      return res.status(400).json({
        error: 'User already exists',
        user: user
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message
      });
    });

}
const update = (req, res, next) => {

var values = { 
email:req.body.email, 
firstName:req.body.firstName,
lastName:req.body.lastName,
password: req.body.password
};
var selector = { 
  where: {email: {[Op.eq]: req.body.email}}
};
User.update(values, selector)
.then((response) =>{
    if(response){
      return res.status(200).json(response);
    }
});
}

const remove = (req, res, next) => {
  console.log('REQ', req);
let active='remove';
var values = { 
email:req.body.email, 
firstName:req.body.firstName,
lastName:req.body.lastName,
password: req.body.password,
state:active
};
var selector = { 
  where: {email: {[Op.eq]: req.body.email}}
};
User.update(values, selector)
.then((response) =>{
    if(response){
      return res.status(200).json(response);
    }
});
}

const read = (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.password = undefined;
  return res.status(200).json(req.profile);
}

const userById = (req, res, next, id) => {
  User.findByPk(id)
    .then((user) => {
      if(!user) {
        return res.status(400).json({
          error: 'No user found with id: ' + id
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message
      });
    });
}



module.exports = { create, read,update, userById, remove }
