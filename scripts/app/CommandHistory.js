/**
 * Created by luojiawei on 16/8/17.
 * @module app/CommandHistory
 * @description provide command history track function
 */
define(function () {
    var CommandHistory = function () {
        var MAXSTACK = 5, // track the last 5 input
            stack = [], // save history stack
            index = stack.length,
            /**
             * @description reset index to point to the stack top
             */
            resetIndex = function () {
                index = stack.length;
            };
        var instance = {
            /**
             * @description push record to stack
             * @param {string} text
             */
            setHistory: function (text) {
                if(stack.length < MAXSTACK) {
                    stack.push(text);
                }
                else {
                    stack.shift();
                    stack.push(text);
                }
                resetIndex();
            },
            /**
             * @description retrieve history from stack
             * @param {string} direction
             * @returns {string}
             */
            getHistory: function (direction) {
                if(direction == 'up') {
                    if(index < 1) {
                        index = 0;
                        return stack[index];
                    }
                    else {
                        return stack[--index];
                    }
                }
                else {
                    if(index >= stack.length - 1) {
                        resetIndex();
                        return "";
                    }
                    else {
                        return stack[++index];
                    }
                }
            }
        };
        return instance;
    };

    return /**@alias module:app/CommandHistory */ {
        createInstance: function () {
            // create a new factory function to wrap the private variables
            var ins = CommandHistory.bind(CommandHistory);
            return ins();
        }
    };
});