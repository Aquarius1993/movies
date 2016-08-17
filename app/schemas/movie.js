var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
}, { strict: false })

MovieSchema.pre('save',function(next){//pre是每次调用save方法都执行这个方法体
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next()//存储流程往下走
})

MovieSchema.statics = {//添加静态方法
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)//回调函数
	},
	findById: function(id,cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}
module.exports = MovieSchema//给其他地方调用提供了接口