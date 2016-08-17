var mongoose = require('mongoose')
// 存储加密算法
var bcrypt = require('bcrypt')
var SACL_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	// 0 normal user
	// 1 virified user
	// 2 professonal user
	// >10 admin
	// >50 super admin
	role: {
		type: Number,
		default: 0
	},
	password: String,
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

UserSchema.pre('save',function(next){//pre是每次调用save方法都执行这个方法体
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	// 计算强度 回调函数
	bcrypt.genSalt(SACL_WORK_FACTOR, function(err, salt) {
		if(err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) {
				return next(err)
			}
			user.password = hash;
			next()
		})
	})
	// next()//存储流程往下走
})

// 实例方法
UserSchema.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if(err) {
				return cd(err)
			}
			cb(null,isMatch)
		})
	}
}

UserSchema.statics = {//添加静态方法
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
module.exports = UserSchema//给其他地方调用提供了接口