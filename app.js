var express = require('express')
var bodyParser = require('body-parser');
var path = require('path')
var mongoose = require('mongoose')
	// 字段替换插件
	// node app.js   用的是3000的端口     PORT＝4000  node app.js用的是4000的端口
var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/imooc';
mongoose.createConnection(dbUrl)
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));
// 为使session运作
var session = require('express-session');
var MongoStore = require('connect-mongo')(session)
app.use(session({
		secret: 'imooc',
		store: new MongoStore({
			url: dbUrl,
			collection: 'sessions'
		})
	}))
	// var cookieSession = require('cookie-session');
	// app.use(cookieSession({
	//     secret: 'imooc'
	// }));
	// app.use(express.cookieParser())
	// session
	// app.use(express.session({
	// 	secret: 'imooc'
	// }))
	// 日期处理类库
app.locals.moment = require('moment')
	// app.use(express.bodyParser())
	// 静态资源的获取
app.use(express.static(path.join(__dirname, 'public')))
var logger = require('morgan');
if('development' == app.get('env')) {
	// 设置报错信息的显示
	app.set('showStackError'. true);
	app.use(logger(':method :url :status'));
	// 不要压缩的
	app.locals.pretty = true;
	mongoose.set('debug', true);
}



require('./config/routes')(app)
app.listen(port)

console.log('imooc start on port ' + port);

