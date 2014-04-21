/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Phone.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],

    alias: 'controller.main',

    getValues : function(button) {
        var form   = button.up('panel'),
            fields = form.query('ux-phonefield'),
            i      = 0,
            length = fields.length,
            field;

        for (; i < length; i++) {
            field = fields[i];

            console.log(field.getFieldLabel(), field.getValue());
        }
    }
});
