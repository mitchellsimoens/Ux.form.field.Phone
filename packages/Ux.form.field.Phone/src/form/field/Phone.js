Ext.define('Ux.form.field.Phone', {
    extend : 'Ext.form.field.Text',
    xtype  : 'ux-phonefield',

    config : {
        valueTpl     : null,
        tplValue     : '(___) ___-____',
        leftValue    : null,
        leftReadOnly : false
    },

    maskRe : /[0-9]/,

    applyValueTpl : function(tpl) {
        if (tpl && !tpl.isTemplate) {
            tpl = new Ext.XTemplate(tpl);
        }

        return tpl;
    },

    updateTplValue : function(value) {
        var arr    = value.split(''),
            i      = 0,
            len    = arr.length,
            tpl    = '',
            valIdx = 0,
            val;

        for (; i < len; i++) {
            val = arr[i];

            if (val !== '_') {
                tpl += val;
            } else {
                tpl += '{[values[' + valIdx + ']]}';

                valIdx++;
            }
        }

        this.setValueTpl(tpl);
    },

    initEvents : function() {
        var me = this,
            inputEl = me.inputEl;

        me.callParent();

        if (!me.selectOnFocus && !me.emptyText) {
            //add mousedown listener if one already isn't added
            me.mon(inputEl, 'mousedown', me.focusEnd, me);
        }

        if (!me.enableKeyEvents) {
            me.mon(inputEl, 'keydown', me.onKeyDown, me);
            me.mon(inputEl, 'keyup',   me.onKeyUp,   me);
        }
    },

    onFocus : function() {
        this.callParent(arguments);

        this.focusEnd();
    },

    onMouseDown : function(e) {
        this.callParent(arguments);

        this.focusEnd(e);
    },

    focusEnd : function(e) {
        var me  = this,
            len = me.getRawValue().length;

        setTimeout(function() {
            me.selectText(len, len);
        }, 10);

        if (e && e.isEvent) {
            e.preventDefault();
        }
    },

    onKeyDown : function(e) {
        var me       = this,
            charCode = e.getCharCode(),
            key      = String.fromCharCode(e.getCharCode());

        if (!/[0-9]+/.test(key) && charCode < 96 && charCode > 105) {
            e.stopEvent();
        } else if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
    },

    onKeyUp : function(e) {
        var me       = this,
            charCode = e.getCharCode(),
            key      = String.fromCharCode(e.getCharCode());

        if (/[0-9]+/.test(key) || (charCode > 95 && charCode < 106)) {
            me.setValue(me.getValue());
        }

        me.callParent(arguments);
    },

    processRawValue : function(value) {
        value = this.callParent([value]);
        value = value.replace(/[^0-9]/g, '');

        return value;
    },

    valueToRaw : function(value) {
        var me          = this,
            tpl         = me.getValueTpl(),
            valueTpl    = me.getTplValue().replace(/[^0-9_]/g, ''),
            valueTplLen = valueTpl.length,
            leftValue   = me.getLeftValue() || '',
            start       = 0,
            valueLength;

        if (leftValue) {
            leftValue = leftValue.toString();
            start     = leftValue.length;

            if (value) {
                value = value.replace(new RegExp('^' + leftValue), '');
                start += value.length;
            }
        }

        value = me.callParent([value]).replace(/[^0-9]/g, '');

        valueLength = value.length;

        value = leftValue + valueTpl.substr(start, valueTplLen - valueLength) + value;
        value = value.split('');

        valueLength = value.length;

        if (!me.getLeftReadOnly() && valueLength > valueTplLen) {
            value = Ext.Array.slice(value, valueLength - valueTplLen);
        }

        return me.callParent([tpl.apply(value)]);
    }
});
