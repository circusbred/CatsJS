/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		meta: {
			banner: '<%= grunt.template.process(grunt.file.read("src/copyright.js.stub")) %>'
		},
		pkg: '<json:package.json>',
		watch: {
			files: ['src/*.js', 'test/*'],
			tasks: 'build'
		},
		concat: {
			dist: {
				src: [
					'<banner>',
					'lib/<%= pkg.config.selectorEngine %>/<%= pkg.config.selectorEngine %>.js',
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
				src: ['<banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js',
				separator: '\n'
			}
		},

		uglify: {
			lift_variables: true
		},

		qunit: {
			all: [
				'http://localhost:9876/test/index.html',
				'http://localhost:9876/test/min.html',
				'http://localhost:9876/test/minimal.html'
			]
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
