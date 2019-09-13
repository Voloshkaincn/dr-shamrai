$(document).ready(function() {

/*=========== input-hoshi ==========*/
	$('.input-hoshi input').on('focus',function(){
		$(this).parents('.input-hoshi').addClass('focus');
	});

	$('.input-hoshi input').on('focusout', function(){
		//if field is NOT empty
		if($(this).val().trim() != ''){
			$(this).removeClass('error')
					.parent('.input-hoshi').addClass('focus')
					.find('.error__mess').hide();

		//validation on data correctli
			var name = $(this).attr('name'),
			value = $(this).val(),
			mess = $(this).data('error'),
			regExp;
			switch (name){
				case 'name': 
					regExp = [A-Za-z];
					break;
				default: 
					regExp = "";
					break;
			}
			if(regExp != "" && !regExp.test(value)){
				$(this).addClass("error");
				$(this).parent('.input-hoshi').find('.error__mess').show().text(mess);
			};
		}

		//if field is empty and data has not yet been submitted 
		else if(!$(this).hasClass('error')){
			$(this).parents('.input-hoshi').removeClass('focus')
		}
	});

/*=========== mobile menu button - hamburger ==========*/
	$(".menu__btn").click(function(){ 
	    $(this).toggleClass("menu__btn-active");
	    $('.nav__link').on('click', function(){
	    		$(".menu__btn").removeClass('menu__btn-active');
	    });
	});

/*=========== dropdown menu ==========*/
	$('.dropdown').on('click', function(e){
	  e.stopPropagation();
	  if(!$(this).hasClass('dropdown-open')){
	    $(this).addClass('dropdown-open');  
	    $('html').one('click', function(){
	      $('.dropdown.dropdown-open').removeClass('dropdown-open');
	    });
	    $('.dropdown__item').on('click', function(e){
	      e.stopPropagation();
	      var value = $(this).text();
	      $(this).parents('.dropdown').removeClass('dropdown-open').find('.dropdown__input').val(value)
	    });
	  } else {
	    e.stopPropagation();
	    $(this).removeClass('dropdown-open');
	  }
	});

//======modal windows=====
	$('.call-modal').click(function(){
	  var modal_id = '#' + $(this).data('modal');
	  $(modal_id).fadeIn(300);
	  $('body').addClass('noscroll');
	});
	$('.modal__container').on("click", function(e){
	  return false;
	  e.preventdefault();
	});
	$('.modal_close').on("click", function(){
	  $('body').removeClass('noscroll');
	  $(this).parents('.modal').fadeOut(300);
	});
	$('.modal').on('click', function(){
	  $('body').removeClass('noscroll');
	  $('.modal').fadeOut(300);
	});

/*========ixed menu========*/
$(window).scroll(function(){
	var scroll_pos = $(window).scrollTop();
	if(scroll_pos >= 68){
		$('.header__navbar').addClass('header__navbar-sticky')
	} else {
		$('.header__navbar').removeClass('header__navbar-sticky')
	}
});

});