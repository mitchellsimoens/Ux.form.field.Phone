/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Phone.view.main.Main', {
    extend: 'Ext.container.Container',

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        width: 300,
        split: true,
        items : [
            {
                xtype      : 'ux-phonefield',
                fieldLabel : 'Phone'
            },
            {
                xtype      : 'ux-phonefield',
                fieldLabel : 'Required Zip',
                leftValue  : 123
            },
            {
                xtype : 'component',
                html  : 'The above field has a default area code that will change as you type a number.'
            },
            {
                xtype        : 'ux-phonefield',
                fieldLabel   : 'Required Zip',
                leftValue    : 567,
                leftReadOnly : true
            },
            {
                xtype : 'component',
                html  : 'The above field has a default area code that will not change.'
            }
        ],
        tbar : [
            {
                text    : 'Get Values',
                handler : 'getValues'
            }
        ]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }]
});
