/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		watch: {
			files: '<config:jslint.files>',
			tasks: 'jslint qunit'
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
			browser: true
		}
	});

	grunt.registerTask('default', 'watch');
};
