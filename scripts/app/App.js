/**
 * Created by Jiawei Luo on 16/7/28.
 * App module
 * @module app/App
 * @description define top level application object its factory function
 */
define(['jquery', 'app/Controller', 'app/View'], function ($, Controller, View) {
    "use strict";
    // assign counter to track instance number
    var instanceCount = 1;
    /**
     * @returns {object} instance
     * @description App object factory function
     */
    var App = function () {
        // create a object instance
        var instance = {
            name: "", // specify application name
            id: (function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()* 16 | 0,
                        v = c === 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
            })(), // create a unique GUID for each instance
            number: instanceCount++,
            /**
             * @description initialize the application by creating controller and view
             * @param {object} parentElement
             * @param {string} name
             * @returns {object} self
             */
            start: function (parentElement, name) {
                var self = this;
                self.name = name || "boostConsole";
                self.ctrl = Controller(parentElement, {
                    id: self.id,
                    number: self.number,
                    name: self.name
                });
                return self;
            },
            clearUp: function () {
                self.ctrl.view = null;
                self.ctrl = null;
            }
        };
        return instance;
    };

    /** @alias module:app/App
     *  @param {object} parentElement
     *  @param {string} name
     */
    return function (parentElement, name) {
        return App().start(parentElement, name);
    };
});