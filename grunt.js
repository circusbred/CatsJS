/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		pkg: '<json:package.json>',
		watch: {
			files: ['src/*.js', 'test/*'],
			tasks: 'server build'
		},
		concat: {
			dist: {
				src: [
					'<file_template:src/intro.js.stub>',
					'src/core.js',
					'src/core.*.js',
					'src/*.js',
					'<file_template:src/outro.js.stub>'
				],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		min: {
			dist: {
				src: ['<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},

		qunit: {
			all: ['http://localhost:9876/test/index.html']
		},

		server: {
			port: 9876,
			base: '.'
		},

		jslint: {
			files: [
				'src/*.js'
			]
		},

		jslint_directives: {
			browser: true,
			todo: true
		}
	});
	grunt.registerTask('build', 'jslint concat min server qunit');

	grunt.registerTask('default', 'watch');
};
