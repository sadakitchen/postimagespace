module.exports = function(grunt) {
  'use strict';

  var LP_DIR_NAME = 'postimage';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dev: {
        options: {
          sassDir: '_source/'+LP_DIR_NAME+'/_scss',
          cssDir: '_source/'+LP_DIR_NAME+'/css',
          images: '_source/'+LP_DIR_NAME+'/img',
          config: '_source/_config/config.rb',
          env: 'development',
          outputStyle: 'expand',
          relativeAssets: true,
          noLineComments: true
        }
      }
    },

    image: {
      build: {
        files: [{
          expand: true,
          cwd: '_source/'+LP_DIR_NAME+'/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'html/'+LP_DIR_NAME+'/img/'
        }]
      }
    },

    jekyll: {
      dist: {
        options: {
          src: '_source',
          dest: 'html',
          layouts: '_layouts'
        }
      }
    },

    typescript: {
      ts: {
        // ファイルの設定
        src: ['_source/'+LP_DIR_NAME+'/_ts/*.ts'],
        dest: '_source/'+LP_DIR_NAME+'/js/function.js',
        options: {
          module: 'amd', //or commonjs 
        }
      }
    },

    jshint: {
      dist: {
        src: [ '_source/'+LP_DIR_NAME+'/js/*.js'],
        ignores: ['_source/'+LP_DIR_NAME+'/js/**/*.js']
      }
    },

    copy: {
      js_dist: {
        files: [{
          expand: true,
          cwd: '_source/'+LP_DIR_NAME+'/js/',
          src: ['**'],
          dest: 'html/'+LP_DIR_NAME+'/js/'
        }]
      },
      css_dev: {
        files: [{
          expand: true,
          cwd: '_source/'+LP_DIR_NAME+'/css/',
          src: ['**'],
          dest: 'html/'+LP_DIR_NAME+'/css/'
        },
        {
          expand: true,
          cwd: '_source/'+LP_DIR_NAME+'/img/',
          src: ['**'],
          dest: 'html/'+LP_DIR_NAME+'/img/'
        }]
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: 'html',
          keepalive: true,
          livereload: false
        }
      }
    },

    concurrent: {
      server: {
        tasks: [
          'connect',
          'open',
          'watch'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:4000'
      }
    },

    watch: {
      compass: {
        files: ['_source/'+LP_DIR_NAME+'/_scss/*.scss',
                '_source/'+LP_DIR_NAME+'/_scss/**/*.scss'],
        tasks: ['compass:dev','copy:css_dev']
      },
      jekyll: {
        files: ['_source/_includes/*.html',
                '_source/'+LP_DIR_NAME+'/**/*.html'],
        tasks: ['jekyll:dist', 'copy:js_dist']
      },
      ts: {
        files: ['_source/'+LP_DIR_NAME+'/_ts/*.ts'], // 監視するファイル
        tasks: ['typescript'] // 実行するタスク
      },
      js: {
        files: ['_source/'+LP_DIR_NAME+'/js/*.js'],
        tasks: ['jshint', 'copy:js_dist']
      },
      server: {
        files: [
          'html/'+LP_DIR_NAME+'/**/*'
        ],
        options: {
          livereload: false
        }
      }
    }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.registerTask('build', ['compass:dev',
                               'copy:css_dev',
                               'copy:js_dist',
                               'image:build']);
  
  grunt.registerTask('server', ['concurrent:server']);
};
