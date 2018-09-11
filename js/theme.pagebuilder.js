/* UX Isotope Grid  */
function ThemeIsotope(){
	var ux_ts = this;
	var theme_win = jQuery(window);
	
	//ts init
	this.init = function(){
		//ThemeIsotope: isotope list double width
		var _isotope_width4 = jQuery('.isotope .width4');
		if(_isotope_width4.length){
			ux_ts.isotopewidth4();
		}
		
		//ThemeIsotope: Run isotope
		$allcontainer = jQuery('.container-fluid.main');
		
		//ThemeIsotope: Call isotope
		var _isotope = jQuery('.isotope');
		if(_isotope.length){
			ux_ts.callisotope();
		}
		
		//ThemeIsotope: isotope filter
		var _filters = jQuery('.filters');
		if(_filters.length){
			ux_ts.isotopefilters();
		}
		
		//win smartresize
		theme_win.resize(function(){
			ux_ts.refresh();
		}).resize();
		
		theme_win.load(function(){
			ux_ts.refresh();
		});
	}
	
	this.refresh = function(){
		var _isotope = jQuery('.isotope');
		if(_isotope.length){
			_isotope.each(function(index, element) {
				var _this = jQuery(this),
					image_size = jQuery(this).data('size');
				
				ux_ts.setWidths(image_size, _this);
				_this.isotope({
					masonry: {
						columnWidth: ux_ts.getUnitWidth(image_size, _this)
					}
				});
			})
		}
	}
	
	//ThemeIsotope: isotope list double width
	this.isotopewidth4 = function(){
		var _isotope_width4 = jQuery('.isotope .width4');
		_isotope_width4.each(function(index, element) {
			var width = jQuery(this).find('.fade_wrap').width();
			jQuery(this).find('img').width(width);
		});
	}
	
	//ThemeIsotope: isotope list responsive
	this.getUnitWidth = function(size, container){
		var width;
		switch(size){
			case 'medium':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 6);
				}
				
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 3);
					}
				}
			break;
			
			case 'large':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 4);
				}
				
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 2);
					}
				}
			break;

			case 'larger':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 6);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 10);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 12);
				}
				
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 2);
					}
				}
			break;

			case 'fullwidth':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 1);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 2);
				}
				
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 2);
					}
				}
			break;
			
			case 'small':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 8);
				}
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 4);
					}
				}
			break;

			case 'tiny':
				if (container.width() <= 320) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 321 && container.width() <= 480) {
					width = Math.floor(container.width() / 2);
				} else if (container.width() >= 481 && container.width() <= 768) {
					width = Math.floor(container.width() / 8);
				} else if (container.width() >= 769 && container.width() <= 979) {
					width = Math.floor(container.width() / 16);
				} else if (container.width() >= 980 && container.width() <= 1200) {
					width = Math.floor(container.width() / 16);
				} else if (container.width() >= 1201 && container.width() <= 1600) {
					width = Math.floor(container.width() / 16);
				} else if (container.width() >= 1601 && container.width() <= 1824) {
					width = Math.floor(container.width() / 16);
				} else if (container.width() >= 1825) {
					width = Math.floor(container.width() / 16);
				}
				if(container.is('.team-isotope')){
					if(container.width() <= 480){
						width = Math.floor(container.width() / 1);
					}else if(container.width() >= 481){
						width = Math.floor(container.width() / 4);
					}
				}
			break;
			
			case 'brick':
				if (container.width() > 1440) {
					width = Math.floor(container.width() / 7);
				} else if (container.width() > 1365) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() > 1279) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() > 1023) {
					width = Math.floor(container.width() / 4);
				} else if (container.width() > 767) {
					width = Math.floor(container.width() / 3);
				} else if (container.width() > 479) {
					width = Math.floor(container.width() / 2);
				} else {
					width = Math.floor(container.width() / 1);
				}
			break;
		}
		return width;
	}
	
	this.setWidths = function(size,container){
		var unitWidth = ux_ts.getUnitWidth(size,container) - 0;
		container.children(":not(.width2)").css({
			width: unitWidth
		});
		
		if (container.width() <= 480) {
			container.children(".width2").css({
				width: unitWidth * 1
			});
			container.children(".width4").css({
				width: unitWidth * 2
			});
			container.children(".width6").css({
				width: unitWidth * 2
			});
			container.children(".width8").css({
				width: unitWidth * 2
			});
			
			//brick
			container.children(".width-and-small").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.children(".width-and-big").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.children(".width-and-long").css({ width: unitWidth * 1, height: unitWidth / 2 });
			container.children(".width-and-height").css({ width: unitWidth * 1, height: unitWidth * 2 });
		}
		if (container.width() >= 481) {
			container.children(".width8").css({
				width: unitWidth * 8
			});
			container.children(".width6").css({
				width: unitWidth * 6
			});
			container.children(".width4").css({
				width: unitWidth * 4
			});
			container.children(".width2").css({
				width: unitWidth * 2
			});
			
			if(container.is('.team-isotope')){
				container.children(".width2").css({
					width: unitWidth * 1
				});
			}
			
			//brick --- thumb small
			container.children(".width-and-small").css({ width: unitWidth * 1, height: unitWidth * 1 });
			container.find(".width-and-small img").css({ width: unitWidth * 1 });
			
			//brick --- thumb big
			container.children(".width-and-big").css({ width: unitWidth * 2, height: unitWidth * 2 });
			container.find(".width-and-big img").css({ width: unitWidth * 2, });
			
			//brick --- thumb long
			container.children(".width-and-long").css({ width: unitWidth * 2, height: unitWidth * 1 });
			container.find(".width-and-long img").css({ width: unitWidth * 2 });
			
			//brick --- thumb height
			container.children(".width-and-height").css({ width: unitWidth * 1, height: unitWidth * 2 });
			container.find(".width-and-height img").css({ width: unitWidth * 1 });
			
			//brick set height
			if(size == 'brick'){
				container.children().each(function(){
					var _this = jQuery(this);
					var _this_height = jQuery(this).height();
					
					if(Math.floor(_this.find('img').height()) < Math.floor(_this_height)){
						_this.find('img').css({
							width: 'auto',
							height: _this_height
						});
					}
				});
			}
			
		} else {
			container.children(".width2").css({
				width: unitWidth
			});
		}
	}
	
	//ThemeIsotope: Call isotope
	this.callisotope = function(){
		var _isotope = jQuery('.isotope');
		
		_isotope.each(function(index, element) {
			var _this = jQuery(this);
			var image_size = _this.data('size');
			
			
			if(image_size != 'brick'){
				ux_ts.setWidths(image_size, _this);
			}
				
			_this.imagesLoaded(function(){
				if(_this.is('.masonry')){
					_this.isotope({
						animationEngine : 'css',
						//resizable: false,
						masonry: {
							columnWidth: ux_ts.getUnitWidth(image_size, _this)
						}
					});
				}else if(_this.is('.grid_list')){
					_this.isotope({
						layoutMode : 'fitRows',
						animationEngine : 'css',
						//resizable: false,
						masonry: {
							columnWidth: ux_ts.getUnitWidth(image_size, _this)
						}
					});
				}
			});
			
			_this.addClass('isotope_fade');
			_this.siblings('#isotope-load').fadeOut(300);
		});
	}
	
	//ThemeIsotope: isotope filter
	this.isotopefilters = function(){
		var _filters = jQuery('.filters');
		_filters.delegate('a', 'click', function() {
			$container = jQuery(this).parent().parent().parent().next().find('.isotope');
			jQuery(this).parent().parent().find('li').removeClass('active');
			jQuery(this).parent().addClass('active');
			var selector = jQuery(this).attr('data-filter');
			$container.isotope({
				filter: selector
			});
			return false;
		});

		if( _filters.find('.filter-floating-triggle').length ){

			_filters.find('ul').contents().filter(function() {
				return this.nodeType === 3;
			}).remove();

		}
	}
	
}

function fnIsExitsFunction(funcName){
	try {
		if (typeof(eval(funcName)) == "function") {
			return true;
		}
	} catch(e) {}
	return false;
}

if(!fnIsExitsFunction('fnInitPhotoSwipeFromDOM')){
	function fnInitPhotoSwipeFromDOM(gallerySelector){
		// parse slide data (url, title, size ...) from DOM elements 
		// (children of gallerySelector)
		var parseThumbnailElements = function(el){
			var thumbElements = jQuery(el).find('[data-lightbox=true]'),
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;
	
			for(var i = 0; i < numNodes; i++){
	
				figureEl = thumbElements[i]; // <figure> element
	
				// include only element nodes 
				if(figureEl.nodeType !== 1){
					continue;
				}
	
				//linkEl = figureEl.children[0]; // <a> element
				linkEl = jQuery(figureEl).find('.lightbox-item');
	
				size = linkEl.attr('data-size').split('x');
	
				// create slide object
				item = {
					src: linkEl.attr('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
	
	
	
				if(figureEl.children.length > 1){
					// <figcaption> content
					item.title = linkEl.attr('title'); 
				}
	
				if(linkEl.find('img').length > 0){
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.find('img').attr('src');
				} 
	
				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}
	
			return items;
		};
	
		// find nearest parent element
		var closest = function closest(el, fn){
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};
	
		// triggers when user clicks on thumbnail
		var onThumbnailsClick = function(e){
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
	
			var eTarget = e.target || e.srcElement;
	
			// find root element of slide
			var clickedListItem = closest(eTarget, function(el){
				if(el.tagName){
					return (el.hasAttribute('data-lightbox') && el.getAttribute('data-lightbox') === 'true'); 
				}
			});
	
			if(!clickedListItem){
				return;
			}
	
			// find index of clicked item by looping through all child nodes
			// alternatively, you may define index via data- attribute
			var clickedGallery = jQuery(clickedListItem).parents('.lightbox-photoswipe'),
				childNodes = clickedGallery.find('[data-lightbox=\"true\"]'),
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;
	
			for (var i = 0; i < numChildNodes; i++){
				if(childNodes[i].nodeType !== 1){ 
					continue; 
				}
	
				if(childNodes[i] === clickedListItem){
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}
			
			if(index >= 0){
				// open PhotoSwipe if valid index found
				openPhotoSwipe(index, clickedGallery[0]);
			}
			return false;
		};
	
		// parse picture index and gallery index from URL (#&pid=1&gid=2)
		var photoswipeParseHash = function(){
			var hash = window.location.hash.substring(1),
			params = {};
	
			if(hash.length < 5) {
				return params;
			}
	
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');  
				if(pair.length < 2) {
					continue;
				}           
				params[pair[0]] = pair[1];
			}
	
			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}
	
			if(!params.hasOwnProperty('pid')) {
				return params;
			}
			params.pid = parseInt(params.pid, 10);
			return params;
		};
	
		var openPhotoSwipe = function(index, galleryElement, disableAnimation){
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;
	
			items = parseThumbnailElements(galleryElement);
	
			// define options (if needed)
			options = {
				index: index,
	
				// define gallery index (for URL)
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
	
				getThumbBoundsFn: function(index) {
					// See Options -> getThumbBoundsFn section of documentation for more info
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect(); 
	
					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}
	
			};
	
			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}
	
			// Pass data to PhotoSwipe and initialize it
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};
	
		// loop through all gallery elements and bind events
		var galleryElements = document.querySelectorAll(gallerySelector);
		
		for(var i = 0, l = galleryElements.length; i < l; i++){
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
	
		// Parse URL and open gallery if it contains #&pid=3&gid=1
		var hashData = photoswipeParseHash();
		if(hashData.pid > 0 && hashData.gid > 0) {
			openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
		}
	}
}

//
// Call pagebuild js
//

(function($){

    "use strict";
	
	var themePB = [];
	
	//window
	themePB.win                   = $(window);
	themePB.winHeight             = themePB.win.height();
	themePB.winScrollTop          = themePB.win.scrollTop();
	
	//document
	themePB.doc                   = $(document);
	
	//ID A~Z
	themePB.content               = $('#content');
	themePB.jplayer               = $('#jquery_jplayer');
	themePB.wrap                  = $('#wrap');
	
	//tag
	themePB.html                  = $('html');
	themePB.body                  = $('body');
	
	//tag class
	
	//class
	themePB.moduleAjaxWrap        = $('.portfolio-ajaxwrap');
	themePB.moduleAjaxWrapLoading = $('.portfolio-ajaxwrap-loading');
	themePB.moduleAjaxWrapInn     = $('.portfolio-ajaxwrap-inn');
	themePB.moduleAjaxWrapClose   = $('.portfolio-ajaxwrap-close');
	
	themePB.module                = $('.moudle');
	themePB.moduleFullwidthWrap   = $('.fullwidth-wrap');
	themePB.moduleFullwidthTabs   = $('.fullwrap-with-tab-nav');
	themePB.moduleFullwidthBlock  = $('.fullwrap-block-style');
	themePB.moduleParallax        = $('.parallax');
	themePB.moduleAjaxPermalink   = themePB.module.find('.ajax-permalink');
	themePB.moduleAccordion       = themePB.module.find('.accordion-ux');
	themePB.moduleBlog            = themePB.module.find('.blog-wrap');
	themePB.moduleContactForm     = themePB.module.find('.contact_form');
	themePB.moduleCountdown       = themePB.module.find('.countdown');
	themePB.moduleClientsWrap     = themePB.module.find('.clients_wrap');
	themePB.moduleFlexSliderWrap  = themePB.module.find('.flex-slider-wrap');
	themePB.moduleGoogleMap       = themePB.module.find('.module-map-canvas');
	themePB.moduleIconbox         = themePB.module.find('.iconbox-plus');
	themePB.moduleImagebox        = themePB.module.find('.image-box-svg-wrap');
	themePB.moduleImageShadow     = themePB.module.find('.shadow');
	themePB.moduleLiquidlist      = themePB.module.find('.isotope-liquid-list');
	themePB.moduleLiquidImage     = themePB.module.find('.liquid_list_image');
	themePB.moduleListItemSlider  = themePB.module.find('.listitem_slider');
	themePB.moduleMessageBox      = themePB.module.find('.message-box');
	themePB.moduleTabs            = themePB.module.find('.nav-tabs');
	themePB.modulePromoteButton   = themePB.module.find('.promote-button-wrap');
	themePB.modulePagenumsTwitter = themePB.module.find('.pagenums.page_twitter a');
	themePB.modulePagenumsSelect  = themePB.module.find('.pagenums .select_pagination');
	themePB.moduleSeparator       = themePB.module.find('.separator');
	themePB.moduleTabsV           = themePB.module.find('.tabs-v');
	
	themePB.moduleHasAnimation    = $('.moudle_has_animation');
	
	themePB.videoFace             = $('.video-face');
	themePB.videoOverlay          = $('.video-overlay');
	themePB.lightboxPhotoSwipe    = $('.lightbox-photoswipe');
	themePB.carousel              = $('.owl-carousel-pb');
	
	//items
	themePB.itemIconboxs          = [];
	themePB.itemSeparator         = [];
	themePB.itemClients           = [];
	themePB.itemParallax          = [];
	themePB.itemParallax          = [];
	themePB.itemListItemSlider    = [];
	
	
	//define
	themePB.themeIsotope          = new ThemeIsotope;
	themePB.themeIsotope.init();
	
	//condition
	themePB.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || themePB.win.width() < 769){
			return true; 
		}else{
			return false;
		}
	}
	
	//function
	//Portfolio list layout hover on touch
	themePB.PortfolioListHover = function(){
		$('.portfolio-list').find('.list-layout-item').each(function(){
			$(this).on({'touchstart': function(){ 
				if($(this).hasClass('list-layout-item-hover')){
					$(this).removeClass('list-layout-item-hover');
				} else {
					$(this).addClass('list-layout-item-hover');
				}
			}});
		});
	}


	//Pagebuild: Tab-v responsive
	themePB.fnTabResponsive = function(){
		themePB.moduleTabsV.each(function(){
			
			var tab = $(this),
				tabNav = tab.find('.nav-tabs-v'),
				tabContent = tab.find('.nav-tabs-v');
			
		});
	}
	
	//Contact Form Verification and Ajax Send
	themePB.fnContactForm = function(){
		themePB.moduleContactForm.each(function(){
			
			var form = $(this),
				formMessage = form.find('input[type=\"hidden\"].info-tip').data('message'),
				formSending = form.find('input[type=\"hidden\"].info-tip').data('sending'),
				formErrorTip = form.find('input[type=\"hidden\"].info-tip').data('error'),
				formVerifyWrap = form.find('.verify-wrap');
				
				//themePB.fnCaptcha(formVerifyWrap);
				
				form.submit(function() {
					var hasError = false;
					
					form.find('.requiredField').each(function(){
						if($.trim($(this).val()) == '' || $.trim($(this).val()) == 'Name' || $.trim($(this).val()) == 'Email' || $.trim($(this).val()) == 'Required' || $.trim($(this).val()) == 'Invalid email' || $.trim($(this).val()) == 'YOUR MESSAGE'){
							$(this).attr("value", "Required");
							hasError = true;
							
						}else if($(this).hasClass('email')){
							var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
							
							if(!emailReg.test($.trim($(this).val()))){
								$(this).attr("value", "Invalid email");
								hasError = true;
							}
						
						}

					});

					//After verification, print some infos. 
					if(!hasError){ 
						form.find('#idi_send').fadeOut('normal', function(){
							form.parent().append('<p class="sending">' + formSending + '</p>');
						}); 
						var formInput = form.serialize();
						
						$.post(form.attr('action'),formInput, function(data){		
							form.slideUp("fast", function() { 
								form.before('<p class="success">' + formMessage + '</p>');
								form.siblings('.sending').fadeOut(); 
							});
						});
					}
					
					return false;
				});
				
		});//End each
	}
	
	//Pagebuild: Client Moudle
	themePB.fnClients = function(carouselWrap){
		carouselWrap.each(function(){

			var 
			_client_li = $(this).find('.client-li').length,
			_margin = $(this).data('margin'),
			_center = $(this).data('center'),
			_item   = $(this).data('item'),
			_autoW  = $(this).data('autowidth'),
			_slideby = $(this).data('slideby'),
			_auto    = $(this).data('auto');

			$(this).find('img').imagesLoaded(function(){

				if(_item >= _client_li){
					var _nav = false;
				}else{
					var _nav = true;
				}

				carouselWrap.owlCarousel({
				    margin: _margin,
				    loop:true,
				    autoWidth:_autoW,
				    center: _center,
				    slideSpeed : 300,
		            paginationSpeed : 400,
				    items: _item,
				    autoplay: _auto,
				    responsiveClass:true,
				    navText:["",""],
				    slideBy:_slideby 
				});
				
			});

		});
	}
	
	//Pagebuild: GoogleMap initialize
	themePB.fnMapInit = function(gm){
		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(gm.l, gm.r);
		var dismouse = gm.dismouse == 't' ? true : false;
		var markers = [];
		var map_type;
		//var draggable_touch = themePB.isMobile == true ? 'false' : 'true';
		switch(gm.view){
			case 'map': map_type = google.maps.MapTypeId.ROADMAP; break;
			case 'satellite': map_type = google.maps.MapTypeId.SATELLITE; break;
			case 'map_terrain': map_type = google.maps.MapTypeId.TERRAIN; break;
		}
		if(themePB.isMobile()) {
			var mapOptions = {
				zoom: gm.zoom,
				center: latlng,
				mapTypeId: map_type,
				scrollwheel: dismouse,
				draggable: false,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			}
		} else {
			var mapOptions = {
				zoom: gm.zoom,
				center: latlng,
				mapTypeId: map_type,
				scrollwheel: dismouse,
				draggable: true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			}

		}
		var google_map = new google.maps.Map(gm.element, mapOptions);
		
		if(gm.pin == 't'){
			if(gm.pin_custom != ''){
				var image = {
					url: gm.pin_custom
				};
				
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map,
					icon: image
				});
			}else{
				var marker = new google.maps.Marker({
					position: latlng,
					map: google_map
				});
			}
				
			//marker.setAnimation(google.maps.Animation.BOUNCE);
		}
		
		if(gm.style == 't' && eval(gm.style_code)){
			var styledMap = new google.maps.StyledMapType(eval(gm.style_code), {name: "Styled Map"});
			 
			google_map.mapTypes.set('map_style', styledMap);
			google_map.setMapTypeId('map_style');
		}
	}
	
	//Pagebuild: Fullwrap Parallax
	themePB.fnSetTranslate3DTransform = function(el, xPosition, yPosition){
		var value = "translate3d(" + xPosition + "px" + ", " + yPosition + "px" + ", 0)";
		el.css({
			'transform': value,
			'msTransform': value,
			'webkitTransform': value,
			'mozTransform': value,
			'oTransform': value,
		});
	}
	
	//Pagebuild: Call Carousel Slider, Content slider responsive
	themePB.fnContentslider = function(){
		$.each(themePB.itemListItemSlider, function(index, slider){
			
			slider.itemWidth = slider.item.width();
			slider.imageHeight = slider.itemWidth * 0.57;
			slider.titleHeight = slider.title.height();
			slider.descriptionHeight = slider.description.height();
			slider.panelHeight = slider.titleHeight + slider.descriptionHeight;
			
			if(slider.itemWidth < 561){
				
				slider.itemItem.css({'height':'auto'});
				slider.carouselImage.css({'height':slider.imageHeight,'width':'100%','float':'none'});
				slider.panel.css({'width':'100%','float':'none','height':'400px'});
				slider.image.css({'width':'100%','height':'auto'});
				slider.carouselIndicators.css({'width':'100%'});
				slider.titleH2.css({'font-size':'18px','line-height':'20px'});
				
			}else if(slider.itemWidth > 562 &&  slider.itemWidth < 725){
				
				slider.itemItem.css({'height':'400px'});
				slider.carouselImage.css({'height':'400px','width':'60%','float':'left'});
				slider.panel.css({'width':'40%','float':'left','height':'400px'});
				slider.image.css({'width':'auto','height':'100%'});
				slider.carouselIndicators.css({'width':'40%'});
				slider.titleH2.css({'font-size':'18px','line-height':'20px'});
				
			}else{
				
				slider.itemItem.css({'height':'400px'});
				slider.carouselImage.css({'height':'400px','width':'60%','float':'left'});
				slider.panel.css({'width':'40%','float':'left','height':'400px'});
				slider.image.css({'width':'100%','height':'auto'});
				slider.carouselIndicators.css({'width':'40%'});
				slider.titleH2.css({'font-size':'30px','line-height':'40px'});
				
			}
		});
	}
	
	//Pagebuild: Flex Slider
	themePB.fnFlexslider = function(){
		themePB.moduleFlexSliderWrap.each(function(){
			var flexslider = [];
			
			flexslider.item = $(this);
			flexslider.direction = flexslider.item.data('direction');
			flexslider.control = flexslider.item.data('control');
			flexslider.speed = flexslider.item.data('speed');
			flexslider.animation = flexslider.item.data('animation');
			flexslider.children = flexslider.item.find('.flexslider');
			
			flexslider.children.flexslider({
				animation: ''+flexslider.animation+'', //String: Select your animation type, "fade" or "slide"
				animationLoop: true,
				slideshow: true, 
				smoothHeight: true,  
				controlNav: flexslider.control, //Dot Nav
				directionNav: flexslider.direction,  // Next\Prev Nav
				touch: true, 
				slideshowSpeed: flexslider.speed * 1000 
				//itemWidth: 210,
				//itemMargin: 5
			});
		});
	}
	
	//Pagebuild: Module Load Ajax
	themePB.fnModuleLoad = function(data, container){
		$.post(AJAX_M, {
			'mode': 'module',
			'data': data
		}).done(function(content){
			if(container.is('.container-isotope')){
				var newElems = $(content).css({ opacity: 0 }),
				    oldElems = container.find('.isotope-item');

				switch(data['mode']){
					case 'pagenums': 
						var this_pagenums = $('.pagination a[data-post=\"'+data["module_post"]+'\"][data-paged=\"'+data["paged"]+'\"]');
						this_pagenums.text(data["paged"]);
						container.find('.isotope').isotope( 'remove', oldElems );
						$('html,body').animate({
							scrollTop: container.offset().top - 80
						},
						1000); 
					break;
					case 'twitter': 
						
						var this_twitter = $('.page_twitter a[data-post=\"'+data["module_post"]+'\"]');
						var pagination_text = this_twitter.parent('.page_twitter').data('pagetext');
						this_twitter.attr('data-paged',Number(data['paged']) + 1).text(pagination_text);
						if(data['paged'] == this_twitter.data('count')){
							this_twitter.fadeOut(300);
							this_twitter.parent('.page_twitter').css('margin-top','0');
						}
						container.append(newElems);
						this_twitter.find('div').remove();
					break;
				}
				newElems.imagesLoaded(function(){
					container.find('.isotope').isotope('insert', newElems);
					var image_size = container.find('.isotope').data('size');
					themePB.themeIsotope.setWidths(image_size, container.find('.isotope'));
					
					container.find('.isotope').isotope({
						masonry: {
							columnWidth: themePB.themeIsotope.getUnitWidth(image_size, container.find('.isotope'))
						}
					});
					themePB.fnLiquidlist();
					if(newElems.find('.liquid_list_image').length){
						newElems.find('.liquid_list_image').each(function(){
                            themePB.fnLiquidClick($(this));
                        });
					}
					themePB.audioPlayClick(newElems);
					themePB.fnAnimationScroll(newElems);
					
					fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
					
				});
				
				if(data["module_id"] != 'portfolio'){
					themePB.fnJplayerCall();
					if(themePB.jplayer.length){
						themePB.jplayer.jPlayer("stop");
					}
				}
				themePB.audioPlayClick(newElems);
				themePB.audioPauseClick(newElems);
				themePB.fnVideoFace(newElems);
				
				if(newElems.find('.songtitle').length){
					newElems.find('.songtitle').tooltip({
						track: true
					});
				}
			}else{
				var newElems = $(content); 
				switch(data['mode']){
					case 'pagenums': 
						var this_pagenums = $('.pagination a[data-post=\"'+data["module_post"]+'\"][data-paged=\"'+data["paged"]+'\"]');
						this_pagenums.text(data["paged"]);
						$('html,body').animate({
							scrollTop: container.offset().top - 80
						},
						1000); 

						container.html(content);
					break;
					case 'twitter': 
						
						var this_twitter = $('.page_twitter a[data-post=\"'+data["module_post"]+'\"]');
						var pagination_text = this_twitter.parent('.page_twitter').data('pagetext');
						this_twitter.attr('data-paged',Number(data['paged']) + 1).text(pagination_text).removeClass('tw-style-loading');
						if(data['paged'] == this_twitter.data('count')){
							this_twitter.fadeOut(300);
							this_twitter.parent('.page_twitter').css('margin-top','0');
						}

						container.append(newElems);
						this_twitter.find('div').remove();
					break;
				}

				//Fadein theitems of next page 
				newElems.animate({opacity:1}, 1000); 

				//Audio player
				if(data["module_id"] != 'portfolio'){
					themePB.fnJplayerCall();
					if(themePB.jplayer.length){
						themePB.jplayer.jPlayer("stop");
					}
				}
				themePB.audioPlayClick(newElems);
				themePB.audioPauseClick(newElems);
				themePB.fnAnimationScroll(newElems);
				
				themePB.fnVideoFace(container.find('.video-face'));
				
				fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
			} 
			

		});
	}
	
	//audio player function
	themePB.fnJplayerCall = function(){
		if(themePB.jplayer.length){
			themePB.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
		}
	}
	
	//call player play
	themePB.audioPlayClick = function(container){
		container.find('.pause').click(function(){
			var thisID = $(this).attr("id");
			container.find('.audiobutton').removeClass('play').addClass('pause');
			$(this).removeClass('pause').addClass('play');
			themePB.jplayer.jPlayer("setMedia", {
				mp3: $(this).attr("rel")
			});
			themePB.jplayer.jPlayer("play");
			themePB.jplayer.bind($.jPlayer.event.ended, function(event) {
				$('#'+thisID).removeClass('play').addClass('pause');
			});
			themePB.audioPauseClick(container);
			themePB.audioPlayClick(container);
		})
	}
	
	//call player pause
	themePB.audioPauseClick = function(container){
		container.find('.play').click(function(){
			$(this).removeClass('play').addClass('pause');
			themePB.jplayer.jPlayer("stop");
			themePB.audioPlayClick(container);
		})
	}
	
	//Pagebuild: Liquid List
	themePB.fnLiquidlist = function(){
		themePB.moduleLiquidlist.each(function(){
			var liquid = [];
			
			liquid.item = $(this);
			liquid.isotopeItem = liquid.item.find('.isotope-item');
			
			liquid.isotopeItem.each(function(index) {
				$(this).attr('data-num', index + 1);
			});
			
		});
	}
	
	//Pagebuild: Liquid Click
	themePB.fnLiquidClick = function(liquid){
		liquid.click(function(){
			if(themePB.jplayer.length){
				themePB.jplayer.jPlayer("stop");
			}
			
			var liquid_handler = $('.liquid_handler');
			if(liquid_handler.length == 0){
				liquid.addClass('liquid_handler');
				if(liquid.is('.flip_wrap_back')){
					themePB.fnLiquidAjax(liquid.find('a.liquid_list_image'));
				}else{
					themePB.fnLiquidAjax(liquid);
				}
			}
			return false;
		});
	}
	
	//Pagebuild: Liquid Remove
	themePB.fnLiquidRemove = function(isotope, mode){
		var liquid = [];
		
		liquid.parents = isotope.parents('.isotope-liquid-list');
		liquid.width = liquid.parents.attr('data-width');
		liquid.size = liquid.parents.attr('data-size');
		liquid.space = liquid.parents.attr('data-space');
		liquid.isotopeNum = isotope.attr('data-num');
		liquid.isotopeItem = liquid.parents.find('.isotope-item');
		
		liquid.isotopeItem.each(function(index, element) {
            var isotopeItem = [];
			
			isotopeItem.item = $(this);
			isotopeItem.num = isotopeItem.item.attr('data-num');
			isotopeItem.liquidInside = isotopeItem.item.find('.liquid_inside');
			isotopeItem.liquidExpand = isotopeItem.item.find('.liquid-expand-wrap');
			
			switch(mode){
				case 'this' :
					if(liquid.isotopeNum == isotopeItem.num){
						$(this).removeClass(liquid.width).addClass('width2');
						
						isotopeItem.liquidExpand.fadeOut(100, function(){
							isotopeItem.liquidInside.fadeIn(300).css('overflow','visible');
							isotopeItem.liquidExpand.remove();
							themePB.themeIsotope.setWidths(liquid.size, liquid.parents);
							if(liquid.isotopeNum > 1){
								liquid.arget = liquid.isotopeNum - 1;
								liquid.parents.find('.isotope-item[data-num=\"'+liquid.arget+'\"]').after(isotope);
							}else if(liquid.isotopeNum == 1){
								liquid.arget = liquid.isotopeNum + 1;
								liquid.parents.find('.isotope-item[data-num=\"'+liquid.arget+'\"]').before(isotope);
							}
							liquid.parents.isotope('appended', isotope);
							liquid.parents.isotope('reLayout');
							
							if($.browser.msie == true && parseInt($.browser.version) < 9){}else{
								setTimeout(function(){
									var _html_top = $('html').css('margin-top');
									liquid.space = liquid.space.replace('px','');
									_html_top = _html_top.replace('px','');
									if($.browser.msie == true && parseInt($.browser.version) < 9){
										if(_html_top == 'auto'){
											_html_top = 0;
										}
									}
									var _offset_top = isotopeItem.item.offset().top;
									$('html,body').animate({
										scrollTop: _offset_top - liquid.space - _html_top
									}, 500);
								}, 1000);
							}
						});
					}
				break;
				
				case 'other':
					if(liquid.isotopeNum != isotopeItem.num){
						if(isotopeItem.liquidExpand.length > 0){
							isotopeItem.item.removeClass(liquid.width).addClass('width2');
							isotopeItem.liquidExpand.fadeOut(100, function(){
								isotopeItem.liquidInside.fadeIn(300).css('overflow','visible');
								isotopeItem.liquidExpand.remove();
								if(isotopeItem.num > 1){
									liquid.arget = isotopeItem.num - 1;
									liquid.parents.find('.isotope-item[data-num=\"'+liquid.arget+'\"]').after(isotopeItem.item);
								}else if(isotopeItem.num == 1){
									liquid.arget = isotopeItem.num + 1;
									liquid.parents.find('.isotope-item[data-num=\"'+liquid.arget+'\"]').before(isotopeItem.item);
								}
								liquid.parents.isotope('appended', isotopeItem.item);
								liquid.parents.isotope('reLayout');
							});
						}
					}
				break;
			}
        });
	}
	
	//Pagebuild: Liquid Column
	themePB.fnLiquidcolumn = function(isotope){
		var liquid = [];
		
		liquid.target = false;
		liquid.parents = isotope.parents('.isotope-liquid-list');
		liquid.isotopeItem = liquid.parents.find('isotope-item');
		liquid.isotopeNum = isotope.data('num');
		liquid.size = liquid.parents.data('size');
		liquid.width = liquid.parents.data('width');
		liquid.column = liquid.parents.width() / themePB.themeIsotope.getUnitWidth(liquid.size, liquid.parents) / 2,
		liquid.column = parseInt(liquid.column);
		liquid.baseNum = liquid.isotopeNum%liquid.column;
		
		switch(liquid.column){
			case 5:
				if(liquid.size == 'small' && liquid.width == 'width8'){
					if(liquid.baseNum%3 == 0){
						liquid.target = liquid.isotopeNum + 2;
					}
					if(liquid.baseNum%4 == 0){
						liquid.target = liquid.isotopeNum + 1;
					}
				}
			break;
			
			case 4:
				if((liquid.size == 'small' && liquid.width == 'width8') || (liquid.size == 'medium' && liquid.width == 'width8')){
					if(liquid.baseNum%2 == 0){
						liquid.target = liquid.isotopeNum + 3;
					}
					if(liquid.baseNum%3 == 0){
						liquid.target = liquid.isotopeNum + 2;
					}
					if(liquid.baseNum%4 == 0){
						liquid.target = liquid.isotopeNum + 1;
					}
				}
				if((liquid.size == 'small' && liquid.width == 'width6') || (liquid.size == 'medium' && liquid.width == 'width6')){
					if(liquid.baseNum%3 == 0){
						liquid.target = liquid.isotopeNum + 2;
					}
				}
			break;
			
			case 3:
				if((liquid.size == 'small' && liquid.width == 'width8') || (liquid.size == 'small' && liquid.width == 'width6') || (liquid.size == 'medium' && liquid.width == 'width8') || (liquid.size == 'medium' && liquid.width == 'width6') || (liquid.size == 'large' && liquid.width == 'width6') || (liquid.size == 'larger' && liquid.width == 'width6')){
					if(liquid.baseNum%2 == 0){
						liquid.target = liquid.isotopeNum + 2;
					}
					if(liquid.baseNum%3 == 0){
						liquid.target = liquid.isotopeNum + 1;
					}
				}
				if((liquid.size == 'small' && liquid.width == 'width8') || liquid.size == 'medium' && liquid.width == 'width8'){
					isotope.removeClass('width8');
					isotope.addClass('width6');
				}
			break;
			
			case 2:
				if((liquid.size == 'medium' && liquid.width == 'width8') || (liquid.size == 'medium' && liquid.width == 'width6') || (liquid.size == 'medium' && liquid.width == 'width4') || (liquid.size == 'large' && liquid.width == 'width6') || (liquid.size == 'large' && liquid.width == 'width4')  (liquid.size == 'medium' && liquid.width == 'width4') || (liquid.size == 'larger' && liquid.width == 'width6') || (liquid.size == 'larger' && liquid.width == 'width4')){
					if(liquid.baseNum%2 == 0){
						liquid.target = liquid.isotopeNum + 1;
					}
				}
				if(liquid.size == 'medium' && liquid.width == 'width8'){
					isotope.removeClass('width8');
					isotope.addClass('width4');
				}
				if(liquid.size == 'medium' && liquid.width == 'width6'){
					isotope.removeClass('width6');
					isotope.addClass('width4');
				}
				
				if(liquid.size == 'large' && liquid.width == 'width6'){
					isotope.removeClass('width6');
					isotope.addClass('width2');
				}

				if(liquid.size == 'larger' && liquid.width == 'width6'){
					isotope.removeClass('width6');
					isotope.addClass('width2');
				}
			break;
		}
		
		return liquid.target;
	}
	
	//Pagebuild: Liquid Ajax
	themePB.fnLiquidAjax = function(el){
		var liquid = [];
		
		liquid.item = el;
		liquid.itemIsotopeItem = liquid.item.parents('.isotope-item');
		liquid.itemLiquidInside = liquid.item.parents('.liquid_inside');
		liquid.itemLiquidInsideHeight = liquid.itemLiquidInside.height();
		liquid.itemLiquidItem = liquid.itemLiquidInside.parents('.liquid-item');
		liquid.itemLiquidLoading = liquid.itemLiquidInside.next('.liquid-loading-wrap');
		liquid.itemLiquidHide = liquid.itemLiquidLoading.find('.liquid-hide');
		
		liquid.parents = liquid.item.parents('.isotope-liquid-list');
		
		liquid.isotopeItem = liquid.parents.find('.isotope-item');
		liquid.isotopeLength = liquid.isotopeItem.length;
		
		liquid.postID = liquid.item.attr('data-postid');
		liquid.type = liquid.item.attr('data-type');
		
		liquid.words = liquid.parents.attr('data-words');
		liquid.social = liquid.parents.attr('data-social');
		liquid.ratio = liquid.parents.attr('data-ratio');
		liquid.width = liquid.parents.attr('data-width');
		liquid.space = liquid.parents.attr('data-space');
		liquid.size = liquid.parents.attr('data-size');
		
		liquid.target = themePB.fnLiquidcolumn(liquid.itemIsotopeItem);
		
		if(liquid.type == 'magazine'){
			liquid.itemLiquidHide.html(liquid.itemLiquidItem.clone());
		}
		
		liquid.itemLiquidInside.hide(0,function(){
			liquid.itemLiquidLoading.height(liquid.itemLiquidInsideHeight).fadeIn(500);
		});
		
		$.post(AJAX_M, {
			'mode': 'liquid',
			'data': {
				'post_id'     : liquid.postID,
				'block_words' : liquid.words,
				'show_social' : liquid.social,
				'image_ratio' : liquid.ratio
			}
		}).done(function(content){
			liquid.itemIsotopeItem.append(content);
			
			liquid.itemLiquidExpand = liquid.itemIsotopeItem.find('.liquid-expand-wrap');
			liquid.itemLiquidClose = liquid.itemLiquidExpand.find('.liquid-item-close');
			
			liquid.itemIsotopeItem.removeClass('width2').addClass(liquid.width);
			liquid.itemLiquidExpand.css({'padding': liquid.space + ' 0 0 ' + liquid.space});
			
			liquid.itemIsotopeItem.imagesLoaded(function(){
				if(liquid.target){
					liquid.isotopeItem = liquid.parents.find('.isotope-item[data-num=\"'+liquid.target+'\"]');
					if(liquid.isotopeItem.length == 0){
						liquid.parents.find('.isotope-item[data-num=\"'+liquid.isotopeLength+'\"]').after(liquid.itemIsotopeItem);
					}else{
						liquid.parents.find('.isotope-item[data-num=\"'+liquid.target+'\"]').after(liquid.itemIsotopeItem);
					}
					liquid.parents.isotope('appended', liquid.itemIsotopeItem);
				}
				liquid.itemLiquidLoading.hide(0,function(){
					themePB.fnLiquidRemove(liquid.itemIsotopeItem, 'other');
					themePB.themeIsotope.setWidths(liquid.size, liquid.parents);
					liquid.itemLiquidExpand.fadeIn(300);
					liquid.parents.isotope({
						masonry: {
							columnWidth: themePB.themeIsotope.getUnitWidth(liquid.size, liquid.parents)
						}
					});
					$('.liquid_handler').removeClass('liquid_handler');
					fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
					
					if($.browser.msie == true && parseInt($.browser.version) < 9){}else{
						setTimeout(function(){
							themePB.htmlMarginTop = themePB.html.css('margin-top');
							liquid.space = liquid.space.replace('px','');
							themePB.htmlMarginTop  = themePB.htmlMarginTop.replace('px','');
							if($.browser.msie == true && parseInt($.browser.version) < 9){
								if(themePB.htmlMarginTop  == 'auto'){
									themePB.htmlMarginTop  = 0;
								}
							}
							liquid.itemIsotopeItemOffsetTop = liquid.itemIsotopeItem.offset().top;
							$('html,body').animate({
								scrollTop: liquid.itemIsotopeItemOffsetTop - liquid.space - themePB.htmlMarginTop  - 100
							}, 500);
						}, 1000);
					}
				});
			});
			
			//call html5 player
			themePB.fnJplayerCall();
			themePB.audioPlayClick(liquid.itemIsotopeItem);
			themePB.audioPauseClick(liquid.itemIsotopeItem);
			
			liquid.itemLiquidClose.click(function(){
				themePB.fnLiquidRemove(liquid.itemIsotopeItem, 'this');
			});
		});
		
	}
	
	//Pagebuild: Pagenums Click
	themePB.fnPagenums = function(paged){
		var page = [];
		
		page.item = paged;
		page.moduleID = page.item.data('module');
		page.modulePost = page.item.data('post');
		page.postID = page.item.data('postid');
		page.paged = page.item.data('paged');
		
		paged.click(function(){
			page.item.parent().find('.select_pagination').removeClass('current');
			page.item.addClass('current').text('Loading');
			
			var ajax_data = {
				'module_id'   : page.moduleID,
				'module_post' : page.modulePost,
				'paged'       : page.paged,
				'post_id'     : page.postID,
				'mode'        : 'pagenums'
			}
			
			themePB.fnModuleLoad(ajax_data, $('div[data-post=\"'+page.modulePost+'\"]').not('.not_pagination'));
			return false;
		});
	}
	
	//Portfolio: ajax permalink
	themePB.fnAjaxPermalink = function(){
		themePB.moduleAjaxPermalink.each(function(){
			var permalink = [];
			
			permalink.item = $(this);
			permalink.parent = permalink.item.parent();
			permalink.href = permalink.item.attr('href');
			permalink.bgcolor = permalink.parent.data('bgcolor');
			permalink.category = permalink.parent.data('category');
			permalink.inn = false;
			
			permalink.item.click(function(){
				themePB.fnAjaxPortfolio(permalink);
				return false;
			});
		});
		
		themePB.moduleAjaxWrapClose.click(function(){
			themePB.moduleAjaxWrapInn.removeClass('ajaxwrap-fadein').html(null);
			themePB.moduleAjaxWrapClose.addClass('hidden');
			themePB.moduleAjaxWrap.removeClass('ajaxwrap-shown');
		});
	}
	
	//portfolio: ajax processing
	themePB.fnAjaxPortfolio = function(permalink){
		if(permalink.href){
			themePB.moduleAjaxWrapLoading.fadeIn(300, function(){
				themePB.moduleAjaxWrapLoading.removeClass('hidden');
				if(!permalink.inn){
					themePB.moduleAjaxWrapLoading.addClass(permalink.bgcolor);
				}
			});
			themePB.moduleAjaxWrap.addClass('ajaxwrap-shown');
			themePB.moduleAjaxWrapInn.load(permalink.href + ' .gallery-wrap', {
				bgcolor: permalink.bgcolor,
				category: permalink.category,
				mode: 'ajax-portfolio'
			}, function(response, status, xhr){
				if(status == 'success'){
					if(permalink.inn){
						themePB.moduleAjaxWrapInn.removeClass('ajaxwrap-fadein');
					}
					themePB.moduleAjaxWrapLoading.fadeOut(300, function(){
						themePB.moduleAjaxWrapLoading.addClass('hidden').removeClass(permalink.bgcolor);
						themePB.moduleAjaxWrapInn.addClass('ajaxwrap-fadein');
					});
					themePB.moduleAjaxWrapClose.removeClass('hidden');
					
					$('.post-navi a, .related-post-unit-a').each(function(){
						var subPermalink = [];
						
						subPermalink.item = $(this);
						subPermalink.parent = subPermalink.item.parent();
						subPermalink.href = subPermalink.item.attr('href');
						subPermalink.bgcolor = subPermalink.parent.data('bgcolor');
						subPermalink.category = subPermalink.parent.data('category');
						subPermalink.inn = true;
						
						subPermalink.href = subPermalink.href.replace('#/', '');
						$.History.bind('/' + subPermalink.href, function(state){
							themePB.fnAjaxPortfolio(subPermalink);
						});
					});
					
					$('body, html').scrollTop(0);
				}
			});
		}
	}
	
	//pagebuild: animation scroll
	themePB.fnAnimationScroll = function(hasAnimation){
		hasAnimation.imagesLoaded(function(){
			hasAnimation.each(function(){
				var animation = [];
				
				animation.item = $(this);
				animation.scroll = animation.item.find('.animation-scroll-ux');
				
				if(animation.scroll.length){
					animation.scroll.each(function(index){
						var animationItem = [];
						
						animationItem.item = $(this);
						animationItem.classB = animationItem.item.data('animationend');
						
						animationItem.item.waypoint(function(){
							animation.item.css({'opacity': 1});
							animationItem.item.css('transform', null);
							setInterval(function(){
								animationItem.item.css({'opacity': 1});
								if(!animationItem.item.hasClass(animationItem.classB)){
									animationItem.item.addClass(animationItem.classB);
								}
								setTimeout(function(){
									animationItem.item.removeClass('animation-default-ux').removeClass('animation-scroll-ux');
								}, 1500);
							}, index * 50);
						}, {
							offset: '120%',
							triggerOnce: true
						});
					});
				}
			});
		})
	}
	
	
	
	//pagebuild: video face
	themePB.fnVideoFace = function(arrayVideo){
		arrayVideo.each(function(){
			var videoFace = [];
			var videoOverlay = [];
			
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.video-play-btn');
			videoFace.videoWrap = videoFace.item.find('.video-wrap');
			videoFace.videoIframe = videoFace.videoWrap.find('iframe');
			
			videoOverlay.item = themePB.videoOverlay;
			videoOverlay.videoWrap = videoOverlay.item.find('.video-wrap');
			videoOverlay.close = videoOverlay.item.find('.video-close');
			
			videoFace.playBtn.click(function(){
				var src = videoFace.videoIframe.attr('src').replace('autoplay=0', 'autoplay=1');
				videoFace.videoIframe.attr('src', src);
				videoOverlay.close.before(videoFace.videoWrap.removeClass('hidden').attr('style', 'height:100%;padding-bottom:0px;'));
				videoOverlay.item.addClass('video-slidedown');
			});
			
			videoOverlay.close.click(function(){
				videoOverlay.item.removeClass('video-slidedown');
				videoOverlay.item.find('.video-wrap').remove();
			});
		});
	}
	
	//pagebuild: fullwidth block height
	themePB.fnModuleFullwidthBlockHeight = function(){
		themePB.moduleFullwidthBlock.each(function(){
			var block = $(this);
			themePB.fnModuleFullwidthBlockSetHeight(block);
			
			$(this).find('[data-height]').each(function(){
				var block = $(this);
				themePB.fnModuleFullwidthBlockSetHeight(block);
			});
		});
	}
	
	//pagebuild: fullwidth block set height
	themePB.fnModuleFullwidthBlockSetHeight = function(block){
		setTimeout(function(){
			themePB.body = $('body');
			if(block.is('[data-height]')){
				var height_data = block.data('height');
				
				if(height_data == '1-3-fullwidth'){
					var height = themePB.body.width() / 3;
					block.height(height);
				}else{
					var height = themePB.body.width() / 2;
					block.height(height);
				}
			}
		},40);
	}
	
	//document ready
	themePB.doc.ready(function(){

		//Call portfolio list layout hover on touch
		if($('.portfolio-list').length){
			if(Modernizr.touchevents){
				themePB.PortfolioListHover();
			}
		}
		//Contact form
		if(themePB.moduleContactForm.length){
			themePB.fnContactForm();
		}
		
		//Tabs Moudle Call
		if(themePB.moduleTabs.length){
			themePB.moduleTabs.each(function(){
				var tab = $(this);
				
				tab.delegate('a', 'click', function(e){
					e.preventDefault();
					jQuery(this).tab('show');
				});
			})
		}
		
		//Icon box Plus
		if(themePB.moduleIconbox.length){
			themePB.moduleIconbox.each(function(){
				var iconbox = [];
				
				iconbox.item = $(this);
				iconbox.animation = iconbox.item.data('animation');
				iconbox.svg = iconbox.item.find('.iconbox-plus-svg-wrap');
				
				themePB.itemIconboxs.push(iconbox);
			}); 
		}
		
		//AccordionToggle Moudle Call
		if(themePB.moduleAccordion.length){
			themePB.moduleAccordion.each(function(){
				var accordion = [];
				
				accordion.item = $(this);
				accordion.collapse = accordion.item.find('.collapse');
				accordion.accordion = accordion.item.find('.accordion');
				
				if(accordion.item.hasClass('accordion_toggle')){
					accordion.collapse.collapse({ toggle: false});
				}
	
				accordion.item.find('.accordion-body.in').prev().addClass("active");
	
				accordion.item.find('.accordion-toggle').click(function(e){
					if($(this).parent().hasClass('active')){
						$(this).parent().toggleClass('active');
						accordion.item.find(".accordion-heading").removeClass("active");
					}else{
						accordion.item.find(".accordion-heading").removeClass("active");
						$(this).parent().toggleClass('active');             
					}
					
					e.preventDefault;
					e.stopPropagation;
				});
			});
		}
		
		//Pagebuild: Separator 
		if(themePB.moduleSeparator.length){
			themePB.moduleSeparator.each(function(){
				var separator = [];
				
				separator.item = $(this);
				separator.title = separator.item.find('h4');
				separator.inn = separator.item.find('.separator_inn');
				
				themePB.itemSeparator.push(separator);
			})
		}
		
		//Pagebuild: Message Box Moudle	Close
		if(themePB.moduleMessageBox.length){
			themePB.moduleMessageBox.each(function(){
				var message = [];
				
				message.item = $(this);
				message.itemClose = message.item.find('.box-close');
				
				message.itemClose.click(function(){
					message.item.slideUp(400);
				});
			});
		}
		
		//Pagebuild: Countdown	
		if(themePB.moduleCountdown.length){
			themePB.moduleCountdown.each(function(){
				var countdown = [];
				
				countdown.item = $(this);
				countdown.dateUntil = countdown.item.data('until');
				countdown.dateFormat = countdown.item.data('dateformat');
				countdown.dateYears = Number(countdown.item.data('years'));
				countdown.dateMonths = Number(countdown.item.data('months'));
				countdown.dateDays = Number(countdown.item.data('days'));
				countdown.dateHours = Number(countdown.item.data('hours'));
				countdown.dateMinutes = Number(countdown.item.data('minutes'));
				countdown.dateSeconds = Number(countdown.item.data('seconds'));
				countdown.austDay = new Date(countdown.dateYears, countdown.dateMonths - 1, countdown.dateDays, countdown.dateHours, countdown.dateMinutes, countdown.dateSeconds);
				
				countdown.item.countdown({until: countdown.austDay, format: countdown.dateFormat});
			});
		}
		
		//Pagebuild: GoogleMap Moudle
		if(themePB.moduleGoogleMap.length){
			themePB.moduleGoogleMap.each(function(index, element) {
				var googlemap = [];
				
				googlemap.item = $(this);
				googlemap.element = element;
				googlemap.l = Number(googlemap.item.data('l'));
				googlemap.r = Number(googlemap.item.data('r'));
				googlemap.zoom = Number(googlemap.item.data('zoom'));
				googlemap.pin = googlemap.item.data('pin');
				googlemap.pin_custom = googlemap.item.data('pin-custom');
				googlemap.view = googlemap.item.data('view');
				googlemap.dismouse = googlemap.item.data('dismouse');
				googlemap.style = googlemap.item.data('style');
				googlemap.style_code = googlemap.item.next('.module-map-style-code').val();
				
				themePB.fnMapInit(googlemap);
			});
		}
		
		//Pagebuild: Fullwrap Tab
		if(themePB.moduleFullwidthTabs.length){
			themePB.moduleFullwidthTabs.each(function(){
				var tab = [];
				
				tab.item = $(this);
				tab.link = tab.item.children('a');
				tab.firstLink = tab.item.children('a:first');
				tab.itemid = tab.item.data('itemid');
				tab.parents = tab.item.parents('.fullwidth-wrap');
				tab.parentsRow = tab.parents.find('.row');
				
				tab.firstLink.addClass('full-nav-actived');
				tab.item.contents().filter(function() {
					return this.nodeType === 3;
				}).remove();
				
				tab.parentsRow.each(function(i){
					$(this).attr('id', 'tabs-' + tab.itemid + '-' + i);
					$(this).addClass('fullwrap-with-tab-inn');
					if(i == 0){
						$(this).addClass('enble');
					}else{
						$(this).addClass('disble');
					}
				});
				
				tab.link.each(function(i){
					var linkTarget = 'tabs-' + tab.itemid + '-' + i;
					$(this).attr('data-target', linkTarget);
					
					$(this).click(function(){
						var linkTargetParents = $(this).parents('.fullwidth-wrap');
						
						linkTargetParents.find('.fullwrap-with-tab-inn').removeClass('enble').addClass('disble');
						linkTargetParents.find('[id=\"' + linkTarget + '\"]').removeClass('disble').addClass('enble');
						
						if($(this).hasClass('full-nav-actived')){}else{
							$(this).addClass('full-nav-actived');
						}
						
						$(this).siblings('a').removeClass('full-nav-actived');
					});
				});
			});
		}
		
		//Pagebuild: Call Carousel Slider, Content slider responsive
		if(themePB.moduleListItemSlider.length){
			themePB.moduleListItemSlider.each(function(){
				var slider = [];
				
				slider.item = $(this);
				slider.itemItem = slider.item.find('.item');
				slider.title = slider.item.find('.slider-title');
				slider.titleH2 = slider.item.find('h2.slider-title');
				slider.description = slider.item.find('.slider-des');
				slider.panel = slider.item.find('.slider-panel');
				slider.image = slider.item.find('img');
				slider.carouselImage = slider.item.find('.carousel-img-wrap');
				slider.carouselIndicators = slider.item.find('.carousel-indicators');
				
				themePB.itemListItemSlider.push(slider);
			});
		}
		
		//Pagebuild: Flex Slider
		if(themePB.moduleFlexSliderWrap.length){
			themePB.fnFlexslider();
		}
		
		//Pagebuild: Pagnition/twitter style
		if(themePB.modulePagenumsTwitter.length){
			themePB.modulePagenumsTwitter.each(function(){
				var twitterLink = [];
				
				twitterLink.item = $(this);
				twitterLink.moduleID = twitterLink.item.data('module');
				twitterLink.modulePost = twitterLink.item.data('post');
				twitterLink.postID = twitterLink.item.data('postid');
				twitterLink.paged = twitterLink.item.data('paged');
				twitterLink.excludeIds = twitterLink.item.data('exclude');
				
				twitterLink.item.click(function(){
					twitterLink.item.html('<span>Loading...</span>');
					
					twitterLink.paged = twitterLink.item.attr('data-paged');
					
					var ajax_data = {
						'module_id'   : twitterLink.moduleID,
						'module_post' : twitterLink.modulePost,
						'paged'       : twitterLink.paged,
						'post_id'     : twitterLink.postID,
						'mode'        : 'twitter',
						'exclude_ids' : twitterLink.excludeIds
					}
					
					themePB.fnModuleLoad(ajax_data, $('div[data-post=\"'+twitterLink.modulePost+'\"]').not('.not_pagination'));
					return false;
				});
			})
			
		}
		
		//Pagebuild: Liquid List
		if(themePB.moduleLiquidlist.length){
			themePB.fnLiquidlist();
		}
		
		//Pagebuild: Liquid Click
		if(themePB.moduleLiquidImage.length){
			themePB.moduleLiquidImage.each(function(){
				$(this).css('cursor','pointer');
				themePB.fnLiquidClick($(this));
			})
		}
		
		//Pagebuild: Pagenums Click
		if(themePB.modulePagenumsSelect.length){
			themePB.modulePagenumsSelect.each(function(){
				themePB.fnPagenums($(this));
			})
		}
		
		//Portfolio: ajax permalink
		if(themePB.moduleAjaxPermalink.length){
			themePB.moduleAjaxPermalink.each(function(){ 
				themePB.fnAjaxPermalink();
			});
		}
		
		//Portfolio: call video popup
		if(themePB.videoFace.length){
			themePB.fnVideoFace(themePB.videoFace);
		}

		//Modernizr.touch
		if(Modernizr.touchevents){
			if(themePB.moduleFullwidthWrap.length){
				themePB.moduleFullwidthWrap.each(function(){
					$(this).css('background-attachment','scroll');
				})
			}
		} // End if Modernizr.touch
		
		//Call Lightbox 
		if(themePB.lightboxPhotoSwipe.length){
			fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}
		
	});
	
	//win load
	themePB.win.load(function(){
		
		//Tab-v responsive
		if(themePB.moduleTabsV.length){
			themePB.fnTabResponsive();
			themePB.win.on("debouncedresize", themePB.fnTabResponsive);
		}
		
		//Pagebuild: Client Moudle
		if(themePB.moduleClientsWrap.length){
			themePB.fnClients(themePB.moduleClientsWrap); 
		}
		
		//Pagebuild: Image Box Moudle
		if(themePB.moduleImagebox.length){
			themePB.moduleImagebox.each(function(){
				if(Modernizr.touchevents){
					$(this).addClass('shown');
				}else{
					$(this).waypoint(function(){ $(this).addClass('shown'); }, { offset: '120%'});
				}
			});
		}
	
		
		//Pagebuild: Fullwrap wrap:  set the padding for vertical cenerted, set the height for half fullwrap
		if(themePB.moduleFullwidthWrap.length){
			themePB.moduleFullwidthWrap.each(function(){
				var fullwidth = [];
				
				fullwidth.item = $(this);
				fullwidth.itemHeight = fullwidth.item.data('height');
				fullwidth.half = fullwidth.item.find('.fullwrap-half');
				fullwidth.halfBg = fullwidth.item.find('.fullwrap-half-bg');
				fullwidth.halfContent = fullwidth.item.find('.fullwrap-half-content');
				
			});
		}
		
		//Pagebuild: image module shadow
		if(themePB.moduleImageShadow.length){
			themePB.moduleImageShadow.each(function(){
				$(this).imagesLoaded(function(){
					$(this).css('opacity','1');
				});
			});
		}
		
		//Pagebuild: Call Carousel Slider, Content slider responsive
		if(themePB.moduleListItemSlider.length){
			themePB.fnContentslider();
			themePB.win.on("debouncedresize", themePB.fnContentslider);
		}
		
		//pagebuild: animation scroll
		if(themePB.moduleHasAnimation.length && !themePB.isMobile()){
			themePB.fnAnimationScroll(themePB.moduleHasAnimation)
		}
		
		//Icon box Plus
		$.each(themePB.itemIconboxs, function(index, iconbox){
			if(Modernizr.touchevents){
				iconbox.svg.addClass('breath').addClass(iconbox.animation);
			}else{
				iconbox.item.waypoint(function(){
					if(iconbox.animation == "rorate"){
						iconbox.svg.addClass('breath').addClass(iconbox.animation);
					}else{
						iconbox.svg.addClass('breath').addClass(iconbox.animation); 
					}
				}, { offset: '120%'});
			}
		});
		
		//Pagebuild: Separator 
		$.each(themePB.itemSeparator, function(index, separator){
			separator.titleWidth = separator.title.outerWidth();
			
			if(separator.item.hasClass('title_on_left')){
				separator.inn.css({'margin-left': separator.titleWidth + 'px'});
			}else if(separator.item.hasClass('title_on_right')){
				separator.inn.css({'margin-right': separator.titleWidth + 'px'});
			}
			
			separator.inn.css({zIndex: 0});
			separator.item.animate({ opacity:'1'}, 200);
		});
		
		//parallax
		if(themePB.moduleParallax.length){
			themePB.moduleParallax.each(function(){
				var parallax = {};
				
				parallax.element = $(this);
				parallax.ratio = parallax.element.data('ratio');
				parallax.ratio_speed = 1 + parallax.ratio;
				
				parallax.height = parallax.element.height();
				parallax.width = parallax.element.width();
				parallax.maxHeight = parallax.height * parallax.ratio_speed;
				
				parallax.image = parallax.element.find('img');
				parallax.image_height = parallax.image.height();
				parallax.image_width = parallax.image.width();
				
				parallax.xPosition = 0;
				parallax.yPosition = 0;
				parallax.outHeight = 0;
				parallax.outWidth = 0;
				
				if(!parallax.element.is('.front-background')){ 
					//if image height less than parallax height
					if(parallax.image_height <= parallax.maxHeight){
						parallax.image.css({
							'width': 'auto',
							'height': parallax.maxHeight + 'px',
							'max-width': 'inherit'
						});
					}
					
					parallax.outWidth = (parallax.width - parallax.image.width()) / 2;
					parallax.outHeight = (parallax.height - parallax.image.height()) / 2;
					
					parallax.xPosition = parallax.outWidth;
					parallax.yPosition = (parallax.element.offset().top - themePB.winScrollTop - parallax.outHeight) * (parallax.ratio / 3);
					parallax.yPosition = - parallax.yPosition;
					if(!themePB.isMobile()){
						themePB.fnSetTranslate3DTransform(parallax.element, parallax.xPosition, parallax.yPosition);
					}
				}
				
				themePB.itemParallax.push(parallax);
				
			});
		}
		
		if(themePB.moduleFullwidthBlock.length){
			themePB.fnModuleFullwidthBlockHeight();
			themePB.win.resize(function(){
				themePB.fnModuleFullwidthBlockHeight();
			});
			
			if($('.text-button-bg-image').length){
				$('.text-button-bg-image').each(function(){
                    $(this).fadeIn('fast');
                });
				
			}
		}
		
	});
	
	//win scroll
	themePB.win.scroll(function(){
		if(!themePB.isMobile()){
			themePB.winScrollTop = themePB.win.scrollTop();
			$.each(themePB.itemParallax, function(index, parallax){
				parallax.yPosition = (parallax.element.offset().top - themePB.winScrollTop - parallax.outHeight) * (parallax.ratio / 3);
				parallax.yPosition = - parallax.yPosition;
				themePB.fnSetTranslate3DTransform(parallax.element, parallax.xPosition, parallax.yPosition);
			});
		}
		
		if(themePB.body.is('.with-page-cover')){
			if($('.isotope').length){
				themePB.themeIsotope.callisotope();
			}
		} 
	});
	
})(jQuery);