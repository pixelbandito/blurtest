// ==UserScript==
// @name          BlurTest
// @namespace http://www.skotopoi.com/greasemonkey
// @description   Blur test script for evaluating web site design
// @include       *
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 500);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    /* http://keith-wood.name/svg.html
       SVG for jQuery v1.4.3.
       Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
       Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
       MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
       Please attribute the author if you use it. */
     (function($) {
        function SVGManager() {
            this._settings = [];
            this._extensions = [];
            this.regional = [];
            this.regional[''] = {
                errorLoadingText: 'Error loading',
                notSupportedText: 'This browser does not support SVG'
            };
            this.local = this.regional[''];
            this._uuid = new Date().getTime();
            this._renesis = detectActiveX('RenesisX.RenesisCtrl')
        }
        function detectActiveX(a) {
            try {
                return !! (window.ActiveXObject && new ActiveXObject(a))
            } catch(e) {
                return false
            }
        }
        var p = 'svgwrapper';
        $.extend(SVGManager.prototype, {
            markerClassName: 'hasSVG',
            svgNS: 'http://www.w3.org/2000/svg',
            xlinkNS: 'http://www.w3.org/1999/xlink',
            _wrapperClass: SVGWrapper,
            _attrNames: {
                class_: 'class',
                in_: 'in',
                alignmentBaseline: 'alignment-baseline',
                baselineShift: 'baseline-shift',
                clipPath: 'clip-path',
                clipRule: 'clip-rule',
                colorInterpolation: 'color-interpolation',
                colorInterpolationFilters: 'color-interpolation-filters',
                colorRendering: 'color-rendering',
                dominantBaseline: 'dominant-baseline',
                enableBackground: 'enable-background',
                fillOpacity: 'fill-opacity',
                fillRule: 'fill-rule',
                floodColor: 'flood-color',
                floodOpacity: 'flood-opacity',
                fontFamily: 'font-family',
                fontSize: 'font-size',
                fontSizeAdjust: 'font-size-adjust',
                fontStretch: 'font-stretch',
                fontStyle: 'font-style',
                fontVariant: 'font-variant',
                fontWeight: 'font-weight',
                glyphOrientationHorizontal: 'glyph-orientation-horizontal',
                glyphOrientationVertical: 'glyph-orientation-vertical',
                horizAdvX: 'horiz-adv-x',
                horizOriginX: 'horiz-origin-x',
                imageRendering: 'image-rendering',
                letterSpacing: 'letter-spacing',
                lightingColor: 'lighting-color',
                markerEnd: 'marker-end',
                markerMid: 'marker-mid',
                markerStart: 'marker-start',
                stopColor: 'stop-color',
                stopOpacity: 'stop-opacity',
                strikethroughPosition: 'strikethrough-position',
                strikethroughThickness: 'strikethrough-thickness',
                strokeDashArray: 'stroke-dasharray',
                strokeDashOffset: 'stroke-dashoffset',
                strokeLineCap: 'stroke-linecap',
                strokeLineJoin: 'stroke-linejoin',
                strokeMiterLimit: 'stroke-miterlimit',
                strokeOpacity: 'stroke-opacity',
                strokeWidth: 'stroke-width',
                textAnchor: 'text-anchor',
                textDecoration: 'text-decoration',
                textRendering: 'text-rendering',
                underlinePosition: 'underline-position',
                underlineThickness: 'underline-thickness',
                vertAdvY: 'vert-adv-y',
                vertOriginY: 'vert-origin-y',
                wordSpacing: 'word-spacing',
                writingMode: 'writing-mode'
            },
            _attachSVG: function(a, b) {
                var c = (a.namespaceURI == this.svgNS ? a: null);
                var a = (c ? null: a);
                if ($(a || c).hasClass(this.markerClassName)) {
                    return
                }
                if (typeof b == 'string') {
                    b = {
                        loadURL: b
                    }
                } else if (typeof b == 'function') {
                    b = {
                        onLoad: b
                    }
                }
                $(a || c).addClass(this.markerClassName);
                try {
                    if (!c) {
                        c = document.createElementNS(this.svgNS, 'svg');
                        c.setAttribute('version', '1.1');
                        c.setAttribute('width', a.clientWidth);
                        c.setAttribute('height', a.clientHeight);
                        a.appendChild(c)
                    }
                    this._afterLoad(a, c, b || {})
                } catch(e) {
                    if ($.browser.msie) {
                        if (!a.id) {
                            a.id = 'svg' + (this._uuid++)
                        }
                        this._settings[a.id] = b;
                        a.innerHTML = '<embed type="image/svg+xml" width="100%" ' + 'height="100%" src="' + (b.initPath || '') + 'blank.svg"/>'
                    } else {
                        a.innerHTML = '<p class="svg_error">' + this.local.notSupportedText + '</p>'
                    }
                }
            },
            _registerSVG: function() {
                for (var i = 0; i < document.embeds.length; i++) {
                    var a = document.embeds[i].parentNode;
                    if (!$(a).hasClass($.svg.markerClassName) || $.data(a, p)) {
                        continue
                    }
                    var b = null;
                    try {
                        b = document.embeds[i].getSVGDocument()
                    } catch(e) {
                        setTimeout($.svg._registerSVG, 250);
                        return
                    }
                    b = (b ? b.documentElement: null);
                    if (b) {
                        $.svg._afterLoad(a, b)
                    }
                }
            },
            _afterLoad: function(a, b, c) {
                var c = c || this._settings[a.id];
                this._settings[a ? a.id: ''] = null;
                var d = new this._wrapperClass(b, a);
                $.data(a || b, p, d);
                try {
                    if (c.loadURL) {
                        d.load(c.loadURL, c)
                    }
                    if (c.settings) {
                        d.configure(c.settings)
                    }
                    if (c.onLoad && !c.loadURL) {
                        c.onLoad.apply(a || b, [d])
                    }
                } catch(e) {
                    alert(e)
                }
            },
            _getSVG: function(a) {
                a = (typeof a == 'string' ? $(a)[0] : (a.jquery ? a[0] : a));
                return $.data(a, p)
            },
            _destroySVG: function(a) {
                var b = $(a);
                if (!b.hasClass(this.markerClassName)) {
                    return
                }
                b.removeClass(this.markerClassName);
                if (a.namespaceURI != this.svgNS) {
                    b.empty()
                }
                $.removeData(a, p)
            },
            addExtension: function(a, b) {
                this._extensions.push([a, b])
            }
        });
        function SVGWrapper(a, b) {
            this._svg = a;
            this._container = b;
            for (var i = 0; i < $.svg._extensions.length; i++) {
                var c = $.svg._extensions[i];
                this[c[0]] = new c[1](this)
            }
        }
        $.extend(SVGWrapper.prototype, {
            _width: function() {
                return (this._container ? this._container.clientWidth: this._svg.width)
            },
            _height: function() {
                return (this._container ? this._container.clientHeight: this._svg.height)
            },
            root: function() {
                return this._svg
            },
            configure: function(a, b) {
                if (b) {
                    for (var i = this._svg.attributes.length - 1; i >= 0; i--) {
                        var c = this._svg.attributes.item(i);
                        if (! (c.nodeName == 'onload' || c.nodeName == 'version' || c.nodeName.substring(0, 5) == 'xmlns')) {
                            this._svg.attributes.removeNamedItem(c.nodeName)
                        }
                    }
                }
                for (var d in a) {
                    this._svg.setAttribute(d, a[d])
                }
                return this
            },
            getElementById: function(a) {
                return this._svg.ownerDocument.getElementById(a)
            },
            change: function(a, b) {
                if (a) {
                    for (var c in b) {
                        if (b[c] == null) {
                            a.removeAttribute(c)
                        } else {
                            a.setAttribute(c, b[c])
                        }
                    }
                }
                return this
            },
            _args: function(b, c, d) {
                c.splice(0, 0, 'parent');
                c.splice(c.length, 0, 'settings');
                var e = {};
                var f = 0;
                if (b[0] != null && b[0].jquery) {
                    b[0] = b[0][0]
                }
                if (b[0] != null && !(typeof b[0] == 'object' && b[0].nodeName)) {
                    e['parent'] = null;
                    f = 1
                }
                for (var i = 0; i < b.length; i++) {
                    e[c[i + f]] = b[i]
                }
                if (d) {
                    $.each(d,
                    function(i, a) {
                        if (typeof e[a] == 'object') {
                            e.settings = e[a];
                            e[a] = null
                        }
                    })
                }
                return e
            },
            title: function(a, b, c) {
                var d = this._args(arguments, ['text']);
                var e = this._makeNode(d.parent, 'title', d.settings || {});
                e.appendChild(this._svg.ownerDocument.createTextNode(d.text));
                return e
            },
            describe: function(a, b, c) {
                var d = this._args(arguments, ['text']);
                var e = this._makeNode(d.parent, 'desc', d.settings || {});
                e.appendChild(this._svg.ownerDocument.createTextNode(d.text));
                return e
            },
            defs: function(a, b, c) {
                var d = this._args(arguments, ['id'], ['id']);
                return this._makeNode(d.parent, 'defs', $.extend((d.id ? {
                    id: d.id
                }: {}), d.settings || {}))
            },
            symbol: function(a, b, c, d, e, f, g) {
                var h = this._args(arguments, ['id', 'x1', 'y1', 'width', 'height']);
                return this._makeNode(h.parent, 'symbol', $.extend({
                    id: h.id,
                    viewBox: h.x1 + ' ' + h.y1 + ' ' + h.width + ' ' + h.height
                },
                h.settings || {}))
            },
            marker: function(a, b, c, d, e, f, g, h) {
                var i = this._args(arguments, ['id', 'refX', 'refY', 'mWidth', 'mHeight', 'orient'], ['orient']);
                return this._makeNode(i.parent, 'marker', $.extend({
                    id: i.id,
                    refX: i.refX,
                    refY: i.refY,
                    markerWidth: i.mWidth,
                    markerHeight: i.mHeight,
                    orient: i.orient || 'auto'
                },
                i.settings || {}))
            },
            style: function(a, b, c) {
                var d = this._args(arguments, ['styles']);
                var e = this._makeNode(d.parent, 'style', $.extend({
                    type: 'text/css'
                },
                d.settings || {}));
                e.appendChild(this._svg.ownerDocument.createTextNode(d.styles));
                if ($.browser.opera) {
                    $('head').append('<style type="text/css">' + d.styles + '</style>')
                }
                return e
            },
            script: function(a, b, c, d) {
                var e = this._args(arguments, ['script', 'type'], ['type']);
                var f = this._makeNode(e.parent, 'script', $.extend({
                    type: e.type || 'text/javascript'
                },
                e.settings || {}));
                f.appendChild(this._svg.ownerDocument.createTextNode(this._escapeXML(e.script)));
                if (!$.browser.mozilla) {
                    $.globalEval(e.script)
                }
                return f
            },
            linearGradient: function(a, b, c, d, e, f, g, h) {
                var i = this._args(arguments, ['id', 'stops', 'x1', 'y1', 'x2', 'y2'], ['x1']);
                var j = $.extend({
                    id: i.id
                },
                (i.x1 != null ? {
                    x1: i.x1,
                    y1: i.y1,
                    x2: i.x2,
                    y2: i.y2
                }: {}));
                return this._gradient(i.parent, 'linearGradient', $.extend(j, i.settings || {}), i.stops)
            },
            radialGradient: function(a, b, c, d, e, r, f, g, h) {
                var i = this._args(arguments, ['id', 'stops', 'cx', 'cy', 'r', 'fx', 'fy'], ['cx']);
                var j = $.extend({
                    id: i.id
                },
                (i.cx != null ? {
                    cx: i.cx,
                    cy: i.cy,
                    r: i.r,
                    fx: i.fx,
                    fy: i.fy
                }: {}));
                return this._gradient(i.parent, 'radialGradient', $.extend(j, i.settings || {}), i.stops)
            },
            _gradient: function(a, b, c, d) {
                var e = this._makeNode(a, b, c);
                for (var i = 0; i < d.length; i++) {
                    var f = d[i];
                    this._makeNode(e, 'stop', $.extend({
                        offset: f[0],
                        stopColor: f[1]
                    },
                    (f[2] != null ? {
                        stopOpacity: f[2]
                    }: {})))
                }
                return e
            },
            pattern: function(a, b, x, y, c, d, e, f, g, h, i) {
                var j = this._args(arguments, ['id', 'x', 'y', 'width', 'height', 'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
                var k = $.extend({
                    id: j.id,
                    x: j.x,
                    y: j.y,
                    width: j.width,
                    height: j.height
                },
                (j.vx != null ? {
                    viewBox: j.vx + ' ' + j.vy + ' ' + j.vwidth + ' ' + j.vheight
                }: {}));
                return this._makeNode(j.parent, 'pattern', $.extend(k, j.settings || {}))
            },
            mask: function(a, b, x, y, c, d, e) {
                var f = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
                return this._makeNode(f.parent, 'mask', $.extend({
                    id: f.id,
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height
                },
                f.settings || {}))
            },
            createPath: function() {
                return new SVGPath()
            },
            createText: function() {
                return new SVGText()
            },
            svg: function(a, x, y, b, c, d, e, f, g, h) {
                var i = this._args(arguments, ['x', 'y', 'width', 'height', 'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
                var j = $.extend({
                    x: i.x,
                    y: i.y,
                    width: i.width,
                    height: i.height
                },
                (i.vx != null ? {
                    viewBox: i.vx + ' ' + i.vy + ' ' + i.vwidth + ' ' + i.vheight
                }: {}));
                return this._makeNode(i.parent, 'svg', $.extend(j, i.settings || {}))
            },
            group: function(a, b, c) {
                var d = this._args(arguments, ['id'], ['id']);
                return this._makeNode(d.parent, 'g', $.extend({
                    id: d.id
                },
                d.settings || {}))
            },
            use: function(a, x, y, b, c, d, e) {
                var f = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
                if (typeof f.x == 'string') {
                    f.ref = f.x;
                    f.settings = f.y;
                    f.x = f.y = f.width = f.height = null
                }
                var g = this._makeNode(f.parent, 'use', $.extend({
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height
                },
                f.settings || {}));
                g.setAttributeNS($.svg.xlinkNS, 'href', f.ref);
                return g
            },
            link: function(a, b, c) {
                var d = this._args(arguments, ['ref']);
                var e = this._makeNode(d.parent, 'a', d.settings);
                e.setAttributeNS($.svg.xlinkNS, 'href', d.ref);
                return e
            },
            image: function(a, x, y, b, c, d, e) {
                var f = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
                var g = this._makeNode(f.parent, 'image', $.extend({
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height
                },
                f.settings || {}));
                g.setAttributeNS($.svg.xlinkNS, 'href', f.ref);
                return g
            },
            path: function(a, b, c) {
                var d = this._args(arguments, ['path']);
                return this._makeNode(d.parent, 'path', $.extend({
                    d: (d.path.path ? d.path.path() : d.path)
                },
                d.settings || {}))
            },
            rect: function(a, x, y, b, c, d, e, f) {
                var g = this._args(arguments, ['x', 'y', 'width', 'height', 'rx', 'ry'], ['rx']);
                return this._makeNode(g.parent, 'rect', $.extend({
                    x: g.x,
                    y: g.y,
                    width: g.width,
                    height: g.height
                },
                (g.rx ? {
                    rx: g.rx,
                    ry: g.ry
                }: {}), g.settings || {}))
            },
            circle: function(a, b, c, r, d) {
                var e = this._args(arguments, ['cx', 'cy', 'r']);
                return this._makeNode(e.parent, 'circle', $.extend({
                    cx: e.cx,
                    cy: e.cy,
                    r: e.r
                },
                e.settings || {}))
            },
            ellipse: function(a, b, c, d, e, f) {
                var g = this._args(arguments, ['cx', 'cy', 'rx', 'ry']);
                return this._makeNode(g.parent, 'ellipse', $.extend({
                    cx: g.cx,
                    cy: g.cy,
                    rx: g.rx,
                    ry: g.ry
                },
                g.settings || {}))
            },
            line: function(a, b, c, d, e, f) {
                var g = this._args(arguments, ['x1', 'y1', 'x2', 'y2']);
                return this._makeNode(g.parent, 'line', $.extend({
                    x1: g.x1,
                    y1: g.y1,
                    x2: g.x2,
                    y2: g.y2
                },
                g.settings || {}))
            },
            polyline: function(a, b, c) {
                var d = this._args(arguments, ['points']);
                return this._poly(d.parent, 'polyline', d.points, d.settings)
            },
            polygon: function(a, b, c) {
                var d = this._args(arguments, ['points']);
                return this._poly(d.parent, 'polygon', d.points, d.settings)
            },
            _poly: function(a, b, c, d) {
                var e = '';
                for (var i = 0; i < c.length; i++) {
                    e += c[i].join() + ' '
                }
                return this._makeNode(a, b, $.extend({
                    points: $.trim(e)
                },
                d || {}))
            },
            text: function(a, x, y, b, c) {
                var d = this._args(arguments, ['x', 'y', 'value']);
                if (typeof d.x == 'string' && arguments.length < 4) {
                    d.value = d.x;
                    d.settings = d.y;
                    d.x = d.y = null
                }
                return this._text(d.parent, 'text', d.value, $.extend({
                    x: (d.x && isArray(d.x) ? d.x.join(' ') : d.x),
                    y: (d.y && isArray(d.y) ? d.y.join(' ') : d.y)
                },
                d.settings || {}))
            },
            textpath: function(a, b, c, d) {
                var e = this._args(arguments, ['path', 'value']);
                var f = this._text(e.parent, 'textPath', e.value, e.settings || {});
                f.setAttributeNS($.svg.xlinkNS, 'href', e.path);
                return f
            },
            _text: function(a, b, c, d) {
                var e = this._makeNode(a, b, d);
                if (typeof c == 'string') {
                    e.appendChild(e.ownerDocument.createTextNode(c))
                } else {
                    for (var i = 0; i < c._parts.length; i++) {
                        var f = c._parts[i];
                        if (f[0] == 'tspan') {
                            var g = this._makeNode(e, f[0], f[2]);
                            g.appendChild(e.ownerDocument.createTextNode(f[1]));
                            e.appendChild(g)
                        } else if (f[0] == 'tref') {
                            var g = this._makeNode(e, f[0], f[2]);
                            g.setAttributeNS($.svg.xlinkNS, 'href', f[1]);
                            e.appendChild(g)
                        } else if (f[0] == 'textpath') {
                            var h = $.extend({},
                            f[2]);
                            h.href = null;
                            var g = this._makeNode(e, f[0], h);
                            g.setAttributeNS($.svg.xlinkNS, 'href', f[2].href);
                            g.appendChild(e.ownerDocument.createTextNode(f[1]));
                            e.appendChild(g)
                        } else {
                            e.appendChild(e.ownerDocument.createTextNode(f[1]))
                        }
                    }
                }
                return e
            },
            other: function(a, b, c) {
                var d = this._args(arguments, ['name']);
                return this._makeNode(d.parent, d.name, d.settings || {})
            },
            _makeNode: function(a, b, c) {
                a = a || this._svg;
                var d = this._svg.ownerDocument.createElementNS($.svg.svgNS, b);
                for (var b in c) {
                    var e = c[b];
                    if (e != null && e != null && (typeof e != 'string' || e != '')) {
                        d.setAttribute($.svg._attrNames[b] || b, e)
                    }
                }
                a.appendChild(d);
                return d
            },
            add: function(b, c) {
                var d = this._args((arguments.length == 1 ? [null, b] : arguments), ['node']);
                var f = this;
                d.parent = d.parent || this._svg;
                try {
                    if ($.svg._renesis) {
                        throw 'Force traversal';
                    }
                    d.parent.appendChild(d.node.cloneNode(true))
                } catch(e) {
                    d.node = (d.node.jquery ? d.node: $(d.node));
                    d.node.each(function() {
                        var a = f._cloneAsSVG(this);
                        if (a) {
                            d.parent.appendChild(a)
                        }
                    })
                }
                return this
            },
            _cloneAsSVG: function(a) {
                var b = null;
                if (a.nodeType == 1) {
                    b = this._svg.ownerDocument.createElementNS($.svg.svgNS, this._checkName(a.nodeName));
                    for (var i = 0; i < a.attributes.length; i++) {
                        var c = a.attributes.item(i);
                        if (c.nodeName != 'xmlns' && c.nodeValue) {
                            if (c.prefix == 'xlink') {
                                b.setAttributeNS($.svg.xlinkNS, c.localName, c.nodeValue)
                            } else {
                                b.setAttribute(this._checkName(c.nodeName), c.nodeValue)
                            }
                        }
                    }
                    for (var i = 0; i < a.childNodes.length; i++) {
                        var d = this._cloneAsSVG(a.childNodes[i]);
                        if (d) {
                            b.appendChild(d)
                        }
                    }
                } else if (a.nodeType == 3) {
                    if ($.trim(a.nodeValue)) {
                        b = this._svg.ownerDocument.createTextNode(a.nodeValue)
                    }
                } else if (a.nodeType == 4) {
                    if ($.trim(a.nodeValue)) {
                        try {
                            b = this._svg.ownerDocument.createCDATASection(a.nodeValue)
                        } catch(e) {
                            b = this._svg.ownerDocument.createTextNode(a.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))
                        }
                    }
                }
                return b
            },
            _checkName: function(a) {
                a = (a.substring(0, 1) >= 'A' && a.substring(0, 1) <= 'Z' ? a.toLowerCase() : a);
                return (a.substring(0, 4) == 'svg:' ? a.substring(4) : a)
            },
            load: function(h, j) {
                j = (typeof j == 'boolean' ? {
                    addTo: j
                }: (typeof j == 'function' ? {
                    onLoad: j
                }: j || {}));
                if (!j.addTo) {
                    this.clear(false)
                }
                var k = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
                var l = this;
                var m = function(a) {
                    a = $.svg.local.errorLoadingText + ': ' + a;
                    if (j.onLoad) {
                        j.onLoad.apply(l._container || l._svg, [l, a])
                    } else {
                        l.text(null, 10, 20, a)
                    }
                };
                var n = function(a) {
                    var b = new ActiveXObject('Microsoft.XMLDOM');
                    b.validateOnParse = false;
                    b.resolveExternals = false;
                    b.async = false;
                    b.loadXML(a);
                    if (b.parseError.errorCode != 0) {
                        m(b.parseError.reason);
                        return null
                    }
                    return b
                };
                var o = function(a) {
                    if (!a) {
                        return
                    }
                    if (a.documentElement.nodeName != 'svg') {
                        var b = a.getElementsByTagName('parsererror');
                        var c = (b.length ? b[0].getElementsByTagName('div') : []);
                        m(!b.length ? '???': (c.length ? c[0] : b[0]).firstChild.nodeValue);
                        return
                    }
                    var d = {};
                    for (var i = 0; i < a.documentElement.attributes.length; i++) {
                        var f = a.documentElement.attributes.item(i);
                        if (! (f.nodeName == 'version' || f.nodeName.substring(0, 5) == 'xmlns')) {
                            d[f.nodeName] = f.nodeValue
                        }
                    }
                    l.configure(d, true);
                    var g = a.documentElement.childNodes;
                    for (var i = 0; i < g.length; i++) {
                        try {
                            if ($.svg._renesis) {
                                throw 'Force traversal';
                            }
                            l._svg.appendChild(g[i].cloneNode(true));
                            if (g[i].nodeName == 'script') {
                                $.globalEval(g[i].textContent)
                            }
                        } catch(e) {
                            l.add(null, g[i])
                        }
                    }
                    if (!j.changeSize) {
                        l.configure({
                            width: k[0],
                            height: k[1]
                        })
                    }
                    if (j.onLoad) {
                        j.onLoad.apply(l._container || l._svg, [l])
                    }
                };
                if (h.match('<svg')) {
                    o($.browser.msie ? n(h) : new DOMParser().parseFromString(h, 'text/xml'))
                } else {
                    $.ajax({
                        url: h,
                        dataType: ($.browser.msie ? 'text': 'xml'),
                        success: function(a) {
                            o($.browser.msie ? n(a) : a)
                        },
                        error: function(a, b, c) {
                            m(b + (c ? ' ' + c.message: ''))
                        }
                    })
                }
                return this
            },
            remove: function(a) {
                a = (a.jquery ? a[0] : a);
                a.parentNode.removeChild(a);
                return this
            },
            clear: function(a) {
                if (a) {
                    this.configure({},
                    true)
                }
                while (this._svg.firstChild) {
                    this._svg.removeChild(this._svg.firstChild)
                }
                return this
            },
            toSVG: function(a) {
                a = a || this._svg;
                return (typeof XMLSerializer == 'undefined' ? this._toSVG(a) : new XMLSerializer().serializeToString(a))
            },
            _toSVG: function(a) {
                var b = '';
                if (!a) {
                    return b
                }
                if (a.nodeType == 3) {
                    b = a.nodeValue
                } else if (a.nodeType == 4) {
                    b = '<![CDATA[' + a.nodeValue + ']]>'
                } else {
                    b = '<' + a.nodeName;
                    if (a.attributes) {
                        for (var i = 0; i < a.attributes.length; i++) {
                            var c = a.attributes.item(i);
                            if (! ($.trim(c.nodeValue) == '' || c.nodeValue.match(/^\[object/) || c.nodeValue.match(/^function/))) {
                                b += ' ' + (c.namespaceURI == $.svg.xlinkNS ? 'xlink:': '') + c.nodeName + '="' + c.nodeValue + '"'
                            }
                        }
                    }
                    if (a.firstChild) {
                        b += '>';
                        var d = a.firstChild;
                        while (d) {
                            b += this._toSVG(d);
                            d = d.nextSibling
                        }
                        b += '</' + a.nodeName + '>'
                    } else {
                        b += '/>'
                    }
                }
                return b
            },
            _escapeXML: function(a) {
                a = a.replace(/&/g, '&amp;');
                a = a.replace(/</g, '&lt;');
                a = a.replace(/>/g, '&gt;');
                return a
            }
        });
        function SVGPath() {
            this._path = ''
        }
        $.extend(SVGPath.prototype, {
            reset: function() {
                this._path = '';
                return this
            },
            move: function(x, y, a) {
                a = (isArray(x) ? y: a);
                return this._coords((a ? 'm': 'M'), x, y)
            },
            line: function(x, y, a) {
                a = (isArray(x) ? y: a);
                return this._coords((a ? 'l': 'L'), x, y)
            },
            horiz: function(x, a) {
                this._path += (a ? 'h': 'H') + (isArray(x) ? x.join(' ') : x);
                return this
            },
            vert: function(y, a) {
                this._path += (a ? 'v': 'V') + (isArray(y) ? y.join(' ') : y);
                return this
            },
            curveC: function(a, b, c, d, x, y, e) {
                e = (isArray(a) ? b: e);
                return this._coords((e ? 'c': 'C'), a, b, c, d, x, y)
            },
            smoothC: function(a, b, x, y, c) {
                c = (isArray(a) ? b: c);
                return this._coords((c ? 's': 'S'), a, b, x, y)
            },
            curveQ: function(a, b, x, y, c) {
                c = (isArray(a) ? b: c);
                return this._coords((c ? 'q': 'Q'), a, b, x, y)
            },
            smoothQ: function(x, y, a) {
                a = (isArray(x) ? y: a);
                return this._coords((a ? 't': 'T'), x, y)
            },
            _coords: function(a, b, c, d, e, f, g) {
                if (isArray(b)) {
                    for (var i = 0; i < b.length; i++) {
                        var h = b[i];
                        this._path += (i == 0 ? a: ' ') + h[0] + ',' + h[1] + (h.length < 4 ? '': ' ' + h[2] + ',' + h[3] + (h.length < 6 ? '': ' ' + h[4] + ',' + h[5]))
                    }
                } else {
                    this._path += a + b + ',' + c + (d == null ? '': ' ' + d + ',' + e + (f == null ? '': ' ' + f + ',' + g))
                }
                return this
            },
            arc: function(a, b, c, d, e, x, y, f) {
                f = (isArray(a) ? b: f);
                this._path += (f ? 'a': 'A');
                if (isArray(a)) {
                    for (var i = 0; i < a.length; i++) {
                        var g = a[i];
                        this._path += (i == 0 ? '': ' ') + g[0] + ',' + g[1] + ' ' + g[2] + ' ' + (g[3] ? '1': '0') + ',' + (g[4] ? '1': '0') + ' ' + g[5] + ',' + g[6]
                    }
                } else {
                    this._path += a + ',' + b + ' ' + c + ' ' + (d ? '1': '0') + ',' + (e ? '1': '0') + ' ' + x + ',' + y
                }
                return this
            },
            close: function() {
                this._path += 'z';
                return this
            },
            path: function() {
                return this._path
            }
        });
        SVGPath.prototype.moveTo = SVGPath.prototype.move;
        SVGPath.prototype.lineTo = SVGPath.prototype.line;
        SVGPath.prototype.horizTo = SVGPath.prototype.horiz;
        SVGPath.prototype.vertTo = SVGPath.prototype.vert;
        SVGPath.prototype.curveCTo = SVGPath.prototype.curveC;
        SVGPath.prototype.smoothCTo = SVGPath.prototype.smoothC;
        SVGPath.prototype.curveQTo = SVGPath.prototype.curveQ;
        SVGPath.prototype.smoothQTo = SVGPath.prototype.smoothQ;
        SVGPath.prototype.arcTo = SVGPath.prototype.arc;
        function SVGText() {
            this._parts = []
        }
        $.extend(SVGText.prototype, {
            reset: function() {
                this._parts = [];
                return this
            },
            string: function(a) {
                this._parts[this._parts.length] = ['text', a];
                return this
            },
            span: function(a, b) {
                this._parts[this._parts.length] = ['tspan', a, b];
                return this
            },
            ref: function(a, b) {
                this._parts[this._parts.length] = ['tref', a, b];
                return this
            },
            path: function(a, b, c) {
                this._parts[this._parts.length] = ['textpath', b, $.extend({
                    href: a
                },
                c || {})];
                return this
            }
        });
        $.fn.svg = function(a) {
            var b = Array.prototype.slice.call(arguments, 1);
            if (typeof a == 'string' && a == 'get') {
                return $.svg['_' + a + 'SVG'].apply($.svg, [this[0]].concat(b))
            }
            return this.each(function() {
                if (typeof a == 'string') {
                    $.svg['_' + a + 'SVG'].apply($.svg, [this].concat(b))
                } else {
                    $.svg._attachSVG(this, a || {})
                }
            })
        };
        function isArray(a) {
            return (a && a.constructor == Array)
        }
        $.svg = new SVGManager()
    })(jQuery);
    
    /* http://keith-wood.name/svg.html
       SVG filters for jQuery v1.4.3.
       Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
       Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
       MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
       Please attribute the author if you use it. */
     (function($) {
        $.svg.addExtension('filters', SVGFilter);
        $.extend($.svg._wrapperClass.prototype, {
            filter: function(a, b, x, y, c, d, e) {
                var f = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
                return this._makeNode(f.parent, 'filter', $.extend({
                    id: f.id,
                    x: f.x,
                    y: f.y,
                    width: f.width,
                    height: f.height
                },
                f.settings || {}))
            }
        });
        function SVGFilter(a) {
            this._wrapper = a
        }
        $.extend(SVGFilter.prototype, {
            distantLight: function(a, b, c, d, e) {
                var f = this._wrapper._args(arguments, ['result', 'azimuth', 'elevation']);
                return this._wrapper._makeNode(f.parent, 'feDistantLight', $.extend({
                    result: f.result,
                    azimuth: f.azimuth,
                    elevation: f.elevation
                },
                f.settings || {}))
            },
            pointLight: function(a, b, x, y, z, c) {
                var d = this._wrapper._args(arguments, ['result', 'x', 'y', 'z']);
                return this._wrapper._makeNode(d.parent, 'fePointLight', $.extend({
                    result: d.result,
                    x: d.x,
                    y: d.y,
                    z: d.z
                },
                d.settings || {}))
            },
            spotLight: function(a, b, x, y, z, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'x', 'y', 'z', 'toX', 'toY', 'toZ'], ['toX']);
                var h = $.extend({
                    result: g.result,
                    x: g.x,
                    y: g.y,
                    z: g.z
                },
                (g.toX != null ? {
                    pointsAtX: g.toX,
                    pointsAtY: g.toY,
                    pointsAtZ: g.toZ
                }: {}));
                return this._wrapper._makeNode(g.parent, 'feSpotLight', $.extend(h, g.settings || {}))
            },
            blend: function(a, b, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'mode', 'in1', 'in2']);
                return this._wrapper._makeNode(g.parent, 'feBlend', $.extend({
                    result: g.result,
                    mode: g.mode,
                    in_: g.in1,
                    in2: g.in2
                },
                g.settings || {}))
            },
            colorMatrix: function(a, b, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'in1', 'type', 'values']);
                if (isArray(g.values)) {
                    var h = '';
                    for (var i = 0; i < g.values.length; i++) {
                        h += (i == 0 ? '': ' ') + g.values[i].join(' ')
                    }
                    g.values = h
                } else if (typeof g.values == 'object') {
                    g.settings = g.values;
                    g.values = null
                }
                var j = $.extend({
                    result: g.result,
                    in_: g.in1,
                    type: g.type
                },
                (g.values != null ? {
                    values: g.values
                }: {}));
                return this._wrapper._makeNode(g.parent, 'feColorMatrix', $.extend(j, g.settings || {}))
            },
            componentTransfer: function(a, b, c, d) {
                var e = this._wrapper._args(arguments, ['result', 'functions']);
                var f = this._wrapper._makeNode(e.parent, 'feComponentTransfer', $.extend({
                    result: e.result
                },
                e.settings || {}));
                var g = ['R', 'G', 'B', 'A'];
                for (var i = 0; i < Math.min(4, e.functions.length); i++) {
                    var h = e.functions[i];
                    var j = $.extend({
                        type: h[0]
                    },
                    (h[0] == 'table' || h[0] == 'discrete' ? {
                        tableValues: h[1].join(' ')
                    }: (h[0] == 'linear' ? {
                        slope: h[1],
                        intercept: h[2]
                    }: (h[0] == 'gamma' ? {
                        amplitude: h[1],
                        exponent: h[2],
                        offset: h[3]
                    }: {}))));
                    this._wrapper._makeNode(f, 'feFunc' + g[i], j)
                }
                return f
            },
            composite: function(a, b, c, d, e, f, g, h, i, j) {
                var k = this._wrapper._args(arguments, ['result', 'operator', 'in1', 'in2', 'k1', 'k2', 'k3', 'k4'], ['k1']);
                var l = $.extend({
                    result: k.result,
                    operator: k.operator,
                    'in': k.in1,
                    in2: k.in2
                },
                (k.k1 != null ? {
                    k1: k.k1,
                    k2: k.k2,
                    k3: k.k3,
                    k4: k.k4
                }: {}));
                return this._wrapper._makeNode(k.parent, 'feComposite', $.extend(l, k.settings || {}))
            },
            convolveMatrix: function(a, b, c, d, e) {
                var f = this._wrapper._args(arguments, ['result', 'order', 'matrix']);
                var g = '';
                for (var i = 0; i < f.matrix.length; i++) {
                    g += (i == 0 ? '': ' ') + f.matrix[i].join(' ')
                }
                f.matrix = g;
                return this._wrapper._makeNode(f.parent, 'feConvolveMatrix', $.extend({
                    result: f.result,
                    order: f.order,
                    kernelMatrix: f.matrix
                },
                f.settings || {}))
            },
            diffuseLighting: function(a, b, c, d) {
                var e = this._wrapper._args(arguments, ['result', 'colour'], ['colour']);
                return this._wrapper._makeNode(e.parent, 'feDiffuseLighting', $.extend($.extend({
                    result: e.result
                },
                (e.colour ? {
                    lightingColor: e.colour
                }: {})), e.settings || {}))
            },
            displacementMap: function(a, b, c, d, e) {
                var f = this._wrapper._args(arguments, ['result', 'in1', 'in2']);
                return this._wrapper._makeNode(f.parent, 'feDisplacementMap', $.extend({
                    result: f.result,
                    in_: f.in1,
                    in2: f.in2
                },
                f.settings || {}))
            },
            flood: function(a, b, x, y, c, d, e, f, g) {
                var h = this._wrapper._args(arguments, ['result', 'x', 'y', 'width', 'height', 'colour', 'opacity']);
                if (arguments.length < 6) {
                    h.colour = h.x;
                    h.opacity = h.y;
                    h.settings = h.width;
                    h.x = null
                }
                var i = $.extend({
                    result: h.result,
                    floodColor: h.colour,
                    floodOpacity: h.opacity
                },
                (h.x != null ? {
                    x: h.x,
                    y: h.y,
                    width: h.width,
                    height: h.height
                }: {}));
                return this._wrapper._makeNode(h.parent, 'feFlood', $.extend(i, h.settings || {}))
            },
            gaussianBlur: function(a, b, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'in1', 'stdDevX', 'stdDevY'], ['stdDevY']);
                return this._wrapper._makeNode(g.parent, 'feGaussianBlur', $.extend({
                    result: g.result,
                    in_: g.in1,
                    stdDeviation: g.stdDevX + (g.stdDevY ? ' ' + g.stdDevY: '')
                },
                g.settings || {}))
            },
            image: function(a, b, c, d) {
                var e = this._wrapper._args(arguments, ['result', 'href']);
                var f = this._wrapper._makeNode(e.parent, 'feImage', $.extend({
                    result: e.result
                },
                e.settings || {}));
                f.setAttributeNS($.svg.xlinkNS, 'href', e.href);
                return f
            },
            merge: function(a, b, c, d) {
                var e = this._wrapper._args(arguments, ['result', 'refs']);
                var f = this._wrapper._makeNode(e.parent, 'feMerge', $.extend({
                    result: e.result
                },
                e.settings || {}));
                for (var i = 0; i < e.refs.length; i++) {
                    this._wrapper._makeNode(f, 'feMergeNode', {
                        in_: e.refs[i]
                    })
                }
                return f
            },
            morphology: function(a, b, c, d, e, f, g) {
                var h = this._wrapper._args(arguments, ['result', 'in1', 'operator', 'radiusX', 'radiusY'], ['radiusY']);
                return this._wrapper._makeNode(h.parent, 'feMorphology', $.extend({
                    result: h.result,
                    in_: h.in1,
                    operator: h.operator,
                    radius: h.radiusX + (h.radiusY ? ' ' + h.radiusY: '')
                },
                h.settings || {}))
            },
            offset: function(a, b, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'in1', 'dx', 'dy']);
                return this._wrapper._makeNode(g.parent, 'feOffset', $.extend({
                    result: g.result,
                    in_: g.in1,
                    dx: g.dx,
                    dy: g.dy
                },
                g.settings || {}))
            },
            specularLighting: function(a, b, c, d, e, f, g) {
                var h = this._wrapper._args(arguments, ['result', 'in1', 'surfaceScale', 'specularConstant', 'specularExponent'], ['surfaceScale', 'specularConstant', 'specularExponent']);
                return this._wrapper._makeNode(h.parent, 'feSpecularLighting', $.extend({
                    result: h.result,
                    in_: h.in1,
                    surfaceScale: h.surfaceScale,
                    specularConstant: h.specularConstant,
                    specularExponent: h.specularExponent
                },
                h.settings || {}))
            },
            tile: function(a, b, c, x, y, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'in1', 'x', 'y', 'width', 'height']);
                return this._wrapper._makeNode(g.parent, 'feTile', $.extend({
                    result: g.result,
                    in_: g.in1,
                    x: g.x,
                    y: g.y,
                    width: g.width,
                    height: g.height
                },
                g.settings || {}))
            },
            turbulence: function(a, b, c, d, e, f) {
                var g = this._wrapper._args(arguments, ['result', 'type', 'baseFreq', 'octaves'], ['octaves']);
                return this._wrapper._makeNode(g.parent, 'feTurbulence', $.extend({
                    result: g.result,
                    type: g.type,
                    baseFrequency: g.baseFreq,
                    numOctaves: g.octaves
                },
                g.settings || {}))
            }
        });
        function isArray(a) {
            return (a && a.constructor == Array)
        }
    })(jQuery)

// All your GM code must be inside this function
    function letsJQuery() {
//        alert($); // check if the dollar (jquery) function works
//        alert($().jquery); // check jQuery version
        alert($().jquery);
        $('body').append('<style>/* http://keith-wood.name/svg.html\n           SVG for jQuery v1.4.2.\n           Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.\n           Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and \n           MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. \n           Please attribute the author if you use it. */\n\n        svg\:svg {\n        	display: none;\n        }\n\n        .svg_error {\n        	color: red;\n        	font-weight: bold;\n        }\n        </style><svg  xmlns="http://www.w3.org/2000/svg"><filter id="filter1">\n            <feGaussianBlur stdDeviation="3"/>\n        </filter></svg>');
        $('body').svg.filters.gaussianBlur(filter, 'blur', 'SourceAlpha', 4);
    }



