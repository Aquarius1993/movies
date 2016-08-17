var User = require('../models/user')

exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '注册页面'
	})
}
exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '登录页面'
	})
}
exports.signin = function(req, res) {
	var _user = req.body.user;
	// req.params('user')
	// console.log(_user);
	User.findOne({
		name: _user.name
	}, function(err, user) {
		if (err) {
			return console.log(err);
		}
		if (user) {
			return res.redirect('/signin');
		} else {
			var user = new User(_user)
			user.save(function(err, user) {
				if (err) {
					return console.log(err);
				}
				res.redirect('/admin/userlist');
			})
		}
	})

}

// userlist
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if (err) {
			return console.log(err);
		}
		res.render('userlist', {
			titile: 'imooc 用户列表页',
			users: users
		})
	})
}
	// signin
exports.signup = function(req, res) {
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;
		User.findOne({
			name: name
		}, function(err, user) {
			// console.log(user);
			if (err) {
				return console.log(err);
			}
			if (!user) {
				return res.redirect('/signup')
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					return console.log(err);
				}
				if (isMatch) {
					console.log("password id matched");
					req.session.user = user;
					res.redirect('/')
				} else {
					console.log("password id not matched");
					return res.redirect('/signin')
				}
			})
		})
	}
	// logout
exports.logout = function(req, res) {
	delete req.session.user;
	// delete app.locals.user;
	res.redirect('/')
}

// midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user;
	if(!user) {
		res.redirect('/signup');
	}
	next()
} 
exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	if(user.role <= 10 || !user.role) {
		res.redirect('/signup');
	}
	next()
} 