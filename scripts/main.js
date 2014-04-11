var SITE = {

	common: {
		init: function(){
		
			/*CAROUSEL SLIDER HOME FUNCTION*/
			
			/*var panels = $('#slider .slider-item'),
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
			});	*/
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