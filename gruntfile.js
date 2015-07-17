module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
		        src: [
		            'assets/js/vendor/*.js', // All JS in the libs folder
		            'assets/js/*.js'  // This specific file
		        ],
		        dest: 'assets/js/build/main.js',
		    }
        },

        uglify: {
		    build: {
		        src: 'assets/js/build/main.js',
		        dest: 'assets/js/build/main.min.js'
		    }
		},
		imagemin: {
			options: {
				optimizationLevel: 10,
			},
			dynamic: {                         // Another target
		      files: [{
		        expand: true,                  // Enable dynamic expansion
		        cwd: 'assets/img/',                   // Src matches are relative to this path
		        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
		        dest: 'assets/img/'                  // Destination path prefix
		      }]
		    }
		},
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: ['assets/js/*.js', 'assets/js/vendor/*.js'],
		        tasks: ['concat', 'uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    css: {
			    files: ['assets/css/scss/*.scss' ],
			    tasks: ['sass'],
			    options: {
			        spawn: false,
			    }
			}
		},
		sass: {
		    dist: {
		        options: {
		            style: 'compressed'
		        },
		        files: {
		            'assets/css/main.css': 'assets/css/scss/main.scss'
		        }
		    }
		}


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'watch', 'sass', 'autoprefixer']);

};