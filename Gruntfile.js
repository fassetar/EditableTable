module.exports = function(grunt) {	
	pkg: grunt.file.readJSON('package.json'),
	require( 'matchdep' ).filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({
		uglify: {
			dist: {
				files: {
					'dist/js/jquery.storagetable.min.js': [ 'src/js/{,*/}*.js' ]
				}
			}
		},
		qunit: {
			options: {
				console: false,
			},
			all: ['src/tests/*.html']
		},
		watch: {
		    uglify: {
		        files: 'src/js/{,*/}*.js',
		        tasks: ['uglify']
		    },
			qunit: {
				files: ['tests/*.js', 'tests/*.html'],
				tasks: ['qunit']
			}
		}
	});
	grunt.registerTask( 'default' , [		
		'uglify',
		'qunit',
		'jshint',
		'watch'
	]);
};