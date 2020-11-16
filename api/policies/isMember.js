module.exports = async function (req, res, proceed) {

    var user = await User.findOne({ username: req.session.username });
    if (!user) return res.forbidden();
    
    return proceed();   //proceed to the next policy,
   
    //--•
    // Otherwise, this request did not come from a logged-in user.
    
};