/**
 * Created by luojiawei on 16/8/3.
 */
define(function () {
    "use strict";
    var errorMap = {
        "INVALID_COMMAND_FORMAT": {
            name: "Invalid_command_format",
            type: "ParseError",
            message: "Fail to parse this command format."
        },
        "INVALID_COMMAND": {
            name: "Invalid_command",
            type: "ParseError",
            message: "It is not an valid command."
        },
        "INVALID_COMMAND_PARAMETER": {
            name: "Invalid_command_parameter",
            type: "ExecuteError",
            message: "Command option not found."
        },
        "INVALID_COMMAND_PARAMETER_VALUE": {
            name: "Invalid_command_parameter_value",
            type: "ExecuteError",
            message: "Command option value not found."
        },
        "USER_GEOLOCATION_DENIED": {
            name: "Location_access_failure",
            type: "SettingError",
            message: "Fail to get access to your current location."
        },
        "GOOGLE_GEOAPI_ERROR": {
            name: "Google_geoApi_failure",
            type: "ExternalAPIError",
            message: "Fail to retrieve your geography information."
        }
    };
    var commandError = function () {
        var instance = Object.create(Error.prototype);
        instance.name = "";
        instance.message = "";
        instance.type = "";
        instance.commandRef = {};
        instance.setAttribute = function () {
            var self = this;
            if(arguments.length > 0){
                if(arguments.length == 2){
                    var attr = arguments[0],
                        value = arguments[1];
                    if(attr && value){
                        self[attr] = value;
                    }
                }
                if(arguments.length == 1 && (typeof arguments[0] == 'object')){
                    var options = arguments[0];
                    for(var key in options){
                        self[key] = options[key];
                    }
                }
            }
            return this;
        };
        return instance;
    };
    return function (errorId) {
        var e = commandError();
        var info = errorMap[errorId];
        e.setAttribute(info);
        return e;
    };
});