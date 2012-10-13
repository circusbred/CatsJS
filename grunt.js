/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		watch: {
			files: '<config:jslint.files>',
			tasks: 'concat min jslint qunit'
		},
		concat: {
			dist: {
				src: [
					'<banner:meta.banner>',
					'src/intro.js.stub',
					'src/core.js',
					'src/core.*.js',
					'src/*.js',
					'src/outro.js.stub'
				],
				dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.js'
			}
		},

		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.min.js'
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
			browser: true
		}
	});

	grunt.registerTask('default', 'watch');
};
