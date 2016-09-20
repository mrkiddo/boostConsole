/**
 * Created by Jiawei Luo on 16/7/9.
 * @description application initialize and start
 */
require(['jquery', 'app/App'], function ($, App) {
    "use strict";
    $(document).ready(function () {
        var entryElement = $(".boost-console-app"),
            createButton = $('<div></div>').addClass("new-console"),
            footer = $('<div></div>').addClass("footer").html("Boost-Console built by Jiawei Luo @2016"),
            boostConsoles = [];

        createButton.click(function () {
            boostConsoles.push(App(entryElement, "boost-console"));
        });

        entryElement.on("console.close", ".boost-console", function (e, data) {
            for(var i = 0; i < boostConsoles.length; i++) {
                if(data.appId == boostConsoles[i].id) {
                    boostConsoles.splice(i, 1);
                }
            }
            console.log(boostConsoles);
        });

        entryElement.append(createButton).append(footer);
        boostConsoles.push(App(entryElement, "boost-console"));
    });
});