/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  
home:async function(req,res){

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
return res.view('Coupon/home',{ rs:resaurs });
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
    console.log(thatCoupon);
    return res.view('coupon/update',{coupon:thatCoupon});
    }
    else{
        var updatedCoupon = await   Coupon.updateOne(req.params.id).set(req.body)
        return res.redirect('../home');
    }
},

delete:async function(req,res){
    var deletedCoupon = await Coupon.destroyOne(req.params.id);

    if (!deletedCoupon) return res.notFound();

    return res.redirect('../home');
},

search:async function(req,res){
    
    var whereClause = {};
    if(req.method=='POST'){
    if (req.body.region) whereClause.region = { contains: req.body.region };
    console.log(req.body);
    var maxc = parseInt(req.body.maxCoins);
    var minc =parseInt(req.body.minCoins);
    if (isNaN(maxc)) maxc=0;
    if (isNaN(minc)) minc=0;
    whereClause.coins={'<=': maxc,'>=': minc};
    whereClause.date={'<=':req.body.date};
    }
   
    if(req.method=='GET'&&1==-1){
        
          var region1=req.query.region;
       
        var maxCoins=parseInt(req.query.maxCoins);
        var minCoins=parseInt(req.query.minCoins);
        var date=req.query.date;
        whereClause.region = { contains: region1 };
        whereClause.coins={'<=': maxCoins,'>=': minCoins};
        whereClause.date={'<=':date};
    }
    var limit = Math.max(req.query.limit, 2) || 2;
    var offset = Math.max(req.query.offset, 0) || 0;
    var thoseCoupons = await Coupon.find({
    	where: whereClause,
        limit: limit,
        skip: offset
        
    });
    var thoseCoupons2 = await Coupon.find({
    	where: whereClause,
        
    });
    console.log(thoseCoupons);
    var count = await thoseCoupons2.length;
    return res.view('coupon/search', { coupons: thoseCoupons,numOfRecords: count});
    
},


};



