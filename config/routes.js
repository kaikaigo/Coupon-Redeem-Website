/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  //home method
  'Get /':'CouponController.home',
  'Get /home':'CouponController.home',
  'Get /create':'CouponController.create',
  //Restful
  'Post /coupon':'CouponController.create',
  'Delete /coupon/:id':'CouponController.delete',
  'Put /coupon/:id':'CouponController.update',
  //admin method 
  'Get /admin':'CouponController.admin',
  'GET /redeemed/:id':'CouponController.redeemed',
  'Post /detail/redeem/:id': 'UserController.redeem',
  'Get /detail/:id':'CouponController.detail',
  'Get /update/:id':'CouponController.update',
  'Get /search':'CouponController.search',
  'Post /search':'CouponController.search',
  //User sign up
  'GET /user/sign': 'UserController.sign',
  'POST /user/sign': 'UserController.sign',
  //User login
  'GET /user': 'UserController.login',
  'GET /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  'Get /myRedeem':'UserController.myredeem',
 
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
