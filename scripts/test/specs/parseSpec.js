/**
 * Created by luojiawei on 16/8/8.
 */
define(['app/parse'], function (parse) {
    describe("parse user input text, build command and handle exceptions", function () {

        it("return command object with error message when command name is invalid string", function() {
            var inputText = "%@c";
            var command = parse.performParse(inputText);
            expect(command.error.message).toEqual(jasmine.any(String));
        });

        it("return command object with error message when command name is not found", function() {
            var inputText = "unknown";
            var command = parse.performParse(inputText);
            expect(command.error.message).toEqual(jasmine.any(String));
        });

    });
});