/**
 * Created by Jiawei Luo on 16/7/9.
 * Text parsing module
 * @module app/parse
 * @description define command parse module for parsing user input to Commands
 */
define(['app/commandAdapter', 'app/Command', 'app/Error'], function (adapter, Command, Error) {
    "use strict";
    /**
     * @type {object}
     * @description private methods of this module
     */
    var parse = {
        /**
         * @param text
         * @returns {Array}
         * @description extract command name from input text
         */
        getCommandName: function (text) {
            var reg = /^\w+\b/;
            if(text){
                var result = text.match(reg);
                if(result && result.length > 0){
                    return result[0];
                }
            }
        },
        /**
         * @param text
         * @returns {String} mode name
         * @description detect current command mode from input text
         */
        classifyMode: function (text) {
            if(text.indexOf("(") > -1){
                return "method_mode";
            }
            else if(text.indexOf("-") > -1){
                return "command_mode";
            }
            else {
                return "standard";
            }
        },
        /**
         * @param text
         * @returns {object} parameters for a command
         * @description extract command parameters from input text for method mode
         */
        processMethodMode: function (text) {
            var reg = /\w+\=\w+/g;
            var params = {};
            text = text.trim().replace(/\s/g, "");
            var arr = text.match(reg);
            if(arr && arr.length > 0){
                arr.forEach(function(value){
                    if(value){
                        var val = value.split("=");
                        if(val[0] && val[1]){
                            params[val[0]] = val[1];
                        }
                    }
                });
            }
            return params;
        },
        /**
         * @param text
         * @returns {object} parameters for a command
         * @description extract command parameters from input text for command mode
         */
        processCommandMode: function (text) {
            var reg = /\-\w+\s+\w+/g;
            var params = {};
            var arr = text.match(reg);
            if(arr && arr.length > 0){
                arr.forEach(function(value){
                    if(value){
                        var val = value.split(" ");
                        if(val[0] && val[1]){
                            val[0] = val[0].replace("-", "");
                            params[val[0]] = val[1];
                        }
                    }
                });
            }
            return params;
        }
    };

    return /**@alias module:app/parse */ {
        /**
         * @param text
         * @returns {object} Command instance
         * @description create a Command object from user input
         */
        performParse: function (text) {
            if (!text || (typeof text != "string")) {
                return false;
            }
            var command = Command.createInstance();
            var commandName = parse.getCommandName(text);
            if (!commandName) {
                command.error = Error("INVALID_COMMAND");
                return command;
            }
            var commandContent = adapter.getCommand(commandName);
            if(commandContent.method && commandContent.type && commandContent.name) {
                command.type = commandContent.type;
                command.method = commandContent.method;
                command.name = commandContent.name;
            }
            else{
                command.error = Error("INVALID_COMMAND");
                return command;
            }
            var commandMode = parse.classifyMode(text);
            // use this command name to map a command method
            // if no parameters, directly get command method
            // if has parameters, use one of the modes to get parameters
            var params = null;
            switch (commandMode) {
                case "method_mode":
                    params = parse.processMethodMode(text);
                    break;
                case "command_mode":
                    params = parse.processCommandMode(text);
                    break;
            }
            command.params = params;

            return command;
        }
    };
});

