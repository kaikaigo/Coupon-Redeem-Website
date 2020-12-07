/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).json("User not found");
    
        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");
    
        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username; 
            req.session.role=user.role;
            req.session.coins=user.coins;
            return res.json(user);
        }
        
        // Start a new session for the new login user
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;
            req.session.role=user.role;
            req.session.coins=user.coins;   
            return res.json(user);
        });
    },

    sign: async function(req,res){
        if (req.method == "GET") return res.view('user/sign');
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user1 = await User.findOne({ username: req.body.username });
    
        if (user1) return res.status(401).json("Username already exist");
        sails.bcrypt = require('bcryptjs');
         var salt = await sails.bcrypt.genSalt(10);
         var hash = await sails.bcrypt.hash(req.body.password, salt);
        if(!user1) var user = await User.create({username:req.body.username, password:hash,role:'member',coins:50}).fetch();
        if (!req.session.username) {
            req.session.username = user.username; 
            req.session.role=user.role;
            req.session.coins=user.coins;
            return res.json(user);
        }
        req.session.regenerate(function (err) {
    
            if (err) return res.serverError(err);
    
            req.session.username = user.username;
            req.session.role=user.role;
            req.session.coins=user.coins;   
            return res.json(user);
        });
    },
    logout: async function (req, res) {

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            return res.redirect('/');	
        });
    },

    redeem: async function(req, res){
        console.log('123')
       var coupon = await Coupon.findOne({id:req.params.id});
       var user =await User.findOne({username:req.session.username});
       if(req.session.coins>=coupon.coins&&coupon.quota>=1){
           console.log('456')
            await User.addToCollection(user.id, 'clients').members(coupon.id);
            await Coupon.addToCollection(coupon.id, 'consultants').members(user.id);
            var updatedCoins = user.coins-coupon.coins;
            var updatedQuota = coupon.quota-1;
            var updatedCoupon = await Coupon.updateOne(coupon.id).set({quota:updatedQuota})
            var updatedUser = await User.updateOne(user.id).set({coins:updatedCoins});
            if (req.wantsJSON){
                return res.status(204).send();	    // for ajax request
            } else {
                return res.redirect('/');			// for normal request
            }
       }else{
        if (!match) return res.status(401).json("Not enough coins or not enough quota or unlogin");
       }
    },

    myRedeem: async function(req,res){
        var clients=await User.find({username:req.session.username}).populate("clients");
        console.log(clients);
        var user = await User.findOne({username:req.session.username})
        var thatcoins = user.coins;
        var thosecoupons=clients[0].clients;
        console.log(thosecoupons);
        if(req.wantsJSON){
            return res.json(thosecoupons);
        }
        else{
        return res.view('User/myRedeem',{ coupons:thosecoupons,coins:thatcoins });
        }
       
    }
};

