module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		dist: 'webapps/puf/scripts',
		distcss: 'webapps/puf/styles',
		filename: 'puf',
		filenamecustom: '<%= filename %>-custom',
		meta: {
		  //modules: 'angular.module("ui.bootstrap", [<%= srcModules %>]);',
		  banner: ['/*',
				   ' * <%= pkg.name %>',
				   ' * <%= pkg.author %>\n',
				   ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
				   ' * License: <%= pkg.license %>',
				   ' */\n'].join('\n')
		},
		// concat 설정
		concat: {
			options: {
				banner: '<%= meta.banner %><%= meta.modules %>\n'/*,
				separator: ';'*/
			},
			dist: {
				src: ['puf-src/ps-puf.js', 
				      'puf-src/directives/ps-directives.js', 'puf-src/directives/*.js', 
				      'puf-src/validators/ps-validators.js', 'puf-src/validators/*.js'], // concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
				dest: '<%= dist %>/<%= filename %>.js'	// concat 결과 파일
			}
		},

        // uglify 설정
		uglify: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'	// 파일의 맨처음 붙는 banner 설정
				},
				files:{
					'<%= dist %>/<%= filename %>.min.js': ['<%= concat.dist.dest %>']
					/*
					src:['<%= concat.dist.dest %>'],	// uglify할 대상 설정
					dest:'<%= dist %>/<%= filename %>.min.js'	// uglify 결과 파일 설정
					*/
				}
			},
			route: {
				options: {
					banner: '<%= meta.banner %>'	// 파일의 맨처음 붙는 banner 설정
				},
				files: {
					'<%= dist %>/ps-route-resolver.min.js': ['<%= dist %>/ps-route-resolver.js']
					// uglify 결과 파일 설정 				// uglify할 대상 설정
				}
			},
			i18n: {
				options: {
					banner: '<%= meta.banner %>'	// 파일의 맨처음 붙는 banner 설정
				},
				files: {
					'<%= dist %>/i18n/ps-locale_en.min.js': ['<%= dist %>/i18n/ps-locale_en.js'],
					'<%= dist %>/i18n/ps-locale_ko.min.js': ['<%= dist %>/i18n/ps-locale_ko.js']
				}
				/* 아래처럼 해도 먹힌다.
				files: [
				    {'<%= dist %>/i18n/ps-locale_en.min.js': ['<%= dist %>/i18n/ps-locale_en.js']},
				    {'<%= dist %>/i18n/ps-locale_ko.min.js': ['<%= dist %>/i18n/ps-locale_ko.js']}
				]
				*/
			}
			
		},
		
		copy: {
			i18n: {
				files : [
					{
						expand: true,
						src: ['i18n/*.js'],
						dest: '<%= dist %>',
						cwd: 'puf-src'
					}
					/*
					{
						expand: true,
						src: ['*.js'],
						dest: '<%= dist %>/i18n/',
						cwd: 'puf-src/i18n'
					}
					*/
				]
			},
			route: {
				files : [
					{
						expand: true,
						src: ['ps-route-resolver.js'],
						dest: '<%= dist %>',
						cwd: 'puf-src'
					}
				]
			}
		},
		
		// clean: ["path/to/dir/one", "path/to/dir/two"]
		/* 
		clean: {
		  build: ["path/to/dir/one", "path/to/dir/two"],
		  release: ["path/to/another/dir/one", "path/to/another/dir/two"]
		}
		*/
		clean: {
			dist: {
				src: ['<%= dist %>/*']
			}
		},
		
		// style
		less: {
			dev: {
				options: {
					//paths: ["assets/css"]
			    },
			    files: {
			    	'webapps/puf/styles/common.css': 'less/common/common.less',
			    	'webapps/puf/styles/themes/light-theme.css': 'less/themes/light-theme/light-theme.less'
			    }
			},
			dist: {
				options: {
					//paths: ["assets/css"],
					cleancss: true
					/*
					modifyVars: {
						imgPath: '"http://mycdn.com/path/to/images"',
						bgColor: 'red'
					}
					*/
			    },
			    files: {
			    	"webapps/puf/styles/common.min.css": "less/common/common.less",
			    	"webapps/puf/styles/themes/light-theme.min.css": "less/themes/light-theme/light-theme.less"
			    }
			}
		},
		
		watch: {
			/*
			script: {
				files: ['lib/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false,
				}
			},
			*/
			less: {
				files: ['less/common/common.less', 'less/themes/light-theme/light-theme.less'],
			    tasks: ['less:dev', 'less:dist'],
			    options: {
			      interrupt: true
			    }
			}
		}
		
    });
 
    // Load the plugin that provides the "uglify", "concat" tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s).
    grunt.registerTask('default', ['clean', 'concat', 'copy', 'uglify']); // grunt 명령어로 실행할 작업
 
 };