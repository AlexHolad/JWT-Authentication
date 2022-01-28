const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  token: { type: String },
});

// UserSchema.pre("save", function (next) {
//    const user = this

//    if (this.isModified("password") || this.isNew) {
//      bcrypt.genSalt(10, function (saltError, salt) {
//        if (saltError) {
//          return next(saltError)
//        } else {
//          bcrypt.hash(user.password, salt, function(hashError, hash) {
//            if (hashError) {
//              return next(hashError)
//            }

//            user.password = hash
//            next()
//          })
//        }
//      })
//    } else {
//      return next()
//    }
//  })

//  //Compare Password
//  UserSchema.methods.comparePassword = function(password, callback) {
//    bcrypt.compare(password, this.password, function(error, isMatch) {
//      if (error) {
//        return callback(error)
//      } else {
//        callback(null, isMatch)
//      }
//    })
//  }

// bcrypt.genSalt(saltRounds, function(err, salt) {
//    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//        // Store hash in your password DB.

//    });
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;
