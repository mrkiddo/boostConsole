/**
 * Created by Jiawei Luo on 16/8/10.
 * @module views/handlebarsAdapter
 * @description get access to pre-compiled Handlebars templates
 */
define(['templates'], function (templates) {
    return /**@alias module:views/handlebarAdapter */ {
        /**
         *
         * @param {string} templateName
         * @param {object} data
         * @returns {object} html
         */
        render: function (templateName, data) {
            var template = templates[templateName] || "";
            var html = "";
            if(template){
                html = template(data);
            }
            return html;
        }
    };
});