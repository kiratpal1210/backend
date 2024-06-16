const express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require('passport-local');
const userModel = require("./users");
passport.use(new localStrategy(userModel.authenticate()));


// ------------------------------------------------------------------
// FLASH CONNECT
// router.get('/failed', function(req, res) {
//   // req.flash("naam", data);
//   req.flash("age", 12);
//   res.send("bnn gya");
// });

// router.get('/check', function(req, res) {

//   console.log(req.flash("age"));
//   res.send("check krlo backend ke terminal pr")

// });
// ------------------------------------------------------------------------
// const passport = require('passport');


// router.get('/', function (req, res) {
//   res.render('index');
// });

// router.get("/create", async function (req, res) {
//   let userdata = await userModel.create({
//     username: "jw",
//     nickname: "jff",
//     description: "Hello my name is jff",
//     categories: ['js', 'fashion', 'node', 'react', 'cloud', 'science'],
//     // dateCreated: {
//     //   type: Date,
//     //   default: Date.now()  // jis time yeah bnega..date.now uss moment ka date fix krdega
//     // }
//   });
//   res.send(userdata);
// });

// router.get("/find", async function (req, res) {
//   //   var regex = new RegExp("^Riya$","i"); // this is used to search the names and string as case in-sensitive ( upper case and lower case se kuch fark ni pdega)
//   //   // but isme yeah dikkt h ki agr kisike name me riya aara hoga toh regExp usko bhi search krke dedega..jonhme ni chahea
//   //   // and iss cheez ko cover krne k lea hm ek method use krte h jisme we use (^) in the starting kyunki hme starting aisi chahea and ending of the string me we use $ kyunki hme ending aisi chahea...eg -  ^pahul$
//   //  let user= await userModel.find({username: regex});

//   // let user = await userModel.find({
//   //   categories: {
//   //     $all: ['js']   // this helps to find a particular element having an identity
//   //     // $all ka mtlb voh saare bnde dhoondjo jinki collection m fashion ho
//   //   }
//   // });

// ----------------------------------------------------------------------


//   // search elemtns on the basis of thier creation date
//   // var date1 = new Date('2024-06-16');
//   // var date2 = new Date('2024-06-17');

//   // let user = await userModel.find({
//   //   dateCreated: {
//   //     $gte: date1, $lte: date2 // $ greater than equal.....$lte less than equal
//   //     // and $ means for 
//   //   }
//   // });

//   // let user = await userModel.find({
//   //   categories:{
//   //     $exists: true // this will show me all the users which contains category field  
//   //     // it basically filter documents based on the existence of a field in mongoose
//   //   }
//   // });


//    let user = await userModel.find({
//     $expr:{
//       $and:[
//         {$gte:[{$strLenCP:'$nickname'}, 0]},  // strLenCP means string length compare
//         {$lte:[{$strLenCP:'$nickname'}, 3]}   // yeah greater than equal se lekr less than equal tk string deta h
//       ]
//     }
//    });
//   res.send(user);
// })

// ---------------------------------------------------------------------------------------------

// AUTHENTICATION AND AUTHORIZATION

router.get("/", function(req, res){
  res.render('index');
});

router.get("/profile", function(req, res){
  res.send("Welcome to profile");
})

// register route

router.post("/register", function(req, res){
  console.log("Request Body:", req.body); // debug log

  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password, function(err, registeredUser){
    if (err) {
      console.error(err);
      return res.redirect('/'); // Handle the error appropriately
    }

    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile');
    });
  });
});


// code for login

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile", // mtlb agr username pass shi daala h toh successfully hme profile route p lejaega
  failureRedirect: "/"   // yeah jo passport.authenticatre se lekr failure vaali line h..voh basically h middleware..isko doosre route m bhejne se pehle hi usko hmne pakad lia
  // and usne check kra apne process and agr user real and vhi h toh profile p chalejagea vrna vaale "/" route p chale jaega
}), function(req, res) { });

// code for logout
router.get('/logout', function(req, res,next){
  req.logout(function(err){   // agr koi error aaya toh hm error return krvadenge
    if(err) { return next(err); }
    res.redirect('/');  // else (vrna) voh main page pe redirect hojaega after logging out
  });
});

// code for isLoggedIn middleware   ( MIDDLEWARE SBSE PEHLE CHLTA H)
function isLoggedIn(req, res, next){  // yeah basically protection h  
  if(req.isAuthenticated()){   // mtlb agr user trusted h ya authenticated h toh usko next route m bhejenge
    return next();
  }
  res.redirect('/');
}


module.exports = router;
