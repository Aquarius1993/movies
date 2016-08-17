module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md','node_modules/**','.DS_Store'],
					watchExtensions: ['js'],
					watchFolders: ['app','config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon','watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});


	// 有文件添加  修改  删除  重新执行
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 实时监听    监听入口文件
	grunt.loadNpmTasks('grunt-nodemon');
	// 慢任务开放
	grunt.loadNpmTasks('grunt-concurrent');

	// 设置   防止因为语法错误中断整个服务
	grunt.option('force', true);

	// 注册一个默认的任务
	grunt.registerTask('default', ['concurrent'])
}