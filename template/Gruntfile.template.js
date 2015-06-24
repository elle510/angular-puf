module.exports = function(grunt) {
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		dist: 'webapps/puf/scripts',
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
		//concat 설정
		concat: {
			options: {
				banner: '<%= meta.banner %><%= meta.modules %>\n',
				separator: ';'
			},
			dist: {
				src: ['src/*.js', 'src/**/*.js'], //concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
				dest: '<%= dist %>/<%= filename %>-<%= pkg.version %>.js'	//concat 결과 파일
			}
		},

        //uglify 설정
		uglify: {
			options: {
				banner: '<%= meta.banner %>'	//파일의 맨처음 붙는 banner 설정
			},
			dist:{
				src:['<%= concat.dist.dest %>'],	//uglify할 대상 설정
				dest:'<%= dist %>/<%= filename %>-<%= pkg.version %>.min.js'	//uglify 결과 파일 설정
			}
		},
		
		// Running "copy:main" (copy) task
		copy: {
			  main: {
			    src: 'src/*',
			    dest: 'dest/',
			  },
		}
    });
 
    // Load the plugin that provides the "uglify", "concat" tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-clean');
    
    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']); //grunt 명령어로 실행할 작업
 
 };