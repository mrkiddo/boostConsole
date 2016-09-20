/**
 * Created by Jiawei Luo on 16/8/10.
 * EventHandler module
 * @module app/eventHandlers
 * @description define event handlers for controller
 */
define(function () {
    "use strict";
    /**
     * @description eventHandler
     * @param {object} ctrlRef
     * @return {object} handlers
     */
    var EventHandlers = function (ctrlRef /* controller reference */) {
        var instance = {
            command: {
                "created": function (e, command) {
                    ctrlRef.executeCommand(command);
                    return false;
                },
                "error": function (e, error) {
                    var text = error.name + " - " + error.message;
                    ctrlRef.view.renderResult(text, 'error');
                    return false;
                },
                "clear": function (e) {
                    ctrlRef.view.clearOutput();
                    return false;
                }
            },
            setting: {
                "close": function (e) {
                    ctrlRef.view.toggleSize();
                },
                "mini": function (e) {}
            },
            input: {
                "keyUp": function (e) {
                    e.preventDefault();
                    // detect if `enter` key is pressed
                    if (e.which == 13) {
                        var inputText = ctrlRef.view.input.val();
                        ctrlRef.view.input.val("");
                        var command = {};
                        if (inputText) {
                            // prevent user input when process
                            //ctrlRef.container.trigger("setting.disableInput");
                            ctrlRef.view.disableInput();
                            ctrlRef.history.setHistory(inputText);
                            // create a new command from user input
                            command = ctrlRef.buildCommand(inputText);
                        }
                        else {
                            return false;
                        }
                        ctrlRef.container.trigger("command.created", command);
                    }
                    // detect if `up` key is pressed
                    if (e.which == 38) {
                        var text = ctrlRef.history.getHistory("up");
                        ctrlRef.view.showInputText(text);
                    }
                    // detect if `down` key is pressed
                    if(e.which == 40) {
                        var text = ctrlRef.history.getHistory("down");
                        ctrlRef.view.showText(text);
                    }
                    return false;
                }
            },
            control: {
                close: function (e) {
                    e.stopPropagation();
                    ctrlRef.container.trigger("console.close", {appId: ctrlRef.appId});
                    ctrlRef.view.removeElement();
                    return false;
                },
                mini: function (e) {
                    e.stopPropagation();
                    ctrlRef.view.toggleConsoleSize();
                    return false;
                }
            }
        };

        // register event handlers
        ctrlRef.view.input.on("keyup", instance.input.keyUp);
        // close a console
        ctrlRef.view.close.on("click", instance.control.close);
        // minimize a console
        ctrlRef.view.mini.on("click", instance.control.mini);
        // trigger when command is successfully generated
        ctrlRef.container.on("command.created", instance.command.created);
        // trigger when command has error
        ctrlRef.container.on("command.error", instance.command.error);
        // trigger to user clear output
        ctrlRef.container.on("command.clear", instance.command.clear);

        return instance;
    };

    return /**@alias module:app/Controller */ {
        assign: function (controller /* access to controller */) {
            EventHandlers(controller);
        }
    };
});