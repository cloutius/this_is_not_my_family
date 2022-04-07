"use strict";
$(function(){

	$('<div>')
		.attr({
			'id': 'chest',
		})
		.droppable()
		.on('drop', function(event, ui){
			var username = decodeURIComponent(ui.draggable.data('user'));
			var $username_el = $('<div>')
				.addClass('username')
				.text(username)
				.appendTo('#chest')
				.on('transitionend', function(){
					$(this).remove();
				});
			window.setTimeout(function(){
				$username_el
					.css({
						transitionDelay: timing.textFadeDelay/1000 + 's',
						transitionDuration: timing.textFade/1000 + 's'
					})
					.addClass('fadeout');
			}, 10);
		})
		.appendTo('body');


	var spread = function() {

		var vw = $(window).width();
		var vh = $(window).height();

		// window too small, should give a notice
		if( vw < 1200 && vh < 1200 ) {
			alert('To see non-cropped version go to: https://cloutius.github.io/this_is_not_my_family/');
			return;
		};

		// position of the empty rectangle
		var rw = 0;
		var rh = 0;
		var rx = vw/2 - rw/2;
		var ry = vh/2 - rh/2;

		$('#chest').css({
			'left':  	rx + 'px',
			'top':   	ry + 'px',
			'width': 	rw + 'px',
			'height':	rh + 'px',
			transitionDuration: timing.moveSort/1000 + 's'
		})
		

		// reduce surface of chest so treasure moves closer
		let tolerance = 32;
		rw = rw - tolerance*2;
		rh = rh - tolerance*2;
		rx = rx + tolerance;
		ry = ry + tolerance;

		$('#treasure img').each(function(){
			var $img = $(this);
			
			var iw = $img.width()
			var ih = $img.height()
			var ix = false;
			var iy = false;

			var overlap = true;

			while(overlap) {
				ix = Math.floor(Math.random() * (vw - iw));
				iy = Math.floor(Math.random() * (vh - ih));

				if(
					(
						  	(ix   	>= rx	&&	ix   	<=	rx+rw) 
						||	(ix+iw	>= rx	&&	ix+iw	<=	rx+rw)
					)
					&&
					(
						  	(iy   	>=	ry	&&	iy   	<=	ry+rh)
						||	(iy+ih	>=	ry	&&	iy+ih	<=	ry+rh)
					)
				) {
					overlap = true
				} else {
					overlap = false
				}
			}
			setTimeout(function(){
				$img
					.one('transitionend', function(){
						$(this).css({transitionDuration: '0s'})
					})
					.css({transitionDuration: timing.moveSort/1000 + 's'})
					.css({
						'left':	ix, 
						'top': 	iy
					});
			}, 100+Math.random()*1000);


		});

		spread_timer = false;
	}

	var spread_timer = false;

	var spread_again = function() {
		spread();
		spread_timer = false;
	}

	var spread_again_trigger = function() {
		if(spread_timer != false) {
			window.clearTimeout(spread_timer);	
		}
		spread_timer = window.setTimeout(spread_again, 10);
	}

	var init = function() {
		spread();
		$('#treasure img')
			.draggable({
				'stack': 	'img',
				'scroll':	false
			});

		$(window).on('resize', spread_again_trigger);
	}


	init();

});
