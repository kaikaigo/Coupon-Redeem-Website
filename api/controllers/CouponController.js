/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  
home:async function(req,res){
console.log("laile");
var Hkislandcs = await Coupon.find({
    where: { region: 'HK Island' },
    limit:2,
    skip:0
    
}
);

var Kowlooncs = await Coupon.find({
    where: { region: 'Kowloon' },
    limit:2,
    skip:0
});


var Newcs = await Coupon.find({
    where: { region: 'New Territories' },
    limit:2,
    skip:0
});
var resaurs = await [Hkislandcs,Kowlooncs,Newcs];
if(req.wantsJSON){
    return res.json(resaurs);
}
else{
    return res.view('Coupon/home',{ rs:resaurs });
}
},

show:async function(req,res){
    console.log("laile");
    var coupons = await Coupon.find({  
    }
    );
        return res.json(coupons);
    },

create:async function(req,res){

    if (req.method == "GET") return res.view('coupon/create');
    
    var coupon1 = await Coupon.create(req.body).fetch();

    return res.redirect('home');
    
},


detail:async function(req,res){
    var thatCoupon = await Coupon.find({where:{ id : req.params.id}});
   
    return res.view('coupon/detail',{coupons:thatCoupon});
},
admin:async function(req,res){

    var thatcoupons = await Coupon.find();
    
    return res.view('coupon/admin', { coupons: thatcoupons });
},
update:async function(req,res){
    if (req.method == "GET") {
    var thatCoupon = await Coupon.find({where:{ id : req.params.id}});
    return res.view('coupon/update',{coupon:thatCoupon});
    }
    else{
        var updatedCoupon = await   Coupon.updateOne(req.params.id).set(req.body)
        return res.redirect('../home');
    }
},

delete:async function(req,res){
    var deletedCoupon = await Coupon.destroyOne(req.params.id);
    console.log(deletedCoupon);
    if (!deletedCoupon) return res.notFound();

    if (req.wantsJSON){
        return res.status(204).send();	    // for ajax request
    } else {
        return res.redirect('/');			// for normal request
    }
},

redeemed: async function(req,res){
    var consultants = await Coupon.find({id:req.params.id}).populate("consultants");;
        console.log(consultants);
        var thosemembers=consultants[0].consultants;
        return res.view('coupon/members',{ members:thosemembers });
},

search: async function(req,res){
    
    if(req.wantsJSON){
    var whereClause = {};
    if (req.query.region) whereClause.region = { contains: req.query.region };
    var maxc = parseInt(req.query.maxCoins);
    var minc =parseInt(req.query.minCoins);
    if (isNaN(maxc)) maxc=0;
    if (isNaN(minc)) minc=0;
    whereClause.coins={'<=': maxc,'>=': minc};
    whereClause.date={'<=':req.query.date};
    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;
    var thoseCoupons = await Coupon.find({
    	where: whereClause,
        limit: limit,
        skip: offset
        
    });
    var thoseCoupons2=await Coupon.find({where: whereClause,});
    count = thoseCoupons2.length;
    thoseCoupons[2]=count;
    console.log(thoseCoupons);
        return res.json(thoseCoupons);

    }
    else{
        return res.view('coupon/search');
    }


},
mobileSearch: async function(req,res){
    console.log("123");
    var whereClause = {};
    if (req.query.mall) whereClause.mall = { contains: req.query.mall };
    var maxc = parseInt(req.query.maxCoins);
    var minc =parseInt(req.query.minCoins);
    if (isNaN(maxc)) maxc=1000000;
    if (isNaN(minc)) minc=0;
    whereClause.coins={'<=': maxc,'>=': minc};
    var thoseCoupons = await Coupon.find({
    	where: whereClause,
    });
        return res.json(thoseCoupons);
},


};



