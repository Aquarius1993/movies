var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost/imooc')
var MovieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie',MovieSchema)//编译生成模型
module.exports = Movie
