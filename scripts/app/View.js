/**
 * Created by Jiawei Luo on 16/7/25.
 * View module
 * @module app/View
 * @description define View object and its factory function
 */
define(['views/handlebarsAdapter', 'jquery', 'jquery-ui'], function (hdbAdapter, $) {
    "use strict";
    /**
     * @returns {object} instance
     * @description View object factory function
     */
    var View = function () {
        var instance = {
            /**
             * @param {string} content
             * @param {string} type
             * @description display command executing result
             */
            renderResult: function (content, type) {
                var newLine = $(hdbAdapter.render("displayLine", {content: content}));
                if(type && type === 'error'){
                    newLine.addClass("error");
                }
                this.display.append(newLine);
                var scrollHeight = this.display[0].scrollHeight;
                this.display.scrollTop(scrollHeight);
            },
            /**
             * @description disable command input element
             */
            disableInput: function () {
                this.input.prop("disabled", true).addClass("disabled").blur();
            },
            /**
             * @description enable command input element
             */
            enableInput: function () {
                this.input.prop("disabled", false).removeClass("disabled").focus();
            },
            /**
             * @description clear all the contents in display element
             */
            clearOutput: function () {
                this.display.empty();
            },
            /**
             * @description display previous commands in input element
             * @param {string} value
             */
            showInputText: function (value) {
                this.input.val(value);
            },
            /**
             * @description display console title on the caption
             * @param {string} title
             * @param {number} number
             */
            showConsoleTitle: function (title, number) {
                this.container.find(".caption-title").html(title + ' - ' + number);
            },
            /**
             * @description toggle console size between full size and mini size
             */
            toggleConsoleSize: function () {
                this.display.toggle();
                this.inputWrapper.toggle();
            },
            /**
             * @description clean up element when close a console
             */
            removeElement: function () {
                this.container.remove();
            },
            /**
             * @description assign an unique GUID to a console
             * @param {string} guid
             */
            applyConsoleId: function (guid) {
                this.container.attr("data-id", guid);
            },
            /**
             * @description create DOM and register to view object
             * @param {object} parentEl
             * @return {object} View instance
             */
            init: function (parentEl) {
                var newContainer = $(hdbAdapter.render("console")),
                    self = this;
                newContainer.appendTo(parentEl);
                self.container = newContainer;
                self.display = newContainer.find(".display-wrapper");
                self.inputWrapper = newContainer.find(".console-wrapper");
                self.input = newContainer.find(".console-input");
                self.close = newContainer.find(".control-close");
                self.mini = newContainer.find(".control-min");
                self.caption = newContainer.find(".console-caption");
                self.enableInput();
                self.container.draggable({
                    "handle": self.caption
                });
                return self;
            }
        };
        return instance;
    };

    /**@alias module:app/View
     * @param {object} parentEl
     * @return {object} View instance
     **/
    return function (parentEl) {
        return View().init(parentEl);
    };
});