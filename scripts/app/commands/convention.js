/**
 * Created by Jiawei Luo on 16/7/9.
 * A command methods code base module
 * @module app/convention
 * @description define convention command methods
 */
define(['jquery', 'app/Error'], function ($, Error) {
    "use strict";
    return /** @alias module:app/convention */ {
        time: function () {
            var deferred = $.Deferred();
            var result = {
                type: 'utilities',
                command: 'time',
                text: new Date().toString()
            };
            deferred.resolve(result);
            return deferred.promise();
        },
        location: function (params) {
            var deferredTop = $.Deferred();
            // use current location with html5 api
            var getCurrentLocation = function () {
                var deferred = $.Deferred();
                navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, null);
                return deferred.promise();
            };
            // process response text from google geo api
            var resultProcess = function (data, option) {
                if(!data || data.status !== 'OK'){
                    var err = Error("GOOGLE_GEOAPI_ERROR");
                    deferredTop.reject(err);
                    return false;
                }
                var result = "";
                if(option == 'address'){
                    result = data.results[0]['formatted_address'];
                }
                else if(option == 'zip'){
                    result = data.results[0]['formatted_address'].replace(/\s/g, "");
                    result = result.match(/(?!.*[DFIOQU])[A-VXY][0-9][A-Z]?[0-9][A-Z][0-9]/g)[0];
                }
                else{
                    var err = Error("INVALID_COMMAND_PARAMETER");
                    deferredTop.reject(err);
                    return false;
                }
                return result;
            };
            // if no params is specified, return raw latitude and longitude value
            if(!params){
                $.when(getCurrentLocation()).done(function (pos) {
                    var result = {
                        type: 'utilities',
                        command: 'location',
                        text: pos.coords.latitude + ", " + pos.coords.longitude
                    };
                    deferredTop.resolve(result);
                }).fail(function (positionError) {
                    if(positionError.code == 1){
                        var err = Error("USER_GEOLOCATION_DENIED");
                    }
                    deferredTop.reject(err);
                });
            }
            else {
                if(params['convert']) {
                    var optionValues = ["address", "zip"],
                        currentOptionValue = null;
                    optionValues.some(function (value) {
                        if(value == params['convert']) {
                            currentOptionValue = params['convert'];
                            return false;
                        }
                    });
                    if(!currentOptionValue){
                        // if it's not an available option value
                        // throw an error
                        var err = new Error("INVALID_COMMAND_PARAMETER_VALUE");
                        deferredTop.reject(err);
                    }
                }
                else {
                    // if it's not an available parameter
                    // throw an error
                    var err = new Error("INVALID_COMMAND_PARAMETER");
                    deferredTop.reject(err);
                }
                var locationPromise = getCurrentLocation();
                // retrieve address/zip information for current locations
                var geoApiPromise = locationPromise.then(function (pos) {
                    var geoApiOptions = {
                        url: "https://maps.googleapis.com/maps/api/geocode/json",
                        data: {
                            "latlng": pos.coords.latitude + "," + pos.coords.longitude,
                            "language": "en"
                        },
                        dataType: "JSON"
                    };
                    return $.get(geoApiOptions);
                }, function (positionError) {
                    if(positionError.code == 1){
                        var err = Error("USER_GEOLOCATION_DENIED");
                    }
                    deferredTop.reject(err);
                });
                geoApiPromise.then(function (data) {
                    var info = resultProcess(data, currentOptionValue);
                    var result = {
                        type: 'utilities',
                        command: 'location',
                        params: params,
                        text: info
                    };
                    deferredTop.resolve(result);
                }, function () {});
            }
            return deferredTop.promise();
        }
    };
});