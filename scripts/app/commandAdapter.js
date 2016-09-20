/**
 * Created by Jiawei Luo on 16/7/9.
 * commandAdapter module
 * @module app/commandAdapter
 * @description define adapter to obtain the reference for command methods from different method code base
 */
define(['app/commands/convention', 'app/commands/setting'], function (convention, setting) {
    "use strict";
    /**
     * @name commandAdapter
     * @type {object}
     * @description mapping the user input to executable command method - [key/command_name]: {value/command_details}
     */
    var commandAdapter = {
        "t": {
            method: convention.time,
            type: "convention",
            name: "time"
        },
        "time": {
            method: convention.time,
            type: "convention",
            name: "time"
        },
        "location": {
            method: convention.location,
            type: "convention",
            name: "location"
        },
        "clear": {
            method: setting.clear,
            type: "setting",
            name: "clear"
        }
    };

    return /**@alias module:app/commandAdapter */ {
        getCommand: function (name) {
            return commandAdapter[name] || {};
        }
    };
});