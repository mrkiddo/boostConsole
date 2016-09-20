/**
 * Created by luojiawei on 16/7/21.
 * Command module
 * @module app/Command
 * @description define Command object and its factory function
 */
define(function () {
    "use strict";
    /**
     * @param {object} options
     * @returns {object} instance
     * @description Command object factory function
     */
    var Command = function (options) {
        options = options || {};
        var instance = {
            container: {},
            method: {},
            name: "default",
            params: {},
            timestamp: new Date().getTime(),
            type: "default",
            error: null
        };
        // set `timestamp` property as read-only
        Object.defineProperty(instance, "timestamp", {
            enumerable: true,
            configurable: true,
            writable: false
        });
        return instance;
    };

    return /**@alias module:app/Command */ {
        createInstance: function () {
            return Command();
        }
    };

});