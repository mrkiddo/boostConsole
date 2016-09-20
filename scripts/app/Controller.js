/**
 * Created by Jiawei Luo on 16/7/25.
 * Controller module
 * @module app/Controller
 * @description define Controller object and its factory function
 */
define(['jquery', 'app/parse', 'app/View', 'app/EventHandlers', 'app/CommandHistory'],
    function ($, textParse, View, EventHandlers, CommandHistory) {
    "use strict";
    /**
     * @returns {object} instance
     * @description Controller object factory function
     */
    var Controller = function () {
        var instance = {
            /**
             * @description create command from user input
             * @param {string} text
             * @returns {Object} Command instance
             */
            buildCommand: function (text) {
                var cmd = textParse.performParse(text);
                return cmd;
            },
            /**
             * @description execute the method in a command and render output
             * @param {object} command
             */
            executeCommand: function (command) {
                var self = this;
                // handle command parsing error
                if(command.error){
                    self.container.trigger("command.error", command.error);
                    self.view.enableInput();
                    return false;
                }
                // handle setting commands
                else if(command.type === 'setting'){
                    $.when(command.method(self.container)).done(function () {
                    }).always(function () {
                        self.view.enableInput();
                    });
                }
                // all command method is based on deferred event
                // when execution is finished, grab the result and render output
                else {
                    var parameters = command.params;
                    $.when(command.method(parameters)).done(function (value) {
                        self.view.renderResult(value.text);
                    }).fail(function (err) {
                        // handle command execution error
                        self.container.trigger("command.error", err);
                    }).always(function () {
                        self.view.enableInput();
                    });
                }
                return true;
            },
            /**
             * @param {object} parentElement
             * @param {object} information
             * @return {object} Controller instance
             * @description start the initialization of the controller
             */
            init: function (parentElement, information) {
                var self = this;
                // create and register a view object for controller
                var view = View(parentElement);
                self.view = view;
                self.view.showConsoleTitle(information.name, information.number);
                self.appId = information.id;
                self.view.applyConsoleId(information.id);
                // get the container element to controller
                self.container = view.container;
                // setup command history reference
                self.history = CommandHistory.createInstance();
                // bind event handlers
                EventHandlers.assign(self);
                return self;
            }
        };
        return instance;
    };

    /**
     * @alias module:app/Controller
     * @param {object} parentEl
     * @param {object} info
     * @return {object} Controller instance
     */
    return function (parentEl, info) {
        return Controller().init(parentEl, info);
    };

});