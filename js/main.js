/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csscalc-cssvhunit-cssvwunit-touchevents-setclasses !*/
!
function(e, n, t) {
	function o(e, n) {
		return typeof e === n
	}
	function s() {
		var e, n, t, s, a, i, r;
		for (var l in c) if (c.hasOwnProperty(l)) {
			if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
			for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), d.push((s ? "" : "no-") + r.join("-"))
		}
	}
	function a(e) {
		var n = u.className,
			t = Modernizr._config.classPrefix || "";
		if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {
			var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
			n = n.replace(o, "$1" + t + "js$2")
		}
		Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n)
	}
	function i() {
		return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
	}
	function r() {
		var e = n.body;
		return e || (e = i(p ? "svg" : "body"), e.fake = !0), e
	}
	function l(e, t, o, s) {
		var a, l, d, c, f = "modernizr",
			p = i("div"),
			h = r();
		if (parseInt(o, 10)) for (; o--;) d = i("div"), d.id = s ? s[o] : f + (o + 1), p.appendChild(d);
		return a = i("style"), a.type = "text/css", a.id = "s" + f, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = f, h.fake && (h.style.background = "", h.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !! l
	}
	var d = [],
		c = [],
		f = {
			_version: "3.3.1",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, n) {
				var t = this;
				setTimeout(function() {
					n(t[e])
				}, 0)
			},
			addTest: function(e, n, t) {
				c.push({
					name: e,
					fn: n,
					options: t
				})
			},
			addAsyncTest: function(e) {
				c.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = f, Modernizr = new Modernizr;
	var u = n.documentElement,
		p = "svg" === u.nodeName.toLowerCase(),
		h = f._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	f._prefixes = h, Modernizr.addTest("csscalc", function() {
		var e = "width:",
			n = "calc(10px);",
			t = i("a");
		return t.style.cssText = e + h.join(n + e), !! t.style.length
	});
	var m = f.testStyles = l;
	Modernizr.addTest("touchevents", function() {
		var t;
		if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;
		else {
			var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			m(o, function(e) {
				t = 9 === e.offsetTop
			})
		}
		return t
	}), m("#modernizr { height: 50vh; }", function(n) {
		var t = parseInt(e.innerHeight / 2, 10),
			o = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).height, 10);
		Modernizr.addTest("cssvhunit", o == t)
	}), m("#modernizr { width: 50vw; }", function(n) {
		var t = parseInt(e.innerWidth / 2, 10),
			o = parseInt((e.getComputedStyle ? getComputedStyle(n, null) : n.currentStyle).width, 10);
		Modernizr.addTest("cssvwunit", o == t)
	}), s(), a(d), delete f.addTest, delete f.addAsyncTest;
	for (var v = 0; v < Modernizr._q.length; v++) Modernizr._q[v]();
	e.Modernizr = Modernizr
}(window, document);
/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.Context.refreshAll()
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true
    }
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=bd2a33a25d26816f12a790a7de56b7cf)
 * Config saved to config.json and https://gist.github.com/bd2a33a25d26816f12a790a7de56b7cf
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),i=n.data("bs.tab");i||n.data("bs.tab",i=new a(this)),"string"==typeof e&&i[e]()})}var a=function(e){this.element=t(e)};a.VERSION="3.3.6",a.TRANSITION_DURATION=150,a.prototype.show=function(){var e=this.element,a=e.closest("ul:not(.dropdown-menu)"),n=e.data("target");if(n||(n=e.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var i=a.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),r=t.Event("show.bs.tab",{relatedTarget:i[0]});if(i.trigger(s),e.trigger(r),!r.isDefaultPrevented()&&!s.isDefaultPrevented()){var o=t(n);this.activate(e.closest("li"),a),this.activate(o,o.parent(),function(){i.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:i[0]})})}}},a.prototype.activate=function(e,n,i){function s(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),o?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}var r=n.find("> .active"),o=i&&t.support.transition&&(r.length&&r.hasClass("fade")||!!n.find("> .fade").length);r.length&&o?r.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),r.removeClass("in")};var n=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=a,t.fn.tab.noConflict=function(){return t.fn.tab=n,this};var i=function(a){a.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),+function(t){"use strict";function e(e){var a,n=e.attr("data-target")||(a=e.attr("href"))&&a.replace(/.*(?=#[^\s]+$)/,"");return t(n)}function a(e){return this.each(function(){var a=t(this),i=a.data("bs.collapse"),s=t.extend({},n.DEFAULTS,a.data(),"object"==typeof e&&e);!i&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),i||a.data("bs.collapse",i=new n(this,s)),"string"==typeof e&&i[e]()})}var n=function(e,a){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,a),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};n.VERSION="3.3.6",n.TRANSITION_DURATION=350,n.DEFAULTS={toggle:!0},n.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},n.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,i=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(i&&i.length&&(e=i.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){i&&i.length&&(a.call(i,"hide"),e||i.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var o=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return o.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(n.TRANSITION_DURATION)[r](this.$element[0][l])}}}},n.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var a=this.dimension();this.$element[a](this.$element[a]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[a](0).one("bsTransitionEnd",t.proxy(i,this)).emulateTransitionEnd(n.TRANSITION_DURATION):i.call(this)}}},n.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},n.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(a,n){var i=t(n);this.addAriaAndCollapsedClass(e(i),i)},this)).end()},n.prototype.addAriaAndCollapsedClass=function(t,e){var a=t.hasClass("in");t.attr("aria-expanded",a),e.toggleClass("collapsed",!a).attr("aria-expanded",a)};var i=t.fn.collapse;t.fn.collapse=a,t.fn.collapse.Constructor=n,t.fn.collapse.noConflict=function(){return t.fn.collapse=i,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(n){var i=t(this);i.attr("data-target")||n.preventDefault();var s=e(i),r=s.data("bs.collapse"),o=r?"toggle":i.data();a.call(s,o)})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var a in e)if(void 0!==t.style[a])return{end:e[a]};return!1}t.fn.emulateTransitionEnd=function(e){var a=!1,n=this;t(this).one("bsTransitionEnd",function(){a=!0});var i=function(){a||t(n).trigger(t.support.transition.end)};return setTimeout(i,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
/*!
 * Isotope PACKAGED v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */
/*!
 * Isotope v3.0.1
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2016 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'outlayer/outlayer',
        'get-size/get-size',
        'desandro-matches-selector/matches-selector',
        'fizzy-ui-utils/utils',
        './item',
        './layout-mode',
        // include default layout modes
        './layout-modes/masonry',
        './layout-modes/fit-rows',
        './layout-modes/vertical'
      ],
      function( Outlayer, getSize, matchesSelector, utils, Item, LayoutMode ) {
        return factory( window, Outlayer, getSize, matchesSelector, utils, Item, LayoutMode );
      });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('outlayer'),
      require('get-size'),
      require('desandro-matches-selector'),
      require('fizzy-ui-utils'),
      require('./item'),
      require('./layout-mode'),
      // include default layout modes
      require('./layout-modes/masonry'),
      require('./layout-modes/fit-rows'),
      require('./layout-modes/vertical')
    );
  } else {
    // browser global
    window.Isotope = factory(
      window,
      window.Outlayer,
      window.getSize,
      window.matchesSelector,
      window.fizzyUIUtils,
      window.Isotope.Item,
      window.Isotope.LayoutMode
    );
  }

}( window, function factory( window, Outlayer, getSize, matchesSelector, utils,
  Item, LayoutMode ) {

'use strict';

// -------------------------- vars -------------------------- //

var jQuery = window.jQuery;

// -------------------------- helpers -------------------------- //

var trim = String.prototype.trim ?
  function( str ) {
    return str.trim();
  } :
  function( str ) {
    return str.replace( /^\s+|\s+$/g, '' );
  };

// -------------------------- isotopeDefinition -------------------------- //

  // create an Outlayer layout class
  var Isotope = Outlayer.create( 'isotope', {
    layoutMode: 'masonry',
    isJQueryFiltering: true,
    sortAscending: true
  });

  Isotope.Item = Item;
  Isotope.LayoutMode = LayoutMode;

  var proto = Isotope.prototype;

  proto._create = function() {
    this.itemGUID = 0;
    // functions that sort items
    this._sorters = {};
    this._getSorters();
    // call super
    Outlayer.prototype._create.call( this );

    // create layout modes
    this.modes = {};
    // start filteredItems with all items
    this.filteredItems = this.items;
    // keep of track of sortBys
    this.sortHistory = [ 'original-order' ];
    // create from registered layout modes
    for ( var name in LayoutMode.modes ) {
      this._initLayoutMode( name );
    }
  };

  proto.reloadItems = function() {
    // reset item ID counter
    this.itemGUID = 0;
    // call super
    Outlayer.prototype.reloadItems.call( this );
  };

  proto._itemize = function() {
    var items = Outlayer.prototype._itemize.apply( this, arguments );
    // assign ID for original-order
    for ( var i=0; i < items.length; i++ ) {
      var item = items[i];
      item.id = this.itemGUID++;
    }
    this._updateItemsSortData( items );
    return items;
  };


  // -------------------------- layout -------------------------- //

  proto._initLayoutMode = function( name ) {
    var Mode = LayoutMode.modes[ name ];
    // set mode options
    // HACK extend initial options, back-fill in default options
    var initialOpts = this.options[ name ] || {};
    this.options[ name ] = Mode.options ?
      utils.extend( Mode.options, initialOpts ) : initialOpts;
    // init layout mode instance
    this.modes[ name ] = new Mode( this );
  };


  proto.layout = function() {
    // if first time doing layout, do all magic
    if ( !this._isLayoutInited && this._getOption('initLayout') ) {
      this.arrange();
      return;
    }
    this._layout();
  };

  // private method to be used in layout() & magic()
  proto._layout = function() {
    // don't animate first layout
    var isInstant = this._getIsInstant();
    // layout flow
    this._resetLayout();
    this._manageStamps();
    this.layoutItems( this.filteredItems, isInstant );

    // flag for initalized
    this._isLayoutInited = true;
  };

  // filter + sort + layout
  proto.arrange = function( opts ) {
    // set any options pass
    this.option( opts );
    this._getIsInstant();
    // filter, sort, and layout

    // filter
    var filtered = this._filter( this.items );
    this.filteredItems = filtered.matches;

    this._bindArrangeComplete();

    if ( this._isInstant ) {
      this._noTransition( this._hideReveal, [ filtered ] );
    } else {
      this._hideReveal( filtered );
    }

    this._sort();
    this._layout();
  };
  // alias to _init for main plugin method
  proto._init = proto.arrange;

  proto._hideReveal = function( filtered ) {
    this.reveal( filtered.needReveal );
    this.hide( filtered.needHide );
  };

  // HACK
  // Don't animate/transition first layout
  // Or don't animate/transition other layouts
  proto._getIsInstant = function() {
    var isLayoutInstant = this._getOption('layoutInstant');
    var isInstant = isLayoutInstant !== undefined ? isLayoutInstant :
      !this._isLayoutInited;
    this._isInstant = isInstant;
    return isInstant;
  };

  // listen for layoutComplete, hideComplete and revealComplete
  // to trigger arrangeComplete
  proto._bindArrangeComplete = function() {
    // listen for 3 events to trigger arrangeComplete
    var isLayoutComplete, isHideComplete, isRevealComplete;
    var _this = this;
    function arrangeParallelCallback() {
      if ( isLayoutComplete && isHideComplete && isRevealComplete ) {
        _this.dispatchEvent( 'arrangeComplete', null, [ _this.filteredItems ] );
      }
    }
    this.once( 'layoutComplete', function() {
      isLayoutComplete = true;
      arrangeParallelCallback();
    });
    this.once( 'hideComplete', function() {
      isHideComplete = true;
      arrangeParallelCallback();
    });
    this.once( 'revealComplete', function() {
      isRevealComplete = true;
      arrangeParallelCallback();
    });
  };

  // -------------------------- filter -------------------------- //

  proto._filter = function( items ) {
    var filter = this.options.filter;
    filter = filter || '*';
    var matches = [];
    var hiddenMatched = [];
    var visibleUnmatched = [];

    var test = this._getFilterTest( filter );

    // test each item
    for ( var i=0; i < items.length; i++ ) {
      var item = items[i];
      if ( item.isIgnored ) {
        continue;
      }
      // add item to either matched or unmatched group
      var isMatched = test( item );
      // item.isFilterMatched = isMatched;
      // add to matches if its a match
      if ( isMatched ) {
        matches.push( item );
      }
      // add to additional group if item needs to be hidden or revealed
      if ( isMatched && item.isHidden ) {
        hiddenMatched.push( item );
      } else if ( !isMatched && !item.isHidden ) {
        visibleUnmatched.push( item );
      }
    }

    // return collections of items to be manipulated
    return {
      matches: matches,
      needReveal: hiddenMatched,
      needHide: visibleUnmatched
    };
  };

  // get a jQuery, function, or a matchesSelector test given the filter
  proto._getFilterTest = function( filter ) {
    if ( jQuery && this.options.isJQueryFiltering ) {
      // use jQuery
      return function( item ) {
        return jQuery( item.element ).is( filter );
      };
    }
    if ( typeof filter == 'function' ) {
      // use filter as function
      return function( item ) {
        return filter( item.element );
      };
    }
    // default, use filter as selector string
    return function( item ) {
      return matchesSelector( item.element, filter );
    };
  };

  // -------------------------- sorting -------------------------- //

  /**
   * @params {Array} elems
   * @public
   */
  proto.updateSortData = function( elems ) {
    // get items
    var items;
    if ( elems ) {
      elems = utils.makeArray( elems );
      items = this.getItems( elems );
    } else {
      // update all items if no elems provided
      items = this.items;
    }

    this._getSorters();
    this._updateItemsSortData( items );
  };

  proto._getSorters = function() {
    var getSortData = this.options.getSortData;
    for ( var key in getSortData ) {
      var sorter = getSortData[ key ];
      this._sorters[ key ] = mungeSorter( sorter );
    }
  };

  /**
   * @params {Array} items - of Isotope.Items
   * @private
   */
  proto._updateItemsSortData = function( items ) {
    // do not update if no items
    var len = items && items.length;

    for ( var i=0; len && i < len; i++ ) {
      var item = items[i];
      item.updateSortData();
    }
  };

  // ----- munge sorter ----- //

  // encapsulate this, as we just need mungeSorter
  // other functions in here are just for munging
  var mungeSorter = ( function() {
    // add a magic layer to sorters for convienent shorthands
    // `.foo-bar` will use the text of .foo-bar querySelector
    // `[foo-bar]` will use attribute
    // you can also add parser
    // `.foo-bar parseInt` will parse that as a number
    function mungeSorter( sorter ) {
      // if not a string, return function or whatever it is
      if ( typeof sorter != 'string' ) {
        return sorter;
      }
      // parse the sorter string
      var args = trim( sorter ).split(' ');
      var query = args[0];
      // check if query looks like [an-attribute]
      var attrMatch = query.match( /^\[(.+)\]$/ );
      var attr = attrMatch && attrMatch[1];
      var getValue = getValueGetter( attr, query );
      // use second argument as a parser
      var parser = Isotope.sortDataParsers[ args[1] ];
      // parse the value, if there was a parser
      sorter = parser ? function( elem ) {
        return elem && parser( getValue( elem ) );
      } :
      // otherwise just return value
      function( elem ) {
        return elem && getValue( elem );
      };

      return sorter;
    }

    // get an attribute getter, or get text of the querySelector
    function getValueGetter( attr, query ) {
      // if query looks like [foo-bar], get attribute
      if ( attr ) {
        return function getAttribute( elem ) {
          return elem.getAttribute( attr );
        };
      }

      // otherwise, assume its a querySelector, and get its text
      return function getChildText( elem ) {
        var child = elem.querySelector( query );
        return child && child.textContent;
      };
    }

    return mungeSorter;
  })();

  // parsers used in getSortData shortcut strings
  Isotope.sortDataParsers = {
    'parseInt': function( val ) {
      return parseInt( val, 10 );
    },
    'parseFloat': function( val ) {
      return parseFloat( val );
    }
  };

  // ----- sort method ----- //

  // sort filteredItem order
  proto._sort = function() {
    var sortByOpt = this.options.sortBy;
    if ( !sortByOpt ) {
      return;
    }
    // concat all sortBy and sortHistory
    var sortBys = [].concat.apply( sortByOpt, this.sortHistory );
    // sort magic
    var itemSorter = getItemSorter( sortBys, this.options.sortAscending );
    this.filteredItems.sort( itemSorter );
    // keep track of sortBy History
    if ( sortByOpt != this.sortHistory[0] ) {
      // add to front, oldest goes in last
      this.sortHistory.unshift( sortByOpt );
    }
  };

  // returns a function used for sorting
  function getItemSorter( sortBys, sortAsc ) {
    return function sorter( itemA, itemB ) {
      // cycle through all sortKeys
      for ( var i = 0; i < sortBys.length; i++ ) {
        var sortBy = sortBys[i];
        var a = itemA.sortData[ sortBy ];
        var b = itemB.sortData[ sortBy ];
        if ( a > b || a < b ) {
          // if sortAsc is an object, use the value given the sortBy key
          var isAscending = sortAsc[ sortBy ] !== undefined ? sortAsc[ sortBy ] : sortAsc;
          var direction = isAscending ? 1 : -1;
          return ( a > b ? 1 : -1 ) * direction;
        }
      }
      return 0;
    };
  }

  // -------------------------- methods -------------------------- //

  // get layout mode
  proto._mode = function() {
    var layoutMode = this.options.layoutMode;
    var mode = this.modes[ layoutMode ];
    if ( !mode ) {
      // TODO console.error
      throw new Error( 'No layout mode: ' + layoutMode );
    }
    // HACK sync mode's options
    // any options set after init for layout mode need to be synced
    mode.options = this.options[ layoutMode ];
    return mode;
  };

  proto._resetLayout = function() {
    // trigger original reset layout
    Outlayer.prototype._resetLayout.call( this );
    this._mode()._resetLayout();
  };

  proto._getItemLayoutPosition = function( item  ) {
    return this._mode()._getItemLayoutPosition( item );
  };

  proto._manageStamp = function( stamp ) {
    this._mode()._manageStamp( stamp );
  };

  proto._getContainerSize = function() {
    return this._mode()._getContainerSize();
  };

  proto.needsResizeLayout = function() {
    return this._mode().needsResizeLayout();
  };

  // -------------------------- adding & removing -------------------------- //

  // HEADS UP overwrites default Outlayer appended
  proto.appended = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // filter, layout, reveal new items
    var filteredItems = this._filterRevealAdded( items );
    // add to filteredItems
    this.filteredItems = this.filteredItems.concat( filteredItems );
  };

  // HEADS UP overwrites default Outlayer prepended
  proto.prepended = function( elems ) {
    var items = this._itemize( elems );
    if ( !items.length ) {
      return;
    }
    // start new layout
    this._resetLayout();
    this._manageStamps();
    // filter, layout, reveal new items
    var filteredItems = this._filterRevealAdded( items );
    // layout previous items
    this.layoutItems( this.filteredItems );
    // add to items and filteredItems
    this.filteredItems = filteredItems.concat( this.filteredItems );
    this.items = items.concat( this.items );
  };

  proto._filterRevealAdded = function( items ) {
    var filtered = this._filter( items );
    this.hide( filtered.needHide );
    // reveal all new items
    this.reveal( filtered.matches );
    // layout new items, no transition
    this.layoutItems( filtered.matches, true );
    return filtered.matches;
  };

  /**
   * Filter, sort, and layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */
  proto.insert = function( elems ) {
    var items = this.addItems( elems );
    if ( !items.length ) {
      return;
    }
    // append item elements
    var i, item;
    var len = items.length;
    for ( i=0; i < len; i++ ) {
      item = items[i];
      this.element.appendChild( item.element );
    }
    // filter new stuff
    var filteredInsertItems = this._filter( items ).matches;
    // set flag
    for ( i=0; i < len; i++ ) {
      items[i].isLayoutInstant = true;
    }
    this.arrange();
    // reset flag
    for ( i=0; i < len; i++ ) {
      delete items[i].isLayoutInstant;
    }
    this.reveal( filteredInsertItems );
  };

  var _remove = proto.remove;
  proto.remove = function( elems ) {
    elems = utils.makeArray( elems );
    var removeItems = this.getItems( elems );
    // do regular thing
    _remove.call( this, elems );
    // bail if no items to remove
    var len = removeItems && removeItems.length;
    // remove elems from filteredItems
    for ( var i=0; len && i < len; i++ ) {
      var item = removeItems[i];
      // remove item from collection
      utils.removeFrom( this.filteredItems, item );
    }
  };

  proto.shuffle = function() {
    // update random sortData
    for ( var i=0; i < this.items.length; i++ ) {
      var item = this.items[i];
      item.sortData.random = Math.random();
    }
    this.options.sortBy = 'random';
    this._sort();
    this._layout();
  };

  /**
   * trigger fn without transition
   * kind of hacky to have this in the first place
   * @param {Function} fn
   * @param {Array} args
   * @returns ret
   * @private
   */
  proto._noTransition = function( fn, args ) {
    // save transitionDuration before disabling
    var transitionDuration = this.options.transitionDuration;
    // disable transition
    this.options.transitionDuration = 0;
    // do it
    var returnValue = fn.apply( this, args );
    // re-enable transition for reveal
    this.options.transitionDuration = transitionDuration;
    return returnValue;
  };

  // ----- helper methods ----- //

  /**
   * getter method for getting filtered item elements
   * @returns {Array} elems - collection of item elements
   */
  proto.getFilteredItemElements = function() {
    return this.filteredItems.map( function( item ) {
      return item.element;
    });
  };

  // -----  ----- //

  return Isotope;

}));
/*!
 * Packery layout mode PACKAGED v2.0.0
 * sub-classes Packery
 */

!function(a,b){"function"==typeof define&&define.amd?define("packery/js/rect",b):"object"==typeof module&&module.exports?module.exports=b():(a.Packery=a.Packery||{},a.Packery.Rect=b())}(window,function(){function a(b){for(var c in a.defaults)this[c]=a.defaults[c];for(c in b)this[c]=b[c]}a.defaults={x:0,y:0,width:0,height:0};var b=a.prototype;return b.contains=function(a){var b=a.width||0,c=a.height||0;return this.x<=a.x&&this.y<=a.y&&this.x+this.width>=a.x+b&&this.y+this.height>=a.y+c},b.overlaps=function(a){var b=this.x+this.width,c=this.y+this.height,d=a.x+a.width,e=a.y+a.height;return this.x<d&&b>a.x&&this.y<e&&c>a.y},b.getMaximalFreeRects=function(b){if(!this.overlaps(b))return!1;var c,d=[],e=this.x+this.width,f=this.y+this.height,g=b.x+b.width,h=b.y+b.height;return this.y<b.y&&(c=new a({x:this.x,y:this.y,width:this.width,height:b.y-this.y}),d.push(c)),e>g&&(c=new a({x:g,y:this.y,width:e-g,height:this.height}),d.push(c)),f>h&&(c=new a({x:this.x,y:h,width:this.width,height:f-h}),d.push(c)),this.x<b.x&&(c=new a({x:this.x,y:this.y,width:b.x-this.x,height:this.height}),d.push(c)),d},b.canFit=function(a){return this.width>=a.width&&this.height>=a.height},a}),function(a,b){if("function"==typeof define&&define.amd)define("packery/js/packer",["./rect"],b);else if("object"==typeof module&&module.exports)module.exports=b(require("./rect"));else{var c=a.Packery=a.Packery||{};c.Packer=b(c.Rect)}}(window,function(a){function b(a,b,c){this.width=a||0,this.height=b||0,this.sortDirection=c||"downwardLeftToRight",this.reset()}var c=b.prototype;c.reset=function(){this.spaces=[];var b=new a({x:0,y:0,width:this.width,height:this.height});this.spaces.push(b),this.sorter=d[this.sortDirection]||d.downwardLeftToRight},c.pack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b];if(c.canFit(a)){this.placeInSpace(a,c);break}}},c.columnPack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b],d=c.x<=a.x&&c.x+c.width>=a.x+a.width&&c.height>=a.height-.01;if(d){a.y=c.y,this.placed(a);break}}},c.rowPack=function(a){for(var b=0;b<this.spaces.length;b++){var c=this.spaces[b],d=c.y<=a.y&&c.y+c.height>=a.y+a.height&&c.width>=a.width-.01;if(d){a.x=c.x,this.placed(a);break}}},c.placeInSpace=function(a,b){a.x=b.x,a.y=b.y,this.placed(a)},c.placed=function(a){for(var b=[],c=0;c<this.spaces.length;c++){var d=this.spaces[c],e=d.getMaximalFreeRects(a);e?b.push.apply(b,e):b.push(d)}this.spaces=b,this.mergeSortSpaces()},c.mergeSortSpaces=function(){b.mergeRects(this.spaces),this.spaces.sort(this.sorter)},c.addSpace=function(a){this.spaces.push(a),this.mergeSortSpaces()},b.mergeRects=function(a){var b=0,c=a[b];a:for(;c;){for(var d=0,e=a[b+d];e;){if(e==c)d++;else{if(e.contains(c)){a.splice(b,1),c=a[b];continue a}c.contains(e)?a.splice(b+d,1):d++}e=a[b+d]}b++,c=a[b]}return a};var d={downwardLeftToRight:function(a,b){return a.y-b.y||a.x-b.x},rightwardTopToBottom:function(a,b){return a.x-b.x||a.y-b.y}};return b}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/item",["outlayer/outlayer","./rect"],b):"object"==typeof module&&module.exports?module.exports=b(require("outlayer"),require("./rect")):a.Packery.Item=b(a.Outlayer,a.Packery.Rect)}(window,function(a,b){var c=document.documentElement.style,d="string"==typeof c.transform?"transform":"WebkitTransform",e=function(){a.Item.apply(this,arguments)},f=e.prototype=Object.create(a.Item.prototype),g=f._create;f._create=function(){g.call(this),this.rect=new b};var h=f.moveTo;return f.moveTo=function(a,b){var c=Math.abs(this.position.x-a),d=Math.abs(this.position.y-b),e=this.layout.dragItemCount&&!this.isPlacing&&!this.isTransitioning&&1>c&&1>d;return e?void this.goTo(a,b):void h.apply(this,arguments)},f.enablePlacing=function(){this.removeTransitionStyles(),this.isTransitioning&&d&&(this.element.style[d]="none"),this.isTransitioning=!1,this.getSize(),this.layout._setRectSize(this.element,this.rect),this.isPlacing=!0},f.disablePlacing=function(){this.isPlacing=!1},f.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},f.showDropPlaceholder=function(){var a=this.dropPlaceholder;a||(a=this.dropPlaceholder=document.createElement("div"),a.className="packery-drop-placeholder",a.style.position="absolute"),a.style.width=this.size.width+"px",a.style.height=this.size.height+"px",this.positionDropPlaceholder(),this.layout.element.appendChild(a)},f.positionDropPlaceholder=function(){this.dropPlaceholder.style[d]="translate("+this.rect.x+"px, "+this.rect.y+"px)"},f.hideDropPlaceholder=function(){this.layout.element.removeChild(this.dropPlaceholder)},e}),function(a,b){"function"==typeof define&&define.amd?define("packery/js/packery",["get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],b):"object"==typeof module&&module.exports?module.exports=b(require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):a.Packery=b(a.getSize,a.Outlayer,a.Packery.Rect,a.Packery.Packer,a.Packery.Item)}(window,function(a,b,c,d,e){function f(a,b){return a.position.y-b.position.y||a.position.x-b.position.x}function g(a,b){return a.position.x-b.position.x||a.position.y-b.position.y}function h(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.sqrt(c*c+d*d)}c.prototype.canFit=function(a){return this.width>=a.width-1&&this.height>=a.height-1};var i=b.create("packery");i.Item=e;var j=i.prototype;j._create=function(){b.prototype._create.call(this),this.packer=new d,this.shiftPacker=new d,this.isEnabled=!0,this.dragItemCount=0;var a=this;this.handleDraggabilly={dragStart:function(){a.itemDragStart(this.element)},dragMove:function(){a.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){a.itemDragEnd(this.element)}},this.handleUIDraggable={start:function(b,c){c&&a.itemDragStart(b.currentTarget)},drag:function(b,c){c&&a.itemDragMove(b.currentTarget,c.position.left,c.position.top)},stop:function(b,c){c&&a.itemDragEnd(b.currentTarget)}}},j._resetLayout=function(){this.getSize(),this._getMeasurements();var a,b,c;this._getOption("horizontal")?(a=1/0,b=this.size.innerHeight+this.gutter,c="rightwardTopToBottom"):(a=this.size.innerWidth+this.gutter,b=1/0,c="downwardLeftToRight"),this.packer.width=this.shiftPacker.width=a,this.packer.height=this.shiftPacker.height=b,this.packer.sortDirection=this.shiftPacker.sortDirection=c,this.packer.reset(),this.maxY=0,this.maxX=0},j._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},j._getItemLayoutPosition=function(a){if(this._setRectSize(a.element,a.rect),this.isShifting||this.dragItemCount>0){var b=this._getPackMethod();this.packer[b](a.rect)}else this.packer.pack(a.rect);return this._setMaxXY(a.rect),a.rect},j.shiftLayout=function(){this.isShifting=!0,this.layout(),delete this.isShifting},j._getPackMethod=function(){return this._getOption("horizontal")?"rowPack":"columnPack"},j._setMaxXY=function(a){this.maxX=Math.max(a.x+a.width,this.maxX),this.maxY=Math.max(a.y+a.height,this.maxY)},j._setRectSize=function(b,c){var d=a(b),e=d.outerWidth,f=d.outerHeight;(e||f)&&(e=this._applyGridGutter(e,this.columnWidth),f=this._applyGridGutter(f,this.rowHeight)),c.width=Math.min(e,this.packer.width),c.height=Math.min(f,this.packer.height)},j._applyGridGutter=function(a,b){if(!b)return a+this.gutter;b+=this.gutter;var c=a%b,d=c&&1>c?"round":"ceil";return a=Math[d](a/b)*b},j._getContainerSize=function(){return this._getOption("horizontal")?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},j._manageStamp=function(a){var b,d=this.getItem(a);if(d&&d.isPlacing)b=d.rect;else{var e=this._getElementOffset(a);b=new c({x:this._getOption("originLeft")?e.left:e.right,y:this._getOption("originTop")?e.top:e.bottom})}this._setRectSize(a,b),this.packer.placed(b),this._setMaxXY(b)},j.sortItemsByPosition=function(){var a=this._getOption("horizontal")?g:f;this.items.sort(a)},j.fit=function(a,b,c){var d=this.getItem(a);d&&(this.stamp(d.element),d.enablePlacing(),this.updateShiftTargets(d),b=void 0===b?d.rect.x:b,c=void 0===c?d.rect.y:c,this.shift(d,b,c),this._bindFitEvents(d),d.moveTo(d.rect.x,d.rect.y),this.shiftLayout(),this.unstamp(d.element),this.sortItemsByPosition(),d.disablePlacing())},j._bindFitEvents=function(a){function b(){d++,2==d&&c.dispatchEvent("fitComplete",null,[a])}var c=this,d=0;a.once("layout",b),this.once("layoutComplete",b)},j.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&(this.options.shiftPercentResize?this.resizeShiftPercentLayout():this.layout())},j.needsResizeLayout=function(){var b=a(this.element),c=this._getOption("horizontal")?"innerHeight":"innerWidth";return b[c]!=this.size[c]},j.resizeShiftPercentLayout=function(){var b=this._getItemsForLayout(this.items),c=this._getOption("horizontal"),d=c?"y":"x",e=c?"height":"width",f=c?"rowHeight":"columnWidth",g=c?"innerHeight":"innerWidth",h=this[f];if(h=h&&h+this.gutter){this._getMeasurements();var i=this[f]+this.gutter;b.forEach(function(a){var b=Math.round(a.rect[d]/h);a.rect[d]=b*i})}else{var j=a(this.element)[g]+this.gutter,k=this.packer[e];b.forEach(function(a){a.rect[d]=a.rect[d]/k*j})}this.shiftLayout()},j.itemDragStart=function(a){if(this.isEnabled){this.stamp(a);var b=this.getItem(a);b&&(b.enablePlacing(),b.showDropPlaceholder(),this.dragItemCount++,this.updateShiftTargets(b))}},j.updateShiftTargets=function(a){this.shiftPacker.reset(),this._getBoundingRect();var b=this._getOption("originLeft"),d=this._getOption("originTop");this.stamps.forEach(function(a){var e=this.getItem(a);if(!e||!e.isPlacing){var f=this._getElementOffset(a),g=new c({x:b?f.left:f.right,y:d?f.top:f.bottom});this._setRectSize(a,g),this.shiftPacker.placed(g)}},this);var e=this._getOption("horizontal"),f=e?"rowHeight":"columnWidth",g=e?"height":"width";this.shiftTargetKeys=[],this.shiftTargets=[];var h,i=this[f];if(i=i&&i+this.gutter){var j=Math.ceil(a.rect[g]/i),k=Math.floor((this.shiftPacker[g]+this.gutter)/i);h=(k-j)*i;for(var l=0;k>l;l++)this._addShiftTarget(l*i,0,h)}else h=this.shiftPacker[g]+this.gutter-a.rect[g],this._addShiftTarget(0,0,h);var m=this._getItemsForLayout(this.items),n=this._getPackMethod();m.forEach(function(a){var b=a.rect;this._setRectSize(a.element,b),this.shiftPacker[n](b),this._addShiftTarget(b.x,b.y,h);var c=e?b.x+b.width:b.x,d=e?b.y:b.y+b.height;if(this._addShiftTarget(c,d,h),i)for(var f=Math.round(b[g]/i),j=1;f>j;j++){var k=e?c:b.x+i*j,l=e?b.y+i*j:d;this._addShiftTarget(k,l,h)}},this)},j._addShiftTarget=function(a,b,c){var d=this._getOption("horizontal")?b:a;if(!(0!==d&&d>c)){var e=a+","+b,f=-1!=this.shiftTargetKeys.indexOf(e);f||(this.shiftTargetKeys.push(e),this.shiftTargets.push({x:a,y:b}))}},j.shift=function(a,b,c){var d,e=1/0,f={x:b,y:c};this.shiftTargets.forEach(function(a){var b=h(a,f);e>b&&(d=a,e=b)}),a.rect.x=d.x,a.rect.y=d.y};var k=120;j.itemDragMove=function(a,b,c){function d(){f.shift(e,b,c),e.positionDropPlaceholder(),f.layout()}var e=this.isEnabled&&this.getItem(a);if(e){b-=this.size.paddingLeft,c-=this.size.paddingTop;var f=this,g=new Date;this._itemDragTime&&g-this._itemDragTime<k?(clearTimeout(this.dragTimeout),this.dragTimeout=setTimeout(d,k)):(d(),this._itemDragTime=g)}},j.itemDragEnd=function(a){function b(){d++,2==d&&(c.element.classList.remove("is-positioning-post-drag"),c.hideDropPlaceholder(),e.dispatchEvent("dragItemPositioned",null,[c]))}var c=this.isEnabled&&this.getItem(a);if(c){clearTimeout(this.dragTimeout),c.element.classList.add("is-positioning-post-drag");var d=0,e=this;c.once("layout",b),this.once("layoutComplete",b),c.moveTo(c.rect.x,c.rect.y),this.layout(),this.dragItemCount=Math.max(0,this.dragItemCount-1),this.sortItemsByPosition(),c.disablePlacing(),this.unstamp(c.element)}},j.bindDraggabillyEvents=function(a){this._bindDraggabillyEvents(a,"on")},j.unbindDraggabillyEvents=function(a){this._bindDraggabillyEvents(a,"off")},j._bindDraggabillyEvents=function(a,b){var c=this.handleDraggabilly;a[b]("dragStart",c.dragStart),a[b]("dragMove",c.dragMove),a[b]("dragEnd",c.dragEnd)},j.bindUIDraggableEvents=function(a){this._bindUIDraggableEvents(a,"on")},j.unbindUIDraggableEvents=function(a){this._bindUIDraggableEvents(a,"off")},j._bindUIDraggableEvents=function(a,b){var c=this.handleUIDraggable;a[b]("dragstart",c.start)[b]("drag",c.drag)[b]("dragstop",c.stop)};var l=j.destroy;return j.destroy=function(){l.apply(this,arguments),this.isEnabled=!1},i.Rect=c,i.Packer=d,i}),function(a,b){"function"==typeof define&&define.amd?define(["isotope/js/layout-mode","packery/js/packery"],b):"object"==typeof module&&module.exports?module.exports=b(require("isotope-layout/js/layout-mode"),require("packery")):b(a.Isotope.LayoutMode,a.Packery)}(window,function(a,b){var c=a.create("packery"),d=c.prototype,e={_getElementOffset:!0,_getMeasurement:!0};for(var f in b.prototype)e[f]||(d[f]=b.prototype[f]);var g=d._resetLayout;d._resetLayout=function(){this.packer=this.packer||new b.Packer,this.shiftPacker=this.shiftPacker||new b.Packer,g.apply(this,arguments)};var h=d._getItemLayoutPosition;d._getItemLayoutPosition=function(a){return a.rect=a.rect||new b.Rect,h.call(this,a)};var i=d.needsResizeLayout;d.needsResizeLayout=function(){return this._getOption("horizontal")?this.needsVerticalResizeLayout():i.call(this)};var j=d._getOption;return d._getOption=function(a){return"horizontal"==a?void 0!==this.options.isHorizontal?this.options.isHorizontal:this.options.horizontal:j.apply(this.isotope,arguments)},c});

/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */





;(function( $ ) {


    $.fn.collagePlus = function( options ) {

        return this.each(function() {

            /*
             *
             * set up vars
             *
             */

            // track row width by adding images, padding and css borders etc
            var row         = 0,
            // collect elements to be re-sized in current row
                elements    = [],
            // track the number of rows generated
                rownum = 1,
            // needed for creating some additional defaults that are actually obtained
            // from the dom, which maybe doesn't make them defaults ?!
                $this = $(this);


            // width of the area the collage will be in
            $.fn.collagePlus.defaults.albumWidth    = $this.width();
            // padding between the images. Using padding left as we assume padding is even all the way round
            $.fn.collagePlus.defaults.padding       = parseFloat( $this.css('padding-left') );
            // object that contains the images to collage
            $.fn.collagePlus.defaults.images        = $this.children();

            var settings = $.extend({}, $.fn.collagePlus.defaults, options);

            settings.images.each(
                function(index){

                    /*
                     *
                     * Cache selector
                     * Even if first child is not an image the whole sizing is based on images
                     * so where we take measurements, we take them on the images
                     *
                     */
                    var $this = $(this),
                        $img  = ($this.is("img")) ? $this : $(this).find("img");



                    /*
                     *
                     * get the current image size. Get image size in this order
                     *
                     * 1. from <img> tag
                     * 2. from data set from initial calculation
                     * 3. after loading the image and checking it's actual size
                     *
                     */
                    var w = (typeof $img.data("width") != 'undefined') ? $img.data("width") : $img.width(),
                        h = (typeof $img.data("height") != 'undefined') ? $img.data("height") : $img.height();



                    /*
                     *
                     * Get any current additional properties that may affect the width or height
                     * like css borders for example
                     *
                     */
                    var imgParams = getImgProperty($img);


                    /*
                     *
                     * store the original size for resize events
                     *
                     */
                    $img.data("width", w);
                    $img.data("height", h);



                    /*
                     *
                     * calculate the w/h based on target height
                     * this is our ideal size, but later we'll resize to make it fit
                     *
                     */
                    var nw = Math.ceil(w/h*settings.targetHeight),
                        nh = Math.ceil(settings.targetHeight);

                    /*
                     *
                     * Keep track of which images are in our row so far
                     *
                     */
                    elements.push([this, nw, nh, imgParams['w'], imgParams['h']]);

                    /*
                     *
                     * calculate the width of the element including extra properties
                     * like css borders
                     *
                     */
                    row += nw + imgParams['w'] + settings.padding;

                    /*
                     *
                     * if the current row width is wider than the parent container
                     * it's time to make a row out of our images
                     *
                     */
                    if( row > settings.albumWidth && elements.length != 0 ){

                        // call the method that calculates the final image sizes
                        // remove one set of padding as it's not needed for the last image in the row
                        resizeRow(elements, (row - settings.padding), settings, rownum);

                        // reset our row
                        delete row;
                        delete elements;
                        row         = 0;
                        elements    = [];
                        rownum      += 1;
                    }


                    /*
                     *
                     * if the images left are not enough to make a row
                     * then we'll force them to make one anyway
                     *
                     */
                    if ( settings.images.length-1 == index && elements.length != 0){
                        resizeRow(elements, row, settings, rownum);

                        // reset our row
                        delete row;
                        delete elements;
                        row         = 0;
                        elements    = [];
                        rownum      += 1;
                    }
                }
            );

        });

        function resizeRow( obj, row, settings, rownum) {

            /*
             *
             * How much bigger is this row than the available space?
             * At this point we have adjusted the images height to fit our target height
             * so the image size will already be different from the original.
             * The resizing we're doing here is to adjust it to the album width.
             *
             * We also need to change the album width (basically available space) by
             * the amount of padding and css borders for the images otherwise
             * this will skew the result.
             *
             * This is because padding and borders remain at a fixed size and we only
             * need to scale the images.
             *
             */
            var imageExtras         = (settings.padding * (obj.length - 1)) + (obj.length * obj[0][3]),
                albumWidthAdjusted  = settings.albumWidth - imageExtras,
                overPercent         = albumWidthAdjusted / (row - imageExtras),
                // start tracking our width with know values that will make up the total width
                // like borders and padding
                trackWidth          = imageExtras,
                // guess whether this is the last row in a set by checking if the width is less
                // than the parent width.
                lastRow             = (row < settings.albumWidth  ? true : false);





            /*
             * Resize the images by the above % so that they'll fit in the album space
             */
            for (var i = 0; i < obj.length; i++) {



                var $obj        = $(obj[i][0]),
                    fw          = Math.floor(obj[i][1] * overPercent),
                    fh          = Math.floor(obj[i][2] * overPercent),
                // if the element is the last in the row,
                // don't apply right hand padding (this is our flag for later)
                    isNotLast   = !!(( i < obj.length - 1 ));

                /*
                 * Checking if the user wants to not stretch the images of the last row to fit the
                 * parent element size
                 */
                if(settings.allowPartialLastRow === true && lastRow === true){
                   fw = obj[i][1];
                   fh = obj[i][2];
                }


                /*
                 *
                 * Because we use % to calculate the widths, it's possible that they are
                 * a few pixels out in which case we need to track this and adjust the
                 * last image accordingly
                 *
                 */
                trackWidth += fw;


                /*
                 *
                 * here we check if the combined images are exactly the width
                 * of the parent. If not then we add a few pixels on to make
                 * up the difference.
                 *
                 * This will alter the aspect ratio of the image slightly, but
                 * by a noticable amount.
                 *
                 * If the user doesn't want full width last row, we check for that here
                 *
                 */
                if(!isNotLast && trackWidth < settings.albumWidth){
                    if(settings.allowPartialLastRow === true && lastRow === true){
                        fw = fw;
                    }else{
                        fw = fw + (settings.albumWidth - trackWidth);
                    }
                }

                fw--;

                /*
                 *
                 * We'll be doing a few things to the image so here we cache the image selector
                 *
                 *
                 */
                var $img = ( $obj.is("img") ) ? $obj : $obj.find("img");

                /*
                 *
                 * Set the width of the image and parent element
                 * if the resized element is not an image, we apply it to the child image also
                 *
                 * We need to check if it's an image as the css borders are only measured on
                 * images. If the parent is a div, we need make the contained image smaller
                 * to accommodate the css image borders.
                 *
                 */
                $img.width(fw);
                if( !$obj.is("img") ){
                    $obj.width(fw + obj[i][3]);
                }


                /*
                 *
                 * Set the height of the image
                 * if the resized element is not an image, we apply it to the child image also
                 *
                 */
                $img.height(fh);
                if( !$obj.is("img") ){
                    $obj.height(fh + obj[i][4]);
                }


                /*
                 *
                 * Apply the css extras like padding
                 *
                 */
                applyModifications($obj, isNotLast, settings);


                /*
                 *
                 * Assign the effect to show the image
                 * Default effect is using jquery and not CSS3 to support more browsers
                 * Wait until the image is loaded to do this
                 *
                 */

                $img
                    .one('load', function (target) {
                    return function(){
                        if( settings.effect == 'default'){
                            target.animate({opacity: '1'},{duration: settings.fadeSpeed});
                        } else {
                            if(settings.direction == 'vertical'){
                                var sequence = (rownum <= 10  ? rownum : 10);
                            } else {
                                var sequence = (i <= 9  ? i+1 : 10);
                            }
                            /* Remove old classes with the "effect-" name */
                            target.removeClass(function (index, css) {
                                return (css.match(/\beffect-\S+/g) || []).join(' ');
                            });
                            target.addClass(settings.effect);
                            target.addClass("effect-duration-" + sequence);
                        }
                    }
                    }($obj))
                    /*
                     * fix for cached or loaded images
                     * For example if images are loaded in a "window.load" call we need to trigger
                     * the load call again
                     */
                    .each(function() {
                            if(this.complete) $(this).trigger('load');
                    });

        }





        }

        /*
         *
         * This private function applies the required css to space the image gallery
         * It applies it to the parent element so if an image is wrapped in a <div> then
         * the css is applied to the <div>
         *
         */
        function applyModifications($obj, isNotLast, settings) {
            var css = {
                    // Applying padding to element for the grid gap effect
                    'margin-bottom'     : settings.padding + "px",
                    'margin-right'      : (isNotLast) ? settings.padding + "px" : "0px",
                    // Set it to an inline-block by default so that it doesn't break the row
                    'display'           : settings.display,
                    // Set vertical alignment otherwise you get 4px extra padding
                    'vertical-align'    : "bottom",
                    // Hide the overflow to hide the caption
                    'overflow'          : "hidden"
                };

            return $obj.css(css);
        }


        /*
         *
         * This private function calculates any extras like padding, border associated
         * with the image that will impact on the width calculations
         *
         */
        function getImgProperty( img )
        {
            $img = $(img);
            var params =  new Array();
            params["w"] = (parseFloat($img.css("border-left-width")) + parseFloat($img.css("border-right-width")));
            params["h"] = (parseFloat($img.css("border-top-width")) + parseFloat($img.css("border-bottom-width")));
            return params;
        }

    };

    $.fn.collagePlus.defaults = {
        // the ideal height you want your images to be
        'targetHeight'          : 400,
        // how quickly you want images to fade in once ready can be in ms, "slow" or "fast"
        'fadeSpeed'             : "fast",
        // how the resized block should be displayed. inline-block by default so that it doesn't break the row
        'display'               : "inline-block",
        // which effect you want to use for revealing the images (note CSS3 browsers only),
        'effect'                : 'default',
        // effect delays can either be applied per row to give the impression of descending appearance
        // or horizontally, so more like a flock of birds changing direction
        'direction'             : 'vertical',
        // Sometimes there is just one image on the last row and it gets blown up to a huge size to fit the
        // parent div width. To stop this behaviour, set this to true
        'allowPartialLastRow'   : false
    };

})( jQuery );

/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // depricating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);
/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.jplayer.org
 *
 * Copyright (c) 2009 - 2014 Happyworm Ltd
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Author: Mark J Panaghiston
 * Version: 2.9.2
 * Date: 14th December 2014
 */

/* Support for Zepto 1.0 compiled with optional data module.
 * For AMD or NODE/CommonJS support, you will need to manually switch the related 2 lines in the code below.
 * Search terms: "jQuery Switch" and "Zepto Switch"
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory); // jQuery Switch
    // define(['zepto'], factory); // Zepto Switch
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery')); // jQuery Switch
    //factory(require('zepto')); // Zepto Switch
  } else {
    // Browser globals
    if(root.jQuery) { // Use jQuery if available
      factory(root.jQuery);
    } else { // Otherwise, use Zepto
      factory(root.Zepto);
    }
  }
}(this, function ($, undefined) {

  // Adapted from jquery.ui.widget.js (1.8.7): $.widget.bridge - Tweaked $.data(this,XYZ) to $(this).data(XYZ) for Zepto
  $.fn.jPlayer = function( options ) {
    var name = "jPlayer";
    var isMethodCall = typeof options === "string",
      args = Array.prototype.slice.call( arguments, 1 ),
      returnValue = this;

    // allow multiple hashes to be passed on init
    options = !isMethodCall && args.length ?
      $.extend.apply( null, [ true, options ].concat(args) ) :
      options;

    // prevent calls to internal methods
    if ( isMethodCall && options.charAt( 0 ) === "_" ) {
      return returnValue;
    }

    if ( isMethodCall ) {
      this.each(function() {
        var instance = $(this).data( name ),
          methodValue = instance && $.isFunction( instance[options] ) ?
            instance[ options ].apply( instance, args ) :
            instance;
        if ( methodValue !== instance && methodValue !== undefined ) {
          returnValue = methodValue;
          return false;
        }
      });
    } else {
      this.each(function() {
        var instance = $(this).data( name );
        if ( instance ) {
          // instance.option( options || {} )._init(); // Orig jquery.ui.widget.js code: Not recommend for jPlayer. ie., Applying new options to an existing instance (via the jPlayer constructor) and performing the _init(). The _init() is what concerns me. It would leave a lot of event handlers acting on jPlayer instance and the interface.
          instance.option( options || {} ); // The new constructor only changes the options. Changing options only has basic support atm.
        } else {
          $(this).data( name, new $.jPlayer( options, this ) );
        }
      });
    }

    return returnValue;
  };

  $.jPlayer = function( options, element ) {
    // allow instantiation without initializing for simple inheritance
    if ( arguments.length ) {
      this.element = $(element);
      this.options = $.extend(true, {},
        this.options,
        options
      );
      var self = this;
      this.element.bind( "remove.jPlayer", function() {
        self.destroy();
      });
      this._init();
    }
  };
  // End of: (Adapted from jquery.ui.widget.js (1.8.7))

  // Zepto is missing one of the animation methods.
  if(typeof $.fn.stop !== 'function') {
    $.fn.stop = function() {};
  }

  // Emulated HTML5 methods and properties
  $.jPlayer.emulateMethods = "load play pause";
  $.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
  $.jPlayer.emulateOptions = "muted volume";

  // Reserved event names generated by jPlayer that are not part of the HTML5 Media element spec
  $.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";

  // Events generated by jPlayer
  $.jPlayer.event = {};
  $.each(
    [
      'ready',
      'setmedia', // Fires when the media is set
      'flashreset', // Similar to the ready event if the Flash solution is set to display:none and then shown again or if it's reloaded for another reason by the browser. For example, using CSS position:fixed on Firefox for the full screen feature.
      'resize', // Occurs when the size changes through a full/restore screen operation or if the size/sizeFull options are changed.
      'repeat', // Occurs when the repeat status changes. Usually through clicks on the repeat button of the interface.
      'click', // Occurs when the user clicks on one of the following: poster image, html video, flash video.
      'error', // Event error code in event.jPlayer.error.type. See $.jPlayer.error
      'warning', // Event warning code in event.jPlayer.warning.type. See $.jPlayer.warning

      // Other events match HTML5 spec.
      'loadstart',
      'progress',
      'suspend',
      'abort',
      'emptied',
      'stalled',
      'play',
      'pause',
      'loadedmetadata',
      'loadeddata',
      'waiting',
      'playing',
      'canplay',
      'canplaythrough',
      'seeking',
      'seeked',
      'timeupdate',
      'ended',
      'ratechange',
      'durationchange',
      'volumechange'
    ],
    function() {
      $.jPlayer.event[ this ] = 'jPlayer_' + this;
    }
  );

  $.jPlayer.htmlEvent = [ // These HTML events are bubbled through to the jPlayer event, without any internal action.
    "loadstart",
    // "progress", // jPlayer uses internally before bubbling.
    // "suspend", // jPlayer uses internally before bubbling.
    "abort",
    // "error", // jPlayer uses internally before bubbling.
    "emptied",
    "stalled",
    // "play", // jPlayer uses internally before bubbling.
    // "pause", // jPlayer uses internally before bubbling.
    "loadedmetadata",
    // "loadeddata", // jPlayer uses internally before bubbling.
    // "waiting", // jPlayer uses internally before bubbling.
    // "playing", // jPlayer uses internally before bubbling.
    "canplay",
    "canplaythrough"
    // "seeking", // jPlayer uses internally before bubbling.
    // "seeked", // jPlayer uses internally before bubbling.
    // "timeupdate", // jPlayer uses internally before bubbling.
    // "ended", // jPlayer uses internally before bubbling.
    // "ratechange" // jPlayer uses internally before bubbling.
    // "durationchange" // jPlayer uses internally before bubbling.
    // "volumechange" // jPlayer uses internally before bubbling.
  ];

  $.jPlayer.pause = function() {
    $.jPlayer.prototype.destroyRemoved();
    $.each($.jPlayer.prototype.instances, function(i, element) {
      if(element.data("jPlayer").status.srcSet) { // Check that media is set otherwise would cause error event.
        element.jPlayer("pause");
      }
    });
  };

  // Default for jPlayer option.timeFormat
  $.jPlayer.timeFormat = {
    showHour: false,
    showMin: true,
    showSec: true,
    padHour: false,
    padMin: true,
    padSec: true,
    sepHour: ":",
    sepMin: ":",
    sepSec: ""
  };
  var ConvertTime = function() {
    this.init();
  };
  ConvertTime.prototype = {
    init: function() {
      this.options = {
        timeFormat: $.jPlayer.timeFormat
      };
    },
    time: function(s) { // function used on jPlayer.prototype._convertTime to enable per instance options.
      s = (s && typeof s === 'number') ? s : 0;

      var myTime = new Date(s * 1000),
        hour = myTime.getUTCHours(),
        min = this.options.timeFormat.showHour ? myTime.getUTCMinutes() : myTime.getUTCMinutes() + hour * 60,
        sec = this.options.timeFormat.showMin ? myTime.getUTCSeconds() : myTime.getUTCSeconds() + min * 60,
        strHour = (this.options.timeFormat.padHour && hour < 10) ? "0" + hour : hour,
        strMin = (this.options.timeFormat.padMin && min < 10) ? "0" + min : min,
        strSec = (this.options.timeFormat.padSec && sec < 10) ? "0" + sec : sec,
        strTime = "";

      strTime += this.options.timeFormat.showHour ? strHour + this.options.timeFormat.sepHour : "";
      strTime += this.options.timeFormat.showMin ? strMin + this.options.timeFormat.sepMin : "";
      strTime += this.options.timeFormat.showSec ? strSec + this.options.timeFormat.sepSec : "";

      return strTime;
    }
  };
  var myConvertTime = new ConvertTime();
  $.jPlayer.convertTime = function(s) {
    return myConvertTime.time(s);
  };

  // Adapting jQuery 1.4.4 code for jQuery.browser. Required since jQuery 1.3.2 does not detect Chrome as webkit.
  $.jPlayer.uaBrowser = function( userAgent ) {
    var ua = userAgent.toLowerCase();

    // Useragent RegExp
    var rwebkit = /(webkit)[ \/]([\w.]+)/;
    var ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var rmsie = /(msie) ([\w.]+)/;
    var rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

    var match = rwebkit.exec( ua ) ||
      ropera.exec( ua ) ||
      rmsie.exec( ua ) ||
      ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
      [];

    return { browser: match[1] || "", version: match[2] || "0" };
  };

  // Platform sniffer for detecting mobile devices
  $.jPlayer.uaPlatform = function( userAgent ) {
    var ua = userAgent.toLowerCase();

    // Useragent RegExp
    var rplatform = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
    var rtablet = /(ipad|playbook)/;
    var randroid = /(android)/;
    var rmobile = /(mobile)/;

    var platform = rplatform.exec( ua ) || [];
    var tablet = rtablet.exec( ua ) ||
      !rmobile.exec( ua ) && randroid.exec( ua ) ||
      [];

    if(platform[1]) {
      platform[1] = platform[1].replace(/\s/g, "_"); // Change whitespace to underscore. Enables dot notation.
    }

    return { platform: platform[1] || "", tablet: tablet[1] || "" };
  };

  $.jPlayer.browser = {
  };
  $.jPlayer.platform = {
  };

  var browserMatch = $.jPlayer.uaBrowser(navigator.userAgent);
  if ( browserMatch.browser ) {
    $.jPlayer.browser[ browserMatch.browser ] = true;
    $.jPlayer.browser.version = browserMatch.version;
  }
  var platformMatch = $.jPlayer.uaPlatform(navigator.userAgent);
  if ( platformMatch.platform ) {
    $.jPlayer.platform[ platformMatch.platform ] = true;
    $.jPlayer.platform.mobile = !platformMatch.tablet;
    $.jPlayer.platform.tablet = !!platformMatch.tablet;
  }

  // Internet Explorer (IE) Browser Document Mode Sniffer. Based on code at:
  // http://msdn.microsoft.com/en-us/library/cc288325%28v=vs.85%29.aspx#GetMode
  $.jPlayer.getDocMode = function() {
    var docMode;
    if ($.jPlayer.browser.msie) {
      if (document.documentMode) { // IE8 or later
        docMode = document.documentMode;
      } else { // IE 5-7
        docMode = 5; // Assume quirks mode unless proven otherwise
        if (document.compatMode) {
          if (document.compatMode === "CSS1Compat") {
            docMode = 7; // standards mode
          }
        }
      }
    }
    return docMode;
  };
  $.jPlayer.browser.documentMode = $.jPlayer.getDocMode();

  $.jPlayer.nativeFeatures = {
    init: function() {

      /* Fullscreen function naming influenced by W3C naming.
       * No support for: Mozilla Proposal: https://wiki.mozilla.org/Gecko:FullScreenAPI
       */

      var d = document,
        v = d.createElement('video'),
        spec = {
          // http://www.w3.org/TR/fullscreen/
          w3c: [
            'fullscreenEnabled',
            'fullscreenElement',
            'requestFullscreen',
            'exitFullscreen',
            'fullscreenchange',
            'fullscreenerror'
          ],
          // https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
          moz: [
            'mozFullScreenEnabled',
            'mozFullScreenElement',
            'mozRequestFullScreen',
            'mozCancelFullScreen',
            'mozfullscreenchange',
            'mozfullscreenerror'
          ],
          // http://developer.apple.com/library/safari/#documentation/WebKit/Reference/ElementClassRef/Element/Element.html
          // http://developer.apple.com/library/safari/#documentation/UserExperience/Reference/DocumentAdditionsReference/DocumentAdditions/DocumentAdditions.html
          webkit: [
            '',
            'webkitCurrentFullScreenElement',
            'webkitRequestFullScreen',
            'webkitCancelFullScreen',
            'webkitfullscreenchange',
            ''
          ],
          // http://developer.apple.com/library/safari/#documentation/AudioVideo/Reference/HTMLVideoElementClassReference/HTMLVideoElement/HTMLVideoElement.html
          // https://developer.apple.com/library/safari/samplecode/HTML5VideoEventFlow/Listings/events_js.html#//apple_ref/doc/uid/DTS40010085-events_js-DontLinkElementID_5
          // Events: 'webkitbeginfullscreen' and 'webkitendfullscreen'
          webkitVideo: [
            'webkitSupportsFullscreen',
            'webkitDisplayingFullscreen',
            'webkitEnterFullscreen',
            'webkitExitFullscreen',
            '',
            ''
          ],
          ms: [
            '',
            'msFullscreenElement',
            'msRequestFullscreen',
            'msExitFullscreen',
            'MSFullscreenChange',
            'MSFullscreenError'
          ]
        },
        specOrder = [
          'w3c',
          'moz',
          'webkit',
          'webkitVideo',
          'ms'
        ],
        fs, i, il;

      this.fullscreen = fs = {
        support: {
          w3c: !!d[spec.w3c[0]],
          moz: !!d[spec.moz[0]],
          webkit: typeof d[spec.webkit[3]] === 'function',
          webkitVideo: typeof v[spec.webkitVideo[2]] === 'function',
          ms: typeof v[spec.ms[2]] === 'function'
        },
        used: {}
      };

      // Store the name of the spec being used and as a handy boolean.
      for(i = 0, il = specOrder.length; i < il; i++) {
        var n = specOrder[i];
        if(fs.support[n]) {
          fs.spec = n;
          fs.used[n] = true;
          break;
        }
      }

      if(fs.spec) {
        var s = spec[fs.spec];
        fs.api = {
          fullscreenEnabled: true,
          fullscreenElement: function(elem) {
            elem = elem ? elem : d; // Video element required for webkitVideo
            return elem[s[1]];
          },
          requestFullscreen: function(elem) {
            return elem[s[2]](); // Chrome and Opera want parameter (Element.ALLOW_KEYBOARD_INPUT) but Safari fails if flag used.
          },
          exitFullscreen: function(elem) {
            elem = elem ? elem : d; // Video element required for webkitVideo
            return elem[s[3]]();
          }
        };
        fs.event = {
          fullscreenchange: s[4],
          fullscreenerror: s[5]
        };
      } else {
        fs.api = {
          fullscreenEnabled: false,
          fullscreenElement: function() {
            return null;
          },
          requestFullscreen: function() {},
          exitFullscreen: function() {}
        };
        fs.event = {};
      }
    }
  };
  $.jPlayer.nativeFeatures.init();

  // The keyboard control system.

  // The current jPlayer instance in focus.
  $.jPlayer.focus = null;

  // The list of element node names to ignore with key controls.
  $.jPlayer.keyIgnoreElementNames = "A INPUT TEXTAREA SELECT BUTTON";

  // The function that deals with key presses.
  var keyBindings = function(event) {
    var f = $.jPlayer.focus,
      ignoreKey;

    // A jPlayer instance must be in focus. ie., keyEnabled and the last one played.
    if(f) {
      // What generated the key press?
      $.each( $.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(i, name) {
        // The strings should already be uppercase.
        if(event.target.nodeName.toUpperCase() === name.toUpperCase()) {
          ignoreKey = true;
          return false; // exit each.
        }
      });
      if(!ignoreKey) {
        // See if the key pressed matches any of the bindings.
        $.each(f.options.keyBindings, function(action, binding) {
          // The binding could be a null when the default has been disabled. ie., 1st clause in if()
          if(
            (binding && $.isFunction(binding.fn)) &&
            ((typeof binding.key === 'number' && event.which === binding.key) ||
            (typeof binding.key === 'string' && event.key === binding.key))
          ) {
            event.preventDefault(); // Key being used by jPlayer, so prevent default operation.
            binding.fn(f);
            return false; // exit each.
          }
        });
      }
    }
  };

  $.jPlayer.keys = function(en) {
    var event = "keydown.jPlayer";
    // Remove any binding, just in case enabled more than once.
    $(document.documentElement).unbind(event);
    if(en) {
      $(document.documentElement).bind(event, keyBindings);
    }
  };

  // Enable the global key control handler ready for any jPlayer instance with the keyEnabled option enabled.
  $.jPlayer.keys(true);

  $.jPlayer.prototype = {
    count: 0, // Static Variable: Change it via prototype.
    version: { // Static Object
      script: "2.9.2",
      needFlash: "2.9.0",
      flash: "unknown"
    },
    options: { // Instanced in $.jPlayer() constructor
      swfPath: "js", // Path to jquery.jplayer.swf. Can be relative, absolute or server root relative.
      solution: "html, flash", // Valid solutions: html, flash, aurora. Order defines priority. 1st is highest,
      supplied: "mp3", // Defines which formats jPlayer will try and support and the priority by the order. 1st is highest,
      auroraFormats: "wav", // List the aurora.js codecs being loaded externally. Its core supports "wav". Specify format in jPlayer context. EG., The aac.js codec gives the "m4a" format.
      preload: 'metadata',  // HTML5 Spec values: none, metadata, auto.
      volume: 0.8, // The volume. Number 0 to 1.
      muted: false,
      remainingDuration: false, // When true, the remaining time is shown in the duration GUI element.
      toggleDuration: false, // When true, clicks on the duration toggle between the duration and remaining display.
      captureDuration: true, // When true, clicks on the duration are captured and no longer propagate up the DOM.
      playbackRate: 1,
      defaultPlaybackRate: 1,
      minPlaybackRate: 0.5,
      maxPlaybackRate: 4,
      wmode: "opaque", // Valid wmode: window, transparent, opaque, direct, gpu. 
      backgroundColor: "#000000", // To define the jPlayer div and Flash background color.
      cssSelectorAncestor: "#jp_container_1",
      cssSelector: { // * denotes properties that should only be required when video media type required. _cssSelector() would require changes to enable splitting these into Audio and Video defaults.
        videoPlay: ".jp-video-play", // *
        play: ".jp-play",
        pause: ".jp-pause",
        stop: ".jp-stop",
        seekBar: ".jp-seek-bar",
        playBar: ".jp-play-bar",
        mute: ".jp-mute",
        unmute: ".jp-unmute",
        volumeBar: ".jp-volume-bar",
        volumeBarValue: ".jp-volume-bar-value",
        volumeMax: ".jp-volume-max",
        playbackRateBar: ".jp-playback-rate-bar",
        playbackRateBarValue: ".jp-playback-rate-bar-value",
        currentTime: ".jp-current-time",
        duration: ".jp-duration",
        title: ".jp-title",
        fullScreen: ".jp-full-screen", // *
        restoreScreen: ".jp-restore-screen", // *
        repeat: ".jp-repeat",
        repeatOff: ".jp-repeat-off",
        gui: ".jp-gui", // The interface used with autohide feature.
        noSolution: ".jp-no-solution" // For error feedback when jPlayer cannot find a solution.
      },
      stateClass: { // Classes added to the cssSelectorAncestor to indicate the state.
        playing: "jp-state-playing",
        seeking: "jp-state-seeking",
        muted: "jp-state-muted",
        looped: "jp-state-looped",
        fullScreen: "jp-state-full-screen",
        noVolume: "jp-state-no-volume"
      },
      useStateClassSkin: false, // A state class skin relies on the state classes to change the visual appearance. The single control toggles the effect, for example: play then pause, mute then unmute.
      autoBlur: true, // GUI control handlers will drop focus after clicks.
      smoothPlayBar: false, // Smooths the play bar transitions, which affects clicks and short media with big changes per second.
      fullScreen: false, // Native Full Screen
      fullWindow: false,
      autohide: {
        restored: false, // Controls the interface autohide feature.
        full: true, // Controls the interface autohide feature.
        fadeIn: 200, // Milliseconds. The period of the fadeIn anim.
        fadeOut: 600, // Milliseconds. The period of the fadeOut anim.
        hold: 1000 // Milliseconds. The period of the pause before autohide beings.
      },
      loop: false,
      repeat: function(event) { // The default jPlayer repeat event handler
        if(event.jPlayer.options.loop) {
          $(this).unbind(".jPlayerRepeat").bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
            $(this).jPlayer("play");
          });
        } else {
          $(this).unbind(".jPlayerRepeat");
        }
      },
      nativeVideoControls: {
        // Works well on standard browsers.
        // Phone and tablet browsers can have problems with the controls disappearing.
      },
      noFullWindow: {
        msie: /msie [0-6]\./,
        ipad: /ipad.*?os [0-4]\./,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android [0-3]\.(?!.*?mobile)/,
        android_phone: /(?=.*android)(?!.*chrome)(?=.*mobile)/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        iemobile: /iemobile/,
        webos: /webos/
      },
      noVolume: {
        ipad: /ipad/,
        iphone: /iphone/,
        ipod: /ipod/,
        android_pad: /android(?!.*?mobile)/,
        android_phone: /android.*?mobile/,
        blackberry: /blackberry/,
        windows_ce: /windows ce/,
        iemobile: /iemobile/,
        webos: /webos/,
        playbook: /playbook/
      },
      timeFormat: {
        // Specific time format for this instance. The supported options are defined in $.jPlayer.timeFormat
        // For the undefined options we use the default from $.jPlayer.timeFormat
      },
      keyEnabled: false, // Enables keyboard controls.
      audioFullScreen: false, // Enables keyboard controls to enter full screen with audio media.
      keyBindings: { // The key control object, defining the key codes and the functions to execute.
        // The parameter, f = $.jPlayer.focus, will be checked truethy before attempting to call any of these functions.
        // Properties may be added to this object, in key/fn pairs, to enable other key controls. EG, for the playlist add-on.
        play: {
          key: 80, // p
          fn: function(f) {
            if(f.status.paused) {
              f.play();
            } else {
              f.pause();
            }
          }
        },
        fullScreen: {
          key: 70, // f
          fn: function(f) {
            if(f.status.video || f.options.audioFullScreen) {
              f._setOption("fullScreen", !f.options.fullScreen);
            }
          }
        },
        muted: {
          key: 77, // m
          fn: function(f) {
            f._muted(!f.options.muted);
          }
        },
        volumeUp: {
          key: 190, // .
          fn: function(f) {
            f.volume(f.options.volume + 0.1);
          }
        },
        volumeDown: {
          key: 188, // ,
          fn: function(f) {
            f.volume(f.options.volume - 0.1);
          }
        },
        loop: {
          key: 76, // l
          fn: function(f) {
            f._loop(!f.options.loop);
          }
        }
      },
      verticalVolume: false, // Calculate volume from the bottom of the volume bar. Default is from the left. Also volume affects either width or height.
      verticalPlaybackRate: false,
      globalVolume: false, // Set to make volume and muted changes affect all jPlayer instances with this option enabled
      idPrefix: "jp", // Prefix for the ids of html elements created by jPlayer. For flash, this must not include characters: . - + * / \
      noConflict: "jQuery",
      emulateHtml: false, // Emulates the HTML5 Media element on the jPlayer element.
      consoleAlerts: true, // Alerts are sent to the console.log() instead of alert().
      errorAlerts: false,
      warningAlerts: false
    },
    optionsAudio: {
      size: {
        width: "0px",
        height: "0px",
        cssClass: ""
      },
      sizeFull: {
        width: "0px",
        height: "0px",
        cssClass: ""
      }
    },
    optionsVideo: {
      size: {
        width: "480px",
        height: "270px",
        cssClass: "jp-video-270p"
      },
      sizeFull: {
        width: "100%",
        height: "100%",
        cssClass: "jp-video-full"
      }
    },
    instances: {}, // Static Object
    status: { // Instanced in _init()
      src: "",
      media: {},
      paused: true,
      format: {},
      formatType: "",
      waitForPlay: true, // Same as waitForLoad except in case where preloading.
      waitForLoad: true,
      srcSet: false,
      video: false, // True if playing a video
      seekPercent: 0,
      currentPercentRelative: 0,
      currentPercentAbsolute: 0,
      currentTime: 0,
      duration: 0,
      remaining: 0,
      videoWidth: 0, // Intrinsic width of the video in pixels.
      videoHeight: 0, // Intrinsic height of the video in pixels.
      readyState: 0,
      networkState: 0,
      playbackRate: 1, // Warning - Now both an option and a status property
      ended: 0

/*    Persistant status properties created dynamically at _init():
      width
      height
      cssClass
      nativeVideoControls
      noFullWindow
      noVolume
      playbackRateEnabled // Warning - Technically, we can have both Flash and HTML, so this might not be correct if the Flash is active. That is a niche case.
*/
    },

    internal: { // Instanced in _init()
      ready: false
      // instance: undefined
      // domNode: undefined
      // htmlDlyCmdId: undefined
      // autohideId: undefined
      // mouse: undefined
      // cmdsIgnored
    },
    solution: { // Static Object: Defines the solutions built in jPlayer.
      html: true,
      aurora: true,
      flash: true
    },
    // 'MPEG-4 support' : canPlayType('video/mp4; codecs="mp4v.20.8"')
    format: { // Static Object
      mp3: {
        codec: 'audio/mpeg',
        flashCanPlay: true,
        media: 'audio'
      },
      m4a: { // AAC / MP4
        codec: 'audio/mp4; codecs="mp4a.40.2"',
        flashCanPlay: true,
        media: 'audio'
      },
      m3u8a: { // AAC / MP4 / Apple HLS
        codec: 'application/vnd.apple.mpegurl; codecs="mp4a.40.2"',
        flashCanPlay: false,
        media: 'audio'
      },
      m3ua: { // M3U
        codec: 'audio/mpegurl',
        flashCanPlay: false,
        media: 'audio'
      },
      oga: { // OGG
        codec: 'audio/ogg; codecs="vorbis, opus"',
        flashCanPlay: false,
        media: 'audio'
      },
      flac: { // FLAC
        codec: 'audio/x-flac',
        flashCanPlay: false,
        media: 'audio'
      },
      wav: { // PCM
        codec: 'audio/wav; codecs="1"',
        flashCanPlay: false,
        media: 'audio'
      },
      webma: { // WEBM
        codec: 'audio/webm; codecs="vorbis"',
        flashCanPlay: false,
        media: 'audio'
      },
      fla: { // FLV / F4A
        codec: 'audio/x-flv',
        flashCanPlay: true,
        media: 'audio'
      },
      rtmpa: { // RTMP AUDIO
        codec: 'audio/rtmp; codecs="rtmp"',
        flashCanPlay: true,
        media: 'audio'
      },
      m4v: { // H.264 / MP4
        codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        flashCanPlay: true,
        media: 'video'
      },
      m3u8v: { // H.264 / AAC / MP4 / Apple HLS
        codec: 'application/vnd.apple.mpegurl; codecs="avc1.42E01E, mp4a.40.2"',
        flashCanPlay: false,
        media: 'video'
      },
      m3uv: { // M3U
        codec: 'audio/mpegurl',
        flashCanPlay: false,
        media: 'video'
      },
      ogv: { // OGG
        codec: 'video/ogg; codecs="theora, vorbis"',
        flashCanPlay: false,
        media: 'video'
      },
      webmv: { // WEBM
        codec: 'video/webm; codecs="vorbis, vp8"',
        flashCanPlay: false,
        media: 'video'
      },
      flv: { // FLV / F4V
        codec: 'video/x-flv',
        flashCanPlay: true,
        media: 'video'
      },
      rtmpv: { // RTMP VIDEO
        codec: 'video/rtmp; codecs="rtmp"',
        flashCanPlay: true,
        media: 'video'
      }
    },
    _init: function() {
      var self = this;
      
      this.element.empty();
      
      this.status = $.extend({}, this.status); // Copy static to unique instance.
      this.internal = $.extend({}, this.internal); // Copy static to unique instance.

      // Initialize the time format
      this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat);

      // On iOS, assume commands will be ignored before user initiates them.
      this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod;

      this.internal.domNode = this.element.get(0);

      // Add key bindings focus to 1st jPlayer instanced with key control enabled.
      if(this.options.keyEnabled && !$.jPlayer.focus) {
        $.jPlayer.focus = this;
      }

      // A fix for Android where older (2.3) and even some 4.x devices fail to work when changing the *audio* SRC and then playing immediately.
      this.androidFix = {
        setMedia: false, // True when media set
        play: false, // True when a progress event will instruct the media to play
        pause: false, // True when a progress event will instruct the media to pause at a time.
        time: NaN // The play(time) parameter
      };
      if($.jPlayer.platform.android) {
        this.options.preload = this.options.preload !== 'auto' ? 'metadata' : 'auto'; // Default to metadata, but allow auto.
      }

      this.formats = []; // Array based on supplied string option. Order defines priority.
      this.solutions = []; // Array based on solution string option. Order defines priority.
      this.require = {}; // Which media types are required: video, audio.
      
      this.htmlElement = {}; // DOM elements created by jPlayer
      this.html = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
      this.html.audio = {};
      this.html.video = {};
      this.aurora = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
      this.aurora.formats = [];
      this.aurora.properties = [];
      this.flash = {}; // In _init()'s this.desired code and setmedia(): Accessed via this[solution], where solution from this.solutions array.
      
      this.css = {};
      this.css.cs = {}; // Holds the css selector strings
      this.css.jq = {}; // Holds jQuery selectors. ie., $(css.cs.method)

      this.ancestorJq = []; // Holds jQuery selector of cssSelectorAncestor. Init would use $() instead of [], but it is only 1.4+

      this.options.volume = this._limitValue(this.options.volume, 0, 1); // Limit volume value's bounds.

      // Create the formats array, with prority based on the order of the supplied formats string
      $.each(this.options.supplied.toLowerCase().split(","), function(index1, value1) {
        var format = value1.replace(/^\s+|\s+$/g, ""); //trim
        if(self.format[format]) { // Check format is valid.
          var dupFound = false;
          $.each(self.formats, function(index2, value2) { // Check for duplicates
            if(format === value2) {
              dupFound = true;
              return false;
            }
          });
          if(!dupFound) {
            self.formats.push(format);
          }
        }
      });

      // Create the solutions array, with prority based on the order of the solution string
      $.each(this.options.solution.toLowerCase().split(","), function(index1, value1) {
        var solution = value1.replace(/^\s+|\s+$/g, ""); //trim
        if(self.solution[solution]) { // Check solution is valid.
          var dupFound = false;
          $.each(self.solutions, function(index2, value2) { // Check for duplicates
            if(solution === value2) {
              dupFound = true;
              return false;
            }
          });
          if(!dupFound) {
            self.solutions.push(solution);
          }
        }
      });
        
      // Create Aurora.js formats array
      $.each(this.options.auroraFormats.toLowerCase().split(","), function(index1, value1) {
        var format = value1.replace(/^\s+|\s+$/g, ""); //trim
        if(self.format[format]) { // Check format is valid.
          var dupFound = false;
          $.each(self.aurora.formats, function(index2, value2) { // Check for duplicates
            if(format === value2) {
              dupFound = true;
              return false;
            }
          });
          if(!dupFound) {
            self.aurora.formats.push(format);
          }
        }
      });

      this.internal.instance = "jp_" + this.count;
      this.instances[this.internal.instance] = this.element;

      // Check the jPlayer div has an id and create one if required. Important for Flash to know the unique id for comms.
      if(!this.element.attr("id")) {
        this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
      }

      this.internal.self = $.extend({}, {
        id: this.element.attr("id"),
        jq: this.element
      });
      this.internal.audio = $.extend({}, {
        id: this.options.idPrefix + "_audio_" + this.count,
        jq: undefined
      });
      this.internal.video = $.extend({}, {
        id: this.options.idPrefix + "_video_" + this.count,
        jq: undefined
      });
      this.internal.flash = $.extend({}, {
        id: this.options.idPrefix + "_flash_" + this.count,
        jq: undefined,
        swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "jquery.jplayer.swf" : "")
      });
      this.internal.poster = $.extend({}, {
        id: this.options.idPrefix + "_poster_" + this.count,
        jq: undefined
      });

      // Register listeners defined in the constructor
      $.each($.jPlayer.event, function(eventName,eventType) {
        if(self.options[eventName] !== undefined) {
          self.element.bind(eventType + ".jPlayer", self.options[eventName]); // With .jPlayer namespace.
          self.options[eventName] = undefined; // Destroy the handler pointer copy on the options. Reason, events can be added/removed in other ways so this could be obsolete and misleading.
        }
      });

      // Determine if we require solutions for audio, video or both media types.
      this.require.audio = false;
      this.require.video = false;
      $.each(this.formats, function(priority, format) {
        self.require[self.format[format].media] = true;
      });

      // Now required types are known, finish the options default settings.
      if(this.require.video) {
        this.options = $.extend(true, {},
          this.optionsVideo,
          this.options
        );
      } else {
        this.options = $.extend(true, {},
          this.optionsAudio,
          this.options
        );
      }
      this._setSize(); // update status and jPlayer element size

      // Determine the status for Blocklisted options.
      this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
      this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
      this.status.noVolume = this._uaBlocklist(this.options.noVolume);

      // Create event handlers if native fullscreen is supported
      if($.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled) {
        this._fullscreenAddEventListeners();
      }

      // The native controls are only for video and are disabled when audio is also used.
      this._restrictNativeVideoControls();

      // Create the poster image.
      this.htmlElement.poster = document.createElement('img');
      this.htmlElement.poster.id = this.internal.poster.id;
      this.htmlElement.poster.onload = function() { // Note that this did not work on Firefox 3.6: poster.addEventListener("onload", function() {}, false); Did not investigate x-browser.
        if(!self.status.video || self.status.waitForPlay) {
          self.internal.poster.jq.show();
        }
      };
      this.element.append(this.htmlElement.poster);
      this.internal.poster.jq = $("#" + this.internal.poster.id);
      this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});
      this.internal.poster.jq.hide();
      this.internal.poster.jq.bind("click.jPlayer", function() {
        self._trigger($.jPlayer.event.click);
      });
      
      // Generate the required media elements
      this.html.audio.available = false;
      if(this.require.audio) { // If a supplied format is audio
        this.htmlElement.audio = document.createElement('audio');
        this.htmlElement.audio.id = this.internal.audio.id;
        this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio); // Test is for IE9 on Win Server 2008.
      }
      this.html.video.available = false;
      if(this.require.video) { // If a supplied format is video
        this.htmlElement.video = document.createElement('video');
        this.htmlElement.video.id = this.internal.video.id;
        this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video); // Test is for IE9 on Win Server 2008.
      }

      this.flash.available = this._checkForFlash(10.1);

      this.html.canPlay = {};
      this.aurora.canPlay = {};
      this.flash.canPlay = {};
      $.each(this.formats, function(priority, format) {
        self.html.canPlay[format] = self.html[self.format[format].media].available && "" !== self.htmlElement[self.format[format].media].canPlayType(self.format[format].codec);
        self.aurora.canPlay[format] = ($.inArray(format, self.aurora.formats) > -1);
        self.flash.canPlay[format] = self.format[format].flashCanPlay && self.flash.available;
      });
      this.html.desired = false;
      this.aurora.desired = false;
      this.flash.desired = false;
      $.each(this.solutions, function(solutionPriority, solution) {
        if(solutionPriority === 0) {
          self[solution].desired = true;
        } else {
          var audioCanPlay = false;
          var videoCanPlay = false;
          $.each(self.formats, function(formatPriority, format) {
            if(self[self.solutions[0]].canPlay[format]) { // The other solution can play
              if(self.format[format].media === 'video') {
                videoCanPlay = true;
              } else {
                audioCanPlay = true;
              }
            }
          });
          self[solution].desired = (self.require.audio && !audioCanPlay) || (self.require.video && !videoCanPlay);
        }
      });
      // This is what jPlayer will support, based on solution and supplied.
      this.html.support = {};
      this.aurora.support = {};
      this.flash.support = {};
      $.each(this.formats, function(priority, format) {
        self.html.support[format] = self.html.canPlay[format] && self.html.desired;
        self.aurora.support[format] = self.aurora.canPlay[format] && self.aurora.desired;
        self.flash.support[format] = self.flash.canPlay[format] && self.flash.desired;
      });
      // If jPlayer is supporting any format in a solution, then the solution is used.
      this.html.used = false;
      this.aurora.used = false;
      this.flash.used = false;
      $.each(this.solutions, function(solutionPriority, solution) {
        $.each(self.formats, function(formatPriority, format) {
          if(self[solution].support[format]) {
            self[solution].used = true;
            return false;
          }
        });
      });

      // Init solution active state and the event gates to false.
      this._resetActive();
      this._resetGate();

      // Set up the css selectors for the control and feedback entities.
      this._cssSelectorAncestor(this.options.cssSelectorAncestor);
      
      // If neither html nor aurora nor flash are being used by this browser, then media playback is not possible. Trigger an error event.
      if(!(this.html.used || this.aurora.used || this.flash.used)) {
        this._error( {
          type: $.jPlayer.error.NO_SOLUTION, 
          context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
          message: $.jPlayer.errorMsg.NO_SOLUTION,
          hint: $.jPlayer.errorHint.NO_SOLUTION
        });
        if(this.css.jq.noSolution.length) {
          this.css.jq.noSolution.show();
        }
      } else {
        if(this.css.jq.noSolution.length) {
          this.css.jq.noSolution.hide();
        }
      }

      // Add the flash solution if it is being used.
      if(this.flash.used) {
        var htmlObj,
        flashVars = 'jQuery=' + encodeURI(this.options.noConflict) + '&id=' + encodeURI(this.internal.self.id) + '&vol=' + this.options.volume + '&muted=' + this.options.muted;

        // Code influenced by SWFObject 2.2: http://code.google.com/p/swfobject/
        // Non IE browsers have an initial Flash size of 1 by 1 otherwise the wmode affected the Flash ready event. 

        if($.jPlayer.browser.msie && (Number($.jPlayer.browser.version) < 9 || $.jPlayer.browser.documentMode < 9)) {
          var objStr = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>';

          var paramStr = [
            '<param name="movie" value="' + this.internal.flash.swf + '" />',
            '<param name="FlashVars" value="' + flashVars + '" />',
            '<param name="allowScriptAccess" value="always" />',
            '<param name="bgcolor" value="' + this.options.backgroundColor + '" />',
            '<param name="wmode" value="' + this.options.wmode + '" />'
          ];

          htmlObj = document.createElement(objStr);
          for(var i=0; i < paramStr.length; i++) {
            htmlObj.appendChild(document.createElement(paramStr[i]));
          }
        } else {
          var createParam = function(el, n, v) {
            var p = document.createElement("param");
            p.setAttribute("name", n);  
            p.setAttribute("value", v);
            el.appendChild(p);
          };

          htmlObj = document.createElement("object");
          htmlObj.setAttribute("id", this.internal.flash.id);
          htmlObj.setAttribute("name", this.internal.flash.id);
          htmlObj.setAttribute("data", this.internal.flash.swf);
          htmlObj.setAttribute("type", "application/x-shockwave-flash");
          htmlObj.setAttribute("width", "1"); // Non-zero
          htmlObj.setAttribute("height", "1"); // Non-zero
          htmlObj.setAttribute("tabindex", "-1");
          createParam(htmlObj, "flashvars", flashVars);
          createParam(htmlObj, "allowscriptaccess", "always");
          createParam(htmlObj, "bgcolor", this.options.backgroundColor);
          createParam(htmlObj, "wmode", this.options.wmode);
        }

        this.element.append(htmlObj);
        this.internal.flash.jq = $(htmlObj);
      }

      // Setup playbackRate ability before using _addHtmlEventListeners()
      if(this.html.used && !this.flash.used) { // If only HTML
        // Using the audio element capabilities for playbackRate. ie., Assuming video element is the same.
        this.status.playbackRateEnabled = this._testPlaybackRate('audio');
      } else {
        this.status.playbackRateEnabled = false;
      }

      this._updatePlaybackRate();

      // Add the HTML solution if being used.
      if(this.html.used) {

        // The HTML Audio handlers
        if(this.html.audio.available) {
          this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
          this.element.append(this.htmlElement.audio);
          this.internal.audio.jq = $("#" + this.internal.audio.id);
        }

        // The HTML Video handlers
        if(this.html.video.available) {
          this._addHtmlEventListeners(this.htmlElement.video, this.html.video);
          this.element.append(this.htmlElement.video);
          this.internal.video.jq = $("#" + this.internal.video.id);
          if(this.status.nativeVideoControls) {
            this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
          } else {
            this.internal.video.jq.css({'width':'0px', 'height':'0px'}); // Using size 0x0 since a .hide() causes issues in iOS
          }
          this.internal.video.jq.bind("click.jPlayer", function() {
            self._trigger($.jPlayer.event.click);
          });
        }
      }
      
      // Add the Aurora.js solution if being used.
      if(this.aurora.used) {
        // Aurora.js player need to be created for each media, see setMedia function.
      }

      // Create the bridge that emulates the HTML Media element on the jPlayer DIV
      if( this.options.emulateHtml ) {
        this._emulateHtmlBridge();
      }

      if((this.html.used || this.aurora.used) && !this.flash.used) { // If only HTML, then emulate flash ready() call after 100ms.
        setTimeout( function() {
          self.internal.ready = true;
          self.version.flash = "n/a";
          self._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
          self._trigger($.jPlayer.event.ready);
        }, 100);
      }

      // Initialize the interface components with the options.
      this._updateNativeVideoControls();
      // The other controls are now setup in _cssSelectorAncestor()
      if(this.css.jq.videoPlay.length) {
        this.css.jq.videoPlay.hide();
      }

      $.jPlayer.prototype.count++; // Change static variable via prototype.
    },
    destroy: function() {
      // MJP: The background change remains. Would need to store the original to restore it correctly.
      // MJP: The jPlayer element's size change remains.

      // Clear the media to reset the GUI and stop any downloads. Streams on some browsers had persited. (Chrome)
      this.clearMedia();
      // Remove the size/sizeFull cssClass from the cssSelectorAncestor
      this._removeUiClass();
      // Remove the times from the GUI
      if(this.css.jq.currentTime.length) {
        this.css.jq.currentTime.text("");
      }
      if(this.css.jq.duration.length) {
        this.css.jq.duration.text("");
      }
      // Remove any bindings from the interface controls.
      $.each(this.css.jq, function(fn, jq) {
        // Check selector is valid before trying to execute method.
        if(jq.length) {
          jq.unbind(".jPlayer");
        }
      });
      // Remove the click handlers for $.jPlayer.event.click
      this.internal.poster.jq.unbind(".jPlayer");
      if(this.internal.video.jq) {
        this.internal.video.jq.unbind(".jPlayer");
      }
      // Remove the fullscreen event handlers
      this._fullscreenRemoveEventListeners();
      // Remove key bindings
      if(this === $.jPlayer.focus) {
        $.jPlayer.focus = null;
      }
      // Destroy the HTML bridge.
      if(this.options.emulateHtml) {
        this._destroyHtmlBridge();
      }
      this.element.removeData("jPlayer"); // Remove jPlayer data
      this.element.unbind(".jPlayer"); // Remove all event handlers created by the jPlayer constructor
      this.element.empty(); // Remove the inserted child elements
      
      delete this.instances[this.internal.instance]; // Clear the instance on the static instance object
    },
    destroyRemoved: function() { // Destroy any instances that have gone away.
      var self = this;
      $.each(this.instances, function(i, element) {
        if(self.element !== element) { // Do not destroy this instance.
          if(!element.data("jPlayer")) { // Check that element is a real jPlayer.
            element.jPlayer("destroy");
            delete self.instances[i];
          }
        }
      });
    },
    enable: function() { // Plan to implement
      // options.disabled = false
    },
    disable: function () { // Plan to implement
      // options.disabled = true
    },
    _testCanPlayType: function(elem) {
      // IE9 on Win Server 2008 did not implement canPlayType(), but it has the property.
      try {
        elem.canPlayType(this.format.mp3.codec); // The type is irrelevant.
        return true;
      } catch(err) {
        return false;
      }
    },
    _testPlaybackRate: function(type) {
      // type: String 'audio' or 'video'
      var el, rate = 0.5;
      type = typeof type === 'string' ? type : 'audio';
      el = document.createElement(type);
      // Wrapping in a try/catch, just in case older HTML5 browsers throw and error.
      try {
        if('playbackRate' in el) {
          el.playbackRate = rate;
          return el.playbackRate === rate;
        } else {
          return false;
        }
      } catch(err) {
        return false;
      }
    },
    _uaBlocklist: function(list) {
      // list : object with properties that are all regular expressions. Property names are irrelevant.
      // Returns true if the user agent is matched in list.
      var ua = navigator.userAgent.toLowerCase(),
        block = false;

      $.each(list, function(p, re) {
        if(re && re.test(ua)) {
          block = true;
          return false; // exit $.each.
        }
      });
      return block;
    },
    _restrictNativeVideoControls: function() {
      // Fallback to noFullWindow when nativeVideoControls is true and audio media is being used. Affects when both media types are used.
      if(this.require.audio) {
        if(this.status.nativeVideoControls) {
          this.status.nativeVideoControls = false;
          this.status.noFullWindow = true;
        }
      }
    },
    _updateNativeVideoControls: function() {
      if(this.html.video.available && this.html.used) {
        // Turn the HTML Video controls on/off
        this.htmlElement.video.controls = this.status.nativeVideoControls;
        // Show/hide the jPlayer GUI.
        this._updateAutohide();
        // For when option changed. The poster image is not updated, as it is dealt with in setMedia(). Acceptable degradation since seriously doubt these options will change on the fly. Can again review later.
        if(this.status.nativeVideoControls && this.require.video) {
          this.internal.poster.jq.hide();
          this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
        } else if(this.status.waitForPlay && this.status.video) {
          this.internal.poster.jq.show();
          this.internal.video.jq.css({'width': '0px', 'height': '0px'});
        }
      }
    },
    _addHtmlEventListeners: function(mediaElement, entity) {
      var self = this;
      mediaElement.preload = this.options.preload;
      mediaElement.muted = this.options.muted;
      mediaElement.volume = this.options.volume;

      if(this.status.playbackRateEnabled) {
        mediaElement.defaultPlaybackRate = this.options.defaultPlaybackRate;
        mediaElement.playbackRate = this.options.playbackRate;
      }

      // Create the event listeners
      // Only want the active entity to affect jPlayer and bubble events.
      // Using entity.gate so that object is referenced and gate property always current
      
      mediaElement.addEventListener("progress", function() {
        if(entity.gate) {
          if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
            self.internal.cmdsIgnored = false;
          }
          self._getHtmlStatus(mediaElement);
          self._updateInterface();
          self._trigger($.jPlayer.event.progress);
        }
      }, false);
      mediaElement.addEventListener("loadeddata", function() {
        if(entity.gate) {
          self.androidFix.setMedia = false; // Disable the fix after the first progress event.
          if(self.androidFix.play) { // Play Android audio - performing the fix.
            self.androidFix.play = false;
            self.play(self.androidFix.time);
          }
          if(self.androidFix.pause) { // Pause Android audio at time - performing the fix.
            self.androidFix.pause = false;
            self.pause(self.androidFix.time);
          }
          self._trigger($.jPlayer.event.loadeddata);
        }
      }, false);
      mediaElement.addEventListener("timeupdate", function() {
        if(entity.gate) {
          self._getHtmlStatus(mediaElement);
          self._updateInterface();
          self._trigger($.jPlayer.event.timeupdate);
        }
      }, false);
      mediaElement.addEventListener("durationchange", function() {
        if(entity.gate) {
          self._getHtmlStatus(mediaElement);
          self._updateInterface();
          self._trigger($.jPlayer.event.durationchange);
        }
      }, false);
      mediaElement.addEventListener("play", function() {
        if(entity.gate) {
          self._updateButtons(true);
          self._html_checkWaitForPlay(); // So the native controls update this variable and puts the hidden interface in the correct state. Affects toggling native controls.
          self._trigger($.jPlayer.event.play);
        }
      }, false);
      mediaElement.addEventListener("playing", function() {
        if(entity.gate) {
          self._updateButtons(true);
          self._seeked();
          self._trigger($.jPlayer.event.playing);
        }
      }, false);
      mediaElement.addEventListener("pause", function() {
        if(entity.gate) {
          self._updateButtons(false);
          self._trigger($.jPlayer.event.pause);
        }
      }, false);
      mediaElement.addEventListener("waiting", function() {
        if(entity.gate) {
          self._seeking();
          self._trigger($.jPlayer.event.waiting);
        }
      }, false);
      mediaElement.addEventListener("seeking", function() {
        if(entity.gate) {
          self._seeking();
          self._trigger($.jPlayer.event.seeking);
        }
      }, false);
      mediaElement.addEventListener("seeked", function() {
        if(entity.gate) {
          self._seeked();
          self._trigger($.jPlayer.event.seeked);
        }
      }, false);
      mediaElement.addEventListener("volumechange", function() {
        if(entity.gate) {
          // Read the values back from the element as the Blackberry PlayBook shares the volume with the physical buttons master volume control.
          // However, when tested 6th July 2011, those buttons do not generate an event. The physical play/pause button does though.
          self.options.volume = mediaElement.volume;
          self.options.muted = mediaElement.muted;
          self._updateMute();
          self._updateVolume();
          self._trigger($.jPlayer.event.volumechange);
        }
      }, false);
      mediaElement.addEventListener("ratechange", function() {
        if(entity.gate) {
          self.options.defaultPlaybackRate = mediaElement.defaultPlaybackRate;
          self.options.playbackRate = mediaElement.playbackRate;
          self._updatePlaybackRate();
          self._trigger($.jPlayer.event.ratechange);
        }
      }, false);
      mediaElement.addEventListener("suspend", function() { // Seems to be the only way of capturing that the iOS4 browser did not actually play the media from the page code. ie., It needs a user gesture.
        if(entity.gate) {
          self._seeked();
          self._trigger($.jPlayer.event.suspend);
        }
      }, false);
      mediaElement.addEventListener("ended", function() {
        if(entity.gate) {
          // Order of the next few commands are important. Change the time and then pause.
          // Solves a bug in Firefox, where issuing pause 1st causes the media to play from the start. ie., The pause is ignored.
          if(!$.jPlayer.browser.webkit) { // Chrome crashes if you do this in conjunction with a setMedia command in an ended event handler. ie., The playlist demo.
            self.htmlElement.media.currentTime = 0; // Safari does not care about this command. ie., It works with or without this line. (Both Safari and Chrome are Webkit.)
          }
          self.htmlElement.media.pause(); // Pause otherwise a click on the progress bar will play from that point, when it shouldn't, since it stopped playback.
          self._updateButtons(false);
          self._getHtmlStatus(mediaElement, true); // With override true. Otherwise Chrome leaves progress at full.
          self._updateInterface();
          self._trigger($.jPlayer.event.ended);
        }
      }, false);
      mediaElement.addEventListener("error", function() {
        if(entity.gate) {
          self._updateButtons(false);
          self._seeked();
          if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
            clearTimeout(self.internal.htmlDlyCmdId); // Clears any delayed commands used in the HTML solution.
            self.status.waitForLoad = true; // Allows the load operation to try again.
            self.status.waitForPlay = true; // Reset since a play was captured.
            if(self.status.video && !self.status.nativeVideoControls) {
              self.internal.video.jq.css({'width':'0px', 'height':'0px'});
            }
            if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
              self.internal.poster.jq.show();
            }
            if(self.css.jq.videoPlay.length) {
              self.css.jq.videoPlay.show();
            }
            self._error( {
              type: $.jPlayer.error.URL,
              context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
              message: $.jPlayer.errorMsg.URL,
              hint: $.jPlayer.errorHint.URL
            });
          }
        }
      }, false);
      // Create all the other event listeners that bubble up to a jPlayer event from html, without being used by jPlayer.
      $.each($.jPlayer.htmlEvent, function(i, eventType) {
        mediaElement.addEventListener(this, function() {
          if(entity.gate) {
            self._trigger($.jPlayer.event[eventType]);
          }
        }, false);
      });
    },
    _addAuroraEventListeners : function(player, entity) {
      var self = this;
      //player.preload = this.options.preload;
      //player.muted = this.options.muted;
      player.volume = this.options.volume * 100;

      // Create the event listeners
      // Only want the active entity to affect jPlayer and bubble events.
      // Using entity.gate so that object is referenced and gate property always current
      
      player.on("progress", function() {
        if(entity.gate) {
          if(self.internal.cmdsIgnored && this.readyState > 0) { // Detect iOS executed the command
            self.internal.cmdsIgnored = false;
          }
          self._getAuroraStatus(player);
          self._updateInterface();
          self._trigger($.jPlayer.event.progress);
          // Progress with song duration, we estimate timeupdate need to be triggered too.
          if (player.duration > 0) {
            self._trigger($.jPlayer.event.timeupdate);
          }
        }
      }, false);
      player.on("ready", function() {
        if(entity.gate) {
          self._trigger($.jPlayer.event.loadeddata);
        }
      }, false);
      player.on("duration", function() {
        if(entity.gate) {
          self._getAuroraStatus(player);
          self._updateInterface();
          self._trigger($.jPlayer.event.durationchange);
        }
      }, false);
      player.on("end", function() {
        if(entity.gate) {
          // Order of the next few commands are important. Change the time and then pause.
          self._updateButtons(false);
          self._getAuroraStatus(player, true);
          self._updateInterface();
          self._trigger($.jPlayer.event.ended);
        }
      }, false);
      player.on("error", function() {
        if(entity.gate) {
          self._updateButtons(false);
          self._seeked();
          if(self.status.srcSet) { // Deals with case of clearMedia() causing an error event.
            self.status.waitForLoad = true; // Allows the load operation to try again.
            self.status.waitForPlay = true; // Reset since a play was captured.
            if(self.status.video && !self.status.nativeVideoControls) {
              self.internal.video.jq.css({'width':'0px', 'height':'0px'});
            }
            if(self._validString(self.status.media.poster) && !self.status.nativeVideoControls) {
              self.internal.poster.jq.show();
            }
            if(self.css.jq.videoPlay.length) {
              self.css.jq.videoPlay.show();
            }
            self._error( {
              type: $.jPlayer.error.URL,
              context: self.status.src, // this.src shows absolute urls. Want context to show the url given.
              message: $.jPlayer.errorMsg.URL,
              hint: $.jPlayer.errorHint.URL
            });
          }
        }
      }, false);
    },
    _getHtmlStatus: function(media, override) {
      var ct = 0, cpa = 0, sp = 0, cpr = 0;

      // Fixes the duration bug in iOS, where the durationchange event occurs when media.duration is not always correct.
      // Fixes the initial duration bug in BB OS7, where the media.duration is infinity and displays as NaN:NaN due to Date() using inifity.
      if(isFinite(media.duration)) {
        this.status.duration = media.duration;
      }

      ct = media.currentTime;
      cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
      if((typeof media.seekable === "object") && (media.seekable.length > 0)) {
        sp = (this.status.duration > 0) ? 100 * media.seekable.end(media.seekable.length-1) / this.status.duration : 100;
        cpr = (this.status.duration > 0) ? 100 * media.currentTime / media.seekable.end(media.seekable.length-1) : 0; // Duration conditional for iOS duration bug. ie., seekable.end is a NaN in that case.
      } else {
        sp = 100;
        cpr = cpa;
      }
      
      if(override) {
        ct = 0;
        cpr = 0;
        cpa = 0;
      }

      this.status.seekPercent = sp;
      this.status.currentPercentRelative = cpr;
      this.status.currentPercentAbsolute = cpa;
      this.status.currentTime = ct;

      this.status.remaining = this.status.duration - this.status.currentTime;

      this.status.videoWidth = media.videoWidth;
      this.status.videoHeight = media.videoHeight;

      this.status.readyState = media.readyState;
      this.status.networkState = media.networkState;
      this.status.playbackRate = media.playbackRate;
      this.status.ended = media.ended;
    },
    _getAuroraStatus: function(player, override) {
      var ct = 0, cpa = 0, sp = 0, cpr = 0;

      this.status.duration = player.duration / 1000;

      ct = player.currentTime / 1000;
      cpa = (this.status.duration > 0) ? 100 * ct / this.status.duration : 0;
      if(player.buffered > 0) {
        sp = (this.status.duration > 0) ? (player.buffered * this.status.duration) / this.status.duration : 100;
        cpr = (this.status.duration > 0) ? ct / (player.buffered * this.status.duration) : 0;
      } else {
        sp = 100;
        cpr = cpa;
      }
      
      if(override) {
        ct = 0;
        cpr = 0;
        cpa = 0;
      }

      this.status.seekPercent = sp;
      this.status.currentPercentRelative = cpr;
      this.status.currentPercentAbsolute = cpa;
      this.status.currentTime = ct;

      this.status.remaining = this.status.duration - this.status.currentTime;

      this.status.readyState = 4; // status.readyState;
      this.status.networkState = 0; // status.networkState;
      this.status.playbackRate = 1; // status.playbackRate;
      this.status.ended = false; // status.ended;
    },
    _resetStatus: function() {
      this.status = $.extend({}, this.status, $.jPlayer.prototype.status); // Maintains the status properties that persist through a reset.
    },
    _trigger: function(eventType, error, warning) { // eventType always valid as called using $.jPlayer.event.eventType
      var event = $.Event(eventType);
      event.jPlayer = {};
      event.jPlayer.version = $.extend({}, this.version);
      event.jPlayer.options = $.extend(true, {}, this.options); // Deep copy
      event.jPlayer.status = $.extend(true, {}, this.status); // Deep copy
      event.jPlayer.html = $.extend(true, {}, this.html); // Deep copy
      event.jPlayer.aurora = $.extend(true, {}, this.aurora); // Deep copy
      event.jPlayer.flash = $.extend(true, {}, this.flash); // Deep copy
      if(error) {
        event.jPlayer.error = $.extend({}, error);
      }
      if(warning) {
        event.jPlayer.warning = $.extend({}, warning);
      }
      this.element.trigger(event);
    },
    jPlayerFlashEvent: function(eventType, status) { // Called from Flash
      if(eventType === $.jPlayer.event.ready) {
        if(!this.internal.ready) {
          this.internal.ready = true;
          this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Once Flash generates the ready event, minimise to zero as it is not affected by wmode anymore.

          this.version.flash = status.version;
          if(this.version.needFlash !== this.version.flash) {
            this._error( {
              type: $.jPlayer.error.VERSION,
              context: this.version.flash,
              message: $.jPlayer.errorMsg.VERSION + this.version.flash,
              hint: $.jPlayer.errorHint.VERSION
            });
          }
          this._trigger($.jPlayer.event.repeat); // Trigger the repeat event so its handler can initialize itself with the loop option.
          this._trigger(eventType);
        } else {
          // This condition occurs if the Flash is hidden and then shown again.
          // Firefox also reloads the Flash if the CSS position changes. position:fixed is used for full screen.

          // Only do this if the Flash is the solution being used at the moment. Affects Media players where both solution may be being used.
          if(this.flash.gate) {

            // Send the current status to the Flash now that it is ready (available) again.
            if(this.status.srcSet) {

              // Need to read original status before issuing the setMedia command.
              var currentTime = this.status.currentTime,
                paused = this.status.paused; 

              this.setMedia(this.status.media);
              this.volumeWorker(this.options.volume);
              if(currentTime > 0) {
                if(paused) {
                  this.pause(currentTime);
                } else {
                  this.play(currentTime);
                }
              }
            }
            this._trigger($.jPlayer.event.flashreset);
          }
        }
      }
      if(this.flash.gate) {
        switch(eventType) {
          case $.jPlayer.event.progress:
            this._getFlashStatus(status);
            this._updateInterface();
            this._trigger(eventType);
            break;
          case $.jPlayer.event.timeupdate:
            this._getFlashStatus(status);
            this._updateInterface();
            this._trigger(eventType);
            break;
          case $.jPlayer.event.play:
            this._seeked();
            this._updateButtons(true);
            this._trigger(eventType);
            break;
          case $.jPlayer.event.pause:
            this._updateButtons(false);
            this._trigger(eventType);
            break;
          case $.jPlayer.event.ended:
            this._updateButtons(false);
            this._trigger(eventType);
            break;
          case $.jPlayer.event.click:
            this._trigger(eventType); // This could be dealt with by the default
            break;
          case $.jPlayer.event.error:
            this.status.waitForLoad = true; // Allows the load operation to try again.
            this.status.waitForPlay = true; // Reset since a play was captured.
            if(this.status.video) {
              this.internal.flash.jq.css({'width':'0px', 'height':'0px'});
            }
            if(this._validString(this.status.media.poster)) {
              this.internal.poster.jq.show();
            }
            if(this.css.jq.videoPlay.length && this.status.video) {
              this.css.jq.videoPlay.show();
            }
            if(this.status.video) { // Set up for another try. Execute before error event.
              this._flash_setVideo(this.status.media);
            } else {
              this._flash_setAudio(this.status.media);
            }
            this._updateButtons(false);
            this._error( {
              type: $.jPlayer.error.URL,
              context:status.src,
              message: $.jPlayer.errorMsg.URL,
              hint: $.jPlayer.errorHint.URL
            });
            break;
          case $.jPlayer.event.seeking:
            this._seeking();
            this._trigger(eventType);
            break;
          case $.jPlayer.event.seeked:
            this._seeked();
            this._trigger(eventType);
            break;
          case $.jPlayer.event.ready:
            // The ready event is handled outside the switch statement.
            // Captured here otherwise 2 ready events would be generated if the ready event handler used setMedia.
            break;
          default:
            this._trigger(eventType);
        }
      }
      return false;
    },
    _getFlashStatus: function(status) {
      this.status.seekPercent = status.seekPercent;
      this.status.currentPercentRelative = status.currentPercentRelative;
      this.status.currentPercentAbsolute = status.currentPercentAbsolute;
      this.status.currentTime = status.currentTime;
      this.status.duration = status.duration;
      this.status.remaining = status.duration - status.currentTime;

      this.status.videoWidth = status.videoWidth;
      this.status.videoHeight = status.videoHeight;

      // The Flash does not generate this information in this release
      this.status.readyState = 4; // status.readyState;
      this.status.networkState = 0; // status.networkState;
      this.status.playbackRate = 1; // status.playbackRate;
      this.status.ended = false; // status.ended;
    },
    _updateButtons: function(playing) {
      if(playing === undefined) {
        playing = !this.status.paused;
      } else {
        this.status.paused = !playing;
      }
      // Apply the state classes. (For the useStateClassSkin:true option)
      if(playing) {
        this.addStateClass('playing');
      } else {
        this.removeStateClass('playing');
      }
      if(!this.status.noFullWindow && this.options.fullWindow) {
        this.addStateClass('fullScreen');
      } else {
        this.removeStateClass('fullScreen');
      }
      if(this.options.loop) {
        this.addStateClass('looped');
      } else {
        this.removeStateClass('looped');
      }
      // Toggle the GUI element pairs. (For the useStateClassSkin:false option)
      if(this.css.jq.play.length && this.css.jq.pause.length) {
        if(playing) {
          this.css.jq.play.hide();
          this.css.jq.pause.show();
        } else {
          this.css.jq.play.show();
          this.css.jq.pause.hide();
        }
      }
      if(this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length) {
        if(this.status.noFullWindow) {
          this.css.jq.fullScreen.hide();
          this.css.jq.restoreScreen.hide();
        } else if(this.options.fullWindow) {
          this.css.jq.fullScreen.hide();
          this.css.jq.restoreScreen.show();
        } else {
          this.css.jq.fullScreen.show();
          this.css.jq.restoreScreen.hide();
        }
      }
      if(this.css.jq.repeat.length && this.css.jq.repeatOff.length) {
        if(this.options.loop) {
          this.css.jq.repeat.hide();
          this.css.jq.repeatOff.show();
        } else {
          this.css.jq.repeat.show();
          this.css.jq.repeatOff.hide();
        }
      }
    },
    _updateInterface: function() {
      if(this.css.jq.seekBar.length) {
        this.css.jq.seekBar.width(this.status.seekPercent+"%");
      }
      if(this.css.jq.playBar.length) {
        if(this.options.smoothPlayBar) {
          this.css.jq.playBar.stop().animate({
            width: this.status.currentPercentAbsolute+"%"
          }, 250, "linear");
        } else {
          this.css.jq.playBar.width(this.status.currentPercentRelative+"%");
        }
      }
      var currentTimeText = '';
      if(this.css.jq.currentTime.length) {
        currentTimeText = this._convertTime(this.status.currentTime);
        if(currentTimeText !== this.css.jq.currentTime.text()) {
          this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
        }
      }
      var durationText = '',
        duration = this.status.duration,
        remaining = this.status.remaining;
      if(this.css.jq.duration.length) {
        if(typeof this.status.media.duration === 'string') {
          durationText = this.status.media.duration;
        } else {
          if(typeof this.status.media.duration === 'number') {
            duration = this.status.media.duration;
            remaining = duration - this.status.currentTime;
          }
          if(this.options.remainingDuration) {
            durationText = (remaining > 0 ? '-' : '') + this._convertTime(remaining);
          } else {
            durationText = this._convertTime(duration);
          }
        }
        if(durationText !== this.css.jq.duration.text()) {
          this.css.jq.duration.text(durationText);
        }
      }
    },
    _convertTime: ConvertTime.prototype.time,
    _seeking: function() {
      if(this.css.jq.seekBar.length) {
        this.css.jq.seekBar.addClass("jp-seeking-bg");
      }
      this.addStateClass('seeking');
    },
    _seeked: function() {
      if(this.css.jq.seekBar.length) {
        this.css.jq.seekBar.removeClass("jp-seeking-bg");
      }
      this.removeStateClass('seeking');
    },
    _resetGate: function() {
      this.html.audio.gate = false;
      this.html.video.gate = false;
      this.aurora.gate = false;
      this.flash.gate = false;
    },
    _resetActive: function() {
      this.html.active = false;
      this.aurora.active = false;
      this.flash.active = false;
    },
    _escapeHtml: function(s) {
      return s.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
    },
    _qualifyURL: function(url) {
      var el = document.createElement('div');
      el.innerHTML= '<a href="' + this._escapeHtml(url) + '">x</a>';
      return el.firstChild.href;
    },
    _absoluteMediaUrls: function(media) {
      var self = this;
      $.each(media, function(type, url) {
        if(url && self.format[type] && url.substr(0, 5) !== "data:") {
          media[type] = self._qualifyURL(url);
        }
      });
      return media;
    },
    addStateClass: function(state) {
      if(this.ancestorJq.length) {
        this.ancestorJq.addClass(this.options.stateClass[state]);
      }
    },
    removeStateClass: function(state) {
      if(this.ancestorJq.length) {
        this.ancestorJq.removeClass(this.options.stateClass[state]);
      }
    },
    setMedia: function(media) {
    
      /*  media[format] = String: URL of format. Must contain all of the supplied option's video or audio formats.
       *  media.poster = String: Video poster URL.
       *  media.track = Array: Of objects defining the track element: kind, src, srclang, label, def.
       *  media.stream = Boolean: * NOT IMPLEMENTED * Designating actual media streams. ie., "false/undefined" for files. Plan to refresh the flash every so often.
       */

      var self = this,
        supported = false,
        posterChanged = this.status.media.poster !== media.poster; // Compare before reset. Important for OSX Safari as this.htmlElement.poster.src is absolute, even if original poster URL was relative.

      this._resetMedia();
      this._resetGate();
      this._resetActive();

      // Clear the Android Fix.
      this.androidFix.setMedia = false;
      this.androidFix.play = false;
      this.androidFix.pause = false;

      // Convert all media URLs to absolute URLs.
      media = this._absoluteMediaUrls(media);

      $.each(this.formats, function(formatPriority, format) {
        var isVideo = self.format[format].media === 'video';
        $.each(self.solutions, function(solutionPriority, solution) {
          if(self[solution].support[format] && self._validString(media[format])) { // Format supported in solution and url given for format.
            var isHtml = solution === 'html';
            var isAurora = solution === 'aurora';

            if(isVideo) {
              if(isHtml) {
                self.html.video.gate = true;
                self._html_setVideo(media);
                self.html.active = true;
              } else {
                self.flash.gate = true;
                self._flash_setVideo(media);
                self.flash.active = true;
              }
              if(self.css.jq.videoPlay.length) {
                self.css.jq.videoPlay.show();
              }
              self.status.video = true;
            } else {
              if(isHtml) {
                self.html.audio.gate = true;
                self._html_setAudio(media);
                self.html.active = true;

                // Setup the Android Fix - Only for HTML audio.
                if($.jPlayer.platform.android) {
                  self.androidFix.setMedia = true;
                }
              } else if(isAurora) {
                self.aurora.gate = true;
                self._aurora_setAudio(media);
                self.aurora.active = true;
              } else {
                self.flash.gate = true;
                self._flash_setAudio(media);
                self.flash.active = true;
              }
              if(self.css.jq.videoPlay.length) {
                self.css.jq.videoPlay.hide();
              }
              self.status.video = false;
            }
            
            supported = true;
            return false; // Exit $.each
          }
        });
        if(supported) {
          return false; // Exit $.each
        }
      });

      if(supported) {
        if(!(this.status.nativeVideoControls && this.html.video.gate)) {
          // Set poster IMG if native video controls are not being used
          // Note: With IE the IMG onload event occurs immediately when cached.
          // Note: Poster hidden by default in _resetMedia()
          if(this._validString(media.poster)) {
            if(posterChanged) { // Since some browsers do not generate img onload event.
              this.htmlElement.poster.src = media.poster;
            } else {
              this.internal.poster.jq.show();
            }
          }
        }
        if(typeof media.title === 'string') {
          if(this.css.jq.title.length) {
            this.css.jq.title.html(media.title);
          }
          if(this.htmlElement.audio) {
            this.htmlElement.audio.setAttribute('title', media.title);
          }
          if(this.htmlElement.video) {
            this.htmlElement.video.setAttribute('title', media.title);
          }
        }
        this.status.srcSet = true;
        this.status.media = $.extend({}, media);
        this._updateButtons(false);
        this._updateInterface();
        this._trigger($.jPlayer.event.setmedia);
      } else { // jPlayer cannot support any formats provided in this browser
        // Send an error event
        this._error( {
          type: $.jPlayer.error.NO_SUPPORT,
          context: "{supplied:'" + this.options.supplied + "'}",
          message: $.jPlayer.errorMsg.NO_SUPPORT,
          hint: $.jPlayer.errorHint.NO_SUPPORT
        });
      }
    },
    _resetMedia: function() {
      this._resetStatus();
      this._updateButtons(false);
      this._updateInterface();
      this._seeked();
      this.internal.poster.jq.hide();

      clearTimeout(this.internal.htmlDlyCmdId);

      if(this.html.active) {
        this._html_resetMedia();
      } else if(this.aurora.active) {
        this._aurora_resetMedia();
      } else if(this.flash.active) {
        this._flash_resetMedia();
      }
    },
    clearMedia: function() {
      this._resetMedia();

      if(this.html.active) {
        this._html_clearMedia();
      } else if(this.aurora.active) {
        this._aurora_clearMedia();
      } else if(this.flash.active) {
        this._flash_clearMedia();
      }

      this._resetGate();
      this._resetActive();
    },
    load: function() {
      if(this.status.srcSet) {
        if(this.html.active) {
          this._html_load();
        } else if(this.aurora.active) {
          this._aurora_load();
        } else if(this.flash.active) {
          this._flash_load();
        }
      } else {
        this._urlNotSetError("load");
      }
    },
    focus: function() {
      if(this.options.keyEnabled) {
        $.jPlayer.focus = this;
      }
    },
    play: function(time) {
      var guiAction = typeof time === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
      if(guiAction && this.options.useStateClassSkin && !this.status.paused) {
        this.pause(time); // The time would be the click event, but passing it over so info is not lost.
      } else {
        time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
        if(this.status.srcSet) {
          this.focus();
          if(this.html.active) {
            this._html_play(time);
          } else if(this.aurora.active) {
            this._aurora_play(time);
          } else if(this.flash.active) {
            this._flash_play(time);
          }
        } else {
          this._urlNotSetError("play");
        }
      }
    },
    videoPlay: function() { // Handles clicks on the play button over the video poster
      this.play();
    },
    pause: function(time) {
      time = (typeof time === "number") ? time : NaN; // Remove jQuery event from click handler
      if(this.status.srcSet) {
        if(this.html.active) {
          this._html_pause(time);
        } else if(this.aurora.active) {
          this._aurora_pause(time);
        } else if(this.flash.active) {
          this._flash_pause(time);
        }
      } else {
        this._urlNotSetError("pause");
      }
    },
    tellOthers: function(command, conditions) {
      var self = this,
        hasConditions = typeof conditions === 'function',
        args = Array.prototype.slice.call(arguments); // Convert arguments to an Array.

      if(typeof command !== 'string') { // Ignore, since no command.
        return; // Return undefined to maintain chaining.
      }
      if(hasConditions) {
        args.splice(1, 1); // Remove the conditions from the arguments
      }

      $.jPlayer.prototype.destroyRemoved();
      $.each(this.instances, function() {
        // Remember that "this" is the instance's "element" in the $.each() loop.
        if(self.element !== this) { // Do not tell my instance.
          if(!hasConditions || conditions.call(this.data("jPlayer"), self)) {
            this.jPlayer.apply(this, args);
          }
        }
      });
    },
    pauseOthers: function(time) {
      this.tellOthers("pause", function() {
        // In the conditions function, the "this" context is the other instance's jPlayer object.
        return this.status.srcSet;
      }, time);
    },
    stop: function() {
      if(this.status.srcSet) {
        if(this.html.active) {
          this._html_pause(0);
        } else if(this.aurora.active) {
          this._aurora_pause(0);
        } else if(this.flash.active) {
          this._flash_pause(0);
        }
      } else {
        this._urlNotSetError("stop");
      }
    },
    playHead: function(p) {
      p = this._limitValue(p, 0, 100);
      if(this.status.srcSet) {
        if(this.html.active) {
          this._html_playHead(p);
        } else if(this.aurora.active) {
          this._aurora_playHead(p);
        } else if(this.flash.active) {
          this._flash_playHead(p);
        }
      } else {
        this._urlNotSetError("playHead");
      }
    },
    _muted: function(muted) {
      this.mutedWorker(muted);
      if(this.options.globalVolume) {
        this.tellOthers("mutedWorker", function() {
          // Check the other instance has global volume enabled.
          return this.options.globalVolume;
        }, muted);
      }
    },
    mutedWorker: function(muted) {
      this.options.muted = muted;
      if(this.html.used) {
        this._html_setProperty('muted', muted);
      }
      if(this.aurora.used) {
        this._aurora_mute(muted);
      }
      if(this.flash.used) {
        this._flash_mute(muted);
      }

      // The HTML solution generates this event from the media element itself.
      if(!this.html.video.gate && !this.html.audio.gate) {
        this._updateMute(muted);
        this._updateVolume(this.options.volume);
        this._trigger($.jPlayer.event.volumechange);
      }
    },
    mute: function(mute) { // mute is either: undefined (true), an event object (true) or a boolean (muted).
      var guiAction = typeof mute === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
      if(guiAction && this.options.useStateClassSkin && this.options.muted) {
        this._muted(false);
      } else {
        mute = mute === undefined ? true : !!mute;
        this._muted(mute);
      }
    },
    unmute: function(unmute) { // unmute is either: undefined (true), an event object (true) or a boolean (!muted).
      unmute = unmute === undefined ? true : !!unmute;
      this._muted(!unmute);
    },
    _updateMute: function(mute) {
      if(mute === undefined) {
        mute = this.options.muted;
      }
      if(mute) {
        this.addStateClass('muted');
      } else {
        this.removeStateClass('muted');
      }
      if(this.css.jq.mute.length && this.css.jq.unmute.length) {
        if(this.status.noVolume) {
          this.css.jq.mute.hide();
          this.css.jq.unmute.hide();
        } else if(mute) {
          this.css.jq.mute.hide();
          this.css.jq.unmute.show();
        } else {
          this.css.jq.mute.show();
          this.css.jq.unmute.hide();
        }
      }
    },
    volume: function(v) {
      this.volumeWorker(v);
      if(this.options.globalVolume) {
        this.tellOthers("volumeWorker", function() {
          // Check the other instance has global volume enabled.
          return this.options.globalVolume;
        }, v);
      }
    },
    volumeWorker: function(v) {
      v = this._limitValue(v, 0, 1);
      this.options.volume = v;

      if(this.html.used) {
        this._html_setProperty('volume', v);
      }
      if(this.aurora.used) {
        this._aurora_volume(v);
      }
      if(this.flash.used) {
        this._flash_volume(v);
      }

      // The HTML solution generates this event from the media element itself.
      if(!this.html.video.gate && !this.html.audio.gate) {
        this._updateVolume(v);
        this._trigger($.jPlayer.event.volumechange);
      }
    },
    volumeBar: function(e) { // Handles clicks on the volumeBar
      if(this.css.jq.volumeBar.length) {
        // Using $(e.currentTarget) to enable multiple volume bars
        var $bar = $(e.currentTarget),
          offset = $bar.offset(),
          x = e.pageX - offset.left,
          w = $bar.width(),
          y = $bar.height() - e.pageY + offset.top,
          h = $bar.height();
        if(this.options.verticalVolume) {
          this.volume(y/h);
        } else {
          this.volume(x/w);
        }
      }
      if(this.options.muted) {
        this._muted(false);
      }
    },
    _updateVolume: function(v) {
      if(v === undefined) {
        v = this.options.volume;
      }
      v = this.options.muted ? 0 : v;

      if(this.status.noVolume) {
        this.addStateClass('noVolume');
        if(this.css.jq.volumeBar.length) {
          this.css.jq.volumeBar.hide();
        }
        if(this.css.jq.volumeBarValue.length) {
          this.css.jq.volumeBarValue.hide();
        }
        if(this.css.jq.volumeMax.length) {
          this.css.jq.volumeMax.hide();
        }
      } else {
        this.removeStateClass('noVolume');
        if(this.css.jq.volumeBar.length) {
          this.css.jq.volumeBar.show();
        }
        if(this.css.jq.volumeBarValue.length) {
          this.css.jq.volumeBarValue.show();
          this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"]((v*100)+"%");
        }
        if(this.css.jq.volumeMax.length) {
          this.css.jq.volumeMax.show();
        }
      }
    },
    volumeMax: function() { // Handles clicks on the volume max
      this.volume(1);
      if(this.options.muted) {
        this._muted(false);
      }
    },
    _cssSelectorAncestor: function(ancestor) {
      var self = this;
      this.options.cssSelectorAncestor = ancestor;
      this._removeUiClass();
      this.ancestorJq = ancestor ? $(ancestor) : []; // Would use $() instead of [], but it is only 1.4+
      if(ancestor && this.ancestorJq.length !== 1) { // So empty strings do not generate the warning.
        this._warning( {
          type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
          context: ancestor,
          message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
          hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
        });
      }
      this._addUiClass();
      $.each(this.options.cssSelector, function(fn, cssSel) {
        self._cssSelector(fn, cssSel);
      });

      // Set the GUI to the current state.
      this._updateInterface();
      this._updateButtons();
      this._updateAutohide();
      this._updateVolume();
      this._updateMute();
    },
    _cssSelector: function(fn, cssSel) {
      var self = this;
      if(typeof cssSel === 'string') {
        if($.jPlayer.prototype.options.cssSelector[fn]) {
          if(this.css.jq[fn] && this.css.jq[fn].length) {
            this.css.jq[fn].unbind(".jPlayer");
          }
          this.options.cssSelector[fn] = cssSel;
          this.css.cs[fn] = this.options.cssSelectorAncestor + " " + cssSel;

          if(cssSel) { // Checks for empty string
            this.css.jq[fn] = $(this.css.cs[fn]);
          } else {
            this.css.jq[fn] = []; // To comply with the css.jq[fn].length check before its use. As of jQuery 1.4 could have used $() for an empty set. 
          }

          if(this.css.jq[fn].length && this[fn]) {
            var handler = function(e) {
              e.preventDefault();
              self[fn](e);
              if(self.options.autoBlur) {
                $(this).blur();
              } else {
                $(this).focus(); // Force focus for ARIA.
              }
            };
            this.css.jq[fn].bind("click.jPlayer", handler); // Using jPlayer namespace
          }

          if(cssSel && this.css.jq[fn].length !== 1) { // So empty strings do not generate the warning. ie., they just remove the old one.
            this._warning( {
              type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
              context: this.css.cs[fn],
              message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[fn].length + " found for " + fn + " method.",
              hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
            });
          }
        } else {
          this._warning( {
            type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
            context: fn,
            message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
            hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
          });
        }
      } else {
        this._warning( {
          type: $.jPlayer.warning.CSS_SELECTOR_STRING,
          context: cssSel,
          message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
          hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
        });
      }
    },
    duration: function(e) {
      if(this.options.toggleDuration) {
        if(this.options.captureDuration) {
          e.stopPropagation();
        }
        this._setOption("remainingDuration", !this.options.remainingDuration);
      }
    },
    seekBar: function(e) { // Handles clicks on the seekBar
      if(this.css.jq.seekBar.length) {
        // Using $(e.currentTarget) to enable multiple seek bars
        var $bar = $(e.currentTarget),
          offset = $bar.offset(),
          x = e.pageX - offset.left,
          w = $bar.width(),
          p = 100 * x / w;
        this.playHead(p);
      }
    },
    playbackRate: function(pbr) {
      this._setOption("playbackRate", pbr);
    },
    playbackRateBar: function(e) { // Handles clicks on the playbackRateBar
      if(this.css.jq.playbackRateBar.length) {
        // Using $(e.currentTarget) to enable multiple playbackRate bars
        var $bar = $(e.currentTarget),
          offset = $bar.offset(),
          x = e.pageX - offset.left,
          w = $bar.width(),
          y = $bar.height() - e.pageY + offset.top,
          h = $bar.height(),
          ratio, pbr;
        if(this.options.verticalPlaybackRate) {
          ratio = y/h;
        } else {
          ratio = x/w;
        }
        pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate;
        this.playbackRate(pbr);
      }
    },
    _updatePlaybackRate: function() {
      var pbr = this.options.playbackRate,
        ratio = (pbr - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
      if(this.status.playbackRateEnabled) {
        if(this.css.jq.playbackRateBar.length) {
          this.css.jq.playbackRateBar.show();
        }
        if(this.css.jq.playbackRateBarValue.length) {
          this.css.jq.playbackRateBarValue.show();
          this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"]((ratio*100)+"%");
        }
      } else {
        if(this.css.jq.playbackRateBar.length) {
          this.css.jq.playbackRateBar.hide();
        }
        if(this.css.jq.playbackRateBarValue.length) {
          this.css.jq.playbackRateBarValue.hide();
        }
      }
    },
    repeat: function(event) { // Handle clicks on the repeat button
      var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
      if(guiAction && this.options.useStateClassSkin && this.options.loop) {
        this._loop(false);
      } else {
        this._loop(true);
      }
    },
    repeatOff: function() { // Handle clicks on the repeatOff button
      this._loop(false);
    },
    _loop: function(loop) {
      if(this.options.loop !== loop) {
        this.options.loop = loop;
        this._updateButtons();
        this._trigger($.jPlayer.event.repeat);
      }
    },

    // Options code adapted from ui.widget.js (1.8.7).  Made changes so the key can use dot notation. To match previous getData solution in jPlayer 1.
    option: function(key, value) {
      var options = key;

       // Enables use: options().  Returns a copy of options object
      if ( arguments.length === 0 ) {
        return $.extend( true, {}, this.options );
      }

      if(typeof key === "string") {
        var keys = key.split(".");

         // Enables use: options("someOption")  Returns a copy of the option. Supports dot notation.
        if(value === undefined) {

          var opt = $.extend(true, {}, this.options);
          for(var i = 0; i < keys.length; i++) {
            if(opt[keys[i]] !== undefined) {
              opt = opt[keys[i]];
            } else {
              this._warning( {
                type: $.jPlayer.warning.OPTION_KEY,
                context: key,
                message: $.jPlayer.warningMsg.OPTION_KEY,
                hint: $.jPlayer.warningHint.OPTION_KEY
              });
              return undefined;
            }
          }
          return opt;
        }

         // Enables use: options("someOptionObject", someObject}).  Creates: {someOptionObject:someObject}
         // Enables use: options("someOption", someValue).  Creates: {someOption:someValue}
         // Enables use: options("someOptionObject.someOption", someValue).  Creates: {someOptionObject:{someOption:someValue}}

        options = {};
        var opts = options;

        for(var j = 0; j < keys.length; j++) {
          if(j < keys.length - 1) {
            opts[keys[j]] = {};
            opts = opts[keys[j]];
          } else {
            opts[keys[j]] = value;
          }
        }
      }

       // Otherwise enables use: options(optionObject).  Uses original object (the key)

      this._setOptions(options);

      return this;
    },
    _setOptions: function(options) {
      var self = this;
      $.each(options, function(key, value) { // This supports the 2 level depth that the options of jPlayer has. Would review if we ever need more depth.
        self._setOption(key, value);
      });

      return this;
    },
    _setOption: function(key, value) {
      var self = this;

      // The ability to set options is limited at this time.

      switch(key) {
        case "volume" :
          this.volume(value);
          break;
        case "muted" :
          this._muted(value);
          break;
        case "globalVolume" :
          this.options[key] = value;
          break;
        case "cssSelectorAncestor" :
          this._cssSelectorAncestor(value); // Set and refresh all associations for the new ancestor.
          break;
        case "cssSelector" :
          $.each(value, function(fn, cssSel) {
            self._cssSelector(fn, cssSel); // NB: The option is set inside this function, after further validity checks.
          });
          break;
        case "playbackRate" :
          this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
          if(this.html.used) {
            this._html_setProperty('playbackRate', value);
          }
          this._updatePlaybackRate();
          break;
        case "defaultPlaybackRate" :
          this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate, this.options.maxPlaybackRate);
          if(this.html.used) {
            this._html_setProperty('defaultPlaybackRate', value);
          }
          this._updatePlaybackRate();
          break;
        case "minPlaybackRate" :
          this.options[key] = value = this._limitValue(value, 0.1, this.options.maxPlaybackRate - 0.1);
          this._updatePlaybackRate();
          break;
        case "maxPlaybackRate" :
          this.options[key] = value = this._limitValue(value, this.options.minPlaybackRate + 0.1, 16);
          this._updatePlaybackRate();
          break;
        case "fullScreen" :
          if(this.options[key] !== value) { // if changed
            var wkv = $.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
            if(!wkv || wkv && !this.status.waitForPlay) {
              if(!wkv) { // No sensible way to unset option on these devices.
                this.options[key] = value;
              }
              if(value) {
                this._requestFullscreen();
              } else {
                this._exitFullscreen();
              }
              if(!wkv) {
                this._setOption("fullWindow", value);
              }
            }
          }
          break;
        case "fullWindow" :
          if(this.options[key] !== value) { // if changed
            this._removeUiClass();
            this.options[key] = value;
            this._refreshSize();
          }
          break;
        case "size" :
          if(!this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
            this._removeUiClass();
          }
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this._refreshSize();
          break;
        case "sizeFull" :
          if(this.options.fullWindow && this.options[key].cssClass !== value.cssClass) {
            this._removeUiClass();
          }
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this._refreshSize();
          break;
        case "autohide" :
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this._updateAutohide();
          break;
        case "loop" :
          this._loop(value);
          break;
        case "remainingDuration" :
          this.options[key] = value;
          this._updateInterface();
          break;
        case "toggleDuration" :
          this.options[key] = value;
          break;
        case "nativeVideoControls" :
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
          this._restrictNativeVideoControls();
          this._updateNativeVideoControls();
          break;
        case "noFullWindow" :
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls); // Need to check again as noFullWindow can depend on this flag and the restrict() can override it.
          this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
          this._restrictNativeVideoControls();
          this._updateButtons();
          break;
        case "noVolume" :
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          this.status.noVolume = this._uaBlocklist(this.options.noVolume);
          this._updateVolume();
          this._updateMute();
          break;
        case "emulateHtml" :
          if(this.options[key] !== value) { // To avoid multiple event handlers being created, if true already.
            this.options[key] = value;
            if(value) {
              this._emulateHtmlBridge();
            } else {
              this._destroyHtmlBridge();
            }
          }
          break;
        case "timeFormat" :
          this.options[key] = $.extend({}, this.options[key], value); // store a merged copy of it, incase not all properties changed.
          break;
        case "keyEnabled" :
          this.options[key] = value;
          if(!value && this === $.jPlayer.focus) {
            $.jPlayer.focus = null;
          }
          break;
        case "keyBindings" :
          this.options[key] = $.extend(true, {}, this.options[key], value); // store a merged DEEP copy of it, incase not all properties changed.
          break;
        case "audioFullScreen" :
          this.options[key] = value;
          break;
        case "autoBlur" :
          this.options[key] = value;
          break;
      }

      return this;
    },
    // End of: (Options code adapted from ui.widget.js)

    _refreshSize: function() {
      this._setSize(); // update status and jPlayer element size
      this._addUiClass(); // update the ui class
      this._updateSize(); // update internal sizes
      this._updateButtons();
      this._updateAutohide();
      this._trigger($.jPlayer.event.resize);
    },
    _setSize: function() {
      // Determine the current size from the options
      if(this.options.fullWindow) {
        this.status.width = this.options.sizeFull.width;
        this.status.height = this.options.sizeFull.height;
        this.status.cssClass = this.options.sizeFull.cssClass;
      } else {
        this.status.width = this.options.size.width;
        this.status.height = this.options.size.height;
        this.status.cssClass = this.options.size.cssClass;
      }

      // Set the size of the jPlayer area.
      this.element.css({'width': this.status.width, 'height': this.status.height});
    },
    _addUiClass: function() {
      if(this.ancestorJq.length) {
        this.ancestorJq.addClass(this.status.cssClass);
      }
    },
    _removeUiClass: function() {
      if(this.ancestorJq.length) {
        this.ancestorJq.removeClass(this.status.cssClass);
      }
    },
    _updateSize: function() {
      // The poster uses show/hide so can simply resize it.
      this.internal.poster.jq.css({'width': this.status.width, 'height': this.status.height});

      // Video html or flash resized if necessary at this time, or if native video controls being used.
      if(!this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls) {
        this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
      }
      else if(!this.status.waitForPlay && this.flash.active && this.status.video) {
        this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
      }
    },
    _updateAutohide: function() {
      var self = this,
        event = "mousemove.jPlayer",
        namespace = ".jPlayerAutohide",
        eventType = event + namespace,
        handler = function(event) {
          var moved = false,
            deltaX, deltaY;
          if(typeof self.internal.mouse !== "undefined") {
            //get the change from last position to this position
            deltaX = self.internal.mouse.x - event.pageX;
            deltaY = self.internal.mouse.y - event.pageY;
            moved = (Math.floor(deltaX) > 0) || (Math.floor(deltaY)>0); 
          } else {
            moved = true;
          }
          // store current position for next method execution
          self.internal.mouse = {
              x : event.pageX,
              y : event.pageY
          };
          // if mouse has been actually moved, do the gui fadeIn/fadeOut
          if (moved) {
            self.css.jq.gui.fadeIn(self.options.autohide.fadeIn, function() {
              clearTimeout(self.internal.autohideId);
              self.internal.autohideId = setTimeout( function() {
                self.css.jq.gui.fadeOut(self.options.autohide.fadeOut);
              }, self.options.autohide.hold);
            });
          }
        };

      if(this.css.jq.gui.length) {

        // End animations first so that its callback is executed now.
        // Otherwise an in progress fadeIn animation still has the callback to fadeOut again.
        this.css.jq.gui.stop(true, true);

        // Removes the fadeOut operation from the fadeIn callback.
        clearTimeout(this.internal.autohideId);
        // undefine mouse
        delete this.internal.mouse;

        this.element.unbind(namespace);
        this.css.jq.gui.unbind(namespace);

        if(!this.status.nativeVideoControls) {
          if(this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored) {
            this.element.bind(eventType, handler);
            this.css.jq.gui.bind(eventType, handler);
            this.css.jq.gui.hide();
          } else {
            this.css.jq.gui.show();
          }
        } else {
          this.css.jq.gui.hide();
        }
      }
    },
    fullScreen: function(event) {
      var guiAction = typeof event === "object"; // Flags GUI click events so we know this was not a direct command, but an action taken by the user on the GUI.
      if(guiAction && this.options.useStateClassSkin && this.options.fullScreen) {
        this._setOption("fullScreen", false);
      } else {
        this._setOption("fullScreen", true);
      }
    },
    restoreScreen: function() {
      this._setOption("fullScreen", false);
    },
    _fullscreenAddEventListeners: function() {
      var self = this,
        fs = $.jPlayer.nativeFeatures.fullscreen;

      if(fs.api.fullscreenEnabled) {
        if(fs.event.fullscreenchange) {
          // Create the event handler function and store it for removal.
          if(typeof this.internal.fullscreenchangeHandler !== 'function') {
            this.internal.fullscreenchangeHandler = function() {
              self._fullscreenchange();
            };
          }
          document.addEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
        }
        // No point creating handler for fullscreenerror.
        // Either logic avoids fullscreen occurring (w3c/moz), or their is no event on the browser (webkit).
      }
    },
    _fullscreenRemoveEventListeners: function() {
      var fs = $.jPlayer.nativeFeatures.fullscreen;
      if(this.internal.fullscreenchangeHandler) {
        document.removeEventListener(fs.event.fullscreenchange, this.internal.fullscreenchangeHandler, false);
      }
    },
    _fullscreenchange: function() {
      // If nothing is fullscreen, then we cannot be in fullscreen mode.
      if(this.options.fullScreen && !$.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement()) {
        this._setOption("fullScreen", false);
      }
    },
    _requestFullscreen: function() {
      // Either the container or the jPlayer div
      var e = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0],
        fs = $.jPlayer.nativeFeatures.fullscreen;

      // This method needs the video element. For iOS and Android.
      if(fs.used.webkitVideo) {
        e = this.htmlElement.video;
      }

      if(fs.api.fullscreenEnabled) {
        fs.api.requestFullscreen(e);
      }
    },
    _exitFullscreen: function() {

      var fs = $.jPlayer.nativeFeatures.fullscreen,
        e;

      // This method needs the video element. For iOS and Android.
      if(fs.used.webkitVideo) {
        e = this.htmlElement.video;
      }

      if(fs.api.fullscreenEnabled) {
        fs.api.exitFullscreen(e);
      }
    },
    _html_initMedia: function(media) {
      // Remove any existing track elements
      var $media = $(this.htmlElement.media).empty();

      // Create any track elements given with the media, as an Array of track Objects.
      $.each(media.track || [], function(i,v) {
        var track = document.createElement('track');
        track.setAttribute("kind", v.kind ? v.kind : "");
        track.setAttribute("src", v.src ? v.src : "");
        track.setAttribute("srclang", v.srclang ? v.srclang : "");
        track.setAttribute("label", v.label ? v.label : "");
        if(v.def) {
          track.setAttribute("default", v.def);
        }
        $media.append(track);
      });

      this.htmlElement.media.src = this.status.src;

      if(this.options.preload !== 'none') {
        this._html_load(); // See function for comments
      }
      this._trigger($.jPlayer.event.timeupdate); // The flash generates this event for its solution.
    },
    _html_setFormat: function(media) {
      var self = this;
      // Always finds a format due to checks in setMedia()
      $.each(this.formats, function(priority, format) {
        if(self.html.support[format] && media[format]) {
          self.status.src = media[format];
          self.status.format[format] = true;
          self.status.formatType = format;
          return false;
        }
      });
    },
    _html_setAudio: function(media) {
      this._html_setFormat(media);
      this.htmlElement.media = this.htmlElement.audio;
      this._html_initMedia(media);
    },
    _html_setVideo: function(media) {
      this._html_setFormat(media);
      if(this.status.nativeVideoControls) {
        this.htmlElement.video.poster = this._validString(media.poster) ? media.poster : "";
      }
      this.htmlElement.media = this.htmlElement.video;
      this._html_initMedia(media);
    },
    _html_resetMedia: function() {
      if(this.htmlElement.media) {
        if(this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls) {
          this.internal.video.jq.css({'width':'0px', 'height':'0px'});
        }
        this.htmlElement.media.pause();
      }
    },
    _html_clearMedia: function() {
      if(this.htmlElement.media) {
        this.htmlElement.media.src = "about:blank";
        // The following load() is only required for Firefox 3.6 (PowerMacs).
        // Recent HTMl5 browsers only require the src change. Due to changes in W3C spec and load() effect.
        this.htmlElement.media.load(); // Stops an old, "in progress" download from continuing the download. Triggers the loadstart, error and emptied events, due to the empty src. Also an abort event if a download was in progress.
      }
    },
    _html_load: function() {
      // This function remains to allow the early HTML5 browsers to work, such as Firefox 3.6
      // A change in the W3C spec for the media.load() command means that this is no longer necessary.
      // This command should be removed and actually causes minor undesirable effects on some browsers. Such as loading the whole file and not only the metadata.
      if(this.status.waitForLoad) {
        this.status.waitForLoad = false;
        this.htmlElement.media.load();
      }
      clearTimeout(this.internal.htmlDlyCmdId);
    },
    _html_play: function(time) {
      var self = this,
        media = this.htmlElement.media;

      this.androidFix.pause = false; // Cancel the pause fix.

      this._html_load(); // Loads if required and clears any delayed commands.

      // Setup the Android Fix.
      if(this.androidFix.setMedia) {
        this.androidFix.play = true;
        this.androidFix.time = time;

      } else if(!isNaN(time)) {

        // Attempt to play it, since iOS has been ignoring commands
        if(this.internal.cmdsIgnored) {
          media.play();
        }

        try {
          // !media.seekable is for old HTML5 browsers, like Firefox 3.6.
          // Checking seekable.length is important for iOS6 to work with setMedia().play(time)
          if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
            media.currentTime = time;
            media.play();
          } else {
            throw 1;
          }
        } catch(err) {
          this.internal.htmlDlyCmdId = setTimeout(function() {
            self.play(time);
          }, 250);
          return; // Cancel execution and wait for the delayed command.
        }
      } else {
        media.play();
      }
      this._html_checkWaitForPlay();
    },
    _html_pause: function(time) {
      var self = this,
        media = this.htmlElement.media;

      this.androidFix.play = false; // Cancel the play fix.

      if(time > 0) { // We do not want the stop() command, which does pause(0), causing a load operation.
        this._html_load(); // Loads if required and clears any delayed commands.
      } else {
        clearTimeout(this.internal.htmlDlyCmdId);
      }

      // Order of these commands is important for Safari (Win) and IE9. Pause then change currentTime.
      media.pause();

      // Setup the Android Fix.
      if(this.androidFix.setMedia) {
        this.androidFix.pause = true;
        this.androidFix.time = time;

      } else if(!isNaN(time)) {
        try {
          if(!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
            media.currentTime = time;
          } else {
            throw 1;
          }
        } catch(err) {
          this.internal.htmlDlyCmdId = setTimeout(function() {
            self.pause(time);
          }, 250);
          return; // Cancel execution and wait for the delayed command.
        }
      }
      if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
        this._html_checkWaitForPlay();
      }
    },
    _html_playHead: function(percent) {
      var self = this,
        media = this.htmlElement.media;

      this._html_load(); // Loads if required and clears any delayed commands.

      // This playHead() method needs a refactor to apply the android fix.

      try {
        if(typeof media.seekable === "object" && media.seekable.length > 0) {
          media.currentTime = percent * media.seekable.end(media.seekable.length-1) / 100;
        } else if(media.duration > 0 && !isNaN(media.duration)) {
          media.currentTime = percent * media.duration / 100;
        } else {
          throw "e";
        }
      } catch(err) {
        this.internal.htmlDlyCmdId = setTimeout(function() {
          self.playHead(percent);
        }, 250);
        return; // Cancel execution and wait for the delayed command.
      }
      if(!this.status.waitForLoad) {
        this._html_checkWaitForPlay();
      }
    },
    _html_checkWaitForPlay: function() {
      if(this.status.waitForPlay) {
        this.status.waitForPlay = false;
        if(this.css.jq.videoPlay.length) {
          this.css.jq.videoPlay.hide();
        }
        if(this.status.video) {
          this.internal.poster.jq.hide();
          this.internal.video.jq.css({'width': this.status.width, 'height': this.status.height});
        }
      }
    },
    _html_setProperty: function(property, value) {
      if(this.html.audio.available) {
        this.htmlElement.audio[property] = value;
      }
      if(this.html.video.available) {
        this.htmlElement.video[property] = value;
      }
    },
    _aurora_setAudio: function(media) {
      var self = this;            
      
      // Always finds a format due to checks in setMedia()
      $.each(this.formats, function(priority, format) {
        if(self.aurora.support[format] && media[format]) {
          self.status.src = media[format];
          self.status.format[format] = true;
          self.status.formatType = format;
      
          return false;
        }
      });
      
      this.aurora.player = new AV.Player.fromURL(this.status.src);
      this._addAuroraEventListeners(this.aurora.player, this.aurora);

      if(this.options.preload === 'auto') {
        this._aurora_load();
        this.status.waitForLoad = false;
      }
    },
    _aurora_resetMedia: function() {
      if (this.aurora.player) {
        this.aurora.player.stop();
      }
    },
    _aurora_clearMedia: function() {
      // Nothing to clear.
    },
    _aurora_load: function() {
      if(this.status.waitForLoad) {
        this.status.waitForLoad = false;
        this.aurora.player.preload();
      }
    },
    _aurora_play: function(time) {
      if (!this.status.waitForLoad) {
        if (!isNaN(time)) {
          this.aurora.player.seek(time);
        }
      }
      if (!this.aurora.player.playing) {
        this.aurora.player.play();
      }
      this.status.waitForLoad = false;
      this._aurora_checkWaitForPlay();
      
      // No event from the player, update UI now.
      this._updateButtons(true);
      this._trigger($.jPlayer.event.play);
    },
    _aurora_pause: function(time) {
      if (!isNaN(time)) {
        this.aurora.player.seek(time * 1000);
      }
      this.aurora.player.pause();
      
      if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
        this._aurora_checkWaitForPlay();
      }
      
      // No event from the player, update UI now.
      this._updateButtons(false);
      this._trigger($.jPlayer.event.pause);
    },
    _aurora_playHead: function(percent) {
      if(this.aurora.player.duration > 0) {
        // The seek() sould be in milliseconds, but the only codec that works with seek (aac.js) uses seconds.
        this.aurora.player.seek(percent * this.aurora.player.duration / 100); // Using seconds
      }
        
      if(!this.status.waitForLoad) {
        this._aurora_checkWaitForPlay();
      }
    },
    _aurora_checkWaitForPlay: function() {
      if(this.status.waitForPlay) {
        this.status.waitForPlay = false;
      }
    },
    _aurora_volume: function(v) {
      this.aurora.player.volume = v * 100;
    },
    _aurora_mute: function(m) {
      if (m) {
        this.aurora.properties.lastvolume = this.aurora.player.volume;
        this.aurora.player.volume = 0;
      } else {
        this.aurora.player.volume = this.aurora.properties.lastvolume;
      }
      this.aurora.properties.muted = m;
    },
    _flash_setAudio: function(media) {
      var self = this;
      try {
        // Always finds a format due to checks in setMedia()
        $.each(this.formats, function(priority, format) {
          if(self.flash.support[format] && media[format]) {
            switch (format) {
              case "m4a" :
              case "fla" :
                self._getMovie().fl_setAudio_m4a(media[format]);
                break;
              case "mp3" :
                self._getMovie().fl_setAudio_mp3(media[format]);
                break;
              case "rtmpa":
                self._getMovie().fl_setAudio_rtmp(media[format]);
                break;
            }
            self.status.src = media[format];
            self.status.format[format] = true;
            self.status.formatType = format;
            return false;
          }
        });

        if(this.options.preload === 'auto') {
          this._flash_load();
          this.status.waitForLoad = false;
        }
      } catch(err) { this._flashError(err); }
    },
    _flash_setVideo: function(media) {
      var self = this;
      try {
        // Always finds a format due to checks in setMedia()
        $.each(this.formats, function(priority, format) {
          if(self.flash.support[format] && media[format]) {
            switch (format) {
              case "m4v" :
              case "flv" :
                self._getMovie().fl_setVideo_m4v(media[format]);
                break;
              case "rtmpv":
                self._getMovie().fl_setVideo_rtmp(media[format]);
                break;    
            }
            self.status.src = media[format];
            self.status.format[format] = true;
            self.status.formatType = format;
            return false;
          }
        });

        if(this.options.preload === 'auto') {
          this._flash_load();
          this.status.waitForLoad = false;
        }
      } catch(err) { this._flashError(err); }
    },
    _flash_resetMedia: function() {
      this.internal.flash.jq.css({'width':'0px', 'height':'0px'}); // Must do via CSS as setting attr() to zero causes a jQuery error in IE.
      this._flash_pause(NaN);
    },
    _flash_clearMedia: function() {
      try {
        this._getMovie().fl_clearMedia();
      } catch(err) { this._flashError(err); }
    },
    _flash_load: function() {
      try {
        this._getMovie().fl_load();
      } catch(err) { this._flashError(err); }
      this.status.waitForLoad = false;
    },
    _flash_play: function(time) {
      try {
        this._getMovie().fl_play(time);
      } catch(err) { this._flashError(err); }
      this.status.waitForLoad = false;
      this._flash_checkWaitForPlay();
    },
    _flash_pause: function(time) {
      try {
        this._getMovie().fl_pause(time);
      } catch(err) { this._flashError(err); }
      if(time > 0) { // Avoids a setMedia() followed by stop() or pause(0) hiding the video play button.
        this.status.waitForLoad = false;
        this._flash_checkWaitForPlay();
      }
    },
    _flash_playHead: function(p) {
      try {
        this._getMovie().fl_play_head(p);
      } catch(err) { this._flashError(err); }
      if(!this.status.waitForLoad) {
        this._flash_checkWaitForPlay();
      }
    },
    _flash_checkWaitForPlay: function() {
      if(this.status.waitForPlay) {
        this.status.waitForPlay = false;
        if(this.css.jq.videoPlay.length) {
          this.css.jq.videoPlay.hide();
        }
        if(this.status.video) {
          this.internal.poster.jq.hide();
          this.internal.flash.jq.css({'width': this.status.width, 'height': this.status.height});
        }
      }
    },
    _flash_volume: function(v) {
      try {
        this._getMovie().fl_volume(v);
      } catch(err) { this._flashError(err); }
    },
    _flash_mute: function(m) {
      try {
        this._getMovie().fl_mute(m);
      } catch(err) { this._flashError(err); }
    },
    _getMovie: function() {
      return document[this.internal.flash.id];
    },
    _getFlashPluginVersion: function() {

      // _getFlashPluginVersion() code influenced by:
      // - FlashReplace 1.01: http://code.google.com/p/flashreplace/
      // - SWFObject 2.2: http://code.google.com/p/swfobject/

      var version = 0,
        flash;
      if(window.ActiveXObject) {
        try {
          flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          if (flash) { // flash will return null when ActiveX is disabled
            var v = flash.GetVariable("$version");
            if(v) {
              v = v.split(" ")[1].split(",");
              version = parseInt(v[0], 10) + "." + parseInt(v[1], 10);
            }
          }
        } catch(e) {}
      }
      else if(navigator.plugins && navigator.mimeTypes.length > 0) {
        flash = navigator.plugins["Shockwave Flash"];
        if(flash) {
          version = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
        }
      }
      return version * 1; // Converts to a number
    },
    _checkForFlash: function (version) {
      var flashOk = false;
      if(this._getFlashPluginVersion() >= version) {
        flashOk = true;
      }
      return flashOk;
    },
    _validString: function(url) {
      return (url && typeof url === "string"); // Empty strings return false
    },
    _limitValue: function(value, min, max) {
      return (value < min) ? min : ((value > max) ? max : value);
    },
    _urlNotSetError: function(context) {
      this._error( {
        type: $.jPlayer.error.URL_NOT_SET,
        context: context,
        message: $.jPlayer.errorMsg.URL_NOT_SET,
        hint: $.jPlayer.errorHint.URL_NOT_SET
      });
    },
    _flashError: function(error) {
      var errorType;
      if(!this.internal.ready) {
        errorType = "FLASH";
      } else {
        errorType = "FLASH_DISABLED";
      }
      this._error( {
        type: $.jPlayer.error[errorType],
        context: this.internal.flash.swf,
        message: $.jPlayer.errorMsg[errorType] + error.message,
        hint: $.jPlayer.errorHint[errorType]
      });
      // Allow the audio player to recover if display:none and then shown again, or with position:fixed on Firefox.
      // This really only affects audio in a media player, as an audio player could easily move the jPlayer element away from such issues.
      this.internal.flash.jq.css({'width':'1px', 'height':'1px'});
    },
    _error: function(error) {
      this._trigger($.jPlayer.event.error, error);
      if(this.options.errorAlerts) {
        this._alert("Error!" + (error.message ? "\n" + error.message : "") + (error.hint ? "\n" + error.hint : "") + "\nContext: " + error.context);
      }
    },
    _warning: function(warning) {
      this._trigger($.jPlayer.event.warning, undefined, warning);
      if(this.options.warningAlerts) {
        this._alert("Warning!" + (warning.message ? "\n" + warning.message : "") + (warning.hint ? "\n" + warning.hint : "") + "\nContext: " + warning.context);
      }
    },
    _alert: function(message) {
      var msg = "jPlayer " + this.version.script + " : id='" + this.internal.self.id +"' : " + message;
      if(!this.options.consoleAlerts) {
        alert(msg);
      } else if(window.console && window.console.log) {
        window.console.log(msg);
      }
    },
    _emulateHtmlBridge: function() {
      var self = this;

      // Emulate methods on jPlayer's DOM element.
      $.each( $.jPlayer.emulateMethods.split(/\s+/g), function(i, name) {
        self.internal.domNode[name] = function(arg) {
          self[name](arg);
        };

      });

      // Bubble jPlayer events to its DOM element.
      $.each($.jPlayer.event, function(eventName,eventType) {
        var nativeEvent = true;
        $.each( $.jPlayer.reservedEvent.split(/\s+/g), function(i, name) {
          if(name === eventName) {
            nativeEvent = false;
            return false;
          }
        });
        if(nativeEvent) {
          self.element.bind(eventType + ".jPlayer.jPlayerHtml", function() { // With .jPlayer & .jPlayerHtml namespaces.
            self._emulateHtmlUpdate();
            var domEvent = document.createEvent("Event");
            domEvent.initEvent(eventName, false, true);
            self.internal.domNode.dispatchEvent(domEvent);
          });
        }
        // The error event would require a special case
      });

      // IE9 has a readyState property on all elements. The document should have it, but all (except media) elements inherit it in IE9. This conflicts with Popcorn, which polls the readyState.
    },
    _emulateHtmlUpdate: function() {
      var self = this;

      $.each( $.jPlayer.emulateStatus.split(/\s+/g), function(i, name) {
        self.internal.domNode[name] = self.status[name];
      });
      $.each( $.jPlayer.emulateOptions.split(/\s+/g), function(i, name) {
        self.internal.domNode[name] = self.options[name];
      });
    },
    _destroyHtmlBridge: function() {
      var self = this;

      // Bridge event handlers are also removed by destroy() through .jPlayer namespace.
      this.element.unbind(".jPlayerHtml"); // Remove all event handlers created by the jPlayer bridge. So you can change the emulateHtml option.

      // Remove the methods and properties
      var emulated = $.jPlayer.emulateMethods + " " + $.jPlayer.emulateStatus + " " + $.jPlayer.emulateOptions;
      $.each( emulated.split(/\s+/g), function(i, name) {
        delete self.internal.domNode[name];
      });
    }
  };

  $.jPlayer.error = {
    FLASH: "e_flash",
    FLASH_DISABLED: "e_flash_disabled",
    NO_SOLUTION: "e_no_solution",
    NO_SUPPORT: "e_no_support",
    URL: "e_url",
    URL_NOT_SET: "e_url_not_set",
    VERSION: "e_version"
  };

  $.jPlayer.errorMsg = {
    FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", // Used in: _flashError()
    FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ", // Used in: _flashError()
    NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", // Used in: _init()
    NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.", // Used in: setMedia()
    URL: "Media URL could not be loaded.", // Used in: jPlayerFlashEvent() and _addHtmlEventListeners()
    URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.", // Used in: load(), play(), pause(), stop() and playHead()
    VERSION: "jPlayer " + $.jPlayer.prototype.version.script + " needs Jplayer.swf version " + $.jPlayer.prototype.version.needFlash + " but found " // Used in: jPlayerReady()
  };

  $.jPlayer.errorHint = {
    FLASH: "Check your swfPath option and that Jplayer.swf is there.",
    FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
    NO_SOLUTION: "Review the jPlayer options: support and supplied.",
    NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
    URL: "Check media URL is valid.",
    URL_NOT_SET: "Use setMedia() to set the media URL.",
    VERSION: "Update jPlayer files."
  };

  $.jPlayer.warning = {
    CSS_SELECTOR_COUNT: "e_css_selector_count",
    CSS_SELECTOR_METHOD: "e_css_selector_method",
    CSS_SELECTOR_STRING: "e_css_selector_string",
    OPTION_KEY: "e_option_key"
  };

  $.jPlayer.warningMsg = {
    CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
    CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
    CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
    OPTION_KEY: "The option requested in jPlayer('option') is undefined."
  };

  $.jPlayer.warningHint = {
    CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
    CSS_SELECTOR_METHOD: "Check your method name.",
    CSS_SELECTOR_STRING: "Check your css selector is a string.",
    OPTION_KEY: "Check your option name."
  };
}));
/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */

/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 150
};

})(jQuery);
/*!
 * imagesLoaded PACKAGED v3.1.6
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function() {
	function e() {}
	function t(e, t) {
		for (var n = e.length; n--;) if (e[n].listener === t) return n;
		return -1
	}
	function n(e) {
		return function() {
			return this[e].apply(this, arguments)
		}
	}
	var i = e.prototype,
		r = this,
		o = r.EventEmitter;
	i.getListeners = function(e) {
		var t, n, i = this._getEvents();
		if ("object" == typeof e) {
			t = {};
			for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
		} else t = i[e] || (i[e] = []);
		return t
	}, i.flattenListeners = function(e) {
		var t, n = [];
		for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
		return n
	}, i.getListenersAsObject = function(e) {
		var t, n = this.getListeners(e);
		return n instanceof Array && (t = {}, t[e] = n), t || n
	}, i.addListener = function(e, n) {
		var i, r = this.getListenersAsObject(e),
			o = "object" == typeof n;
		for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
			listener: n,
			once: !1
		});
		return this
	}, i.on = n("addListener"), i.addOnceListener = function(e, t) {
		return this.addListener(e, {
			listener: t,
			once: !0
		})
	}, i.once = n("addOnceListener"), i.defineEvent = function(e) {
		return this.getListeners(e), this
	}, i.defineEvents = function(e) {
		for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
		return this
	}, i.removeListener = function(e, n) {
		var i, r, o = this.getListenersAsObject(e);
		for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
		return this
	}, i.off = n("removeListener"), i.addListeners = function(e, t) {
		return this.manipulateListeners(!1, e, t)
	}, i.removeListeners = function(e, t) {
		return this.manipulateListeners(!0, e, t)
	}, i.manipulateListeners = function(e, t, n) {
		var i, r, o = e ? this.removeListener : this.addListener,
			s = e ? this.removeListeners : this.addListeners;
		if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]);
		else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
		return this
	}, i.removeEvent = function(e) {
		var t, n = typeof e,
			i = this._getEvents();
		if ("string" === n) delete i[e];
		else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
		else delete this._events;
		return this
	}, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
		var n, i, r, o, s = this.getListenersAsObject(e);
		for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
		return this
	}, i.trigger = n("emitEvent"), i.emit = function(e) {
		var t = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(e, t)
	}, i.setOnceReturnValue = function(e) {
		return this._onceReturnValue = e, this
	}, i._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, i._getEvents = function() {
		return this._events || (this._events = {})
	}, e.noConflict = function() {
		return r.EventEmitter = o, e
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
		return e
	}) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function(e) {
	function t(t) {
		var n = e.event;
		return n.target = n.target || n.srcElement || t, n
	}
	var n = document.documentElement,
		i = function() {};
	n.addEventListener ? i = function(e, t, n) {
		e.addEventListener(t, n, !1)
	} : n.attachEvent && (i = function(e, n, i) {
		e[n + i] = i.handleEvent ?
		function() {
			var n = t(e);
			i.handleEvent.call(i, n)
		} : function() {
			var n = t(e);
			i.call(e, n)
		}, e.attachEvent("on" + n, e[n + i])
	});
	var r = function() {};
	n.removeEventListener ? r = function(e, t, n) {
		e.removeEventListener(t, n, !1)
	} : n.detachEvent && (r = function(e, t, n) {
		e.detachEvent("on" + t, e[t + n]);
		try {
			delete e[t + n]
		} catch (i) {
			e[t + n] = void 0
		}
	});
	var o = {
		bind: i,
		unbind: r
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
}(this), function(e, t) {
	"function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
		return t(e, n, i)
	}) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(this, function(e, t, n) {
	function i(e, t) {
		for (var n in t) e[n] = t[n];
		return e
	}
	function r(e) {
		return "[object Array]" === d.call(e)
	}
	function o(e) {
		var t = [];
		if (r(e)) t = e;
		else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
		else t.push(e);
		return t
	}
	function s(e, t, n) {
		if (!(this instanceof s)) return new s(e, t);
		"string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
		var r = this;
		setTimeout(function() {
			r.check()
		})
	}
	function c(e) {
		this.img = e
	}
	function f(e) {
		this.src = e, v[e] = this
	}
	var a = e.jQuery,
		u = e.console,
		h = u !== void 0,
		d = Object.prototype.toString;
	s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
		this.images = [];
		for (var e = 0, t = this.elements.length; t > e; e++) {
			var n = this.elements[e];
			"IMG" === n.nodeName && this.addImage(n);
			var i = n.nodeType;
			if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
				var c = r[o];
				this.addImage(c)
			}
		}
	}, s.prototype.addImage = function(e) {
		var t = new c(e);
		this.images.push(t)
	}, s.prototype.check = function() {
		function e(e, r) {
			return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
		}
		var t = this,
			n = 0,
			i = this.images.length;
		if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
		for (var r = 0; i > r; r++) {
			var o = this.images[r];
			o.on("confirm", e), o.check()
		}
	}, s.prototype.progress = function(e) {
		this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
		var t = this;
		setTimeout(function() {
			t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
		})
	}, s.prototype.complete = function() {
		var e = this.hasAnyBroken ? "fail" : "done";
		this.isComplete = !0;
		var t = this;
		setTimeout(function() {
			if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
				var n = t.hasAnyBroken ? "reject" : "resolve";
				t.jqDeferred[n](t)
			}
		})
	}, a && (a.fn.imagesLoaded = function(e, t) {
		var n = new s(this, e, t);
		return n.jqDeferred.promise(a(this))
	}), c.prototype = new t, c.prototype.check = function() {
		var e = v[this.img.src] || new f(this.img.src);
		if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
		if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
		var t = this;
		e.on("confirm", function(e, n) {
			return t.confirm(e.isLoaded, n), !0
		}), e.check()
	}, c.prototype.confirm = function(e, t) {
		this.isLoaded = e, this.emit("confirm", this, t)
	};
	var v = {};
	return f.prototype = new t, f.prototype.check = function() {
		if (!this.isChecked) {
			var e = new Image;
			n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
		}
	}, f.prototype.handleEvent = function(e) {
		var t = "on" + e.type;
		this[t] && this[t](e)
	}, f.prototype.onload = function(e) {
		this.confirm(!0, "onload"), this.unbindProxyEvents(e)
	}, f.prototype.onerror = function(e) {
		this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
	}, f.prototype.confirm = function(e, t) {
		this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
	}, f.prototype.unbindProxyEvents = function(e) {
		n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
	}, s
});
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh) 
* Licensed under the MIT License (LICENSE.txt).
* Mousewheel
* Version: 3.1.12
*
* Requires: jQuery 1.2.2+
*/
!
function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
	function b(b) {
		var g = b || window.event,
			h = i.call(arguments, 1),
			j = 0,
			l = 0,
			m = 0,
			n = 0,
			o = 0,
			p = 0;
		if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
			if (1 === g.deltaMode) {
				var q = a.data(this, "mousewheel-line-height");
				j *= q, m *= q, l *= q
			} else if (2 === g.deltaMode) {
				var r = a.data(this, "mousewheel-page-height");
				j *= r, m *= r, l *= r
			}
			if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
				var s = this.getBoundingClientRect();
				o = b.clientX - s.left, p = b.clientY - s.top
			}
			return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
		}
	}
	function c() {
		f = null
	}
	function d(a, b) {
		return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
	}
	var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
		h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
		i = Array.prototype.slice;
	if (a.event.fixHooks) for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
	var k = a.event.special.mousewheel = {
		version: "3.1.12",
		setup: function() {
			if (this.addEventListener) for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
			else this.onmousewheel = b;
			a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
		},
		teardown: function() {
			if (this.removeEventListener) for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
			else this.onmousewheel = null;
			a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
		},
		getLineHeight: function(b) {
			var c = a(b),
				d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
			return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
		},
		getPageHeight: function(b) {
			return a(b).height()
		},
		settings: {
			adjustOldDeltas: !0,
			normalizeOffset: !0
		}
	};
	a.fn.extend({
		mousewheel: function(a) {
			return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
		},
		unmousewheel: function(a) {
			return this.unbind("mousewheel", a)
		}
	})
});
/*! PhotoSwipe - v4.1.1 - 2015-12-24
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!
function(a, b) {
	"function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
}(this, function() {
	"use strict";
	var a = function(a, b, c, d) {
			var e = {
				features: null,
				bind: function(a, b, c, d) {
					var e = (d ? "remove" : "add") + "EventListener";
					b = b.split(" ");
					for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
				},
				isArray: function(a) {
					return a instanceof Array
				},
				createEl: function(a, b) {
					var c = document.createElement(b || "div");
					return a && (c.className = a), c
				},
				getScrollY: function() {
					var a = window.pageYOffset;
					return void 0 !== a ? a : document.documentElement.scrollTop
				},
				unbind: function(a, b, c) {
					e.bind(a, b, c, !0)
				},
				removeClass: function(a, b) {
					var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
					a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
				},
				addClass: function(a, b) {
					e.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
				},
				hasClass: function(a, b) {
					return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
				},
				getChildByClass: function(a, b) {
					for (var c = a.firstChild; c;) {
						if (e.hasClass(c, b)) return c;
						c = c.nextSibling
					}
				},
				arraySearch: function(a, b, c) {
					for (var d = a.length; d--;) if (a[d][c] === b) return d;
					return -1
				},
				extend: function(a, b, c) {
					for (var d in b) if (b.hasOwnProperty(d)) {
						if (c && a.hasOwnProperty(d)) continue;
						a[d] = b[d]
					}
				},
				easing: {
					sine: {
						out: function(a) {
							return Math.sin(a * (Math.PI / 2))
						},
						inOut: function(a) {
							return -(Math.cos(Math.PI * a) - 1) / 2
						}
					},
					cubic: {
						out: function(a) {
							return --a * a * a + 1
						}
					}
				},
				detectFeatures: function() {
					if (e.features) return e.features;
					var a = e.createEl(),
						b = a.style,
						c = "",
						d = {};
					if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
						var f = navigator.userAgent;
						if (/iP(hone|od)/.test(navigator.platform)) {
							var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
							g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && 8 > g && (d.isOldIOSPhone = !0))
						}
						var h = f.match(/Android\s([0-9\.]*)/),
							i = h ? h[1] : 0;
						i = parseFloat(i), i >= 1 && (4.4 > i && (d.isOldAndroid = !0), d.androidVersion = i), d.isMobileOpera = /opera mini|opera mobi/i.test(f)
					}
					for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; 4 > n; n++) {
						c = m[n];
						for (var o = 0; 3 > o; o++) j = l[o], k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j), !d[j] && k in b && (d[j] = k);
						c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
					}
					if (!d.raf) {
						var p = 0;
						d.raf = function(a) {
							var b = (new Date).getTime(),
								c = Math.max(0, 16 - (b - p)),
								d = window.setTimeout(function() {
									a(b + c)
								}, c);
							return p = b + c, d
						}, d.caf = function(a) {
							clearTimeout(a)
						}
					}
					return d.svg = !! document.createElementNS && !! document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, e.features = d, d
				}
			};
			e.detectFeatures(), e.features.oldIE && (e.bind = function(a, b, c, d) {
				b = b.split(" ");
				for (var e, f = (d ? "detach" : "attach") + "Event", g = function() {
						c.handleEvent.call(c)
					}, h = 0; h < b.length; h++) if (e = b[h]) if ("object" == typeof c && c.handleEvent) {
					if (d) {
						if (!c["oldIE" + e]) return !1
					} else c["oldIE" + e] = g;
					a[f]("on" + e, c["oldIE" + e])
				} else a[f]("on" + e, c)
			});
			var f = this,
				g = 25,
				h = 3,
				i = {
					allowPanToNext: !0,
					spacing: .12,
					bgOpacity: 1,
					mouseUsed: !1,
					loop: !0,
					pinchToClose: !0,
					closeOnScroll: !0,
					closeOnVerticalDrag: !0,
					verticalDragRange: .75,
					hideAnimationDuration: 333,
					showAnimationDuration: 333,
					showHideOpacity: !1,
					focus: !0,
					escKey: !0,
					arrowKeys: !0,
					mainScrollEndFriction: .35,
					panEndFriction: .35,
					isClickableElement: function(a) {
						return "A" === a.tagName
					},
					getDoubleTapZoom: function(a, b) {
						return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.33
					},
					maxSpreadZoom: 1.33,
					modal: !0,
					scaleMode: "fit"
				};
			e.extend(i, d);
			var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la = function() {
					return {
						x: 0,
						y: 0
					}
				},
				ma = la(),
				na = la(),
				oa = la(),
				pa = {},
				qa = 0,
				ra = {},
				sa = la(),
				ta = 0,
				ua = !0,
				va = [],
				wa = {},
				xa = !1,
				ya = function(a, b) {
					e.extend(f, b.publicMethods), va.push(a)
				},
				za = function(a) {
					var b = _b();
					return a > b - 1 ? a - b : 0 > a ? b + a : a
				},
				Aa = {},
				Ba = function(a, b) {
					return Aa[a] || (Aa[a] = []), Aa[a].push(b)
				},
				Ca = function(a) {
					var b = Aa[a];
					if (b) {
						var c = Array.prototype.slice.call(arguments);
						c.shift();
						for (var d = 0; d < b.length; d++) b[d].apply(f, c)
					}
				},
				Da = function() {
					return (new Date).getTime()
				},
				Ea = function(a) {
					ia = a, f.bg.style.opacity = a * i.bgOpacity
				},
				Fa = function(a, b, c, d, e) {
					(!xa || e && e !== f.currItem) && (d /= e ? e.fitRatio : f.currItem.fitRatio), a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
				},
				Ga = function(a) {
					da && (a && (s > f.currItem.fitRatio ? xa || (lc(f.currItem, !1, !0), xa = !0) : xa && (lc(f.currItem), xa = !1)), Fa(da, oa.x, oa.y, s))
				},
				Ha = function(a) {
					a.container && Fa(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel, a)
				},
				Ia = function(a, b) {
					b[E] = u + a + "px, 0px" + v
				},
				Ja = function(a, b) {
					if (!i.loop && b) {
						var c = m + (sa.x * qa - a) / sa.x,
							d = Math.round(a - sb.x);
						(0 > c && d > 0 || c >= _b() - 1 && 0 > d) && (a = sb.x + d * i.mainScrollEndFriction)
					}
					sb.x = a, Ia(a, n)
				},
				Ka = function(a, b) {
					var c = tb[a] - ra[a];
					return na[a] + ma[a] + c - c * (b / t)
				},
				La = function(a, b) {
					a.x = b.x, a.y = b.y, b.id && (a.id = b.id)
				},
				Ma = function(a) {
					a.x = Math.round(a.x), a.y = Math.round(a.y)
				},
				Na = null,
				Oa = function() {
					Na && (e.unbind(document, "mousemove", Oa), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Ca("mouseUsed")), Na = setTimeout(function() {
						Na = null
					}, 100)
				},
				Pa = function() {
					e.bind(document, "keydown", f), N.transform && e.bind(f.scrollWrap, "click", f), i.mouseUsed || e.bind(document, "mousemove", Oa), e.bind(window, "resize scroll", f), Ca("bindEvents")
				},
				Qa = function() {
					e.unbind(window, "resize", f), e.unbind(window, "scroll", r.scroll), e.unbind(document, "keydown", f), e.unbind(document, "mousemove", Oa), N.transform && e.unbind(f.scrollWrap, "click", f), U && e.unbind(window, p, f), Ca("unbindEvents")
				},
				Ra = function(a, b) {
					var c = hc(f.currItem, pa, a);
					return b && (ca = c), c
				},
				Sa = function(a) {
					return a || (a = f.currItem), a.initialZoomLevel
				},
				Ta = function(a) {
					return a || (a = f.currItem), a.w > 0 ? i.maxSpreadZoom : 1
				},
				Ua = function(a, b, c, d) {
					return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = Ka(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] ? (c[a] = b.max[a], !0) : !1)
				},
				Va = function() {
					if (E) {
						var b = N.perspective && !G;
						return u = "translate" + (b ? "3d(" : "("), void(v = N.perspective ? ", 0px)" : ")")
					}
					E = "left", e.addClass(a, "pswp--ie"), Ia = function(a, b) {
						b.left = a + "px"
					}, Ha = function(a) {
						var b = a.fitRatio > 1 ? 1 : a.fitRatio,
							c = a.container.style,
							d = b * a.w,
							e = b * a.h;
						c.width = d + "px", c.height = e + "px", c.left = a.initialPosition.x + "px", c.top = a.initialPosition.y + "px"
					}, Ga = function() {
						if (da) {
							var a = da,
								b = f.currItem,
								c = b.fitRatio > 1 ? 1 : b.fitRatio,
								d = c * b.w,
								e = c * b.h;
							a.width = d + "px", a.height = e + "px", a.left = oa.x + "px", a.top = oa.y + "px"
						}
					}
				},
				Wa = function(a) {
					var b = "";
					i.escKey && 27 === a.keyCode ? b = "close" : i.arrowKeys && (37 === a.keyCode ? b = "prev" : 39 === a.keyCode && (b = "next")), b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
				},
				Xa = function(a) {
					a && (X || W || ea || S) && (a.preventDefault(), a.stopPropagation())
				},
				Ya = function() {
					f.setScrollOffset(0, e.getScrollY())
				},
				Za = {},
				$a = 0,
				_a = function(a) {
					Za[a] && (Za[a].raf && I(Za[a].raf), $a--, delete Za[a])
				},
				ab = function(a) {
					Za[a] && _a(a), Za[a] || ($a++, Za[a] = {})
				},
				bb = function() {
					for (var a in Za) Za.hasOwnProperty(a) && _a(a)
				},
				cb = function(a, b, c, d, e, f, g) {
					var h, i = Da();
					ab(a);
					var j = function() {
							if (Za[a]) {
								if (h = Da() - i, h >= d) return _a(a), f(c), void(g && g());
								f((c - b) * e(h / d) + b), Za[a].raf = H(j)
							}
						};
					j()
				},
				db = {
					shout: Ca,
					listen: Ba,
					viewportSize: pa,
					options: i,
					isMainScrollAnimating: function() {
						return ea
					},
					getZoomLevel: function() {
						return s
					},
					getCurrentIndex: function() {
						return m
					},
					isDragging: function() {
						return U
					},
					isZooming: function() {
						return _
					},
					setScrollOffset: function(a, b) {
						ra.x = a, M = ra.y = b, Ca("updateScrollOffset", ra)
					},
					applyZoomPan: function(a, b, c, d) {
						oa.x = b, oa.y = c, s = a, Ga(d)
					},
					init: function() {
						if (!j && !k) {
							var c;
							f.framework = e, f.template = a, f.bg = e.getChildByClass(a, "pswp__bg"), J = a.className, j = !0, N = e.detectFeatures(), H = N.raf, I = N.caf, E = N.transform, L = N.oldIE, f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"), f.container = e.getChildByClass(f.scrollWrap, "pswp__container"), n = f.container.style, f.itemHolders = y = [{
								el: f.container.children[0],
								wrap: 0,
								index: -1
							}, {
								el: f.container.children[1],
								wrap: 0,
								index: -1
							}, {
								el: f.container.children[2],
								wrap: 0,
								index: -1
							}], y[0].el.style.display = y[2].el.style.display = "none", Va(), r = {
								resize: f.updateSize,
								scroll: Ya,
								keydown: Wa,
								click: Xa
							};
							var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
							for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < va.length; c++) f["init" + va[c]]();
							if (b) {
								var g = f.ui = new b(f, e);
								g.init()
							}
							Ca("firstUpdate"), m = m || i.index || 0, (isNaN(m) || 0 > m || m >= _b()) && (m = 0), f.currItem = $b(m), (N.isOldIOSPhone || N.isOldAndroid) && (ua = !1), a.setAttribute("aria-hidden", "false"), i.modal && (ua ? a.style.position = "fixed" : (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")), void 0 === M && (Ca("initialLayout"), M = K = e.getScrollY());
							var l = "pswp--open ";
							for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += G ? "pswp--touch" : "pswp--notouch", l += N.animationName ? " pswp--css_animation" : "", l += N.svg ? " pswp--svg" : "", e.addClass(a, l), f.updateSize(), o = -1, ta = null, c = 0; h > c; c++) Ia((c + o) * sa.x, y[c].el.style);
							L || e.bind(f.scrollWrap, q, f), Ba("initialZoomInEnd", function() {
								f.setContent(y[0], m - 1), f.setContent(y[2], m + 1), y[0].el.style.display = y[2].el.style.display = "block", i.focus && a.focus(), Pa()
							}), f.setContent(y[1], m), f.updateCurrItem(), Ca("afterInit"), ua || (w = setInterval(function() {
								$a || U || _ || s !== f.currItem.initialZoomLevel || f.updateSize()
							}, 1e3)), e.addClass(a, "pswp--visible")
						}
					},
					close: function() {
						j && (j = !1, k = !0, Ca("close"), Qa(), bc(f.currItem, null, !0, f.destroy))
					},
					destroy: function() {
						Ca("destroy"), Wb && clearTimeout(Wb), a.setAttribute("aria-hidden", "true"), a.className = J, w && clearInterval(w), e.unbind(f.scrollWrap, q, f), e.unbind(window, "scroll", f), yb(), bb(), Aa = null
					},
					panTo: function(a, b, c) {
						c || (a > ca.min.x ? a = ca.min.x : a < ca.max.x && (a = ca.max.x), b > ca.min.y ? b = ca.min.y : b < ca.max.y && (b = ca.max.y)), oa.x = a, oa.y = b, Ga()
					},
					handleEvent: function(a) {
						a = a || window.event, r[a.type] && r[a.type](a)
					},
					goTo: function(a) {
						a = za(a);
						var b = a - m;
						ta = b, m = a, f.currItem = $b(m), qa -= b, Ja(sa.x * qa), bb(), ea = !1, f.updateCurrItem()
					},
					next: function() {
						f.goTo(m + 1)
					},
					prev: function() {
						f.goTo(m - 1)
					},
					updateCurrZoomItem: function(a) {
						if (a && Ca("beforeChange", 0), y[1].el.children.length) {
							var b = y[1].el.children[0];
							da = e.hasClass(b, "pswp__zoom-wrap") ? b.style : null
						} else da = null;
						ca = f.currItem.bounds, t = s = f.currItem.initialZoomLevel, oa.x = ca.center.x, oa.y = ca.center.y, a && Ca("afterChange")
					},
					invalidateCurrItems: function() {
						x = !0;
						for (var a = 0; h > a; a++) y[a].item && (y[a].item.needsUpdate = !0)
					},
					updateCurrItem: function(a) {
						if (0 !== ta) {
							var b, c = Math.abs(ta);
							if (!(a && 2 > c)) {
								f.currItem = $b(m), xa = !1, Ca("beforeChange", ta), c >= h && (o += ta + (ta > 0 ? -h : h), c = h);
								for (var d = 0; c > d; d++) ta > 0 ? (b = y.shift(), y[h - 1] = b, o++, Ia((o + 2) * sa.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(), y.unshift(b), o--, Ia(o * sa.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
								if (da && 1 === Math.abs(ta)) {
									var e = $b(z);
									e.initialZoomLevel !== s && (hc(e, pa), lc(e), Ha(e))
								}
								ta = 0, f.updateCurrZoomItem(), z = m, Ca("afterChange")
							}
						}
					},
					updateSize: function(b) {
						if (!ua && i.modal) {
							var c = e.getScrollY();
							if (M !== c && (a.style.top = c + "px", M = c), !b && wa.x === window.innerWidth && wa.y === window.innerHeight) return;
							wa.x = window.innerWidth, wa.y = window.innerHeight, a.style.height = wa.y + "px"
						}
						if (pa.x = f.scrollWrap.clientWidth, pa.y = f.scrollWrap.clientHeight, Ya(), sa.x = pa.x + Math.round(pa.x * i.spacing), sa.y = pa.y, Ja(sa.x * qa), Ca("beforeResize"), void 0 !== o) {
							for (var d, g, j, k = 0; h > k; k++) d = y[k], Ia((k + o) * sa.x, d.el.style), j = m + k - 1, i.loop && _b() > 2 && (j = za(j)), g = $b(j), g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : -1 === d.index && j >= 0 && f.setContent(d, j), g && g.container && (hc(g, pa), lc(g), Ha(g));
							x = !1
						}
						t = s = f.currItem.initialZoomLevel, ca = f.currItem.bounds, ca && (oa.x = ca.center.x, oa.y = ca.center.y, Ga(!0)), Ca("resize")
					},
					zoomTo: function(a, b, c, d, f) {
						b && (t = s, tb.x = Math.abs(b.x) - oa.x, tb.y = Math.abs(b.y) - oa.y, La(na, oa));
						var g = Ra(a, !1),
							h = {};
						Ua("x", g, h, a), Ua("y", g, h, a);
						var i = s,
							j = {
								x: oa.x,
								y: oa.y
							};
						Ma(h);
						var k = function(b) {
								1 === b ? (s = a, oa.x = h.x, oa.y = h.y) : (s = (a - i) * b + i, oa.x = (h.x - j.x) * b + j.x, oa.y = (h.y - j.y) * b + j.y), f && f(b), Ga(1 === b)
							};
						c ? cb("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
					}
				},
				eb = 30,
				fb = 10,
				gb = {},
				hb = {},
				ib = {},
				jb = {},
				kb = {},
				lb = [],
				mb = {},
				nb = [],
				ob = {},
				pb = 0,
				qb = la(),
				rb = 0,
				sb = la(),
				tb = la(),
				ub = la(),
				vb = function(a, b) {
					return a.x === b.x && a.y === b.y
				},
				wb = function(a, b) {
					return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
				},
				xb = function(a, b) {
					return ob.x = Math.abs(a.x - b.x), ob.y = Math.abs(a.y - b.y), Math.sqrt(ob.x * ob.x + ob.y * ob.y)
				},
				yb = function() {
					Y && (I(Y), Y = null)
				},
				zb = function() {
					U && (Y = H(zb), Pb())
				},
				Ab = function() {
					return !("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
				},
				Bb = function(a, b) {
					return a && a !== document ? a.getAttribute("class") && a.getAttribute("class").indexOf("pswp__scroll-wrap") > -1 ? !1 : b(a) ? a : Bb(a.parentNode, b) : !1
				},
				Cb = {},
				Db = function(a, b) {
					return Cb.prevent = !Bb(a.target, i.isClickableElement), Ca("preventDragEvent", a, b, Cb), Cb.prevent
				},
				Eb = function(a, b) {
					return b.x = a.pageX, b.y = a.pageY, b.id = a.identifier, b
				},
				Fb = function(a, b, c) {
					c.x = .5 * (a.x + b.x), c.y = .5 * (a.y + b.y)
				},
				Gb = function(a, b, c) {
					if (a - P > 50) {
						var d = nb.length > 2 ? nb.shift() : {};
						d.x = b, d.y = c, nb.push(d), P = a
					}
				},
				Hb = function() {
					var a = oa.y - f.currItem.initialPosition.y;
					return 1 - Math.abs(a / (pa.y / 2))
				},
				Ib = {},
				Jb = {},
				Kb = [],
				Lb = function(a) {
					for (; Kb.length > 0;) Kb.pop();
					return F ? (ka = 0, lb.forEach(function(a) {
						0 === ka ? Kb[0] = a : 1 === ka && (Kb[1] = a), ka++
					})) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Kb[0] = Eb(a.touches[0], Ib), a.touches.length > 1 && (Kb[1] = Eb(a.touches[1], Jb))) : (Ib.x = a.pageX, Ib.y = a.pageY, Ib.id = "", Kb[0] = Ib), Kb
				},
				Mb = function(a, b) {
					var c, d, e, g, h = 0,
						j = oa[a] + b[a],
						k = b[a] > 0,
						l = sb.x + b.x,
						m = sb.x - mb.x;
					return c = j > ca.min[a] || j < ca.max[a] ? i.panEndFriction : 1, j = oa[a] + b[a] * c, !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (da ? "h" !== fa || "x" !== a || W || (k ? (j > ca.min[a] && (c = i.panEndFriction, h = ca.min[a] - j, d = ca.min[a] - na[a]), (0 >= d || 0 > m) && _b() > 1 ? (g = l, 0 > m && l > mb.x && (g = mb.x)) : ca.min.x !== ca.max.x && (e = j)) : (j < ca.max[a] && (c = i.panEndFriction, h = j - ca.max[a], d = na[a] - ca.max[a]), (0 >= d || m > 0) && _b() > 1 ? (g = l, m > 0 && l < mb.x && (g = mb.x)) : ca.min.x !== ca.max.x && (e = j))) : g = l, "x" !== a) ? void(ea || Z || s > f.currItem.fitRatio && (oa[a] += b[a] * c)) : (void 0 !== g && (Ja(g, !0), Z = g === mb.x ? !1 : !0), ca.min.x !== ca.max.x && (void 0 !== e ? oa.x = e : Z || (oa.x += b.x * c)), void 0 !== g)
				},
				Nb = function(a) {
					if (!("mousedown" === a.type && a.button > 0)) {
						if (Zb) return void a.preventDefault();
						if (!T || "mousedown" !== a.type) {
							if (Db(a, !0) && a.preventDefault(), Ca("pointerDown"), F) {
								var b = e.arraySearch(lb, a.pointerId, "id");
								0 > b && (b = lb.length), lb[b] = {
									x: a.pageX,
									y: a.pageY,
									id: a.pointerId
								}
							}
							var c = Lb(a),
								d = c.length;
							$ = null, bb(), U && 1 !== d || (U = ga = !0, e.bind(window, p, f), R = ja = ha = S = Z = X = V = W = !1, fa = null, Ca("firstTouchStart", c), La(na, oa), ma.x = ma.y = 0, La(jb, c[0]), La(kb, jb), mb.x = sa.x * qa, nb = [{
								x: jb.x,
								y: jb.y
							}], P = O = Da(), Ra(s, !0), yb(), zb()), !_ && d > 1 && !ea && !Z && (t = s, W = !1, _ = V = !0, ma.y = ma.x = 0, La(na, oa), La(gb, c[0]), La(hb, c[1]), Fb(gb, hb, ub), tb.x = Math.abs(ub.x) - oa.x, tb.y = Math.abs(ub.y) - oa.y, aa = ba = xb(gb, hb))
						}
					}
				},
				Ob = function(a) {
					if (a.preventDefault(), F) {
						var b = e.arraySearch(lb, a.pointerId, "id");
						if (b > -1) {
							var c = lb[b];
							c.x = a.pageX, c.y = a.pageY
						}
					}
					if (U) {
						var d = Lb(a);
						if (fa || X || _) $ = d;
						else if (sb.x !== sa.x * qa) fa = "h";
						else {
							var f = Math.abs(d[0].x - jb.x) - Math.abs(d[0].y - jb.y);
							Math.abs(f) >= fb && (fa = f > 0 ? "h" : "v", $ = d)
						}
					}
				},
				Pb = function() {
					if ($) {
						var a = $.length;
						if (0 !== a) if (La(gb, $[0]), ib.x = gb.x - jb.x, ib.y = gb.y - jb.y, _ && a > 1) {
							if (jb.x = gb.x, jb.y = gb.y, !ib.x && !ib.y && vb($[1], hb)) return;
							La(hb, $[1]), W || (W = !0, Ca("zoomGestureStarted"));
							var b = xb(gb, hb),
								c = Ub(b);
							c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ja = !0);
							var d = 1,
								e = Sa(),
								g = Ta();
							if (e > c) if (i.pinchToClose && !ja && t <= f.currItem.initialZoomLevel) {
								var h = e - c,
									j = 1 - h / (e / 1.2);
								Ea(j), Ca("onPinchClose", j), ha = !0
							} else d = (e - c) / e, d > 1 && (d = 1), c = e - d * (e / 3);
							else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
							0 > d && (d = 0), aa = b, Fb(gb, hb, qb), ma.x += qb.x - ub.x, ma.y += qb.y - ub.y, La(ub, qb), oa.x = Ka("x", c), oa.y = Ka("y", c), R = c > s, s = c, Ga()
						} else {
							if (!fa) return;
							if (ga && (ga = !1, Math.abs(ib.x) >= fb && (ib.x -= $[0].x - kb.x), Math.abs(ib.y) >= fb && (ib.y -= $[0].y - kb.y)), jb.x = gb.x, jb.y = gb.y, 0 === ib.x && 0 === ib.y) return;
							if ("v" === fa && i.closeOnVerticalDrag && !Ab()) {
								ma.y += ib.y, oa.y += ib.y;
								var k = Hb();
								return S = !0, Ca("onVerticalDrag", k), Ea(k), void Ga()
							}
							Gb(Da(), gb.x, gb.y), X = !0, ca = f.currItem.bounds;
							var l = Mb("x", ib);
							l || (Mb("y", ib), Ma(oa), Ga())
						}
					}
				},
				Qb = function(a) {
					if (N.isOldAndroid) {
						if (T && "mouseup" === a.type) return;
						a.type.indexOf("touch") > -1 && (clearTimeout(T), T = setTimeout(function() {
							T = 0
						}, 600))
					}
					Ca("pointerUp"), Db(a, !1) && a.preventDefault();
					var b;
					if (F) {
						var c = e.arraySearch(lb, a.pointerId, "id");
						if (c > -1) if (b = lb.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
						else {
							var d = {
								4: "mouse",
								2: "touch",
								3: "pen"
							};
							b.type = d[a.pointerType], b.type || (b.type = a.pointerType || "mouse")
						}
					}
					var g, h = Lb(a),
						j = h.length;
					if ("mouseup" === a.type && (j = 0), 2 === j) return $ = null, !0;
					1 === j && La(kb, h[0]), 0 !== j || fa || ea || (b || ("mouseup" === a.type ? b = {
						x: a.pageX,
						y: a.pageY,
						type: "mouse"
					} : a.changedTouches && a.changedTouches[0] && (b = {
						x: a.changedTouches[0].pageX,
						y: a.changedTouches[0].pageY,
						type: "touch"
					})), Ca("touchRelease", a, b));
					var k = -1;
					if (0 === j && (U = !1, e.unbind(window, p, f), yb(), _ ? k = 0 : -1 !== rb && (k = Da() - rb)), rb = 1 === j ? Da() : -1, g = -1 !== k && 150 > k ? "zoom" : "swipe", _ && 2 > j && (_ = !1, 1 === j && (g = "zoomPointerUp"), Ca("zoomGestureEnded")), $ = null, X || W || ea || S) if (bb(), Q || (Q = Rb()), Q.calculateSwipeSpeed("x"), S) {
						var l = Hb();
						if (l < i.verticalDragRange) f.close();
						else {
							var m = oa.y,
								n = ia;
							cb("verticalDrag", 0, 1, 300, e.easing.cubic.out, function(a) {
								oa.y = (f.currItem.initialPosition.y - m) * a + m, Ea((1 - n) * a + n), Ga()
							}), Ca("onVerticalDrag", 1)
						}
					} else {
						if ((Z || ea) && 0 === j) {
							var o = Tb(g, Q);
							if (o) return;
							g = "zoomPointerUp"
						}
						if (!ea) return "swipe" !== g ? void Vb() : void(!Z && s > f.currItem.fitRatio && Sb(Q))
					}
				},
				Rb = function() {
					var a, b, c = {
						lastFlickOffset: {},
						lastFlickDist: {},
						lastFlickSpeed: {},
						slowDownRatio: {},
						slowDownRatioReverse: {},
						speedDecelerationRatio: {},
						speedDecelerationRatioAbs: {},
						distanceOffset: {},
						backAnimDestination: {},
						backAnimStarted: {},
						calculateSwipeSpeed: function(d) {
							nb.length > 1 ? (a = Da() - P + 50, b = nb[nb.length - 2][d]) : (a = Da() - O, b = kb[d]), c.lastFlickOffset[d] = jb[d] - b, c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]), c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a : c.lastFlickSpeed[d] = 0, Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0), c.slowDownRatio[d] = .95, c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d], c.speedDecelerationRatio[d] = 1
						},
						calculateOverBoundsAnimOffset: function(a, b) {
							c.backAnimStarted[a] || (oa[a] > ca.min[a] ? c.backAnimDestination[a] = ca.min[a] : oa[a] < ca.max[a] && (c.backAnimDestination[a] = ca.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, cb("bounceZoomPan" + a, oa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out, function(b) {
								oa[a] = b, Ga()
							}))))
						},
						calculateAnimOffset: function(a) {
							c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, oa[a] += c.distanceOffset[a])
						},
						panAnimLoop: function() {
							return Za.zoomPan && (Za.zoomPan.raf = H(c.panAnimLoop), c.now = Da(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Ga(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05) ? (oa.x = Math.round(oa.x), oa.y = Math.round(oa.y), Ga(), void _a("zoomPan")) : void 0
						}
					};
					return c
				},
				Sb = function(a) {
					return a.calculateSwipeSpeed("y"), ca = f.currItem.bounds, a.backAnimDestination = {}, a.backAnimStarted = {}, Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (ab("zoomPan"), a.lastNow = Da(), void a.panAnimLoop())
				},
				Tb = function(a, b) {
					var c;
					ea || (pb = m);
					var d;
					if ("swipe" === a) {
						var g = jb.x - kb.x,
							h = b.lastFlickDist.x < 10;
						g > eb && (h || b.lastFlickOffset.x > 20) ? d = -1 : -eb > g && (h || b.lastFlickOffset.x < -20) && (d = 1)
					}
					var j;
					d && (m += d, 0 > m ? (m = i.loop ? _b() - 1 : 0, j = !0) : m >= _b() && (m = i.loop ? 0 : _b() - 1, j = !0), (!j || i.loop) && (ta += d, qa -= d, c = !0));
					var k, l = sa.x * qa,
						n = Math.abs(l - sb.x);
					return c || l > sb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333, pb === m && (c = !1), ea = !0, Ca("mainScrollAnimStart"), cb("mainScroll", sb.x, l, k, e.easing.cubic.out, Ja, function() {
						bb(), ea = !1, pb = -1, (c || pb !== m) && f.updateCurrItem(), Ca("mainScrollAnimComplete")
					}), c && f.updateCurrItem(!0), c
				},
				Ub = function(a) {
					return 1 / ba * a * t
				},
				Vb = function() {
					var a = s,
						b = Sa(),
						c = Ta();
					b > s ? a = b : s > c && (a = c);
					var d, g = 1,
						h = ia;
					return ha && !R && !ja && b > s ? (f.close(), !0) : (ha && (d = function(a) {
						Ea((g - h) * a + h)
					}), f.zoomTo(a, 0, 200, e.easing.cubic.out, d), !0)
				};
			ya("Gestures", {
				publicMethods: {
					initGestures: function() {
						var a = function(a, b, c, d, e) {
								A = a + b, B = a + c, C = a + d, D = e ? a + e : ""
							};
						F = N.pointerEvent, F && N.touch && (N.touch = !1), F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"), G = !0) : a("mouse", "down", "move", "up"), p = B + " " + C + " " + D, q = A, F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), f.likelyTouchDevice = G, r[A] = Nb, r[B] = Ob, r[C] = Qb, D && (r[D] = r[C]), N.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[A], r.mousemove = r[B], r.mouseup = r[C]), G || (i.allowPanToNext = !1)
					}
				}
			});
			var Wb, Xb, Yb, Zb, $b, _b, ac, bc = function(b, c, d, g) {
					Wb && clearTimeout(Wb), Zb = !0, Yb = !0;
					var h;
					b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
					var j = d ? i.hideAnimationDuration : i.showAnimationDuration,
						k = function() {
							_a("initialZoom"), d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Ea(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Ca("initialZoom" + (d ? "OutEnd" : "InEnd"))), g && g(), Zb = !1
						};
					if (!j || !h || void 0 === h.x) return Ca("initialZoom" + (d ? "Out" : "In")), s = b.initialZoomLevel, La(oa, b.initialPosition), Ga(), a.style.opacity = d ? 0 : 1, Ea(1), void(j ? setTimeout(function() {
						k()
					}, j) : k());
					var n = function() {
							var c = l,
								g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
							b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"), d || (s = h.w / b.w, oa.x = h.x, oa.y = h.y - K, f[g ? "template" : "bg"].style.opacity = .001, Ga()), ab("initialZoom"), d && !c && e.removeClass(a, "pswp--animated-in"), g && (d ? e[(c ? "remove" : "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
								e.addClass(a, "pswp--animate_opacity")
							}, 30)), Wb = setTimeout(function() {
								if (Ca("initialZoom" + (d ? "Out" : "In")), d) {
									var f = h.w / b.w,
										i = {
											x: oa.x,
											y: oa.y
										},
										l = s,
										m = ia,
										n = function(b) {
											1 === b ? (s = f, oa.x = h.x, oa.y = h.y - M) : (s = (f - l) * b + l, oa.x = (h.x - i.x) * b + i.x, oa.y = (h.y - M - i.y) * b + i.y), Ga(), g ? a.style.opacity = 1 - b : Ea(m - b * m)
										};
									c ? cb("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Wb = setTimeout(k, j + 20))
								} else s = b.initialZoomLevel, La(oa, b.initialPosition), Ga(), Ea(1), g ? a.style.opacity = 1 : Ea(1), Wb = setTimeout(k, j + 20)
							}, d ? 25 : 90)
						};
					n()
				},
				cc = {},
				dc = [],
				ec = {
					index: 0,
					errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
					forceProgressiveLoading: !1,
					preload: [1, 1],
					getNumItemsFn: function() {
						return Xb.length
					}
				},
				fc = function() {
					return {
						center: {
							x: 0,
							y: 0
						},
						max: {
							x: 0,
							y: 0
						},
						min: {
							x: 0,
							y: 0
						}
					}
				},
				gc = function(a, b, c) {
					var d = a.bounds;
					d.center.x = Math.round((cc.x - b) / 2), d.center.y = Math.round((cc.y - c) / 2) + a.vGap.top, d.max.x = b > cc.x ? Math.round(cc.x - b) : d.center.x, d.max.y = c > cc.y ? Math.round(cc.y - c) + a.vGap.top : d.center.y, d.min.x = b > cc.x ? 0 : d.center.x, d.min.y = c > cc.y ? a.vGap.top : d.center.y
				},
				hc = function(a, b, c) {
					if (a.src && !a.loadError) {
						var d = !c;
						if (d && (a.vGap || (a.vGap = {
							top: 0,
							bottom: 0
						}), Ca("parseVerticalMargin", a)), cc.x = b.x, cc.y = b.y - a.vGap.top - a.vGap.bottom, d) {
							var e = cc.x / a.w,
								f = cc.y / a.h;
							a.fitRatio = f > e ? e : f;
							var g = i.scaleMode;
							"orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio), c > 1 && (c = 1), a.initialZoomLevel = c, a.bounds || (a.bounds = fc())
						}
						if (!c) return;
						return gc(a, a.w * c, a.h * c), d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center), a.bounds
					}
					return a.w = a.h = 0, a.initialZoomLevel = a.fitRatio = 1, a.bounds = fc(), a.initialPosition = a.bounds.center, a.bounds
				},
				ic = function(a, b, c, d, e, g) {
					b.loadError || d && (b.imageAppended = !0, lc(b, d, b === f.currItem && xa), c.appendChild(d), g && setTimeout(function() {
						b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
					}, 500))
				},
				jc = function(a) {
					a.loading = !0, a.loaded = !1;
					var b = a.img = e.createEl("pswp__img", "img"),
						c = function() {
							a.loading = !1, a.loaded = !0, a.loadComplete ? a.loadComplete(a) : a.img = null, b.onload = b.onerror = null, b = null
						};
					return b.onload = c, b.onerror = function() {
						a.loadError = !0, c()
					}, b.src = a.src, b
				},
				kc = function(a, b) {
					return a.src && a.loadError && a.container ? (b && (a.container.innerHTML = ""), a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0) : void 0
				},
				lc = function(a, b, c) {
					if (a.src) {
						b || (b = a.container.lastChild);
						var d = c ? a.w : Math.round(a.w * a.fitRatio),
							e = c ? a.h : Math.round(a.h * a.fitRatio);
						a.placeholder && !a.loaded && (a.placeholder.style.width = d + "px", a.placeholder.style.height = e + "px"), b.style.width = d + "px", b.style.height = e + "px"
					}
				},
				mc = function() {
					if (dc.length) {
						for (var a, b = 0; b < dc.length; b++) a = dc[b], a.holder.index === a.index && ic(a.index, a.item, a.baseDiv, a.img, !1, a.clearPlaceholder);
						dc = []
					}
				};
			ya("Controller", {
				publicMethods: {
					lazyLoadItem: function(a) {
						a = za(a);
						var b = $b(a);
						b && (!b.loaded && !b.loading || x) && (Ca("gettingData", a, b), b.src && jc(b))
					},
					initController: function() {
						e.extend(i, ec, !0), f.items = Xb = c, $b = f.getItemAt, _b = i.getNumItemsFn, ac = i.loop, _b() < 3 && (i.loop = !1), Ba("beforeChange", function(a) {
							var b, c = i.preload,
								d = null === a ? !0 : a >= 0,
								e = Math.min(c[0], _b()),
								g = Math.min(c[1], _b());
							for (b = 1;
							(d ? g : e) >= b; b++) f.lazyLoadItem(m + b);
							for (b = 1;
							(d ? e : g) >= b; b++) f.lazyLoadItem(m - b)
						}), Ba("initialLayout", function() {
							f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
						}), Ba("mainScrollAnimComplete", mc), Ba("initialZoomInEnd", mc), Ba("destroy", function() {
							for (var a, b = 0; b < Xb.length; b++) a = Xb[b], a.container && (a.container = null), a.placeholder && (a.placeholder = null), a.img && (a.img = null), a.preloader && (a.preloader = null), a.loadError && (a.loaded = a.loadError = !1);
							dc = null
						})
					},
					getItemAt: function(a) {
						return a >= 0 && void 0 !== Xb[a] ? Xb[a] : !1
					},
					allowProgressiveImg: function() {
						return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
					},
					setContent: function(a, b) {
						i.loop && (b = za(b));
						var c = f.getItemAt(a.index);
						c && (c.container = null);
						var d, g = f.getItemAt(b);
						if (!g) return void(a.el.innerHTML = "");
						Ca("gettingData", b, g), a.index = b, a.item = g;
						var h = g.container = e.createEl("pswp__zoom-wrap");
						if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), kc(g), hc(g, pa), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.opacity = 1, d.src = g.src, lc(g, d), ic(b, g, h, d, !0));
						else {
							if (g.loadComplete = function(c) {
								if (j) {
									if (a && a.index === b) {
										if (kc(c, !0)) return c.loadComplete = c.img = null, hc(c, pa), Ha(c), void(a.index === m && f.updateCurrZoomItem());
										c.imageAppended ? !Zb && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : N.transform && (ea || Zb) ? dc.push({
											item: c,
											baseDiv: h,
											img: c.img,
											index: b,
											holder: a,
											clearPlaceholder: !0
										}) : ic(b, c, h, c.img, ea || Zb, !0)
									}
									c.loadComplete = null, c.img = null, Ca("imageLoadComplete", b, c)
								}
							}, e.features.transform) {
								var k = "pswp__img pswp__img--placeholder";
								k += g.msrc ? "" : " pswp__img--placeholder--blank";
								var l = e.createEl(k, g.msrc ? "img" : "");
								g.msrc && (l.src = g.msrc), lc(g, l), h.appendChild(l), g.placeholder = l
							}
							g.loading || jc(g), f.allowProgressiveImg() && (!Yb && N.transform ? dc.push({
								item: g,
								baseDiv: h,
								img: g.img,
								index: b,
								holder: a
							}) : ic(b, g, h, g.img, !0, !0))
						}
						Yb || b !== m ? Ha(g) : (da = h.style, bc(g, d || g.img)), a.el.innerHTML = "", a.el.appendChild(h)
					},
					cleanSlide: function(a) {
						a.img && (a.img.onload = a.img.onerror = null), a.loaded = a.loading = a.img = a.imageAppended = !1
					}
				}
			});
			var nc, oc = {},
				pc = function(a, b, c) {
					var d = document.createEvent("CustomEvent"),
						e = {
							origEvent: a,
							target: a.target,
							releasePoint: b,
							pointerType: c || "touch"
						};
					d.initCustomEvent("pswpTap", !0, !0, e), a.target.dispatchEvent(d)
				};
			ya("Tap", {
				publicMethods: {
					initTap: function() {
						Ba("firstTouchStart", f.onTapStart), Ba("touchRelease", f.onTapRelease), Ba("destroy", function() {
							oc = {}, nc = null
						})
					},
					onTapStart: function(a) {
						a.length > 1 && (clearTimeout(nc), nc = null)
					},
					onTapRelease: function(a, b) {
						if (b && !X && !V && !$a) {
							var c = b;
							if (nc && (clearTimeout(nc), nc = null, wb(c, oc))) return void Ca("doubleTap", c);
							if ("mouse" === b.type) return void pc(a, b, "mouse");
							var d = a.target.tagName.toUpperCase();
							if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void pc(a, b);
							La(oc, c), nc = setTimeout(function() {
								pc(a, b), nc = null
							}, 300)
						}
					}
				}
			});
			var qc;
			ya("DesktopZoom", {
				publicMethods: {
					initDesktopZoom: function() {
						L || (G ? Ba("mouseUsed", function() {
							f.setupDesktopZoom()
						}) : f.setupDesktopZoom(!0))
					},
					setupDesktopZoom: function(b) {
						qc = {};
						var c = "wheel mousewheel DOMMouseScroll";
						Ba("bindEvents", function() {
							e.bind(a, c, f.handleMouseWheel)
						}), Ba("unbindEvents", function() {
							qc && e.unbind(a, c, f.handleMouseWheel)
						}), f.mouseZoomedIn = !1;
						var d, g = function() {
								f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1), 1 > s ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"), h()
							},
							h = function() {
								d && (e.removeClass(a, "pswp--dragging"), d = !1)
							};
						Ba("resize", g), Ba("afterChange", g), Ba("pointerDown", function() {
							f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
						}), Ba("pointerUp", h), b || g()
					},
					handleMouseWheel: function(a) {
						if (s <= f.currItem.fitRatio) return i.modal && (!i.closeOnScroll || $a || U ? a.preventDefault() : E && Math.abs(a.deltaY) > 2 && (l = !0, f.close())), !0;
						if (a.stopPropagation(), qc.x = 0, "deltaX" in a) 1 === a.deltaMode ? (qc.x = 18 * a.deltaX, qc.y = 18 * a.deltaY) : (qc.x = a.deltaX, qc.y = a.deltaY);
						else if ("wheelDelta" in a) a.wheelDeltaX && (qc.x = -.16 * a.wheelDeltaX), a.wheelDeltaY ? qc.y = -.16 * a.wheelDeltaY : qc.y = -.16 * a.wheelDelta;
						else {
							if (!("detail" in a)) return;
							qc.y = a.detail
						}
						Ra(s, !0);
						var b = oa.x - qc.x,
							c = oa.y - qc.y;
						(i.modal || b <= ca.min.x && b >= ca.max.x && c <= ca.min.y && c >= ca.max.y) && a.preventDefault(), f.panTo(b, c)
					},
					toggleDesktopZoom: function(b) {
						b = b || {
							x: pa.x / 2 + ra.x,
							y: pa.y / 2 + ra.y
						};
						var c = i.getDoubleTapZoom(!0, f.currItem),
							d = s === c;
						f.mouseZoomedIn = !d, f.zoomTo(d ? f.currItem.initialZoomLevel : c, b, 333), e[(d ? "remove" : "add") + "Class"](a, "pswp--zoomed-in")
					}
				}
			});
			var rc, sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc, Dc = {
				history: !0,
				galleryUID: 1
			},
				Ec = function() {
					return Bc.hash.substring(1)
				},
				Fc = function() {
					rc && clearTimeout(rc), tc && clearTimeout(tc)
				},
				Gc = function() {
					var a = Ec(),
						b = {};
					if (a.length < 5) return b;
					var c, d = a.split("&");
					for (c = 0; c < d.length; c++) if (d[c]) {
						var e = d[c].split("=");
						e.length < 2 || (b[e[0]] = e[1])
					}
					if (i.galleryPIDs) {
						var f = b.pid;
						for (b.pid = 0, c = 0; c < Xb.length; c++) if (Xb[c].pid === f) {
							b.pid = c;
							break
						}
					} else b.pid = parseInt(b.pid, 10) - 1;
					return b.pid < 0 && (b.pid = 0), b
				},
				Hc = function() {
					if (tc && clearTimeout(tc), $a || U) return void(tc = setTimeout(Hc, 500));
					uc ? clearTimeout(sc) : uc = !0;
					var a = m + 1,
						b = $b(m);
					b.hasOwnProperty("pid") && (a = b.pid);
					var c = xc + "&gid=" + i.galleryUID + "&pid=" + a;
					yc || -1 === Bc.hash.indexOf(c) && (Ac = !0);
					var d = Bc.href.split("#")[0] + "#" + c;
					Cc ? "#" + c !== window.location.hash && history[yc ? "replaceState" : "pushState"]("", document.title, d) : yc ? Bc.replace(d) : Bc.hash = c, yc = !0, sc = setTimeout(function() {
						uc = !1
					}, 60)
				};
			ya("History", {
				publicMethods: {
					initHistory: function() {
						if (e.extend(i, Dc, !0), i.history) {
							Bc = window.location, Ac = !1, zc = !1, yc = !1, xc = Ec(), Cc = "pushState" in history, xc.indexOf("gid=") > -1 && (xc = xc.split("&gid=")[0], xc = xc.split("?gid=")[0]), Ba("afterChange", f.updateURL), Ba("unbindEvents", function() {
								e.unbind(window, "hashchange", f.onHashChange)
							});
							var a = function() {
									wc = !0, zc || (Ac ? history.back() : xc ? Bc.hash = xc : Cc ? history.pushState("", document.title, Bc.pathname + Bc.search) : Bc.hash = ""), Fc()
								};
							Ba("unbindEvents", function() {
								l && a()
							}), Ba("destroy", function() {
								wc || a()
							}), Ba("firstUpdate", function() {
								m = Gc().pid
							});
							var b = xc.indexOf("pid=");
							b > -1 && (xc = xc.substring(0, b), "&" === xc.slice(-1) && (xc = xc.slice(0, -1))), setTimeout(function() {
								j && e.bind(window, "hashchange", f.onHashChange)
							}, 40)
						}
					},
					onHashChange: function() {
						return Ec() === xc ? (zc = !0, void f.close()) : void(uc || (vc = !0, f.goTo(Gc().pid), vc = !1))
					},
					updateURL: function() {
						Fc(), vc || (yc ? rc = setTimeout(Hc, 800) : Hc())
					}
				}
			}), e.extend(f, db)
		};
	return a
});
/*! PhotoSwipe Default UI - 4.1.1 - 2015-12-24
* http://photoswipe.com
* Copyright (c) 2015 Dmitry Semenov; */
!
function(a, b) {
	"function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipeUI_Default = b()
}(this, function() {
	"use strict";
	var a = function(a, b) {
			var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this,
				w = !1,
				x = !0,
				y = !0,
				z = {
					barsSize: {
						top: 44,
						bottom: "auto"
					},
					closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
					timeToIdle: 4e3,
					timeToIdleOutside: 1e3,
					loadingIndicatorDelay: 1e3,
					addCaptionHTMLFn: function(a, b) {
						return a.title ? (b.children[0].innerHTML = a.title, !0) : (b.children[0].innerHTML = "", !1)
					},
					closeEl: !0,
					captionEl: !0,
					fullscreenEl: !0,
					zoomEl: !0,
					shareEl: !0,
					counterEl: !0,
					arrowEl: !0,
					preloaderEl: !0,
					tapToClose: !1,
					tapToToggleControls: !0,
					clickToCloseNonZoomable: !0,
					shareButtons: [{
						id: "facebook",
						label: "Share on Facebook",
						url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
					}, {
						id: "twitter",
						label: "Tweet",
						url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
					}, {
						id: "pinterest",
						label: "Pin it",
						url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
					}, {
						id: "download",
						label: "Download image",
						url: "{{raw_image_url}}",
						download: !0
					}],
					getImageURLForShare: function() {
						return a.currItem.src || ""
					},
					getPageURLForShare: function() {
						return window.location.href
					},
					getTextForShare: function() {
						return a.currItem.title || ""
					},
					indexIndicatorSep: " / ",
					fitControlsWidth: 1200
				},
				A = function(a) {
					if (r) return !0;
					a = a || window.event, q.timeToIdle && q.mouseUsed && !k && K();
					for (var c, d, e = a.target || a.srcElement, f = e.getAttribute("class") || "", g = 0; g < S.length; g++) c = S[g], c.onTap && f.indexOf("pswp__" + c.name) > -1 && (c.onTap(), d = !0);
					if (d) {
						a.stopPropagation && a.stopPropagation(), r = !0;
						var h = b.features.isOldAndroid ? 600 : 30;
						s = setTimeout(function() {
							r = !1
						}, h)
					}
				},
				B = function() {
					return !a.likelyTouchDevice || q.mouseUsed || screen.width > q.fitControlsWidth
				},
				C = function(a, c, d) {
					b[(d ? "add" : "remove") + "Class"](a, "pswp__" + c)
				},
				D = function() {
					var a = 1 === q.getNumItemsFn();
					a !== p && (C(d, "ui--one-slide", a), p = a)
				},
				E = function() {
					C(i, "share-modal--hidden", y)
				},
				F = function() {
					return y = !y, y ? (b.removeClass(i, "pswp__share-modal--fade-in"), setTimeout(function() {
						y && E()
					}, 300)) : (E(), setTimeout(function() {
						y || b.addClass(i, "pswp__share-modal--fade-in")
					}, 30)), y || H(), !1
				},
				G = function(b) {
					b = b || window.event;
					var c = b.target || b.srcElement;
					return a.shout("shareLinkClick", b, c), c.href ? c.hasAttribute("download") ? !0 : (window.open(c.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), y || F(), !1) : !1
				},
				H = function() {
					for (var a, b, c, d, e, f = "", g = 0; g < q.shareButtons.length; g++) a = q.shareButtons[g], c = q.getImageURLForShare(a), d = q.getPageURLForShare(a), e = q.getTextForShare(a), b = a.url.replace("{{url}}", encodeURIComponent(d)).replace("{{image_url}}", encodeURIComponent(c)).replace("{{raw_image_url}}", c).replace("{{text}}", encodeURIComponent(e)), f += '<a href="' + b + '" target="_blank" class="pswp__share--' + a.id + '"' + (a.download ? "download" : "") + ">" + a.label + "</a>", q.parseShareButtonOut && (f = q.parseShareButtonOut(a, f));
					i.children[0].innerHTML = f, i.children[0].onclick = G
				},
				I = function(a) {
					for (var c = 0; c < q.closeElClasses.length; c++) if (b.hasClass(a, "pswp__" + q.closeElClasses[c])) return !0
				},
				J = 0,
				K = function() {
					clearTimeout(u), J = 0, k && v.setIdle(!1)
				},
				L = function(a) {
					a = a ? a : window.event;
					var b = a.relatedTarget || a.toElement;
					b && "HTML" !== b.nodeName || (clearTimeout(u), u = setTimeout(function() {
						v.setIdle(!0)
					}, q.timeToIdleOutside))
				},
				M = function() {
					q.fullscreenEl && !b.features.isOldAndroid && (c || (c = v.getFullscreenAPI()), c ? (b.bind(document, c.eventK, v.updateFullscreen), v.updateFullscreen(), b.addClass(a.template, "pswp--supports-fs")) : b.removeClass(a.template, "pswp--supports-fs"))
				},
				N = function() {
					q.preloaderEl && (O(!0), l("beforeChange", function() {
						clearTimeout(o), o = setTimeout(function() {
							a.currItem && a.currItem.loading ? (!a.allowProgressiveImg() || a.currItem.img && !a.currItem.img.naturalWidth) && O(!1) : O(!0)
						}, q.loadingIndicatorDelay)
					}), l("imageLoadComplete", function(b, c) {
						a.currItem === c && O(!0)
					}))
				},
				O = function(a) {
					n !== a && (C(m, "preloader--active", !a), n = a)
				},
				P = function(a) {
					var c = a.vGap;
					if (B()) {
						var g = q.barsSize;
						if (q.captionEl && "auto" === g.bottom) if (f || (f = b.createEl("pswp__caption pswp__caption--fake"), f.appendChild(b.createEl("pswp__caption__center")), d.insertBefore(f, e), b.addClass(d, "pswp__ui--fit")), q.addCaptionHTMLFn(a, f, !0)) {
							var h = f.clientHeight;
							c.bottom = parseInt(h, 10) || 44
						} else c.bottom = g.top;
						else c.bottom = "auto" === g.bottom ? 0 : g.bottom;
						c.top = g.top
					} else c.top = c.bottom = 0
				},
				Q = function() {
					q.timeToIdle && l("mouseUsed", function() {
						b.bind(document, "mousemove", K), b.bind(document, "mouseout", L), t = setInterval(function() {
							J++, 2 === J && v.setIdle(!0)
						}, q.timeToIdle / 2)
					})
				},
				R = function() {
					l("onVerticalDrag", function(a) {
						x && .95 > a ? v.hideControls() : !x && a >= .95 && v.showControls()
					});
					var a;
					l("onPinchClose", function(b) {
						x && .9 > b ? (v.hideControls(), a = !0) : a && !x && b > .9 && v.showControls()
					}), l("zoomGestureEnded", function() {
						a = !1, a && !x && v.showControls()
					})
				},
				S = [{
					name: "caption",
					option: "captionEl",
					onInit: function(a) {
						e = a
					}
				}, {
					name: "share-modal",
					option: "shareEl",
					onInit: function(a) {
						i = a
					},
					onTap: function() {
						F()
					}
				}, {
					name: "button--share",
					option: "shareEl",
					onInit: function(a) {
						h = a
					},
					onTap: function() {
						F()
					}
				}, {
					name: "button--zoom",
					option: "zoomEl",
					onTap: a.toggleDesktopZoom
				}, {
					name: "counter",
					option: "counterEl",
					onInit: function(a) {
						g = a
					}
				}, {
					name: "button--close",
					option: "closeEl",
					onTap: a.close
				}, {
					name: "button--arrow--left",
					option: "arrowEl",
					onTap: a.prev
				}, {
					name: "button--arrow--right",
					option: "arrowEl",
					onTap: a.next
				}, {
					name: "button--fs",
					option: "fullscreenEl",
					onTap: function() {
						c.isFullscreen() ? c.exit() : c.enter()
					}
				}, {
					name: "preloader",
					option: "preloaderEl",
					onInit: function(a) {
						m = a
					}
				}],
				T = function() {
					var a, c, e, f = function(d) {
							if (d) for (var f = d.length, g = 0; f > g; g++) {
								a = d[g], c = a.className;
								for (var h = 0; h < S.length; h++) e = S[h], c.indexOf("pswp__" + e.name) > -1 && (q[e.option] ? (b.removeClass(a, "pswp__element--disabled"), e.onInit && e.onInit(a)) : b.addClass(a, "pswp__element--disabled"))
							}
						};
					f(d.children);
					var g = b.getChildByClass(d, "pswp__top-bar");
					g && f(g.children)
				};
			v.init = function() {
				b.extend(a.options, z, !0), q = a.options, d = b.getChildByClass(a.scrollWrap, "pswp__ui"), l = a.listen, R(), l("beforeChange", v.update), l("doubleTap", function(b) {
					var c = a.currItem.initialZoomLevel;
					a.getZoomLevel() !== c ? a.zoomTo(c, b, 333) : a.zoomTo(q.getDoubleTapZoom(!1, a.currItem), b, 333)
				}), l("preventDragEvent", function(a, b, c) {
					var d = a.target || a.srcElement;
					d && d.getAttribute("class") && a.type.indexOf("mouse") > -1 && (d.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(d.tagName)) && (c.prevent = !1)
				}), l("bindEvents", function() {
					b.bind(d, "pswpTap click", A), b.bind(a.scrollWrap, "pswpTap", v.onGlobalTap), a.likelyTouchDevice || b.bind(a.scrollWrap, "mouseover", v.onMouseOver)
				}), l("unbindEvents", function() {
					y || F(), t && clearInterval(t), b.unbind(document, "mouseout", L), b.unbind(document, "mousemove", K), b.unbind(d, "pswpTap click", A), b.unbind(a.scrollWrap, "pswpTap", v.onGlobalTap), b.unbind(a.scrollWrap, "mouseover", v.onMouseOver), c && (b.unbind(document, c.eventK, v.updateFullscreen), c.isFullscreen() && (q.hideAnimationDuration = 0, c.exit()), c = null)
				}), l("destroy", function() {
					q.captionEl && (f && d.removeChild(f), b.removeClass(e, "pswp__caption--empty")), i && (i.children[0].onclick = null), b.removeClass(d, "pswp__ui--over-close"), b.addClass(d, "pswp__ui--hidden"), v.setIdle(!1)
				}), q.showAnimationDuration || b.removeClass(d, "pswp__ui--hidden"), l("initialZoomIn", function() {
					q.showAnimationDuration && b.removeClass(d, "pswp__ui--hidden")
				}), l("initialZoomOut", function() {
					b.addClass(d, "pswp__ui--hidden")
				}), l("parseVerticalMargin", P), T(), q.shareEl && h && i && (y = !0), D(), Q(), M(), N()
			}, v.setIdle = function(a) {
				k = a, C(d, "ui--idle", a)
			}, v.update = function() {
				x && a.currItem ? (v.updateIndexIndicator(), q.captionEl && (q.addCaptionHTMLFn(a.currItem, e), C(e, "caption--empty", !a.currItem.title)), w = !0) : w = !1, y || F(), D()
			}, v.updateFullscreen = function(d) {
				d && setTimeout(function() {
					a.setScrollOffset(0, b.getScrollY())
				}, 50), b[(c.isFullscreen() ? "add" : "remove") + "Class"](a.template, "pswp--fs")
			}, v.updateIndexIndicator = function() {
				q.counterEl && (g.innerHTML = a.getCurrentIndex() + 1 + q.indexIndicatorSep + q.getNumItemsFn())
			}, v.onGlobalTap = function(c) {
				c = c || window.event;
				var d = c.target || c.srcElement;
				if (!r) if (c.detail && "mouse" === c.detail.pointerType) {
					if (I(d)) return void a.close();
					b.hasClass(d, "pswp__img") && (1 === a.getZoomLevel() && a.getZoomLevel() <= a.currItem.fitRatio ? q.clickToCloseNonZoomable && a.close() : a.toggleDesktopZoom(c.detail.releasePoint))
				} else if (q.tapToToggleControls && (x ? v.hideControls() : v.showControls()), q.tapToClose && (b.hasClass(d, "pswp__img") || I(d))) return void a.close()
			}, v.onMouseOver = function(a) {
				a = a || window.event;
				var b = a.target || a.srcElement;
				C(d, "ui--over-close", I(b))
			}, v.hideControls = function() {
				b.addClass(d, "pswp__ui--hidden"), x = !1
			}, v.showControls = function() {
				x = !0, w || v.update(), b.removeClass(d, "pswp__ui--hidden")
			}, v.supportsFullscreen = function() {
				var a = document;
				return !!(a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen)
			}, v.getFullscreenAPI = function() {
				var b, c = document.documentElement,
					d = "fullscreenchange";
				return c.requestFullscreen ? b = {
					enterK: "requestFullscreen",
					exitK: "exitFullscreen",
					elementK: "fullscreenElement",
					eventK: d
				} : c.mozRequestFullScreen ? b = {
					enterK: "mozRequestFullScreen",
					exitK: "mozCancelFullScreen",
					elementK: "mozFullScreenElement",
					eventK: "moz" + d
				} : c.webkitRequestFullscreen ? b = {
					enterK: "webkitRequestFullscreen",
					exitK: "webkitExitFullscreen",
					elementK: "webkitFullscreenElement",
					eventK: "webkit" + d
				} : c.msRequestFullscreen && (b = {
					enterK: "msRequestFullscreen",
					exitK: "msExitFullscreen",
					elementK: "msFullscreenElement",
					eventK: "MSFullscreenChange"
				}), b && (b.enter = function() {
					return j = q.closeOnScroll, q.closeOnScroll = !1, "webkitRequestFullscreen" !== this.enterK ? a.template[this.enterK]() : void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
				}, b.exit = function() {
					return q.closeOnScroll = j, document[this.exitK]()
				}, b.isFullscreen = function() {
					return document[this.elementK]
				}), b
			}
		};
	return a
});
/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
!
function(a, b, c, d) {
	function e(b, c) {
		this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) {
			this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
		}, this)), a.each(e.Pipe, a.proxy(function(b, c) {
			this._pipe.push({
				filter: c.filter,
				run: a.proxy(c.run, this)
			})
		}, this)), this.setup(), this.initialize()
	}
	function f(a) {
		if (a.touches !== d) return {
			x: a.touches[0].pageX,
			y: a.touches[0].pageY
		};
		if (a.touches === d) {
			if (a.pageX !== d) return {
				x: a.pageX,
				y: a.pageY
			};
			if (a.pageX === d) return {
				x: a.clientX,
				y: a.clientY
			}
		}
	}
	function g(a) {
		var b, d, e = c.createElement("div"),
			f = a;
		for (b in f) if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
		return [!1]
	}
	function h() {
		return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
	}
	function i() {
		return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
	}
	function j() {
		return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
	}
	function k() {
		return "ontouchstart" in b || !! navigator.msMaxTouchPoints
	}
	function l() {
		return b.navigator.msPointerEnabled
	}
	var m, n, o;
	m = {
		start: 0,
		startX: 0,
		startY: 0,
		current: 0,
		currentX: 0,
		currentY: 0,
		offsetX: 0,
		offsetY: 0,
		distance: null,
		startTime: 0,
		endTime: 0,
		updatedX: 0,
		targetEl: null
	}, n = {
		isTouch: !1,
		isScrolling: !1,
		isSwiping: !1,
		direction: !1,
		inMotion: !1
	}, o = {
		_onDragStart: null,
		_onDragMove: null,
		_onDragEnd: null,
		_transitionEnd: null,
		_resizer: null,
		_responsiveCall: null,
		_goToLoop: null,
		_checkVisibile: null
	}, e.Defaults = {
		items: 3,
		loop: !1,
		center: !1,
		mouseDrag: !0,
		touchDrag: !0,
		pullDrag: !0,
		freeDrag: !1,
		margin: 0,
		stagePadding: 0,
		merge: !1,
		mergeFit: !0,
		autoWidth: !1,
		startPosition: 0,
		rtl: !1,
		smartSpeed: 250,
		fluidSpeed: !1,
		dragEndSpeed: !1,
		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: b,
		responsiveClass: !1,
		fallbackEasing: "swing",
		info: !1,
		nestedItemSelector: !1,
		itemElement: "div",
		stageElement: "div",
		themeClass: "owl-theme",
		baseClass: "owl-carousel",
		itemClass: "owl-item",
		centerClass: "center",
		activeClass: "active"
	}, e.Width = {
		Default: "default",
		Inner: "inner",
		Outer: "outer"
	}, e.Plugins = {}, e.Pipe = [{
		filter: ["width", "items", "settings"],
		run: function(a) {
			a.current = this._items && this._items[this.relative(this._current)]
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			var a = this._clones,
				b = this.$stage.children(".cloned");
			(b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			var a, b, c = this._clones,
				d = this._items,
				e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
			for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			var a, b, c, d = this.settings.rtl ? 1 : -1,
				e = (this.width() / this.settings.items).toFixed(3),
				f = 0;
			for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			var b, c, d = (this.width() / this.settings.items).toFixed(3),
				e = {
					width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
					"padding-left": this.settings.stagePadding || "",
					"padding-right": this.settings.stagePadding || ""
				};
			if (this.$stage.css(e), e = {
				width: this.settings.autoWidth ? "auto" : d - this.settings.margin
			}, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) {
				return a > 1
			}).length > 0) for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
			else this.$stage.children().css(e)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(a) {
			a.current && this.reset(this.$stage.children().index(a.current))
		}
	}, {
		filter: ["position"],
		run: function() {
			this.animate(this.coordinates(this._current))
		}
	}, {
		filter: ["width", "position", "items", "settings"],
		run: function() {
			var a, b, c, d, e = this.settings.rtl ? 1 : -1,
				f = 2 * this.settings.stagePadding,
				g = this.coordinates(this.current()) + f,
				h = g + this.width() * e,
				i = [];
			for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
			this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
		}
	}], e.prototype.initialize = function() {
		if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
			var b, c, e;
			if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
		}
		this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
	}, e.prototype.setup = function() {
		var b = this.viewport(),
			c = this.options.responsive,
			d = -1,
			e = null;
		c ? (a.each(c, function(a) {
			b >= a && a > d && (d = Number(a))
		}), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
			return b.replace(/\b owl-responsive-\S+/g, "")
		}).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
			property: {
				name: "settings",
				value: e
			}
		}), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
			property: {
				name: "settings",
				value: this.settings
			}
		}))
	}, e.prototype.optionsLogic = function() {
		this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
	}, e.prototype.prepare = function(b) {
		var c = this.trigger("prepare", {
			content: b
		});
		return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
			content: c.data
		}), c.data
	}, e.prototype.update = function() {
		for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
			return this[a]
		}, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
		this._invalidated = {}
	}, e.prototype.width = function(a) {
		switch (a = a || e.Width.Default) {
		case e.Width.Inner:
		case e.Width.Outer:
			return this._width;
		default:
			return this._width - 2 * this.settings.stagePadding + this.settings.margin
		}
	}, e.prototype.refresh = function() {
		if (0 === this._items.length) return !1;
		(new Date).getTime();
		this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
	}, e.prototype.eventsCall = function() {
		this.e._onDragStart = a.proxy(function(a) {
			this.onDragStart(a)
		}, this), this.e._onDragMove = a.proxy(function(a) {
			this.onDragMove(a)
		}, this), this.e._onDragEnd = a.proxy(function(a) {
			this.onDragEnd(a)
		}, this), this.e._onResize = a.proxy(function(a) {
			this.onResize(a)
		}, this), this.e._transitionEnd = a.proxy(function(a) {
			this.transitionEnd(a)
		}, this), this.e._preventClick = a.proxy(function(a) {
			this.preventClick(a)
		}, this)
	}, e.prototype.onThrottledResize = function() {
		b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
	}, e.prototype.onResize = function() {
		return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
	}, e.prototype.eventsRouter = function(a) {
		var b = a.type;
		"mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
	}, e.prototype.internalEvents = function() {
		var c = (k(), l());
		this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
			this.eventsRouter(a)
		}, this)), this.$stage.on("dragstart", function() {
			return !1
		}), this.$stage.get(0).onselectstart = function() {
			return !1
		}) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
			this.eventsRouter(a)
		}, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
	}, e.prototype.onDragStart = function(d) {
		var e, g, h, i;
		if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
		if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
		else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
		this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
			this.eventsRouter(a)
		}, this))
	}, e.prototype.onDragMove = function(a) {
		var c, e, g, h, i, j;
		this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
	}, e.prototype.onDragEnd = function(b) {
		var d, e, f;
		if (this.state.isTouch) {
			if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
			this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
		}
	}, e.prototype.removeClick = function(c) {
		this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
			a(c).off("click.preventClick")
		}, 300)
	}, e.prototype.preventClick = function(b) {
		b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
	}, e.prototype.getTransformProperty = function() {
		var a, c;
		return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
	}, e.prototype.closest = function(b) {
		var c = -1,
			d = 30,
			e = this.width(),
			f = this.coordinates();
		return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
			return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
		}, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
	}, e.prototype.animate = function(b) {
		this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
			transform: "translate3d(" + b + "px,0px, 0px)",
			transition: this.speed() / 1e3 + "s"
		}) : this.state.isTouch ? this.$stage.css({
			left: b + "px"
		}) : this.$stage.animate({
			left: b
		}, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
			this.state.inMotion && this.transitionEnd()
		}, this))
	}, e.prototype.current = function(a) {
		if (a === d) return this._current;
		if (0 === this._items.length) return d;
		if (a = this.normalize(a), this._current !== a) {
			var b = this.trigger("change", {
				property: {
					name: "position",
					value: a
				}
			});
			b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
				property: {
					name: "position",
					value: this._current
				}
			})
		}
		return this._current
	}, e.prototype.invalidate = function(a) {
		this._invalidated[a] = !0
	}, e.prototype.reset = function(a) {
		a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
	}, e.prototype.normalize = function(b, c) {
		var e = c ? this._items.length : this._items.length + this._clones.length;
		return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
	}, e.prototype.relative = function(a) {
		return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
	}, e.prototype.maximum = function(a) {
		var b, c, d, e = 0,
			f = this.settings;
		if (a) return this._items.length - 1;
		if (!f.loop && f.center) b = this._items.length - 1;
		else if (f.loop || f.center) if (f.loop || f.center) b = this._items.length + f.items;
		else {
			if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
			for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
			(d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
		} else b = this._items.length - f.items;
		return b
	}, e.prototype.minimum = function(a) {
		return a ? 0 : this._clones.length / 2
	}, e.prototype.items = function(a) {
		return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
	}, e.prototype.mergers = function(a) {
		return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
	}, e.prototype.clones = function(b) {
		var c = this._clones.length / 2,
			e = c + this._items.length,
			f = function(a) {
				return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
			};
		return b === d ? a.map(this._clones, function(a, b) {
			return f(b)
		}) : a.map(this._clones, function(a, c) {
			return a === b ? f(c) : null
		})
	}, e.prototype.speed = function(a) {
		return a !== d && (this._speed = a), this._speed
	}, e.prototype.coordinates = function(b) {
		var c = null;
		return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
			return this.coordinates(b)
		}, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
	}, e.prototype.duration = function(a, b, c) {
		return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
	}, e.prototype.to = function(c, d) {
		if (this.settings.loop) {
			var e = c - this.relative(this.current()),
				f = this.current(),
				g = this.current(),
				h = this.current() + e,
				i = 0 > g - h ? !0 : !1,
				j = this._clones.length + this._items.length;
			h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
				this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
			}, this), 30)
		} else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
	}, e.prototype.next = function(a) {
		a = a || !1, this.to(this.relative(this.current()) + 1, a)
	}, e.prototype.prev = function(a) {
		a = a || !1, this.to(this.relative(this.current()) - 1, a)
	}, e.prototype.transitionEnd = function(a) {
		return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
	}, e.prototype.viewport = function() {
		var d;
		if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
		else if (b.innerWidth) d = b.innerWidth;
		else {
			if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
			d = c.documentElement.clientWidth
		}
		return d
	}, e.prototype.replace = function(b) {
		this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
			return 1 === this.nodeType
		}).each(a.proxy(function(a, b) {
			b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
		}, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
	}, e.prototype.add = function(a, b) {
		b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
			content: a,
			position: b
		}), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
			content: a,
			position: b
		})
	}, e.prototype.remove = function(a) {
		a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
			content: this._items[a],
			position: a
		}), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
			content: null,
			position: a
		}))
	}, e.prototype.addTriggerableEvents = function() {
		var b = a.proxy(function(b, c) {
			return a.proxy(function(a) {
				a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
			}, this)
		}, this);
		a.each({
			next: this.next,
			prev: this.prev,
			to: this.to,
			destroy: this.destroy,
			refresh: this.refresh,
			replace: this.replace,
			add: this.add,
			remove: this.remove
		}, a.proxy(function(a, c) {
			this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
		}, this))
	}, e.prototype.watchVisibility = function() {
		function c(a) {
			return a.offsetWidth > 0 && a.offsetHeight > 0
		}
		function d() {
			c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
		}
		c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
	}, e.prototype.preloadAutoWidthImages = function(b) {
		var c, d, e, f;
		c = 0, d = this, b.each(function(g, h) {
			e = a(h), f = new Image, f.onload = function() {
				c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
			}, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
		})
	}, e.prototype.destroy = function() {
		this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
		for (var d in this._plugins) this._plugins[d].destroy();
		(this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
			return !1
		})), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
	}, e.prototype.op = function(a, b, c) {
		var d = this.settings.rtl;
		switch (b) {
		case "<":
			return d ? a > c : c > a;
		case ">":
			return d ? c > a : a > c;
		case ">=":
			return d ? c >= a : a >= c;
		case "<=":
			return d ? a >= c : c >= a
		}
	}, e.prototype.on = function(a, b, c, d) {
		a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
	}, e.prototype.off = function(a, b, c, d) {
		a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
	}, e.prototype.trigger = function(b, c, d) {
		var e = {
			item: {
				count: this._items.length,
				index: this.current()
			}
		},
			f = a.camelCase(a.grep(["on", b, d], function(a) {
				return a
			}).join("-").toLowerCase()),
			g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
				relatedTarget: this
			}, e, c));
		return this._supress[b] || (a.each(this._plugins, function(a, b) {
			b.onTrigger && b.onTrigger(g)
		}), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
	}, e.prototype.suppress = function(b) {
		a.each(b, a.proxy(function(a, b) {
			this._supress[b] = !0
		}, this))
	}, e.prototype.release = function(b) {
		a.each(b, a.proxy(function(a, b) {
			delete this._supress[b]
		}, this))
	}, e.prototype.browserSupport = function() {
		if (this.support3d = j(), this.support3d) {
			this.transformVendor = i();
			var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
			this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
		}
		this.state.orientation = b.orientation
	}, a.fn.owlCarousel = function(b) {
		return this.each(function() {
			a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
		})
	}, a.fn.owlCarousel.Constructor = e
}(window.Zepto || window.jQuery, window, document), function(a, b) {
	var c = function(b) {
			this._core = b, this._loaded = [], this._handlers = {
				"initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
					if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
						this.load(b)
					}, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
				}, this)
			}, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
		};
	c.Defaults = {
		lazyLoad: !1
	}, c.prototype.load = function(c) {
		var d = this._core.$stage.children().eq(c),
			e = d && d.find(".owl-lazy");
		!e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
			var e, f = a(d),
				g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
			this._core.trigger("load", {
				element: f,
				url: g
			}, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
				f.css("opacity", 1), this._core.trigger("loaded", {
					element: f,
					url: g
				}, "lazy")
			}, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
				f.css({
					"background-image": "url(" + g + ")",
					opacity: "1"
				}), this._core.trigger("loaded", {
					element: f,
					url: g
				}, "lazy")
			}, this), e.src = g)
		}, this)), this._loaded.push(d.get(0)))
	}, c.prototype.destroy = function() {
		var a, b;
		for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
		for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
}(window.Zepto || window.jQuery, window, document), function(a) {
	var b = function(c) {
			this._core = c, this._handlers = {
				"initialized.owl.carousel": a.proxy(function() {
					this._core.settings.autoHeight && this.update()
				}, this),
				"changed.owl.carousel": a.proxy(function(a) {
					this._core.settings.autoHeight && "position" == a.property.name && this.update()
				}, this),
				"loaded.owl.lazy": a.proxy(function(a) {
					this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
				}, this)
			}, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
		};
	b.Defaults = {
		autoHeight: !1,
		autoHeightClass: "owl-height"
	}, b.prototype.update = function() {
		this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
	}, b.prototype.destroy = function() {
		var a, b;
		for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
		for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
}(window.Zepto || window.jQuery, window, document), function(a, b, c) {
	var d = function(b) {
			this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
				"resize.owl.carousel": a.proxy(function(a) {
					this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
				}, this),
				"refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
					this._playing && this.stop()
				}, this),
				"prepared.owl.carousel": a.proxy(function(b) {
					var c = a(b.content).find(".owl-video");
					c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
				}, this)
			}, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
				this.play(a)
			}, this))
		};
	d.Defaults = {
		video: !1,
		videoHeight: !1,
		videoWidth: !1
	}, d.prototype.fetch = function(a, b) {
		var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
			d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
			e = a.attr("data-width") || this._core.settings.videoWidth,
			f = a.attr("data-height") || this._core.settings.videoHeight,
			g = a.attr("href");
		if (!g) throw new Error("Missing video URL.");
		if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
		else {
			if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
			c = "vimeo"
		}
		d = d[6], this._videos[g] = {
			type: c,
			id: d,
			width: e,
			height: f
		}, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
	}, d.prototype.thumbnail = function(b, c) {
		var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
			h = b.find("img"),
			i = "src",
			j = "",
			k = this._core.settings,
			l = function(a) {
				e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
			};
		return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
			type: "GET",
			url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function(a) {
				f = a[0].thumbnail_large, l(f)
			}
		}))
	}, d.prototype.stop = function() {
		this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
	}, d.prototype.play = function(b) {
		this._core.trigger("play", null, "video"), this._playing && this.stop();
		var c, d, e = a(b.target || b.srcElement),
			f = e.closest("." + this._core.settings.itemClass),
			g = this._videos[f.attr("data-video")],
			h = g.width || "100%",
			i = g.height || this._core.$stage.height();
		"youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
	}, d.prototype.isInFullScreen = function() {
		var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
		return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
	}, d.prototype.destroy = function() {
		var a, b;
		this._core.$element.off("click.owl.video");
		for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
		for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Video = d
}(window.Zepto || window.jQuery, window, document), function(a, b, c, d) {
	var e = function(b) {
			this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
				"change.owl.carousel": a.proxy(function(a) {
					"position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
				}, this),
				"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
					this.swapping = "translated" == a.type
				}, this),
				"translate.owl.carousel": a.proxy(function() {
					this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
				}, this)
			}, this.core.$element.on(this.handlers)
		};
	e.Defaults = {
		animateOut: !1,
		animateIn: !1
	}, e.prototype.swap = function() {
		if (1 === this.core.settings.items && this.core.support3d) {
			this.core.speed(0);
			var b, c = a.proxy(this.clear, this),
				d = this.core.$stage.children().eq(this.previous),
				e = this.core.$stage.children().eq(this.next),
				f = this.core.settings.animateIn,
				g = this.core.settings.animateOut;
			this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
				left: b + "px"
			}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
		}
	}, e.prototype.clear = function(b) {
		a(b.target).css({
			left: ""
		}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
	}, e.prototype.destroy = function() {
		var a, b;
		for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
		for (b in Object.getOwnPropertyNames(this))"function" != typeof this[b] && (this[b] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, window, document), function(a, b, c) {
	var d = function(b) {
			this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
				"translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
					this.autoplay()
				}, this),
				"play.owl.autoplay": a.proxy(function(a, b, c) {
					this.play(b, c)
				}, this),
				"stop.owl.autoplay": a.proxy(function() {
					this.stop()
				}, this),
				"mouseover.owl.autoplay": a.proxy(function() {
					this.core.settings.autoplayHoverPause && this.pause()
				}, this),
				"mouseleave.owl.autoplay": a.proxy(function() {
					this.core.settings.autoplayHoverPause && this.autoplay()
				}, this)
			}, this.core.$element.on(this.handlers)
		};
	d.Defaults = {
		autoplay: !1,
		autoplayTimeout: 5e3,
		autoplayHoverPause: !1,
		autoplaySpeed: !1
	}, d.prototype.autoplay = function() {
		this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() {
			this.play()
		}, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
	}, d.prototype.play = function() {
		return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
	}, d.prototype.stop = function() {
		b.clearInterval(this.interval)
	}, d.prototype.pause = function() {
		b.clearInterval(this.interval)
	}, d.prototype.destroy = function() {
		var a, c;
		b.clearInterval(this.interval);
		for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
		for (c in Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
}(window.Zepto || window.jQuery, window, document), function(a) {
	"use strict";
	var b = function(c) {
			this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
				next: this._core.next,
				prev: this._core.prev,
				to: this._core.to
			}, this._handlers = {
				"prepared.owl.carousel": a.proxy(function(b) {
					this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
				}, this),
				"add.owl.carousel": a.proxy(function(b) {
					this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
				}, this),
				"remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
					this._core.settings.dotsData && this._templates.splice(a.position, 1)
				}, this),
				"change.owl.carousel": a.proxy(function(a) {
					if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
						var b = this._core.current(),
							c = this._core.maximum(),
							d = this._core.minimum();
						a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
					}
				}, this),
				"changed.owl.carousel": a.proxy(function(a) {
					"position" == a.property.name && this.draw()
				}, this),
				"refreshed.owl.carousel": a.proxy(function() {
					this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
				}, this)
			}, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
		};
	b.Defaults = {
		nav: !1,
		navRewind: !0,
		navText: ["prev", "next"],
		navSpeed: !1,
		navElement: "div",
		navContainer: !1,
		navContainerClass: "owl-nav",
		navClass: ["owl-prev", "owl-next"],
		slideBy: 1,
		dotClass: "owl-dot",
		dotsClass: "owl-dots",
		dots: !0,
		dotsEach: !1,
		dotData: !1,
		dotsSpeed: !1,
		dotsContainer: !1,
		controlsClass: "owl-controls"
	}, b.prototype.initialize = function() {
		var b, c, d = this._core.settings;
		d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
			var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
			b.preventDefault(), this.to(c, d.dotsSpeed)
		}, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
			this.prev(d.navSpeed)
		}, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
			this.next(d.navSpeed)
		}, this));
		for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
	}, b.prototype.destroy = function() {
		var a, b, c, d;
		for (a in this._handlers) this.$element.off(a, this._handlers[a]);
		for (b in this._controls) this._controls[b].remove();
		for (d in this.overides) this._core[d] = this._overrides[d];
		for (c in Object.getOwnPropertyNames(this))"function" != typeof this[c] && (this[c] = null)
	}, b.prototype.update = function() {
		var a, b, c, d = this._core.settings,
			e = this._core.clones().length / 2,
			f = e + this._core.items().length,
			g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
		if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy) for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
			start: a - e,
			end: a - e + g - 1
		}), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
	}, b.prototype.draw = function() {
		var b, c, d = "",
			e = this._core.settings,
			f = (this._core.$stage.children(), this._core.relative(this._core.current()));
		if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
			if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
				for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
				this._controls.$indicators.html(d)
			} else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
			this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
		}
		this._controls.$indicators.toggle(e.dots)
	}, b.prototype.onTrigger = function(b) {
		var c = this._core.settings;
		b.page = {
			index: a.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
		}
	}, b.prototype.current = function() {
		var b = this._core.relative(this._core.current());
		return a.grep(this._pages, function(a) {
			return a.start <= b && a.end >= b
		}).pop()
	}, b.prototype.getPosition = function(b) {
		var c, d, e = this._core.settings;
		return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
	}, b.prototype.next = function(b) {
		a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
	}, b.prototype.prev = function(b) {
		a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
	}, b.prototype.to = function(b, c, d) {
		var e;
		d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
	}, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
}(window.Zepto || window.jQuery, window, document), function(a, b) {
	"use strict";
	var c = function(d) {
			this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
				"initialized.owl.carousel": a.proxy(function() {
					"URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
				}, this),
				"prepared.owl.carousel": a.proxy(function(b) {
					var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
					this._hashes[c] = b.content
				}, this)
			}, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
				var a = b.location.hash.substring(1),
					c = this._core.$stage.children(),
					d = this._hashes[a] && c.index(this._hashes[a]) || 0;
				return a ? void this._core.to(d, !1, !0) : !1
			}, this))
		};
	c.Defaults = {
		URLhashListener: !1
	}, c.prototype.destroy = function() {
		var c, d;
		a(b).off("hashchange.owl.navigation");
		for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
		for (d in Object.getOwnPropertyNames(this))"function" != typeof this[d] && (this[d] = null)
	}, a.fn.owlCarousel.Constructor.Plugins.Hash = c
}(window.Zepto || window.jQuery, window, document);

/* Lazy Load XT 1.1.0 | MIT License */
!
function(a, b, c, d) {
	function e(a, b) {
		return a[b] === d ? t[b] : a[b]
	}
	function f() {
		var a = b.pageYOffset;
		return a === d ? r.scrollTop : a
	}
	function g(a, b) {
		var c = t["on" + a];
		c && (w(c) ? c.call(b[0]) : (c.addClass && b.addClass(c.addClass), c.removeClass && b.removeClass(c.removeClass))), b.trigger("lazy" + a, [b]), k()
	}
	function h(b) {
		g(b.type, a(this).off(p, h))
	}
	function i(c) {
		if (z.length) {
			c = c || t.forceLoad, A = 1 / 0;
			var d, e, i = f(),
				j = b.innerHeight || r.clientHeight,
				k = b.innerWidth || r.clientWidth;
			for (d = 0, e = z.length; e > d; d++) {
				var l, m = z[d],
					q = m[0],
					s = m[n],
					u = !1,
					v = c || y(q, o) < 0;
				if (a.contains(r, q)) {
					if (c || !s.visibleOnly || q.offsetWidth || q.offsetHeight) {
						if (!v) {
							var x = q.getBoundingClientRect(),
								B = s.edgeX,
								C = s.edgeY;
							l = x.top + i - C - j, v = i >= l && x.bottom > -C && x.left <= k + B && x.right > -B
						}
						if (v) {
							m.on(p, h), g("show", m);
							var D = s.srcAttr,
								E = w(D) ? D(m) : q.getAttribute(D);
							E && (q.src = E), u = !0
						} else A > l && (A = l)
					}
				} else u = !0;
				u && (y(q, o, 0), z.splice(d--, 1), e--)
			}
			e || g("complete", a(r))
		}
	}
	function j() {
		B > 1 ? (B = 1, i(), setTimeout(j, t.throttle)) : B = 0
	}
	function k(a) {
		z.length && (a && "scroll" === a.type && a.currentTarget === b && A >= f() || (B || setTimeout(j, 0), B = 2))
	}
	function l() {
		v.lazyLoadXT()
	}
	function m() {
		i(!0)
	}
	var n = "lazyLoadXT",
		o = "lazied",
		p = "load error",
		q = "lazy-hidden",
		r = c.documentElement || c.body,
		s = b.onscroll === d || !! b.operamini || !r.getBoundingClientRect,
		t = {
			autoInit: !0,
			selector: "img[data-src]",
			blankImage: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
			throttle: 99,
			forceLoad: s,
			loadEvent: "pageshow",
			updateEvent: "load orientationchange resize scroll touchmove focus",
			forceEvent: "lazyloadall",
			oninit: {
				removeClass: "lazy"
			},
			onshow: {
				addClass: q
			},
			onload: {
				removeClass: q,
				addClass: "lazy-loaded"
			},
			onerror: {
				removeClass: q
			},
			checkDuplicates: !0
		},
		u = {
			srcAttr: "data-src",
			edgeX: 0,
			edgeY: 0,
			visibleOnly: !0
		},
		v = a(b),
		w = a.isFunction,
		x = a.extend,
		y = a.data ||
	function(b, c) {
		return a(b).data(c)
	}, z = [], A = 0, B = 0;
	a[n] = x(t, u, a[n]), a.fn[n] = function(c) {
		c = c || {};
		var d, f = e(c, "blankImage"),
			h = e(c, "checkDuplicates"),
			i = e(c, "scrollContainer"),
			j = e(c, "show"),
			l = {};
		a(i).on("scroll", k);
		for (d in u) l[d] = e(c, d);
		return this.each(function(d, e) {
			if (e === b) a(t.selector).lazyLoadXT(c);
			else {
				var i = h && y(e, o),
					m = a(e).data(o, j ? -1 : 1);
				if (i) return void k();
				f && "IMG" === e.tagName && !e.src && (e.src = f), m[n] = x({}, l), g("init", m), z.push(m), k()
			}
		})
	}, a(c).ready(function() {
		g("start", v), v.on(t.updateEvent, k).on(t.forceEvent, m), a(c).on(t.updateEvent, k), t.autoInit && (v.on(t.loadEvent, l), l())
	})
}(window.jQuery || window.Zepto || window.$, window, document), function(a) {
	var b = a.lazyLoadXT;
	b.selector += ",video,iframe[data-src]", b.videoPoster = "data-poster", a(document).on("lazyshow", "video", function(c, d) {
		var e = d.lazyLoadXT.srcAttr,
			f = a.isFunction(e),
			g = !1;
		d.attr("poster", d.attr(b.videoPoster)), d.children("source,track").each(function(b, c) {
			var d = a(c),
				h = f ? e(d) : d.attr(e);
			h && (d.attr("src", h), g = !0)
		}), g && this.load()
	})
}(window.jQuery || window.Zepto || window.$);

/* Lazy Load  XT 1.1.0 BG | MIT License */
!
function(a) {
	var b = a.lazyLoadXT,
		c = b.bgAttr || "data-bg";
	b.selector += ",[" + c + "]", a(document).on("lazyshow", function(b) {
		var d = a(b.target),
			e = d.attr(c);
		e && d.css("background-image", "url('" + e + "')").removeAttr(c).triggerHandler("load")
	})
}(window.jQuery || window.Zepto || window.$);

/*! VelocityJS.org (1.3.1). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!
function(a) {
	"use strict";

	function b(a) {
		var b = a.length,
			d = c.type(a);
		return "function" !== d && !c.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === d || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
	}
	if (!a.jQuery) {
		var c = function(a, b) {
				return new c.fn.init(a, b)
			};
		c.isWindow = function(a) {
			return a && a === a.window
		}, c.type = function(a) {
			return a ? "object" == typeof a || "function" == typeof a ? e[g.call(a)] || "object" : typeof a : a + ""
		}, c.isArray = Array.isArray ||
		function(a) {
			return "array" === c.type(a)
		}, c.isPlainObject = function(a) {
			var b;
			if (!a || "object" !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
			try {
				if (a.constructor && !f.call(a, "constructor") && !f.call(a.constructor.prototype, "isPrototypeOf")) return !1
			} catch (d) {
				return !1
			}
			for (b in a);
			return void 0 === b || f.call(a, b)
		}, c.each = function(a, c, d) {
			var e, f = 0,
				g = a.length,
				h = b(a);
			if (d) {
				if (h) for (; f < g && (e = c.apply(a[f], d), e !== !1); f++);
				else for (f in a) if (a.hasOwnProperty(f) && (e = c.apply(a[f], d), e === !1)) break
			} else if (h) for (; f < g && (e = c.call(a[f], f, a[f]), e !== !1); f++);
			else for (f in a) if (a.hasOwnProperty(f) && (e = c.call(a[f], f, a[f]), e === !1)) break;
			return a
		}, c.data = function(a, b, e) {
			if (void 0 === e) {
				var f = a[c.expando],
					g = f && d[f];
				if (void 0 === b) return g;
				if (g && b in g) return g[b]
			} else if (void 0 !== b) {
				var h = a[c.expando] || (a[c.expando] = ++c.uuid);
				return d[h] = d[h] || {}, d[h][b] = e, e
			}
		}, c.removeData = function(a, b) {
			var e = a[c.expando],
				f = e && d[e];
			f && (b ? c.each(b, function(a, b) {
				delete f[b]
			}) : delete d[e])
		}, c.extend = function() {
			var a, b, d, e, f, g, h = arguments[0] || {},
				i = 1,
				j = arguments.length,
				k = !1;
			for ("boolean" == typeof h && (k = h, h = arguments[i] || {}, i++), "object" != typeof h && "function" !== c.type(h) && (h = {}), i === j && (h = this, i--); i < j; i++) if (f = arguments[i]) for (e in f) f.hasOwnProperty(e) && (a = h[e], d = f[e], h !== d && (k && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, g = a && c.isArray(a) ? a : []) : g = a && c.isPlainObject(a) ? a : {}, h[e] = c.extend(k, g, d)) : void 0 !== d && (h[e] = d)));
			return h
		}, c.queue = function(a, d, e) {
			function f(a, c) {
				var d = c || [];
				return a && (b(Object(a)) ? !
				function(a, b) {
					for (var c = +b.length, d = 0, e = a.length; d < c;) a[e++] = b[d++];
					if (c !== c) for (; void 0 !== b[d];) a[e++] = b[d++];
					return a.length = e, a
				}(d, "string" == typeof a ? [a] : a) : [].push.call(d, a)), d
			}
			if (a) {
				d = (d || "fx") + "queue";
				var g = c.data(a, d);
				return e ? (!g || c.isArray(e) ? g = c.data(a, d, f(e)) : g.push(e), g) : g || []
			}
		}, c.dequeue = function(a, b) {
			c.each(a.nodeType ? [a] : a, function(a, d) {
				b = b || "fx";
				var e = c.queue(d, b),
					f = e.shift();
				"inprogress" === f && (f = e.shift()), f && ("fx" === b && e.unshift("inprogress"), f.call(d, function() {
					c.dequeue(d, b)
				}))
			})
		}, c.fn = c.prototype = {
			init: function(a) {
				if (a.nodeType) return this[0] = a, this;
				throw new Error("Not a DOM node.")
			},
			offset: function() {
				var b = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
					top: 0,
					left: 0
				};
				return {
					top: b.top + (a.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
					left: b.left + (a.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
				}
			},
			position: function() {
				function a(a) {
					for (var b = a.offsetParent || document; b && "html" !== b.nodeType.toLowerCase && "static" === b.style.position;) b = b.offsetParent;
					return b || document
				}
				var b = this[0],
					d = a(b),
					e = this.offset(),
					f = /^(?:body|html)$/i.test(d.nodeName) ? {
						top: 0,
						left: 0
					} : c(d).offset();
				return e.top -= parseFloat(b.style.marginTop) || 0, e.left -= parseFloat(b.style.marginLeft) || 0, d.style && (f.top += parseFloat(d.style.borderTopWidth) || 0, f.left += parseFloat(d.style.borderLeftWidth) || 0), {
					top: e.top - f.top,
					left: e.left - f.left
				}
			}
		};
		var d = {};
		c.expando = "velocity" + (new Date).getTime(), c.uuid = 0;
		for (var e = {}, f = e.hasOwnProperty, g = e.toString, h = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < h.length; i++) e["[object " + h[i] + "]"] = h[i].toLowerCase();
		c.fn.init.prototype = c.fn, a.Velocity = {
			Utilities: c
		}
	}
}(window), function(a) {
	"use strict";
	"object" == typeof module && "object" == typeof module.exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : a()
}(function() {
	"use strict";
	return function(a, b, c, d) {
		function e(a) {
			for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
				var e = a[b];
				e && d.push(e)
			}
			return d
		}
		function f(a) {
			return p.isWrapped(a) ? a = [].slice.call(a) : p.isNode(a) && (a = [a]), a
		}
		function g(a) {
			var b = m.data(a, "velocity");
			return null === b ? d : b
		}
		function h(a) {
			return function(b) {
				return Math.round(b * a) * (1 / a)
			}
		}
		function i(a, c, d, e) {
			function f(a, b) {
				return 1 - 3 * b + 3 * a
			}
			function g(a, b) {
				return 3 * b - 6 * a
			}
			function h(a) {
				return 3 * a
			}
			function i(a, b, c) {
				return ((f(b, c) * a + g(b, c)) * a + h(b)) * a
			}
			function j(a, b, c) {
				return 3 * f(b, c) * a * a + 2 * g(b, c) * a + h(b)
			}
			function k(b, c) {
				for (var e = 0; e < p; ++e) {
					var f = j(c, a, d);
					if (0 === f) return c;
					var g = i(c, a, d) - b;
					c -= g / f
				}
				return c
			}
			function l() {
				for (var b = 0; b < t; ++b) x[b] = i(b * u, a, d)
			}
			function m(b, c, e) {
				var f, g, h = 0;
				do g = c + (e - c) / 2, f = i(g, a, d) - b, f > 0 ? e = g : c = g;
				while (Math.abs(f) > r && ++h < s);
				return g
			}
			function n(b) {
				for (var c = 0, e = 1, f = t - 1; e !== f && x[e] <= b; ++e) c += u;
				--e;
				var g = (b - x[e]) / (x[e + 1] - x[e]),
					h = c + g * u,
					i = j(h, a, d);
				return i >= q ? k(b, h) : 0 === i ? h : m(b, c, c + u)
			}
			function o() {
				y = !0, a === c && d === e || l()
			}
			var p = 4,
				q = .001,
				r = 1e-7,
				s = 10,
				t = 11,
				u = 1 / (t - 1),
				v = "Float32Array" in b;
			if (4 !== arguments.length) return !1;
			for (var w = 0; w < 4; ++w) if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return !1;
			a = Math.min(a, 1), d = Math.min(d, 1), a = Math.max(a, 0), d = Math.max(d, 0);
			var x = v ? new Float32Array(t) : new Array(t),
				y = !1,
				z = function(b) {
					return y || o(), a === c && d === e ? b : 0 === b ? 0 : 1 === b ? 1 : i(n(b), c, e)
				};
			z.getControlPoints = function() {
				return [{
					x: a,
					y: c
				}, {
					x: d,
					y: e
				}]
			};
			var A = "generateBezier(" + [a, c, d, e] + ")";
			return z.toString = function() {
				return A
			}, z
		}
		function j(a, b) {
			var c = a;
			return p.isString(a) ? t.Easings[a] || (c = !1) : c = p.isArray(a) && 1 === a.length ? h.apply(null, a) : p.isArray(a) && 2 === a.length ? u.apply(null, a.concat([b])) : !(!p.isArray(a) || 4 !== a.length) && i.apply(null, a), c === !1 && (c = t.Easings[t.defaults.easing] ? t.defaults.easing : s), c
		}
		function k(a) {
			if (a) {
				var b = t.timestamp && a !== !0 ? a : (new Date).getTime(),
					c = t.State.calls.length;
				c > 1e4 && (t.State.calls = e(t.State.calls), c = t.State.calls.length);
				for (var f = 0; f < c; f++) if (t.State.calls[f]) {
					var h = t.State.calls[f],
						i = h[0],
						j = h[2],
						n = h[3],
						o = !! n,
						q = null;
					n || (n = t.State.calls[f][3] = b - 16);
					for (var r = Math.min((b - n) / j.duration, 1), s = 0, u = i.length; s < u; s++) {
						var w = i[s],
							y = w.element;
						if (g(y)) {
							var z = !1;
							if (j.display !== d && null !== j.display && "none" !== j.display) {
								if ("flex" === j.display) {
									var A = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
									m.each(A, function(a, b) {
										v.setPropertyValue(y, "display", b)
									})
								}
								v.setPropertyValue(y, "display", j.display)
							}
							j.visibility !== d && "hidden" !== j.visibility && v.setPropertyValue(y, "visibility", j.visibility);
							for (var B in w) if (w.hasOwnProperty(B) && "element" !== B) {
								var C, D = w[B],
									E = p.isString(D.easing) ? t.Easings[D.easing] : D.easing;
								if (1 === r) C = D.endValue;
								else {
									var F = D.endValue - D.startValue;
									if (C = D.startValue + F * E(r, j, F), !o && C === D.currentValue) continue
								}
								if (D.currentValue = C, "tween" === B) q = C;
								else {
									var G;
									if (v.Hooks.registered[B]) {
										G = v.Hooks.getRoot(B);
										var H = g(y).rootPropertyValueCache[G];
										H && (D.rootPropertyValue = H)
									}
									var I = v.setPropertyValue(y, B, D.currentValue + (0 === parseFloat(C) ? "" : D.unitType), D.rootPropertyValue, D.scrollData);
									v.Hooks.registered[B] && (v.Normalizations.registered[G] ? g(y).rootPropertyValueCache[G] = v.Normalizations.registered[G]("extract", null, I[1]) : g(y).rootPropertyValueCache[G] = I[1]), "transform" === I[0] && (z = !0)
								}
							}
							j.mobileHA && g(y).transformCache.translate3d === d && (g(y).transformCache.translate3d = "(0px, 0px, 0px)", z = !0), z && v.flushTransformCache(y)
						}
					}
					j.display !== d && "none" !== j.display && (t.State.calls[f][2].display = !1), j.visibility !== d && "hidden" !== j.visibility && (t.State.calls[f][2].visibility = !1), j.progress && j.progress.call(h[1], h[1], r, Math.max(0, n + j.duration - b), n, q), 1 === r && l(f)
				}
			}
			t.State.isTicking && x(k)
		}
		function l(a, b) {
			if (!t.State.calls[a]) return !1;
			for (var c = t.State.calls[a][0], e = t.State.calls[a][1], f = t.State.calls[a][2], h = t.State.calls[a][4], i = !1, j = 0, k = c.length; j < k; j++) {
				var l = c[j].element;
				b || f.loop || ("none" === f.display && v.setPropertyValue(l, "display", f.display), "hidden" === f.visibility && v.setPropertyValue(l, "visibility", f.visibility));
				var n = g(l);
				if (f.loop !== !0 && (m.queue(l)[1] === d || !/\.velocityQueueEntryFlag/i.test(m.queue(l)[1])) && n) {
					n.isAnimating = !1, n.rootPropertyValueCache = {};
					var o = !1;
					m.each(v.Lists.transforms3D, function(a, b) {
						var c = /^scale/.test(b) ? 1 : 0,
							e = n.transformCache[b];
						n.transformCache[b] !== d && new RegExp("^\\(" + c + "[^.]").test(e) && (o = !0, delete n.transformCache[b])
					}), f.mobileHA && (o = !0, delete n.transformCache.translate3d), o && v.flushTransformCache(l), v.Values.removeClass(l, "velocity-animating")
				}
				if (!b && f.complete && !f.loop && j === k - 1) try {
					f.complete.call(e, e)
				} catch (p) {
					setTimeout(function() {
						throw p
					}, 1)
				}
				h && f.loop !== !0 && h(e), n && f.loop === !0 && !b && (m.each(n.tweensContainer, function(a, b) {
					if (/^rotate/.test(a) && (parseFloat(b.startValue) - parseFloat(b.endValue)) % 360 === 0) {
						var c = b.startValue;
						b.startValue = b.endValue, b.endValue = c
					}
					/^backgroundPosition/.test(a) && 100 === parseFloat(b.endValue) && "%" === b.unitType && (b.endValue = 0, b.startValue = 100)
				}), t(l, "reverse", {
					loop: !0,
					delay: f.delay
				})), f.queue !== !1 && m.dequeue(l, f.queue)
			}
			t.State.calls[a] = !1;
			for (var q = 0, r = t.State.calls.length; q < r; q++) if (t.State.calls[q] !== !1) {
				i = !0;
				break
			}
			i === !1 && (t.State.isTicking = !1, delete t.State.calls, t.State.calls = [])
		}
		var m, n = function() {
				if (c.documentMode) return c.documentMode;
				for (var a = 7; a > 4; a--) {
					var b = c.createElement("div");
					if (b.innerHTML = "<!--[if IE " + a + "]><span></span><![endif]-->", b.getElementsByTagName("span").length) return b = null, a
				}
				return d
			}(),
			o = function() {
				var a = 0;
				return b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame ||
				function(b) {
					var c, d = (new Date).getTime();
					return c = Math.max(0, 16 - (d - a)), a = d + c, setTimeout(function() {
						b(d + c)
					}, c)
				}
			}(),
			p = {
				isString: function(a) {
					return "string" == typeof a
				},
				isArray: Array.isArray ||
				function(a) {
					return "[object Array]" === Object.prototype.toString.call(a)
				},
				isFunction: function(a) {
					return "[object Function]" === Object.prototype.toString.call(a)
				},
				isNode: function(a) {
					return a && a.nodeType
				},
				isNodeList: function(a) {
					return "object" == typeof a && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a)) && a.length !== d && (0 === a.length || "object" == typeof a[0] && a[0].nodeType > 0)
				},
				isWrapped: function(a) {
					return a && (a.jquery || b.Zepto && b.Zepto.zepto.isZ(a))
				},
				isSVG: function(a) {
					return b.SVGElement && a instanceof b.SVGElement
				},
				isEmptyObject: function(a) {
					for (var b in a) if (a.hasOwnProperty(b)) return !1;
					return !0
				}
			},
			q = !1;
		if (a.fn && a.fn.jquery ? (m = a, q = !0) : m = b.Velocity.Utilities, n <= 8 && !q) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
		if (n <= 7) return void(jQuery.fn.velocity = jQuery.fn.animate);
		var r = 400,
			s = "swing",
			t = {
				State: {
					isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
					isAndroid: /Android/i.test(navigator.userAgent),
					isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
					isChrome: b.chrome,
					isFirefox: /Firefox/i.test(navigator.userAgent),
					prefixElement: c.createElement("div"),
					prefixMatches: {},
					scrollAnchor: null,
					scrollPropertyLeft: null,
					scrollPropertyTop: null,
					isTicking: !1,
					calls: []
				},
				CSS: {},
				Utilities: m,
				Redirects: {},
				Easings: {},
				Promise: b.Promise,
				defaults: {
					queue: "",
					duration: r,
					easing: s,
					begin: d,
					complete: d,
					progress: d,
					display: d,
					visibility: d,
					loop: !1,
					delay: !1,
					mobileHA: !0,
					_cacheValues: !0,
					promiseRejectEmpty: !0
				},
				init: function(a) {
					m.data(a, "velocity", {
						isSVG: p.isSVG(a),
						isAnimating: !1,
						computedStyle: null,
						tweensContainer: null,
						rootPropertyValueCache: {},
						transformCache: {}
					})
				},
				hook: null,
				mock: !1,
				version: {
					major: 1,
					minor: 3,
					patch: 1
				},
				debug: !1,
				timestamp: !0
			};
		b.pageYOffset !== d ? (t.State.scrollAnchor = b, t.State.scrollPropertyLeft = "pageXOffset", t.State.scrollPropertyTop = "pageYOffset") : (t.State.scrollAnchor = c.documentElement || c.body.parentNode || c.body, t.State.scrollPropertyLeft = "scrollLeft", t.State.scrollPropertyTop = "scrollTop");
		var u = function() {
				function a(a) {
					return -a.tension * a.x - a.friction * a.v
				}
				function b(b, c, d) {
					var e = {
						x: b.x + d.dx * c,
						v: b.v + d.dv * c,
						tension: b.tension,
						friction: b.friction
					};
					return {
						dx: e.v,
						dv: a(e)
					}
				}
				function c(c, d) {
					var e = {
						dx: c.v,
						dv: a(c)
					},
						f = b(c, .5 * d, e),
						g = b(c, .5 * d, f),
						h = b(c, d, g),
						i = 1 / 6 * (e.dx + 2 * (f.dx + g.dx) + h.dx),
						j = 1 / 6 * (e.dv + 2 * (f.dv + g.dv) + h.dv);
					return c.x = c.x + i * d, c.v = c.v + j * d, c
				}
				return function d(a, b, e) {
					var f, g, h, i = {
						x: -1,
						v: 0,
						tension: null,
						friction: null
					},
						j = [0],
						k = 0,
						l = 1e-4,
						m = .016;
					for (a = parseFloat(a) || 500, b = parseFloat(b) || 20, e = e || null, i.tension = a, i.friction = b, f = null !== e, f ? (k = d(a, b), g = k / e * m) : g = m;;) if (h = c(h || i, g), j.push(1 + h.x), k += 16, !(Math.abs(h.x) > l && Math.abs(h.v) > l)) break;
					return f ?
					function(a) {
						return j[a * (j.length - 1) | 0]
					} : k
				}
			}();
		t.Easings = {
			linear: function(a) {
				return a
			},
			swing: function(a) {
				return .5 - Math.cos(a * Math.PI) / 2
			},
			spring: function(a) {
				return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
			}
		}, m.each([
			["ease", [.25, .1, .25, 1]],
			["ease-in", [.42, 0, 1, 1]],
			["ease-out", [0, 0, .58, 1]],
			["ease-in-out", [.42, 0, .58, 1]],
			["easeInSine", [.47, 0, .745, .715]],
			["easeOutSine", [.39, .575, .565, 1]],
			["easeInOutSine", [.445, .05, .55, .95]],
			["easeInQuad", [.55, .085, .68, .53]],
			["easeOutQuad", [.25, .46, .45, .94]],
			["easeInOutQuad", [.455, .03, .515, .955]],
			["easeInCubic", [.55, .055, .675, .19]],
			["easeOutCubic", [.215, .61, .355, 1]],
			["easeInOutCubic", [.645, .045, .355, 1]],
			["easeInQuart", [.895, .03, .685, .22]],
			["easeOutQuart", [.165, .84, .44, 1]],
			["easeInOutQuart", [.77, 0, .175, 1]],
			["easeInQuint", [.755, .05, .855, .06]],
			["easeOutQuint", [.23, 1, .32, 1]],
			["easeInOutQuint", [.86, 0, .07, 1]],
			["easeInExpo", [.95, .05, .795, .035]],
			["easeOutExpo", [.19, 1, .22, 1]],
			["easeInOutExpo", [1, 0, 0, 1]],
			["easeInCirc", [.6, .04, .98, .335]],
			["easeOutCirc", [.075, .82, .165, 1]],
			["easeInOutCirc", [.785, .135, .15, .86]]
		], function(a, b) {
			t.Easings[b[0]] = i.apply(null, b[1])
		});
		var v = t.CSS = {
			RegEx: {
				isHex: /^#([A-f\d]{3}){1,2}$/i,
				valueUnwrap: /^[A-z]+\((.*)\)$/i,
				wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
				valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
			},
			Lists: {
				colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
				transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
				transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
			},
			Hooks: {
				templates: {
					textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
					boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
					clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
					backgroundPosition: ["X Y", "0% 0%"],
					transformOrigin: ["X Y Z", "50% 50% 0px"],
					perspectiveOrigin: ["X Y", "50% 50%"]
				},
				registered: {},
				register: function() {
					for (var a = 0; a < v.Lists.colors.length; a++) {
						var b = "color" === v.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1";
						v.Hooks.templates[v.Lists.colors[a]] = ["Red Green Blue Alpha", b]
					}
					var c, d, e;
					if (n) for (c in v.Hooks.templates) if (v.Hooks.templates.hasOwnProperty(c)) {
						d = v.Hooks.templates[c], e = d[0].split(" ");
						var f = d[1].match(v.RegEx.valueSplit);
						"Color" === e[0] && (e.push(e.shift()), f.push(f.shift()), v.Hooks.templates[c] = [e.join(" "), f.join(" ")])
					}
					for (c in v.Hooks.templates) if (v.Hooks.templates.hasOwnProperty(c)) {
						d = v.Hooks.templates[c], e = d[0].split(" ");
						for (var g in e) if (e.hasOwnProperty(g)) {
							var h = c + e[g],
								i = g;
							v.Hooks.registered[h] = [c, i]
						}
					}
				},
				getRoot: function(a) {
					var b = v.Hooks.registered[a];
					return b ? b[0] : a
				},
				cleanRootPropertyValue: function(a, b) {
					return v.RegEx.valueUnwrap.test(b) && (b = b.match(v.RegEx.valueUnwrap)[1]), v.Values.isCSSNullValue(b) && (b = v.Hooks.templates[a][1]), b
				},
				extractValue: function(a, b) {
					var c = v.Hooks.registered[a];
					if (c) {
						var d = c[0],
							e = c[1];
						return b = v.Hooks.cleanRootPropertyValue(d, b), b.toString().match(v.RegEx.valueSplit)[e]
					}
					return b
				},
				injectValue: function(a, b, c) {
					var d = v.Hooks.registered[a];
					if (d) {
						var e, f, g = d[0],
							h = d[1];
						return c = v.Hooks.cleanRootPropertyValue(g, c), e = c.toString().match(v.RegEx.valueSplit), e[h] = b, f = e.join(" ")
					}
					return c
				}
			},
			Normalizations: {
				registered: {
					clip: function(a, b, c) {
						switch (a) {
						case "name":
							return "clip";
						case "extract":
							var d;
							return v.RegEx.wrappedValueAlreadyExtracted.test(c) ? d = c : (d = c.toString().match(v.RegEx.valueUnwrap), d = d ? d[1].replace(/,(\s+)?/g, " ") : c), d;
						case "inject":
							return "rect(" + c + ")"
						}
					},
					blur: function(a, b, c) {
						switch (a) {
						case "name":
							return t.State.isFirefox ? "filter" : "-webkit-filter";
						case "extract":
							var d = parseFloat(c);
							if (!d && 0 !== d) {
								var e = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
								d = e ? e[1] : 0
							}
							return d;
						case "inject":
							return parseFloat(c) ? "blur(" + c + ")" : "none"
						}
					},
					opacity: function(a, b, c) {
						if (n <= 8) switch (a) {
						case "name":
							return "filter";
						case "extract":
							var d = c.toString().match(/alpha\(opacity=(.*)\)/i);
							return c = d ? d[1] / 100 : 1;
						case "inject":
							return b.style.zoom = 1, parseFloat(c) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(c), 10) + ")"
						} else switch (a) {
						case "name":
							return "opacity";
						case "extract":
							return c;
						case "inject":
							return c
						}
					}
				},
				register: function() {
					function a(a, b, c) {
						var d = "border-box" === v.getPropertyValue(b, "boxSizing").toString().toLowerCase();
						if (d === (c || !1)) {
							var e, f, g = 0,
								h = "width" === a ? ["Left", "Right"] : ["Top", "Bottom"],
								i = ["padding" + h[0], "padding" + h[1], "border" + h[0] + "Width", "border" + h[1] + "Width"];
							for (e = 0; e < i.length; e++) f = parseFloat(v.getPropertyValue(b, i[e])), isNaN(f) || (g += f);
							return c ? -g : g
						}
						return 0
					}
					function b(b, c) {
						return function(d, e, f) {
							switch (d) {
							case "name":
								return b;
							case "extract":
								return parseFloat(f) + a(b, e, c);
							case "inject":
								return parseFloat(f) - a(b, e, c) + "px"
							}
						}
					}
					n && !(n > 9) || t.State.isGingerbread || (v.Lists.transformsBase = v.Lists.transformsBase.concat(v.Lists.transforms3D));
					for (var c = 0; c < v.Lists.transformsBase.length; c++)!
					function() {
						var a = v.Lists.transformsBase[c];
						v.Normalizations.registered[a] = function(b, c, e) {
							switch (b) {
							case "name":
								return "transform";
							case "extract":
								return g(c) === d || g(c).transformCache[a] === d ? /^scale/i.test(a) ? 1 : 0 : g(c).transformCache[a].replace(/[()]/g, "");
							case "inject":
								var f = !1;
								switch (a.substr(0, a.length - 1)) {
								case "translate":
									f = !/(%|px|em|rem|vw|vh|\d)$/i.test(e);
									break;
								case "scal":
								case "scale":
									t.State.isAndroid && g(c).transformCache[a] === d && e < 1 && (e = 1), f = !/(\d)$/i.test(e);
									break;
								case "skew":
									f = !/(deg|\d)$/i.test(e);
									break;
								case "rotate":
									f = !/(deg|\d)$/i.test(e)
								}
								return f || (g(c).transformCache[a] = "(" + e + ")"), g(c).transformCache[a]
							}
						}
					}();
					for (var e = 0; e < v.Lists.colors.length; e++)!
					function() {
						var a = v.Lists.colors[e];
						v.Normalizations.registered[a] = function(b, c, e) {
							switch (b) {
							case "name":
								return a;
							case "extract":
								var f;
								if (v.RegEx.wrappedValueAlreadyExtracted.test(e)) f = e;
								else {
									var g, h = {
										black: "rgb(0, 0, 0)",
										blue: "rgb(0, 0, 255)",
										gray: "rgb(128, 128, 128)",
										green: "rgb(0, 128, 0)",
										red: "rgb(255, 0, 0)",
										white: "rgb(255, 255, 255)"
									};
									/^[A-z]+$/i.test(e) ? g = h[e] !== d ? h[e] : h.black : v.RegEx.isHex.test(e) ? g = "rgb(" + v.Values.hexToRgb(e).join(" ") + ")" : /^rgba?\(/i.test(e) || (g = h.black), f = (g || e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
								}
								return (!n || n > 8) && 3 === f.split(" ").length && (f += " 1"), f;
							case "inject":
								return n <= 8 ? 4 === e.split(" ").length && (e = e.split(/\s+/).slice(0, 3).join(" ")) : 3 === e.split(" ").length && (e += " 1"), (n <= 8 ? "rgb" : "rgba") + "(" + e.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")"
							}
						}
					}();
					v.Normalizations.registered.innerWidth = b("width", !0), v.Normalizations.registered.innerHeight = b("height", !0), v.Normalizations.registered.outerWidth = b("width"), v.Normalizations.registered.outerHeight = b("height")
				}
			},
			Names: {
				camelCase: function(a) {
					return a.replace(/-(\w)/g, function(a, b) {
						return b.toUpperCase()
					})
				},
				SVGAttribute: function(a) {
					var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
					return (n || t.State.isAndroid && !t.State.isChrome) && (b += "|transform"), new RegExp("^(" + b + ")$", "i").test(a)
				},
				prefixCheck: function(a) {
					if (t.State.prefixMatches[a]) return [t.State.prefixMatches[a], !0];
					for (var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, d = b.length; c < d; c++) {
						var e;
						if (e = 0 === c ? a : b[c] + a.replace(/^\w/, function(a) {
							return a.toUpperCase()
						}), p.isString(t.State.prefixElement.style[e])) return t.State.prefixMatches[a] = e, [e, !0]
					}
					return [a, !1]
				}
			},
			Values: {
				hexToRgb: function(a) {
					var b, c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
						d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
					return a = a.replace(c, function(a, b, c, d) {
						return b + b + c + c + d + d
					}), b = d.exec(a), b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : [0, 0, 0]
				},
				isCSSNullValue: function(a) {
					return !a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
				},
				getUnitType: function(a) {
					return /^(rotate|skew)/i.test(a) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a) ? "" : "px"
				},
				getDisplayType: function(a) {
					var b = a && a.tagName.toString().toLowerCase();
					return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b) ? "inline" : /^(li)$/i.test(b) ? "list-item" : /^(tr)$/i.test(b) ? "table-row" : /^(table)$/i.test(b) ? "table" : /^(tbody)$/i.test(b) ? "table-row-group" : "block"
				},
				addClass: function(a, b) {
					a.classList ? a.classList.add(b) : a.className += (a.className.length ? " " : "") + b
				},
				removeClass: function(a, b) {
					a.classList ? a.classList.remove(b) : a.className = a.className.toString().replace(new RegExp("(^|\\s)" + b.split(" ").join("|") + "(\\s|$)", "gi"), " ")
				}
			},
			getPropertyValue: function(a, c, e, f) {
				function h(a, c) {
					var e = 0;
					if (n <= 8) e = m.css(a, c);
					else {
						var i = !1;
						/^(width|height)$/.test(c) && 0 === v.getPropertyValue(a, "display") && (i = !0, v.setPropertyValue(a, "display", v.Values.getDisplayType(a)));
						var j = function() {
								i && v.setPropertyValue(a, "display", "none")
							};
						if (!f) {
							if ("height" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
								var k = a.offsetHeight - (parseFloat(v.getPropertyValue(a, "borderTopWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderBottomWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingTop")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingBottom")) || 0);
								return j(), k
							}
							if ("width" === c && "border-box" !== v.getPropertyValue(a, "boxSizing").toString().toLowerCase()) {
								var l = a.offsetWidth - (parseFloat(v.getPropertyValue(a, "borderLeftWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "borderRightWidth")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingLeft")) || 0) - (parseFloat(v.getPropertyValue(a, "paddingRight")) || 0);
								return j(), l
							}
						}
						var o;
						o = g(a) === d ? b.getComputedStyle(a, null) : g(a).computedStyle ? g(a).computedStyle : g(a).computedStyle = b.getComputedStyle(a, null), "borderColor" === c && (c = "borderTopColor"), e = 9 === n && "filter" === c ? o.getPropertyValue(c) : o[c], "" !== e && null !== e || (e = a.style[c]), j()
					}
					if ("auto" === e && /^(top|right|bottom|left)$/i.test(c)) {
						var p = h(a, "position");
						("fixed" === p || "absolute" === p && /top|left/i.test(c)) && (e = m(a).position()[c] + "px")
					}
					return e
				}
				var i;
				if (v.Hooks.registered[c]) {
					var j = c,
						k = v.Hooks.getRoot(j);
					e === d && (e = v.getPropertyValue(a, v.Names.prefixCheck(k)[0])), v.Normalizations.registered[k] && (e = v.Normalizations.registered[k]("extract", a, e)), i = v.Hooks.extractValue(j, e)
				} else if (v.Normalizations.registered[c]) {
					var l, o;
					l = v.Normalizations.registered[c]("name", a), "transform" !== l && (o = h(a, v.Names.prefixCheck(l)[0]), v.Values.isCSSNullValue(o) && v.Hooks.templates[c] && (o = v.Hooks.templates[c][1])), i = v.Normalizations.registered[c]("extract", a, o)
				}
				if (!/^[\d-]/.test(i)) {
					var p = g(a);
					if (p && p.isSVG && v.Names.SVGAttribute(c)) if (/^(height|width)$/i.test(c)) try {
						i = a.getBBox()[c]
					} catch (q) {
						i = 0
					} else i = a.getAttribute(c);
					else i = h(a, v.Names.prefixCheck(c)[0])
				}
				return v.Values.isCSSNullValue(i) && (i = 0), t.debug >= 2 && console.log("Get " + c + ": " + i), i
			},
			setPropertyValue: function(a, c, d, e, f) {
				var h = c;
				if ("scroll" === c) f.container ? f.container["scroll" + f.direction] = d : "Left" === f.direction ? b.scrollTo(d, f.alternateValue) : b.scrollTo(f.alternateValue, d);
				else if (v.Normalizations.registered[c] && "transform" === v.Normalizations.registered[c]("name", a)) v.Normalizations.registered[c]("inject", a, d), h = "transform", d = g(a).transformCache[c];
				else {
					if (v.Hooks.registered[c]) {
						var i = c,
							j = v.Hooks.getRoot(c);
						e = e || v.getPropertyValue(a, j), d = v.Hooks.injectValue(i, d, e), c = j
					}
					if (v.Normalizations.registered[c] && (d = v.Normalizations.registered[c]("inject", a, d), c = v.Normalizations.registered[c]("name", a)), h = v.Names.prefixCheck(c)[0], n <= 8) try {
						a.style[h] = d
					} catch (k) {
						t.debug && console.log("Browser does not support [" + d + "] for [" + h + "]")
					} else {
						var l = g(a);
						l && l.isSVG && v.Names.SVGAttribute(c) ? a.setAttribute(c, d) : a.style[h] = d
					}
					t.debug >= 2 && console.log("Set " + c + " (" + h + "): " + d)
				}
				return [h, d]
			},
			flushTransformCache: function(a) {
				var b = "",
					c = g(a);
				if ((n || t.State.isAndroid && !t.State.isChrome) && c && c.isSVG) {
					var d = function(b) {
							return parseFloat(v.getPropertyValue(a, b))
						},
						e = {
							translate: [d("translateX"), d("translateY")],
							skewX: [d("skewX")],
							skewY: [d("skewY")],
							scale: 1 !== d("scale") ? [d("scale"), d("scale")] : [d("scaleX"), d("scaleY")],
							rotate: [d("rotateZ"), 0, 0]
						};
					m.each(g(a).transformCache, function(a) {
						/^translate/i.test(a) ? a = "translate" : /^scale/i.test(a) ? a = "scale" : /^rotate/i.test(a) && (a = "rotate"), e[a] && (b += a + "(" + e[a].join(" ") + ") ", delete e[a])
					})
				} else {
					var f, h;
					m.each(g(a).transformCache, function(c) {
						return f = g(a).transformCache[c], "transformPerspective" === c ? (h = f, !0) : (9 === n && "rotateZ" === c && (c = "rotate"), void(b += c + f + " "))
					}), h && (b = "perspective" + h + " " + b)
				}
				v.setPropertyValue(a, "transform", b)
			}
		};
		v.Hooks.register(), v.Normalizations.register(), t.hook = function(a, b, c) {
			var e;
			return a = f(a), m.each(a, function(a, f) {
				if (g(f) === d && t.init(f), c === d) e === d && (e = v.getPropertyValue(f, b));
				else {
					var h = v.setPropertyValue(f, b, c);
					"transform" === h[0] && t.CSS.flushTransformCache(f), e = h
				}
			}), e
		};
		var w = function() {
				function a() {
					return i ? y.promise || null : n
				}
				function e(a, e) {
					function f(f) {
						var n, o;
						if (i.begin && 0 === A) try {
							i.begin.call(q, q)
						} catch (r) {
							setTimeout(function() {
								throw r
							}, 1)
						}
						if ("scroll" === D) {
							var w, x, B, C = /^x$/i.test(i.axis) ? "Left" : "Top",
								E = parseFloat(i.offset) || 0;
							i.container ? p.isWrapped(i.container) || p.isNode(i.container) ? (i.container = i.container[0] || i.container, w = i.container["scroll" + C], B = w + m(a).position()[C.toLowerCase()] + E) : i.container = null : (w = t.State.scrollAnchor[t.State["scrollProperty" + C]], x = t.State.scrollAnchor[t.State["scrollProperty" + ("Left" === C ? "Top" : "Left")]], B = m(a).offset()[C.toLowerCase()] + E), l = {
								scroll: {
									rootPropertyValue: !1,
									startValue: w,
									currentValue: w,
									endValue: B,
									unitType: "",
									easing: i.easing,
									scrollData: {
										container: i.container,
										direction: C,
										alternateValue: x
									}
								},
								element: a
							}, t.debug && console.log("tweensContainer (scroll): ", l.scroll, a)
						} else if ("reverse" === D) {
							if (n = g(a), !n) return;
							if (!n.tweensContainer) return void m.dequeue(a, i.queue);
							"none" === n.opts.display && (n.opts.display = "auto"), "hidden" === n.opts.visibility && (n.opts.visibility = "visible"), n.opts.loop = !1, n.opts.begin = null, n.opts.complete = null, u.easing || delete i.easing, u.duration || delete i.duration, i = m.extend({}, n.opts, i), o = m.extend(!0, {}, n ? n.tweensContainer : null);
							for (var F in o) if (o.hasOwnProperty(F) && "element" !== F) {
								var G = o[F].startValue;
								o[F].startValue = o[F].currentValue = o[F].endValue, o[F].endValue = G, p.isEmptyObject(u) || (o[F].easing = i.easing), t.debug && console.log("reverse tweensContainer (" + F + "): " + JSON.stringify(o[F]), a)
							}
							l = o
						} else if ("start" === D) {
							n = g(a), n && n.tweensContainer && n.isAnimating === !0 && (o = n.tweensContainer);
							var H = function(b, c) {
									var f, g, h;
									return p.isFunction(b) && (b = b.call(a, e, z)), p.isArray(b) ? (f = b[0], !p.isArray(b[1]) && /^[\d-]/.test(b[1]) || p.isFunction(b[1]) || v.RegEx.isHex.test(b[1]) ? h = b[1] : (p.isString(b[1]) && !v.RegEx.isHex.test(b[1]) || p.isArray(b[1])) && (g = c ? b[1] : j(b[1], i.duration), b[2] !== d && (h = b[2]))) : f = b, c || (g = g || i.easing), p.isFunction(f) && (f = f.call(a, e, z)), p.isFunction(h) && (h = h.call(a, e, z)), [f || 0, g, h]
								},
								K = function(e, f) {
									var g = v.Hooks.getRoot(e),
										j = !1,
										k = f[0],
										p = f[1],
										q = f[2];
									if (!(n && n.isSVG || "tween" === g || v.Names.prefixCheck(g)[1] !== !1 || v.Normalizations.registered[g] !== d)) return void(t.debug && console.log("Skipping [" + g + "] due to a lack of browser support."));
									(i.display !== d && null !== i.display && "none" !== i.display || i.visibility !== d && "hidden" !== i.visibility) && /opacity|filter/.test(e) && !q && 0 !== k && (q = 0), i._cacheValues && o && o[e] ? (q === d && (q = o[e].endValue + o[e].unitType), j = n.rootPropertyValueCache[g]) : v.Hooks.registered[e] ? q === d ? (j = v.getPropertyValue(a, g), q = v.getPropertyValue(a, e, j)) : j = v.Hooks.templates[g][1] : q === d && (q = v.getPropertyValue(a, e));
									var r, s, u, w = !1,
										x = function(a, b) {
											var c, d;
											return d = (b || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(a) {
												return c = a, ""
											}), c || (c = v.Values.getUnitType(a)), [d, c]
										};
									r = x(e, q), q = r[0], u = r[1], r = x(e, k), k = r[0].replace(/^([+-\/*])=/, function(a, b) {
										return w = b, ""
									}), s = r[1], q = parseFloat(q) || 0, k = parseFloat(k) || 0, "%" === s && (/^(fontSize|lineHeight)$/.test(e) ? (k /= 100, s = "em") : /^scale/.test(e) ? (k /= 100, s = "") : /(Red|Green|Blue)$/i.test(e) && (k = k / 100 * 255, s = ""));
									var y = function() {
											var d = {
												myParent: a.parentNode || c.body,
												position: v.getPropertyValue(a, "position"),
												fontSize: v.getPropertyValue(a, "fontSize")
											},
												e = d.position === I.lastPosition && d.myParent === I.lastParent,
												f = d.fontSize === I.lastFontSize;
											I.lastParent = d.myParent, I.lastPosition = d.position, I.lastFontSize = d.fontSize;
											var g = 100,
												h = {};
											if (f && e) h.emToPx = I.lastEmToPx, h.percentToPxWidth = I.lastPercentToPxWidth, h.percentToPxHeight = I.lastPercentToPxHeight;
											else {
												var i = n && n.isSVG ? c.createElementNS("http://www.w3.org/2000/svg", "rect") : c.createElement("div");
												t.init(i), d.myParent.appendChild(i), m.each(["overflow", "overflowX", "overflowY"], function(a, b) {
													t.CSS.setPropertyValue(i, b, "hidden")
												}), t.CSS.setPropertyValue(i, "position", d.position), t.CSS.setPropertyValue(i, "fontSize", d.fontSize), t.CSS.setPropertyValue(i, "boxSizing", "content-box"), m.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(a, b) {
													t.CSS.setPropertyValue(i, b, g + "%")
												}), t.CSS.setPropertyValue(i, "paddingLeft", g + "em"), h.percentToPxWidth = I.lastPercentToPxWidth = (parseFloat(v.getPropertyValue(i, "width", null, !0)) || 1) / g, h.percentToPxHeight = I.lastPercentToPxHeight = (parseFloat(v.getPropertyValue(i, "height", null, !0)) || 1) / g, h.emToPx = I.lastEmToPx = (parseFloat(v.getPropertyValue(i, "paddingLeft")) || 1) / g, d.myParent.removeChild(i)
											}
											return null === I.remToPx && (I.remToPx = parseFloat(v.getPropertyValue(c.body, "fontSize")) || 16), null === I.vwToPx && (I.vwToPx = parseFloat(b.innerWidth) / 100, I.vhToPx = parseFloat(b.innerHeight) / 100), h.remToPx = I.remToPx, h.vwToPx = I.vwToPx, h.vhToPx = I.vhToPx, t.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(h), a), h
										};
									if (/[\/*]/.test(w)) s = u;
									else if (u !== s && 0 !== q) if (0 === k) s = u;
									else {
										h = h || y();
										var z = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";
										switch (u) {
										case "%":
											q *= "x" === z ? h.percentToPxWidth : h.percentToPxHeight;
											break;
										case "px":
											break;
										default:
											q *= h[u + "ToPx"]
										}
										switch (s) {
										case "%":
											q *= 1 / ("x" === z ? h.percentToPxWidth : h.percentToPxHeight);
											break;
										case "px":
											break;
										default:
											q *= 1 / h[s + "ToPx"]
										}
									}
									switch (w) {
									case "+":
										k = q + k;
										break;
									case "-":
										k = q - k;
										break;
									case "*":
										k = q * k;
										break;
									case "/":
										k = q / k
									}
									l[e] = {
										rootPropertyValue: j,
										startValue: q,
										currentValue: q,
										endValue: k,
										unitType: s,
										easing: p
									}, t.debug && console.log("tweensContainer (" + e + "): " + JSON.stringify(l[e]), a)
								};
							for (var L in s) if (s.hasOwnProperty(L)) {
								var M = v.Names.camelCase(L),
									N = H(s[L]);
								if (v.Lists.colors.indexOf(M) >= 0) {
									var O = N[0],
										P = N[1],
										Q = N[2];
									if (v.RegEx.isHex.test(O)) {
										for (var R = ["Red", "Green", "Blue"], S = v.Values.hexToRgb(O), T = Q ? v.Values.hexToRgb(Q) : d, U = 0; U < R.length; U++) {
											var V = [S[U]];
											P && V.push(P), T !== d && V.push(T[U]), K(M + R[U], V)
										}
										continue
									}
								}
								K(M, N)
							}
							l.element = a
						}
						l.element && (v.Values.addClass(a, "velocity-animating"), J.push(l), n = g(a), n && ("" === i.queue && (n.tweensContainer = l, n.opts = i), n.isAnimating = !0), A === z - 1 ? (t.State.calls.push([J, q, i, null, y.resolver]), t.State.isTicking === !1 && (t.State.isTicking = !0, k())) : A++)
					}
					var h, i = m.extend({}, t.defaults, u),
						l = {};
					switch (g(a) === d && t.init(a), parseFloat(i.delay) && i.queue !== !1 && m.queue(a, i.queue, function(b) {
						t.velocityQueueEntryFlag = !0, g(a).delayTimer = {
							setTimeout: setTimeout(b, parseFloat(i.delay)),
							next: b
						}
					}), i.duration.toString().toLowerCase()) {
					case "fast":
						i.duration = 200;
						break;
					case "normal":
						i.duration = r;
						break;
					case "slow":
						i.duration = 600;
						break;
					default:
						i.duration = parseFloat(i.duration) || 1
					}
					t.mock !== !1 && (t.mock === !0 ? i.duration = i.delay = 1 : (i.duration *= parseFloat(t.mock) || 1, i.delay *= parseFloat(t.mock) || 1)), i.easing = j(i.easing, i.duration), i.begin && !p.isFunction(i.begin) && (i.begin = null), i.progress && !p.isFunction(i.progress) && (i.progress = null), i.complete && !p.isFunction(i.complete) && (i.complete = null), i.display !== d && null !== i.display && (i.display = i.display.toString().toLowerCase(), "auto" === i.display && (i.display = t.CSS.Values.getDisplayType(a))), i.visibility !== d && null !== i.visibility && (i.visibility = i.visibility.toString().toLowerCase()), i.mobileHA = i.mobileHA && t.State.isMobile && !t.State.isGingerbread, i.queue === !1 ? i.delay ? setTimeout(f, i.delay) : f() : m.queue(a, i.queue, function(a, b) {
						return b === !0 ? (y.promise && y.resolver(q), !0) : (t.velocityQueueEntryFlag = !0, void f(a))
					}), "" !== i.queue && "fx" !== i.queue || "inprogress" === m.queue(a)[0] || m.dequeue(a)
				}
				var h, i, n, o, q, s, u, x = arguments[0] && (arguments[0].p || m.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || p.isString(arguments[0].properties));
				p.isWrapped(this) ? (i = !1, o = 0, q = this, n = this) : (i = !0, o = 1, q = x ? arguments[0].elements || arguments[0].e : arguments[0]);
				var y = {
					promise: null,
					resolver: null,
					rejecter: null
				};
				if (i && t.Promise && (y.promise = new t.Promise(function(a, b) {
					y.resolver = a, y.rejecter = b
				})), x ? (s = arguments[0].properties || arguments[0].p, u = arguments[0].options || arguments[0].o) : (s = arguments[o], u = arguments[o + 1]), q = f(q), !q) return void(y.promise && (s && u && u.promiseRejectEmpty === !1 ? y.resolver() : y.rejecter()));
				var z = q.length,
					A = 0;
				if (!/^(stop|finish|finishAll)$/i.test(s) && !m.isPlainObject(u)) {
					var B = o + 1;
					u = {};
					for (var C = B; C < arguments.length; C++) p.isArray(arguments[C]) || !/^(fast|normal|slow)$/i.test(arguments[C]) && !/^\d/.test(arguments[C]) ? p.isString(arguments[C]) || p.isArray(arguments[C]) ? u.easing = arguments[C] : p.isFunction(arguments[C]) && (u.complete = arguments[C]) : u.duration = arguments[C]
				}
				var D;
				switch (s) {
				case "scroll":
					D = "scroll";
					break;
				case "reverse":
					D = "reverse";
					break;
				case "finish":
				case "finishAll":
				case "stop":
					m.each(q, function(a, b) {
						g(b) && g(b).delayTimer && (clearTimeout(g(b).delayTimer.setTimeout), g(b).delayTimer.next && g(b).delayTimer.next(), delete g(b).delayTimer), "finishAll" !== s || u !== !0 && !p.isString(u) || (m.each(m.queue(b, p.isString(u) ? u : ""), function(a, b) {
							p.isFunction(b) && b()
						}), m.queue(b, p.isString(u) ? u : "", []))
					});
					var E = [];
					return m.each(t.State.calls, function(a, b) {
						b && m.each(b[1], function(c, e) {
							var f = u === d ? "" : u;
							return f !== !0 && b[2].queue !== f && (u !== d || b[2].queue !== !1) || void m.each(q, function(c, d) {
								if (d === e) if ((u === !0 || p.isString(u)) && (m.each(m.queue(d, p.isString(u) ? u : ""), function(a, b) {
									p.isFunction(b) && b(null, !0)
								}), m.queue(d, p.isString(u) ? u : "", [])), "stop" === s) {
									var h = g(d);
									h && h.tweensContainer && f !== !1 && m.each(h.tweensContainer, function(a, b) {
										b.endValue = b.currentValue
									}), E.push(a)
								} else "finish" !== s && "finishAll" !== s || (b[2].duration = 1)
							})
						})
					}), "stop" === s && (m.each(E, function(a, b) {
						l(b, !0)
					}), y.promise && y.resolver(q)), a();
				default:
					if (!m.isPlainObject(s) || p.isEmptyObject(s)) {
						if (p.isString(s) && t.Redirects[s]) {
							h = m.extend({}, u);
							var F = h.duration,
								G = h.delay || 0;
							return h.backwards === !0 && (q = m.extend(!0, [], q).reverse()), m.each(q, function(a, b) {
								parseFloat(h.stagger) ? h.delay = G + parseFloat(h.stagger) * a : p.isFunction(h.stagger) && (h.delay = G + h.stagger.call(b, a, z)), h.drag && (h.duration = parseFloat(F) || (/^(callout|transition)/.test(s) ? 1e3 : r), h.duration = Math.max(h.duration * (h.backwards ? 1 - a / z : (a + 1) / z), .75 * h.duration, 200)), t.Redirects[s].call(b, b, h || {}, a, z, q, y.promise ? y : d)
							}), a()
						}
						var H = "Velocity: First argument (" + s + ") was not a property map, a known action, or a registered redirect. Aborting.";
						return y.promise ? y.rejecter(new Error(H)) : console.log(H), a()
					}
					D = "start"
				}
				var I = {
					lastParent: null,
					lastPosition: null,
					lastFontSize: null,
					lastPercentToPxWidth: null,
					lastPercentToPxHeight: null,
					lastEmToPx: null,
					remToPx: null,
					vwToPx: null,
					vhToPx: null
				},
					J = [];
				m.each(q, function(a, b) {
					p.isNode(b) && e(b, a)
				}), h = m.extend({}, t.defaults, u), h.loop = parseInt(h.loop, 10);
				var K = 2 * h.loop - 1;
				if (h.loop) for (var L = 0; L < K; L++) {
					var M = {
						delay: h.delay,
						progress: h.progress
					};
					L === K - 1 && (M.display = h.display, M.visibility = h.visibility, M.complete = h.complete), w(q, "reverse", M)
				}
				return a()
			};
		t = m.extend(w, t), t.animate = w;
		var x = b.requestAnimationFrame || o;
		return t.State.isMobile || c.hidden === d || c.addEventListener("visibilitychange", function() {
			c.hidden ? (x = function(a) {
				return setTimeout(function() {
					a(!0)
				}, 16)
			}, k()) : x = b.requestAnimationFrame || o
		}), a.Velocity = t, a !== b && (a.fn.velocity = w, a.fn.velocity.defaults = t.defaults), m.each(["Down", "Up"], function(a, b) {
			t.Redirects["slide" + b] = function(a, c, e, f, g, h) {
				var i = m.extend({}, c),
					j = i.begin,
					k = i.complete,
					l = {},
					n = {
						height: "",
						marginTop: "",
						marginBottom: "",
						paddingTop: "",
						paddingBottom: ""
					};
				i.display === d && (i.display = "Down" === b ? "inline" === t.CSS.Values.getDisplayType(a) ? "inline-block" : "block" : "none"), i.begin = function() {
					0 === e && j && j.call(g, g);
					for (var c in n) if (n.hasOwnProperty(c)) {
						l[c] = a.style[c];
						var d = v.getPropertyValue(a, c);
						n[c] = "Down" === b ? [d, 0] : [0, d]
					}
					l.overflow = a.style.overflow, a.style.overflow = "hidden"
				}, i.complete = function() {
					for (var b in l) l.hasOwnProperty(b) && (a.style[b] = l[b]);
					e === f - 1 && (k && k.call(g, g), h && h.resolver(g))
				}, t(a, n, i)
			}
		}), m.each(["In", "Out"], function(a, b) {
			t.Redirects["fade" + b] = function(a, c, e, f, g, h) {
				var i = m.extend({}, c),
					j = i.complete,
					k = {
						opacity: "In" === b ? 1 : 0
					};
				0 !== e && (i.begin = null), e !== f - 1 ? i.complete = null : i.complete = function() {
					j && j.call(g, g), h && h.resolver(g)
				}, i.display === d && (i.display = "In" === b ? "auto" : "none"), t(this, k, i)
			}
		}), t
	}(window.jQuery || window.Zepto || window, window, document)
});

/* VelocityJS.org UI Pack (5.1.1). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */
!
function(a) {
	"use strict";
	"function" == typeof require && "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(["velocity"], a) : a()
}(function() {
	"use strict";
	return function(a, b, c, d) {
		function e(a, b) {
			var c = [];
			return !(!a || !b) && (g.each([a, b], function(a, b) {
				var d = [];
				g.each(b, function(a, b) {
					for (; b.toString().length < 5;) b = "0" + b;
					d.push(b)
				}), c.push(d.join(""))
			}), parseFloat(c[0]) > parseFloat(c[1]))
		}
		var f = a.Velocity;
		if (!f || !f.Utilities) return void(b.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
		var g = f.Utilities,
			h = f.version,
			i = {
				major: 1,
				minor: 1,
				patch: 0
			};
		if (e(i, h)) {
			var j = "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
			throw alert(j), new Error(j)
		}
		f.RegisterEffect = f.RegisterUI = function(a, b) {
			function c(a, b, c, d) {
				var e, h = 0;
				g.each(a.nodeType ? [a] : a, function(a, b) {
					d && (c += a * d), e = b.parentNode, propertiesToSum = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"], "border-box" === f.CSS.getPropertyValue(b, "boxSizing").toString().toLowerCase() && (propertiesToSum = ["height"]), g.each(propertiesToSum, function(a, c) {
						h += parseFloat(f.CSS.getPropertyValue(b, c))
					})
				}), f.animate(e, {
					height: ("In" === b ? "+" : "-") + "=" + h
				}, {
					queue: !1,
					easing: "ease-in-out",
					duration: c * ("In" === b ? .6 : 1)
				})
			}
			return f.Redirects[a] = function(e, h, i, j, k, l, m) {
				var n = i === j - 1;
				m = m || b.loop, "function" == typeof b.defaultDuration ? b.defaultDuration = b.defaultDuration.call(k, k) : b.defaultDuration = parseFloat(b.defaultDuration);
				for (var o = 0; o < b.calls.length; o++) {
					var p = b.calls[o],
						q = p[0],
						r = 1e3,
						s = p[1],
						t = p[2] || {},
						u = {};
					if (h.duration !== d ? r = h.duration : b.defaultDuration !== d && (r = b.defaultDuration), u.duration = r * (s || 1), u.queue = h.queue || "", u.easing = t.easing || "ease", u.delay = parseFloat(t.delay) || 0, u.loop = !b.loop && t.loop, u._cacheValues = t._cacheValues || !0, 0 === o) {
						if (u.delay += parseFloat(h.delay) || 0, 0 === i && (u.begin = function() {
							h.begin && h.begin.call(k, k);
							var b = a.match(/(In|Out)$/);
							b && "In" === b[0] && q.opacity !== d && g.each(k.nodeType ? [k] : k, function(a, b) {
								f.CSS.setPropertyValue(b, "opacity", 0)
							}), h.animateParentHeight && b && c(k, b[0], r + u.delay, h.stagger)
						}), null !== h.display) if (h.display !== d && "none" !== h.display) u.display = h.display;
						else if (/In$/.test(a)) {
							var v = f.CSS.Values.getDisplayType(e);
							u.display = "inline" === v ? "inline-block" : v
						}
						h.visibility && "hidden" !== h.visibility && (u.visibility = h.visibility)
					}
					if (o === b.calls.length - 1) {
						var w = function() {
								h.display !== d && "none" !== h.display || !/Out$/.test(a) || g.each(k.nodeType ? [k] : k, function(a, b) {
									f.CSS.setPropertyValue(b, "display", "none")
								}), h.complete && h.complete.call(k, k), l && l.resolver(k || e)
							};
						u.complete = function() {
							if (m && f.Redirects[a](e, h, i, j, k, l, m === !0 || Math.max(0, m - 1)), b.reset) {
								for (var c in b.reset) if (b.reset.hasOwnProperty(c)) {
									var g = b.reset[c];
									f.CSS.Hooks.registered[c] !== d || "string" != typeof g && "number" != typeof g || (b.reset[c] = [b.reset[c], b.reset[c]])
								}
								var o = {
									duration: 0,
									queue: !1
								};
								n && (o.complete = w), f.animate(e, b.reset, o)
							} else n && w()
						}, "hidden" === h.visibility && (u.visibility = h.visibility)
					}
					f.animate(e, q, u)
				}
			}, f
		}, f.RegisterEffect.packagedEffects = {
			"callout.bounce": {
				defaultDuration: 550,
				calls: [
					[{
						translateY: -30
					}, .25],
					[{
						translateY: 0
					}, .125],
					[{
						translateY: -15
					}, .125],
					[{
						translateY: 0
					}, .25]
				]
			},
			"callout.shake": {
				defaultDuration: 800,
				calls: [
					[{
						translateX: -11
					}, .125],
					[{
						translateX: 11
					}, .125],
					[{
						translateX: -11
					}, .125],
					[{
						translateX: 11
					}, .125],
					[{
						translateX: -11
					}, .125],
					[{
						translateX: 11
					}, .125],
					[{
						translateX: -11
					}, .125],
					[{
						translateX: 0
					}, .125]
				]
			},
			"callout.flash": {
				defaultDuration: 1100,
				calls: [
					[{
						opacity: [0, "easeInOutQuad", 1]
					}, .25],
					[{
						opacity: [1, "easeInOutQuad"]
					}, .25],
					[{
						opacity: [0, "easeInOutQuad"]
					}, .25],
					[{
						opacity: [1, "easeInOutQuad"]
					}, .25]
				]
			},
			"callout.pulse": {
				defaultDuration: 825,
				calls: [
					[{
						scaleX: 1.1,
						scaleY: 1.1
					}, .5,
					{
						easing: "easeInExpo"
					}],
					[{
						scaleX: 1,
						scaleY: 1
					}, .5]
				]
			},
			"callout.swing": {
				defaultDuration: 950,
				calls: [
					[{
						rotateZ: 15
					}, .2],
					[{
						rotateZ: -10
					}, .2],
					[{
						rotateZ: 5
					}, .2],
					[{
						rotateZ: -5
					}, .2],
					[{
						rotateZ: 0
					}, .2]
				]
			},
			"callout.tada": {
				defaultDuration: 1e3,
				calls: [
					[{
						scaleX: .9,
						scaleY: .9,
						rotateZ: -3
					}, .1],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: 3
					}, .1],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: -3
					}, .1],
					["reverse", .125],
					["reverse", .125],
					["reverse", .125],
					["reverse", .125],
					["reverse", .125],
					[{
						scaleX: 1,
						scaleY: 1,
						rotateZ: 0
					}, .2]
				]
			},
			"transition.fadeIn": {
				defaultDuration: 500,
				calls: [
					[{
						opacity: [1, 0]
					}]
				]
			},
			"transition.fadeOut": {
				defaultDuration: 500,
				calls: [
					[{
						opacity: [0, 1]
					}]
				]
			},
			"transition.flipXIn": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						rotateY: [0, -55]
					}]
				],
				reset: {
					transformPerspective: 0
				}
			},
			"transition.flipXOut": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						rotateY: 55
					}]
				],
				reset: {
					transformPerspective: 0,
					rotateY: 0
				}
			},
			"transition.flipYIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						rotateX: [0, -45]
					}]
				],
				reset: {
					transformPerspective: 0
				}
			},
			"transition.flipYOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						rotateX: 25
					}]
				],
				reset: {
					transformPerspective: 0,
					rotateX: 0
				}
			},
			"transition.flipBounceXIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [.725, 0],
						transformPerspective: [400, 400],
						rotateY: [-10, 90]
					}, .5],
					[{
						opacity: .8,
						rotateY: 10
					}, .25],
					[{
						opacity: 1,
						rotateY: 0
					}, .25]
				],
				reset: {
					transformPerspective: 0
				}
			},
			"transition.flipBounceXOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [.9, 1],
						transformPerspective: [400, 400],
						rotateY: -10
					}, .5],
					[{
						opacity: 0,
						rotateY: 90
					}, .5]
				],
				reset: {
					transformPerspective: 0,
					rotateY: 0
				}
			},
			"transition.flipBounceYIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [.725, 0],
						transformPerspective: [400, 400],
						rotateX: [-10, 90]
					}, .5],
					[{
						opacity: .8,
						rotateX: 10
					}, .25],
					[{
						opacity: 1,
						rotateX: 0
					}, .25]
				],
				reset: {
					transformPerspective: 0
				}
			},
			"transition.flipBounceYOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [.9, 1],
						transformPerspective: [400, 400],
						rotateX: -15
					}, .5],
					[{
						opacity: 0,
						rotateX: 90
					}, .5]
				],
				reset: {
					transformPerspective: 0,
					rotateX: 0
				}
			},
			"transition.swoopIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["100%", "50%"],
						transformOriginY: ["100%", "100%"],
						scaleX: [1, 0],
						scaleY: [1, 0],
						translateX: [0, -700],
						translateZ: 0
					}]
				],
				reset: {
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			"transition.swoopOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "100%"],
						transformOriginY: ["100%", "100%"],
						scaleX: 0,
						scaleY: 0,
						translateX: -700,
						translateZ: 0
					}]
				],
				reset: {
					transformOriginX: "50%",
					transformOriginY: "50%",
					scaleX: 1,
					scaleY: 1,
					translateX: 0
				}
			},
			"transition.whirlIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 0],
						scaleY: [1, 0],
						rotateY: [0, 160]
					},
					1,
					{
						easing: "easeInOutSine"
					}]
				]
			},
			"transition.whirlOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, "easeInOutQuint", 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: 0,
						scaleY: 0,
						rotateY: 160
					},
					1,
					{
						easing: "swing"
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1,
					rotateY: 0
				}
			},
			"transition.shrinkIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 1.5],
						scaleY: [1, 1.5],
						translateZ: 0
					}]
				]
			},
			"transition.shrinkOut": {
				defaultDuration: 600,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: 1.3,
						scaleY: 1.3,
						translateZ: 0
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			"transition.expandIn": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, .625],
						scaleY: [1, .625],
						translateZ: 0
					}]
				]
			},
			"transition.expandOut": {
				defaultDuration: 700,
				calls: [
					[{
						opacity: [0, 1],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: .5,
						scaleY: .5,
						translateZ: 0
					}]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			"transition.bounceIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						scaleX: [1.05, .3],
						scaleY: [1.05, .3]
					}, .4],
					[{
						scaleX: .9,
						scaleY: .9,
						translateZ: 0
					}, .2],
					[{
						scaleX: 1,
						scaleY: 1
					}, .5]
				]
			},
			"transition.bounceOut": {
				defaultDuration: 800,
				calls: [
					[{
						scaleX: .95,
						scaleY: .95
					}, .35],
					[{
						scaleX: 1.1,
						scaleY: 1.1,
						translateZ: 0
					}, .35],
					[{
						opacity: [0, 1],
						scaleX: .3,
						scaleY: .3
					}, .3]
				],
				reset: {
					scaleX: 1,
					scaleY: 1
				}
			},
			"transition.bounceUpIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [-30, 1e3]
					}, .6,
					{
						easing: "easeOutCirc"
					}],
					[{
						translateY: 10
					}, .2],
					[{
						translateY: 0
					}, .2]
				]
			},
			"transition.bounceUpOut": {
				defaultDuration: 1e3,
				calls: [
					[{
						translateY: 20
					}, .2],
					[{
						opacity: [0, "easeInCirc", 1],
						translateY: -1e3
					}, .8]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.bounceDownIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [30, -1e3]
					}, .6,
					{
						easing: "easeOutCirc"
					}],
					[{
						translateY: -10
					}, .2],
					[{
						translateY: 0
					}, .2]
				]
			},
			"transition.bounceDownOut": {
				defaultDuration: 1e3,
				calls: [
					[{
						translateY: -20
					}, .2],
					[{
						opacity: [0, "easeInCirc", 1],
						translateY: 1e3
					}, .8]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.bounceLeftIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [30, -1250]
					}, .6,
					{
						easing: "easeOutCirc"
					}],
					[{
						translateX: -10
					}, .2],
					[{
						translateX: 0
					}, .2]
				]
			},
			"transition.bounceLeftOut": {
				defaultDuration: 750,
				calls: [
					[{
						translateX: 30
					}, .2],
					[{
						opacity: [0, "easeInCirc", 1],
						translateX: -1250
					}, .8]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.bounceRightIn": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [-30, 1250]
					}, .6,
					{
						easing: "easeOutCirc"
					}],
					[{
						translateX: 10
					}, .2],
					[{
						translateX: 0
					}, .2]
				]
			},
			"transition.bounceRightOut": {
				defaultDuration: 750,
				calls: [
					[{
						translateX: -30
					}, .2],
					[{
						opacity: [0, "easeInCirc", 1],
						translateX: 1250
					}, .8]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideUpIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, 20],
						translateZ: 0
					}]
				]
			},
			"transition.slideUpOut": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [0, 1],
						translateY: -20,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideDownIn": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, -20],
						translateZ: 0
					}]
				]
			},
			"transition.slideDownOut": {
				defaultDuration: 900,
				calls: [
					[{
						opacity: [0, 1],
						translateY: 20,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideLeftIn": {
				defaultDuration: 1e3,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, -20],
						translateZ: 0
					}]
				]
			},
			"transition.slideLeftOut": {
				defaultDuration: 1050,
				calls: [
					[{
						opacity: [0, 1],
						translateX: -20,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideRightIn": {
				defaultDuration: 1e3,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, 20],
						translateZ: 0
					}]
				]
			},
			"transition.slideRightOut": {
				defaultDuration: 1050,
				calls: [
					[{
						opacity: [0, 1],
						translateX: 20,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideUpBigIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, 75],
						translateZ: 0
					}]
				]
			},
			"transition.slideUpBigOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						translateY: -75,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideDownBigIn": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [1, 0],
						translateY: [0, -75],
						translateZ: 0
					}]
				]
			},
			"transition.slideDownBigOut": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [0, 1],
						translateY: 75,
						translateZ: 0
					}]
				],
				reset: {
					translateY: 0
				}
			},
			"transition.slideLeftBigIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, -75],
						translateZ: 0
					}]
				]
			},
			"transition.slideLeftBigOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, 1],
						translateX: -75,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.slideRightBigIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						translateX: [0, 75],
						translateZ: 0
					}]
				]
			},
			"transition.slideRightBigOut": {
				defaultDuration: 750,
				calls: [
					[{
						opacity: [0, 1],
						translateX: 75,
						translateZ: 0
					}]
				],
				reset: {
					translateX: 0
				}
			},
			"transition.perspectiveUpIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: ["100%", "100%"],
						rotateX: [0, -180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			"transition.perspectiveUpOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: ["100%", "100%"],
						rotateX: -180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateX: 0
				}
			},
			"transition.perspectiveDownIn": {
				defaultDuration: 800,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateX: [0, 180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			"transition.perspectiveDownOut": {
				defaultDuration: 850,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [800, 800],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateX: 180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateX: 0
				}
			},
			"transition.perspectiveLeftIn": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [2e3, 2e3],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateY: [0, -180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			"transition.perspectiveLeftOut": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [2e3, 2e3],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateY: -180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateY: 0
				}
			},
			"transition.perspectiveRightIn": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [1, 0],
						transformPerspective: [2e3, 2e3],
						transformOriginX: ["100%", "100%"],
						transformOriginY: [0, 0],
						rotateY: [0, 180]
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%"
				}
			},
			"transition.perspectiveRightOut": {
				defaultDuration: 950,
				calls: [
					[{
						opacity: [0, 1],
						transformPerspective: [2e3, 2e3],
						transformOriginX: ["100%", "100%"],
						transformOriginY: [0, 0],
						rotateY: 180
					}]
				],
				reset: {
					transformPerspective: 0,
					transformOriginX: "50%",
					transformOriginY: "50%",
					rotateY: 0
				}
			}
		};
		for (var k in f.RegisterEffect.packagedEffects) f.RegisterEffect.packagedEffects.hasOwnProperty(k) && f.RegisterEffect(k, f.RegisterEffect.packagedEffects[k]);
		f.RunSequence = function(a) {
			var b = g.extend(!0, [], a);
			b.length > 1 && (g.each(b.reverse(), function(a, c) {
				var d = b[a + 1];
				if (d) {
					var e = c.o || c.options,
						h = d.o || d.options,
						i = e && e.sequenceQueue === !1 ? "begin" : "complete",
						j = h && h[i],
						k = {};
					k[i] = function() {
						var a = d.e || d.elements,
							b = a.nodeType ? [a] : a;
						j && j.call(b, b), f(c)
					}, d.o ? d.o = g.extend({}, h, k) : d.options = g.extend({}, h, k)
				}
			}), b.reverse()), f(b[0])
		}
	}(window.jQuery || window.Zepto || window, window, document)
});

// Generated by CoffeeScript 1.9.2

/**
@license Sticky-kit v1.1.2 | WTFPL | Leaf Corcoran 2015 | http://leafo.net
 */

(function() {
  var $, win;

  $ = this.jQuery || window.jQuery;

  win = $(window);

  $.fn.stick_in_parent = function(opts) {
    var doc, elm, enable_bottoming, fn, i, inner_scrolling, len, manual_spacer, offset_top, parent_selector, recalc_every, sticky_class;
    if (opts == null) {
      opts = {};
    }
    sticky_class = opts.sticky_class, inner_scrolling = opts.inner_scrolling, recalc_every = opts.recalc_every, parent_selector = opts.parent, offset_top = opts.offset_top, manual_spacer = opts.spacer, enable_bottoming = opts.bottoming;
    if (offset_top == null) {
      offset_top = 0;
    }
    if (parent_selector == null) {
      parent_selector = void 0;
    }
    if (inner_scrolling == null) {
      inner_scrolling = true;
    }
    if (sticky_class == null) {
      sticky_class = "is_stuck";
    }
    doc = $(document);
    if (enable_bottoming == null) {
      enable_bottoming = true;
    }
    fn = function(elm, padding_bottom, parent_top, parent_height, top, height, el_float, detached) {
      var bottomed, detach, fixed, last_pos, last_scroll_height, offset, parent, recalc, recalc_and_tick, recalc_counter, spacer, tick;
      if (elm.data("sticky_kit")) {
        return;
      }
      elm.data("sticky_kit", true);
      last_scroll_height = doc.height();
      parent = elm.parent();
      if (parent_selector != null) {
        parent = parent.closest(parent_selector);
      }
      if (!parent.length) {
        throw "failed to find stick parent";
      }
      fixed = false;
      bottomed = false;
      spacer = manual_spacer != null ? manual_spacer && elm.closest(manual_spacer) : $("<div />");
      if (spacer) {
        spacer.css('position', elm.css('position'));
      }
      recalc = function() {
        var border_top, padding_top, restore;
        if (detached) {
          return;
        }
        last_scroll_height = doc.height();
        border_top = parseInt(parent.css("border-top-width"), 10);
        padding_top = parseInt(parent.css("padding-top"), 10);
        padding_bottom = parseInt(parent.css("padding-bottom"), 10);
        parent_top = parent.offset().top + border_top + padding_top;
        parent_height = parent.height();
        if (fixed) {
          fixed = false;
          bottomed = false;
          if (manual_spacer == null) {
            elm.insertAfter(spacer);
            spacer.detach();
          }
          elm.css({
            position: "",
            top: "",
            width: "",
            bottom: ""
          }).removeClass(sticky_class);
          restore = true;
        }
        top = elm.offset().top - (parseInt(elm.css("margin-top"), 10) || 0) - offset_top;
        height = elm.outerHeight(true);
        el_float = elm.css("float");
        if (spacer) {
          spacer.css({
            width: elm.outerWidth(true),
            height: height,
            display: elm.css("display"),
            "vertical-align": elm.css("vertical-align"),
            "float": el_float
          });
        }
        if (restore) {
          return tick();
        }
      };
      recalc();
      if (height === parent_height) {
        return;
      }
      last_pos = void 0;
      offset = offset_top;
      recalc_counter = recalc_every;
      tick = function() {
        var css, delta, recalced, scroll, will_bottom, win_height;
        if (detached) {
          return;
        }
        recalced = false;
        if (recalc_counter != null) {
          recalc_counter -= 1;
          if (recalc_counter <= 0) {
            recalc_counter = recalc_every;
            recalc();
            recalced = true;
          }
        }
        if (!recalced && doc.height() !== last_scroll_height) {
          recalc();
          recalced = true;
        }
        scroll = win.scrollTop();
        if (last_pos != null) {
          delta = scroll - last_pos;
        }
        last_pos = scroll;
        if (fixed) {
          if (enable_bottoming) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
            if (bottomed && !will_bottom) {
              bottomed = false;
              elm.css({
                position: "fixed",
                bottom: "",
                top: offset
              }).trigger("sticky_kit:unbottom");
            }
          }
          if (scroll < top) {
            fixed = false;
            offset = offset_top;
            if (manual_spacer == null) {
              if (el_float === "left" || el_float === "right") {
                elm.insertAfter(spacer);
              }
              spacer.detach();
            }
            css = {
              position: "",
              width: "",
              top: ""
            };
            elm.css(css).removeClass(sticky_class).trigger("sticky_kit:unstick");
          }
          if (inner_scrolling) {
            win_height = win.height();
            if (height + offset_top > win_height) {
              if (!bottomed) {
                offset -= delta;
                offset = Math.max(win_height - height, offset);
                offset = Math.min(offset_top, offset);
                if (fixed) {
                  elm.css({
                    top: offset + "px"
                  });
                }
              }
            }
          }
        } else {
          if (scroll > top) {
            fixed = true;
            css = {
              position: "fixed",
              top: offset
            };
            css.width = elm.css("box-sizing") === "border-box" ? elm.outerWidth() + "px" : elm.width() + "px";
            elm.css(css).addClass(sticky_class);
            if (manual_spacer == null) {
              elm.after(spacer);
              if (el_float === "left" || el_float === "right") {
                spacer.append(elm);
              }
            }
            elm.trigger("sticky_kit:stick");
          }
        }
        if (fixed && enable_bottoming) {
          if (will_bottom == null) {
            will_bottom = scroll + height + offset > parent_height + parent_top;
          }
          if (!bottomed && will_bottom) {
            bottomed = true;
            if (parent.css("position") === "static") {
              parent.css({
                position: "relative"
              });
            }
            return elm.css({
              position: "absolute",
              bottom: padding_bottom,
              top: "auto"
            }).trigger("sticky_kit:bottom");
          }
        }
      };
      recalc_and_tick = function() {
        recalc();
        return tick();
      };
      detach = function() {
        detached = true;
        win.off("touchmove", tick);
        win.off("scroll", tick);
        win.off("resize", recalc_and_tick);
        $(document.body).off("sticky_kit:recalc", recalc_and_tick);
        elm.off("sticky_kit:detach", detach);
        elm.removeData("sticky_kit");
        elm.css({
          position: "",
          bottom: "",
          top: "",
          width: ""
        });
        parent.position("position", "");
        if (fixed) {
          if (manual_spacer == null) {
            if (el_float === "left" || el_float === "right") {
              elm.insertAfter(spacer);
            }
            spacer.remove();
          }
          return elm.removeClass(sticky_class);
        }
      };
      win.on("touchmove", tick);
      win.on("scroll", tick);
      win.on("resize", recalc_and_tick);
      $(document.body).on("sticky_kit:recalc", recalc_and_tick);
      elm.on("sticky_kit:detach", detach);
      return setTimeout(tick, 0);
    };
    for (i = 0, len = this.length; i < len; i++) {
      elm = this[i];
      fn($(elm));
    }
    return this;
  };

}).call(this);