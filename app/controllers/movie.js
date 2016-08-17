var _ = require('underscore')
var Movie = require('../models/movie')
	// detail page
exports.detail = function(req, res) {
		var id = req.params.id;
		Movie.findById(id, function(err, movie) {
			if (err) {
				return console.log(err)
			}
			res.render('detail', {
				title: 'imooc' + movie.title,
				movie: movie
			})
		})
	}
	// admin page
exports.movie = function(req, res) {
	res.render('admin', {
		title: 'admin 后台录入页',
		movie: {
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
}

// admin update movie
exports.update = function(req, res) {
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function(err, movie) {
			if (err) {
				return console.log(err);
			}
			res.render('admin', {
				title: 'admin 后台更新页',
				movie: movie
			})
		})
	}
}

// admin post movie
exports.new = function(req, res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie

	// console.log(movieObj);

	var _movie;
	// 已存在的电影
	if (id != 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				return console.log(err);
			}
			// 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				// console.log("geng"+movie);
				if (err) {
					return console.log(err);
				}
				res.redirect('/movie/' + movie._id)
			})
		})
	} else { //新增加的电影
		_movie = new Movie({
			doctor: movieObj.doctor,
			country: movieObj.country,
			title: movieObj.title,
			year: movieObj.year,
			poster: movieObj.poster,
			language: movieObj.language,
			flash: movieObj.flash,
			summary: movieObj.summary
		})
		_movie.save(function(err, movie) {
			// console.log("xin"+movie);
			if (err) {
				return console.log(err);
			}
			res.redirect('/movie/' + movie._id)
		})
	}
}


// list page
exports.list =  function(req, res) {
		Movie.fetch(function(err, movies) {
			if (err) {
				console.log(err);
			}
			res.render('list', {
				title: 'imooc 列表页',
				movies: movies
			})
		})
	}
	// list delete movie
exports.del = function(req, res) {
	var id = req.query.id;
	// console.log(id);
	if (id) {
		Movie.remove({
			_id: id
		}, function(err, movie) {
			if (err) {
				return console.error(err);
			}
			res.json({
				success: 1
			})
		})
	}
}