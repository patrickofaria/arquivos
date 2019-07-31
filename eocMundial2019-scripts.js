// Quando o documento jÃ¡ estiver sido carregado 
// --------------------------------------------------------------------------------
$( document ).ready(function() {
	
	
	// Habilita a mudanÃ§a do cabeÃ§alho via scroll 
	// --------------------------------------------------------------------------------
	$(window).on("scroll touchmove", function () {
		
		// Caso o usuÃ¡rio tenha feito scroll na pÃ¡gina 
		if ( $(document).scrollTop() > 50 ) {
			
			// Adiciona a classe necessÃ¡ria
			$('header').addClass('scroll'); 
			
			// Se o menu nÃ£o estiver aberto e for a home, anima o background
			if ( !$('header').hasClass('opened') && $('header').hasClass('home') ) 
				$('header').stop().animate({backgroundColor: 'rgba(255,255,255,1)'}, 500);
			
		}
		
		// Caso o usuÃ¡rio tenha voltado ao topo
		else {
			
			// Remove a classe necessÃ¡ria
			$('header').removeClass('scroll'); 
			
			// Se o menu nÃ£o estiver aberto e for a home, anima o background
			if ( !$('header').hasClass('opened') && $('header').hasClass('home') ) 
				$('header').stop().animate({backgroundColor: 'rgba(255,255,255,0)'}, 500);
			
		}
		
	});
	
	