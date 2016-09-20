/**
 * Created by luojiawei on 16/8/8.
 */
var require = {
    baseUrl: "../",
    paths: {
        jquery: "./lib/jquery/dist/jquery.min",
        "jasmine": "./lib/jasmine-core/lib/jasmine-core/jasmine",
        "jasmine-html": "./lib/jasmine-core/lib/jasmine-core/jasmine-html",
        'boot': "./lib/jasmine-core/lib/jasmine-core/boot",
        "spec": "./test/specs"
    },
    shim: {
        'jasmine': {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'boot': {
            deps:['jasmine', 'jasmine-html'],
            exports: 'jasmine'
        }
    }
};