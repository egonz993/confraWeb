/* ESTE DOCUMENTO CREA EN EL DOM EL BOTON DE PAGOS WOMPI */


//Numero aleatorio para la referencia de pago
var randomNumber = Date.now() + Math.floor(Math.random() * 999);

//Wompi - Llaves
var pub_test = "pub_test_zC4ppsD4PkZ9Yl4kX2bbM6b5bOMotmOs";
var pub_prod = "pub_prod_0sdF95F6Yf3qH5XY9B4I0H9h81WQCUiq";


//variables del boton de pago
var data_public_key = pub_prod,					//Cambiar  pub_prod para pagos reales
	data_amount_in_cents = Math.floor(Math.random() * 1000000)*100;;
	data_reference= randomNumber;

document.write(""+
	"<script "+
	"src='https://checkout.wompi.co/widget.js'"+
	"data-render='button'"+
	"data-public-key='"+ data_public_key +"'"+
	"data-currency='COP'"+
	"data-amount-in-cents='"+ data_amount_in_cents + "'"+
	"data-reference= "+data_reference+"';>"+
	"</script>"
);