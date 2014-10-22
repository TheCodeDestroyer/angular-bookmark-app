module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: {
                src: ['Gruntfile.js',
                    'www/js/**/*.js',
                    '!www/js/lib/**/*.js',
                    '!www/js/build/*.js'
                ],
                options: {
                    bitwise: true,
                    camelcase: true,
                    curly: true,
                    quotmark: 'single',
                    regexp: true,
                    undef: true,
                    unused: true,
                    eqeqeq: true,
                    eqnull: true,
                    browser: true,
                    globals: {
                        jQuery: true,
                        angular: true,
                        $: true,
                        module: true
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js',
                    'www/js/**/*.js'
                ],
                tasks: ['jshint']
            }
        },
        uglify: {
            app: {
                files: {
                    'www/js/build/appBundle.min.js': ['www/js/**/**.js', '!www/js/build/**.js']

                }
            },
            vendor: {
                files: {
                    'www/js/build/vendorBundle.min.js': [
                        'www/lib/ionic/js/ionic.bundle.js',
                        'www/lib/angular-cookies/angular-cookies.js',
                        'www/lib/ngCordova/dist/ng-cordova.js',
                        'www/lib/jquery/dist/jquery.js',
                        'www/lib/highcharts/highcharts.js',
                        'www/lib/highcharts-ng/dist/highcharts-ng.js',
                        'www/lib/angular-translate/angular-translate.js',
                        'www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                        'www/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                        'www/lib/angular-translate-storage-local/angular-translate-storage-local.js',
                        'www/lib/ngstorage/ngStorage.js',
                        'www/lib/ng-grid/build/ng-grid.debug.js',
                        'www/lib/ng-grid/plugins/ng-grid-flexible-height.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['uglify']);

};