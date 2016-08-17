var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
module.exports = function(app) {
	// 预处理user
	app.use(function(req, res, next) {
		var _user = req.session.user;
			// 赋值本地变量
		app.locals.user = _user
		return next()

	})

	// index page
	app.get('/', Index.index)
		// detail page
	app.get('/movie/:id', Movie.detail)
		// admin page
	app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.movie)
	// admin update movie
	app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
	// admin post movie
	app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
	// list page
	app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
		// list delete movie
	app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

	// 注册
	app.get('/signin', User.showSignin);
	// 登录
	app.get('/signup', User.showSignup);
		// signup
	app.post('/user/signup', User.signup)

	// userlist
	app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list)
		// signin
	app.post('/user/signin', User.signin)
		// logout
	app.get('/logout', User.logout)
}