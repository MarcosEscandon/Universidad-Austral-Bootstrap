module.exports = function (grunt){
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	}); 

	// Configuracion de proyecto
	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: :'.css'
				}]
			}
		},

		watch: {
			files: ['css/*.scss'],
			tasks: ['css']
		},

		browserSync: {
			dev: {
				bsFiles: { //browser files
					src: [
						'css/*.css',
						'*.html',
						'js/*js'
					]
				},
			options: {
				watchTask: true,
				server: {
					baseDir: './' // Directorio base para nuestro servidor.
					}
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: './',
					src: 'images/*.{png,gif,jpg,jpeg}',
					dest: '/dist'
				}]
			}
		},

		copy: {
			html: {
				files[{
					expand: true,
					dot: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist'
				}]
			},
			fonts: {
				files: [{
					//for font-awesome
					expand: true,
					dot: true,
					cwd: 'node_modules/open-iconic/font',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},

		clean: {
			build: {
				src: ['dist/']
			}
		},

		cssmin: {
			dist: {}
		},

		uglify: {
			dist: {}
		},

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},			

			release: {
				// filerev: release hashes(md5) all assets (images, js and css)
				// in dist directory
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['index.html', 'about.html', 'prices.html', 'contact.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							} 
						}]
					}
				}
			}
		},

		usemin: {
			html: ['dist/index.html', 'dist/about.html', 'dist/prices.html', 'dist/contact.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}
	});

	/* Se eliminan los loadNpm porque ya tenemos el require('jit-grunt') 
	grunt.loadNpmTasks('grunt-contrib-watch'); // Siempre cuando usamos grunt tenemos que cargar los paquetes.
	grunt.loadNpmTasks('grunt-contrib-sass');  
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	*/
	grunt.registerTask('css', ['sass']);  // Agregarle las tareas.
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('img:compress', ['imagemin']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
		])
};