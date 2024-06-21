(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue3Demo = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var script = /*#__PURE__*/vue.defineComponent(__assign({
      name: 'CustomButton'
    }, {
      __name: 'Button',
      props: {
        type: {
          type: String,
          required: false,
          default: 'default'
        },
        size: {
          type: String,
          required: false,
          default: 'middle'
        }
      },
      emits: ['click'],
      setup: function (__props, _a) {
        var __emit = _a.emit;
        var props = __props;
        var emits = __emit;
        var _b = vue.toRefs(props),
          size = _b.size,
          type = _b.type;
        var buttonClass = vue.computed(function () {
          return ['button', "button-".concat(type.value), "button-".concat(size.value)];
        });
        var onClick = function (e) {
          emits('click', e);
        };
        return function (_ctx, _cache) {
          return vue.openBlock(), vue.createElementBlock("button", {
            class: vue.normalizeClass(buttonClass.value),
            onClick: onClick
          }, [vue.renderSlot(_ctx.$slots, "default")], 2 /* CLASS */);
        };
      }
    }));

    script.__scopeId = "data-v-015de462";
    script.__file = "src/components/Button.vue";

    var components = [script];
    var install = function (app) {
      components.forEach(function (component) {
        console.log(component.name);
        app.component(component.name, component);
      });
    };
    var main = {
      install: install
    };

    exports.Button = script;
    exports.default = main;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
