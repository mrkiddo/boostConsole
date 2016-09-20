/**
 * Created by Jiawei Luo on 16/8/6.
 * A command method code base module
 * @module app/setting
 * @description define setting command methods
 */
define(['jquery', 'app/Error'], function ($, Error) {
    "use strict";
    return /** @alias module:app/setting */ {
        clear: function (element) {
            var deferred = $.Deferred();
            element.trigger("command.clear");
            deferred.resolve("event_triggered");
            return deferred.promise();
        }
    };
});