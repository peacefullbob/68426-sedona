"use strict";

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    less: {
      style: {
        files: {
          "css/style.css": ["less/style.less"]
        }
      }
    },

    csso: {
      style: {
        options: {
          report: "gzip"
     },
     files: {
       "css/style.min.css": ["css/style.css"]
     }
    }
   },

  imagemin: {
    images: {
      options: {
        optimizationLevel: 3
    },
    files: [{
      expand: true,
        src: ["img/**/*.{png,jpg,gif}"]
      }]
     }
   },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "css/*.css"
      }
    },

    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
    },
    symbols: {
      files: {
        "img/symbols.svg": ["img/icons/*.svg"]
      }
     }
    },

    svgmin: {
     symbols: {
      files: [{
        expand: true,
         src: ["img/icons/*.svg"]
      }]
    }
  },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css"
          ]
        },
        options: {
          server: ".",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    copy: {
      build: {
       files: [{
        expand: true,
        src: [
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**",
        "*.html"
       ],
       dest: "build"
     }]
    }
  },

    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);

  grunt.registerTask ("build"), [
    "less",
    "postcss",
    "csso",
    "symbols",
    "imagemin"
  ]);
};
