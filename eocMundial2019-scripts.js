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
	
	
	// Efeito de abertura e fechamento do menu mobile 
	// --------------------------------------------------------------------------------
	$('.navbar-toggle').on("click", function() { 
		
		// Se o menu estÃ¡ fechado	
		if ( !$('header').hasClass('opened') ) {
			
			// Adiciona a classe necessÃ¡ria e anima o background
			$('header').addClass('opened'); 
			$('header').stop().animate({backgroundColor: 'rgba(255,255,255,1)'}, 500);
			
		}
		
		// Se o menu estÃ¡ aberto
		else {
			
			// Remove a classe necessÃ¡ria 
			$('header').removeClass('opened'); 
			
			// Se a pÃ¡gina for a home e estiver no topo 
			if ( $('header').hasClass('home') && !$('header').hasClass('scroll') ) {
				
				// Anima o background
				$('header').stop().animate({backgroundColor: 'rgba(255,255,255,0)'}, 500);
				
			}
			
			// Caso nÃ£o seja a home ou nÃ£o esteja no topo
			else {
				
				// Anima o background 
				$('header').stop().animate({backgroundColor: 'rgba(255,255,255,1)'}, 500);
				
			}
			
		}
		
	});
	
	$(window).load(function() {
		$(".loader").fadeOut("slow");
	})


	// REGISTRO: Define qual formulÃ¡rio serÃ¡ aberto com base na busca de informaÃ§Ãµes 
	// --------------------------------------------------------------------------------
	
	// Caso o e-mail da busca por infos tenha sido enviado 
	if ( window.location.href.indexOf('emailProvide') > 0 ) {
		
		// Oculta o loading do form
		$('.loadingform').addClass('hidden'); 
		
		// Exibe o form completo
		$('#registro').removeClass('hidden'); 
		
		// Recupera os valores obtidos com o AMP Script
		var AMPScript_salutation = $('#AMPScript_salutation').val(); 
		var AMPScript_usertype = $('#AMPScript_usertype').val(); 
		var AMPScript_emailprov = $('#AMPScript_emailprov').val(); 
		var AMPScript_firstname = $('#AMPScript_firstname').val(); 
		var AMPScript_lastname = $('#AMPScript_lastname').val(); 
		var AMPScript_accountname = $('#AMPScript_accountname').val(); 
		var AMPScript_title = $('#AMPScript_title').val(); 
		
		// Seta o valor dos campos no formulÃ¡rio 
		if (AMPScript_salutation != '') $('#salutation').val(AMPScript_salutation);
		if (AMPScript_usertype != '') $('#usertype').val(AMPScript_usertype);
		$('#email').val(AMPScript_emailprov);
		$('#first_name').val(AMPScript_firstname);
		$('#last_name').val(AMPScript_lastname);
		$('#company').val(AMPScript_accountname);
		$('#title').val(AMPScript_title);
		
		// Faz o scroll atÃ© o formulÃ¡rio 
		$('html, body').animate({
			scrollTop: $("#registro").offset().top - 70
		}, 500);
		
	}
	
	// Caso nenhum e-mail tenha ainda sido buscado 
	else {
		
		// Oculta o loading do form
		$('.loadingform').addClass('hidden'); 
		
		// Exibe o form de busca por e-mail
		$('#buscainfos').removeClass('hidden'); 
		
	}
	
	
	// REGISTRO: Valida a busca de informaÃ§Ãµes por e-mail
	// --------------------------------------------------------------------------------
	$("#buscainfos").validate({
		rules: {
			buscainfos_mail: { required: true, email: true }
		}, 
		submitHandler: function(form) {
			
			// Exibe o loading
			$("#buscainfos p.loading").fadeIn(500); 
			
			// Desabilita o form
			$("#buscainfos").submit(false); 
			
			// Recupera o valor do campo 
			var email = $('#buscainfos_mail').val().toLowerCase(); 
			
			// Redireciona o usuÃ¡rio para a pÃ¡gina contendo as informaÃ§Ãµes
			document.location = window.location.href + '?emailProvide='+email;
			
		}
	});
	
	
	// REGISTRO: Valida o formulÃ¡rio de registro 
	// --------------------------------------------------------------------------------
	$("#registro").validate({
		rules: {
			first_name: 'required', 
			last_name: 'required', 
			usertype: 'required', 
			company: 'required', 
			title: 'required', 
			email: { required: true, email: true }, 
			phone: 'required', 
			country_code: 'required'
		}, 
		submitHandler: function(form, event) {
			
			// Recupera a categoria do registro
			var usertype = $('#usertype').val();
			
			
			// Se o registro for de um supplier (pago)
			// --------------------------------------------------------------------------------
			if ( usertype == 'Supplier' ) {
				
				// Recupera todos os campos do formulÃ¡rio
				var campos = {}; 
				campos['salutation'] = $('#salutation').val(); 
				campos['first_name'] = $('#first_name').val(); 
				campos['last_name'] = $('#last_name').val(); 
				campos['usertype'] = $('#usertype').val(); 
				campos['company'] = $('#company').val(); 
				campos['title'] = $('#title').val(); 
				campos['email'] = $('#email').val(); 
				campos['phone'] = $('#phone').val(); 
				campos['street'] = $('#street').val(); 
				campos['city'] = $('#city').val(); 
				campos['zip'] = $('#zip').val(); 
				campos['country_code'] = $('#country_code').val(); 
				campos['workshop'] = $('#workshop').val(); 
				campos['description'] = $('#description').val(); 
				
				// Define todos os valores como cookies 
				document.cookie = "salutation=" + campos.salutation; 
				document.cookie = "first_name=" + campos.first_name; 
				document.cookie = "last_name=" + campos.last_name; 
				document.cookie = "usertype=" + campos.usertype; 
				document.cookie = "company=" + campos.company; 
				document.cookie = "title=" + campos.title;
				document.cookie = "email=" + campos.email;
				document.cookie = "phone=" + campos.phone;
				document.cookie = "street=" + campos.street;
				document.cookie = "city=" + campos.city;
				document.cookie = "zip=" + campos.zip;
				document.cookie = "country_code=" + campos.country_code;
				document.cookie = "workshop=" + campos.workshop;
				document.cookie = "description=" + campos.description;
				
				// Monta uma variÃ¡vel com todos os dados do formulÃ¡rio 
				var PayPalCustom; 
				PayPalCustom = campos.salutation + " - ";
				PayPalCustom += campos.first_name + " - ";
				PayPalCustom += campos.last_name + " - ";
				PayPalCustom += campos.usertype + " - ";
				PayPalCustom += campos.company + " - ";
				PayPalCustom += campos.title + " - ";
				PayPalCustom += campos.email + " - ";
				PayPalCustom += campos.phone + " - ";
				PayPalCustom += campos.street + " - ";
				PayPalCustom += campos.city + " - ";
				PayPalCustom += campos.zip + " - ";
				PayPalCustom += campos.country_code + " - ";
				PayPalCustom += campos.workshop + " - ";
				PayPalCustom += campos.description + " - ";
				
				// Preenche os valores do form do PayPal
				$("#PayPal_country_code").val(campos.country_code); 
				
				$("#PayPal_currency_code").attr("value","USD");	
				$("[name='amount']").attr("value","490");
				if (campos.country_code == "BR"){
					$("#PayPal_currency_code").attr("value","BRL");	
					$("[name='amount']").attr("value","1561");	
				}; 
				$("#PayPal_custom").val(PayPalCustom); 
				
				
				// Exibe o modal do PayPal 
				$('#PayPalMsg').modal('show'); 
				
			} 
			
			
			// Se o registro for de outra categoria (nÃ£o pago)
			// --------------------------------------------------------------------------------
			else {
				
				// Envia o formulÃ¡rio normalmente
				form.submit();
				
			}
			
		}
	}); 
	
	
	// REGISTRO: Se a pÃ¡gina exibida Ã© a do retorno do PayPal, executa o script 
	// --------------------------------------------------------------------------------
	if ( $('#PayPalReturnPage').length ) {
		
		// Cria o objeto onde irÃ£o os dados dos cookies
		var cookiesval = {}; 
		
		// Separa todos os cookies 
		var cookies = document.cookie.split(';'); 
		
		// Passa por todos os cookies 
		for ( var cnt = 0; cnt < cookies.length; cnt++ ) {
		    
		    // Separa o nome do valor do cookie 
			var cookieatual = cookies[cnt].split('='); 
			
			// Define o nome e valor do cookie atual no novo objeto
			cookiesval[cookieatual[0].trim()] = cookieatual[1].trim(); 
		  
		}
		
		// Define nos campos todos os valores obtidos dos cookies
		$('#salutation').val(cookiesval.salutation); 
		$('#first_name').val(cookiesval.first_name); 
		$('#last_name').val(cookiesval.last_name); 
		$('#usertype').val(cookiesval.usertype); 
		$('#company').val(cookiesval.company); 
		$('#title').val(cookiesval.title); 
		$('#email').val(cookiesval.email); 
		$('#phone').val(cookiesval.phone); 
		$('#street').val(cookiesval.street); 
		$('#city').val(cookiesval.city); 
		$('#zip').val(cookiesval.zip); 
		$('#country_code').val(cookiesval.country_code); 
		$('#workshop').val(cookiesval.workshop); 
		$('#description').val(cookiesval.description); 
		$('#paypalprotocol').val(''); 
		
		// Envia o formulÃ¡rio 
		$('#PayPal_formRetorno').submit(); 
		
	}
	
});
