define(['views/app', 'jquery', 'underscore'], function(App, $, _) {

    describe('Basic Form Markup', function() {

        it('underscore should work', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).toEqual(3);
        });

        it('should run with simple markup', function() {
            var el = $('<div></div>');

            var app = new App(el);
            app.render();

            expect(app.$el.text()).toEqual('require.js up and running');
        });

        

    });

});