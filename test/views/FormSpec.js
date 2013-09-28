define(['views/app', 'jquery', 'underscore'], function(App, $, _) {

    describe('Test Form', function() {

        it('should run', function() {
            var el = $('<div></div>');

            var app = new App(el);
            app.render();

            expect(app.$el.text()).toEqual('require.js up and running');
        });

        it('works for underscore', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).toEqual(3);
        });

    });

});