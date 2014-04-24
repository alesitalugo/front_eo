var SITE = {

	common: {
		init: function(){
			
			var sb = 0;
			var menu_active = 0;
			var width = $(window).width();
			var height  = $(window).height();
			var minWidth = 980;
			
			if (width <= 980){
				$('.mask-pages').width('190px');
			} else if(width >= 980){
				$('.mask-pages').width('380px');
			}
			
			function resize(){
				width = $(window).width();
				if (width <= 980){
					$('.mask-pages').width('190px');
				} else if(width >= 980){
					$('.mask-pages').width('380px');
				}
			}
			
			$(window).resize(function(){
				resize();
			});	

			$('.search_button').on('click', function(){
				if(sb == 0){
					$('#search_input').focus();
					$('#search_responsive').animate({'top':'0px'}, 100);
					sb = 1;
				} 
			});
			
			$('.close_menu').on('click', function(){
				$('#responsive_menu').show(function(){
						$(this).animate({'width':'0%'},300);
					});
					$('body').animate({'left':'-0px'}, 300);
					menu_active = 0;
			});
			
			$('.menu_responsive_button').on('click', function(){
				if (menu_active == 0){
					$('#responsive_menu').show(function(){
						$(this).animate({'width':'60%'},300);
					});
					$('body').animate({'left':'-192px'}, 300);
					menu_active = 1;
				} else if (menu_active == 1){
					$('#responsive_menu').show(function(){
						$(this).animate({'width':'0%'},300);
					});
					$('body').animate({'left':'-0px'}, 300);
					menu_active = 0;
				}
			});			
			
			
			var paginador = function(slide) {
				var slide = slide;
				var num_page = null;
				var actual_page = 0;

				var num_pages = $(slide).data('pages');
				var actual_pages = 6;
				var page_wrap = $('#paginador').find('.pages');
				var pages = $(page_wrap).find('.page');

				pages = $(pages[0]).outerWidth(true);
				
				return {
					'init':function(){
						if(num_pages !== null){
							$(slide).find('.pages').width(num_pages * pages);
						}
					},
					next_page: function(){
						if( (actual_pages + 1) <= num_pages ){
							actual_pages++;
							$('.pages').stop().animate({'left':'-=63px'}, 100);
						}
						$('.next').show();
						console.log(pages);
						if(actual_pages === num_pages){
							$('.prev').hide();
						}
					}, 
					prev_page: function(){
						
						if ( (actual_pages - 1 ) >= 6){
							
							actual_pages--;
							$('.pages').stop().animate({'left':'+=63px'}, 100);
						}
						$('.prev').show();
						if((actual_pages) === 6){
							$('.next').hide();
						}
					},
				}
			}

			var paginator = new paginador(document.getElementById('paginador'));
			
			paginator.init();
			
			$('#paginador').on('click', '.next', function(e){
					e.preventDefault();
					paginator.prev_page();
			});
			
			$('#paginador').on('click', '.prev', function(e){
					e.preventDefault();
					paginator.next_page();
			});
			
			$('.page').on('click', function(){
				$('.pages a').removeClass('active');
				$(this).addClass('active');
			});


			/*CAROUSEL SLIDER HOME FUNCTION*/
			
			/*	var panels = $('#slider .slider-item'),
				timer,
				timeTransition = 4000,
				minOpacity =.2;
			var numPanel = panels.length;

			var transition = function(a,b){
				panels.eq(a).animate({
					opacity: minOpacity
				}, 800, function(){
					$(this).removeClass('active_slide');
					$(this).css('opacity', 1);
					panels.eq(b).addClass("active_slide").css('opacity', minOpacity);

					if($(this))
					panels.eq(b).animate({
						opacity:1
					}, 700, function(){
						var nextB = b;
						if((nextB + 1) == numPanel) nextB = 0;
						else nextB++;
						timer = setTimeout(function(){
							transition(b, nextB);
						}, timeTransition);
					});
				});
			}
			timer = setTimeout(function(){
				transition(0,1);
			}, timeTransition);
			
			

		
			$('.dots_nav .dot').each(function(j){
				var a = $(this);
				$(this).click(function(f){
					console.log('si doy click');					
					f.preventDefault;

					if(!a.hasClass('active')){
						a.parent().find("a.active").removeClass('active');
						a.addClass('active');

						a.parent().parent().parent().find('.active_slide').first().animate({
							opacity:0
						},800, function(){
							$(this).css('opacity', 1);
							$(this).removeClass('panel-active');
							$('.slider-item').eq(j).css('opacity', 0).addClass('active_slide');
							$('.slider-item').eq(j).animate({
								opacity: 1
							}, 800);
						});
					}
					return false;
				});
			});	
		*/
			var news = 0;

			$('#widget_news').on('click', function(){
				if (news == 0){
					$('#news').fadeIn(200);
					news = 1;
				} else if (news == 1){
					$('#news').fadeOut(200);
					news = 0;
				}
			});

		}

	},
	home: {

	}

}

UTIL = {
	fire: function(func, funcname, args){
		var namespace = SITE;
		funcname = (funcname === undefined) ? 'init': funcname;
		if(func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	},
	loadEvents : function(){
		var bodyId = document.body.id;
		UTIL.fire('common');
		$.each(document.body.className.split(/\s+/), function(i, classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm, bodyId);
			UTIL.fire(classnm, 'finalize');
		});
		UTIL.fire('common', 'finalize');
	}
};

$(document).ready(UTIL.loadEvents);