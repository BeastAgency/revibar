module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',
		// Task configuration.
		sass: {
			production: {
				options: {
					outputStyle: 'compressed',
					sourceMap: false
				},
				files: {
					'dist/assets/css/style.css' : 'assets/scss/style.scss'
				}
			},
			dev: {
				options: {
					outputStyle: 'nested',
					sourceMap: true
				},
				files: {
					'assets/css/style.css' : 'assets/scss/style.scss'
				}
			}
		},
		processhtml: {
			production: {
				options: {
					strip: true
				},
				files: {
					'dist/index.html': ['index.html']
				}
			},
			dev: {
				options: {
					strip: false
				},
				files: {
					'index.html': ['app/index.html']
				}
			}
		},
		cssmin: {
			production: {
				options: {
					sourceMap: false,
					report: ['gzip']
				},
				files: {
					'dist/assets/css/style.min.css': ['assets/css/style.css']
				}
			}
		},

		concat: {
			options: { "separator": "\n" },
			production: {
					src: "assets/js/main.js",
					dest: "tmp/app-concat.js"
			}
		},
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			production:{
				files: {
					'tmp/ngannotate.js': ['tmp/app-concat.js']
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: false
			},
			production: {
				src: "tmp/ngannotate.js",
				dest: 'dist/assets/js/main.min.js'
			}
		},

		watch: {
			html: {
				files: [
					'index.html',
					'**/*.html',
					'*.html',
				],
				tasks: ['processhtml']
			},
			scripts: {
				files: [
					'Gruntfile.js',
					'assets/js.js',
					'assets/**/*.js'
				],
				tasks: ['jshint']
			},
			css: {
				files: ['assets/scss/*.scss', 'assets/scss/*/**.scss', 'assets/scss/**/**/*.scss'],
				tasks: ['sass:dev'],
				options: {
					spawn: false
				}
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'app/**/*.js',
			],
			options: {
				'jshintrc': true
			}
		},

		copy: {
		  production: {
			files: [
			  // includes files within path and its sub-directories
			  {expand: true, src: ['index.html'], dest: 'dist'},

			]
		  },
		}

	});


	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-run');

	// Default task. Use this for development.
	grunt.registerTask('default', ['processhtml:dev', 'sass:dev', 'jshint', 'watch']);
	grunt.registerTask('dev', ['processhtml:dev', 'sass:dev', 'jshint', 'watch']);

	// Production task
	grunt.registerTask('production', ['processhtml:production', 'cssmin:production', 'concat:production', 'ngAnnotate:production', 'uglify:production']);
	grunt.registerTask('live', ['http-server:production', 'watch']);



};