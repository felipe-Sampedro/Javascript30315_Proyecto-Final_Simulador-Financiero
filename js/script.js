
console.log('PRESTAMOS')

let tasa_interes_EM=0
let periodo=0


// funciones operaciones basicas
function sumar(...numeros){
	return numeros.reduce((acc,n) => acc + n ,0)
}

// funciones para conversion de parametros
function conversion_tasa_interes(tasa_interes_EA){
	let tasa_interes_EM = Math.pow((1 + (tasa_interes_EA/100)),(1/12))-1
	return tasa_interes_EM
}

function años_en_meses(años){
	let periodo = años*12
	return periodo
}

// cambio formato resultado
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
  })
  const formatter2 = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
  })

//funciones para cada uno de los periodos "k" del credito segun el plazo dado en meses

function anualidadPK(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK.toFixed(0)
}

function numPK(periodoPK){
	let numeradorPK = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK)))-1
	return numeradorPK
}

function denPK(periodoPK){
	let denominadorPK = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK))
	return denominadorPK
}


function PK(numeradorPK , denominadorPK){
	let PK = (anualidadPK() * numeradorPK) / denominadorPK
	return PK.toFixed(0)
}



//funciones para cada uno de los periodos "k-1" del credito segun el plazo dado en meses

function anualidadPK_1(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK_1=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK_1.toFixed(0)
}

function numPK_1(periodoPK_1){
	let numeradorPK_1 = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1)))-1
	return numeradorPK_1
}

function denPK_1(periodoPK_1){
	let denominadorPK_1 = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1))
	return denominadorPK_1
}


function PK_1(numeradorPK_1 , denominadorPK_1){
	let PK_1 = (anualidadPK_1() * numeradorPK_1) / denominadorPK_1
	return PK_1.toFixed(0)
}


// Funcion constructora de objetos con cada uno de los parametros calculados para cada mes 

class Cada_Periodo {
	constructor (k,numPK,denPK,PK,numPK_1,denPK_1,PK_1,abono_capital,cobro_interes){
		this.serie = k;
		this.numeradork = numPK;
		this.denominadork = denPK;
		this.capitalPK = PK;
		this.numeradorPK_1k = numPK_1;
		this.denominadorPK_1k = denPK_1;
		this.capitalPK_1 = PK_1;
		this.abonos=abono_capital
		this.cobro = cobro_interes
	}

	// Metodo que calcula del monto total pagado cada mes, cuanto se va al abono de capital
	abono_capital(){
		this.abonos= parseInt(this.capitalPK_1) - parseInt(this.capitalPK)
	}

	// Metodo que calcular del monto toal pagado cada mes, cuanto se va a pago de intereses generados
	pago_intereses(){
		this.cobro = anualidadPK() - this.abonos
	}
}

// Array vacio para utilizar propiedad push y cargarlos con los objetos creados de la funcion cosntructora
const Plan_pagos=[]
const tot_int_pagados=[]

Plan_pagos.join('--')
console.log(Plan_pagos)

const limpeza = document.getElementsByTagName('tr')
const borrar = document.getElementsByTagName('td')
const remover = document.getElementsByClassName('fila')
const amortizacion = document.querySelector('.resultado')
const limpiar = document.querySelector('.resetear')

let pc_fecha=document.getElementById('storage_fecha')
let años=document.getElementById('edad')
let menor_edad=document.getElementById('menor_edad')
let pc_trabaja=document.getElementById('trabaja')
let pc_amparo=document.getElementById('amparado')
let pc_historial=document.getElementById('historial')

limpiar.onclick = () => {amortizacion.innerText="";
	let Num_cuo = años_en_meses(document.getElementById("plazo").value);
	for (let b = 1; b <= Num_cuo;b++){
		for (const element of borrar){
			element.innerText=""
			element.innerHTML=null
		}
		for (const e of remover){
			e.remove()
		}
	}

	Toastify({
		text: "Se ha borrado la informacion",
		duration: 2500,
		gravity: "top", // `top` or `bottom`
		position: "left", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: {
		  background: "linear-gradient(to right, #b71c1c, #ba000d)",
		},
	  }).showToast();
}


// funcion principal para calculo de cuota mensual a pagar del credito
function anualidad(){
		let monto_prestamo = document.getElementById("prestamo").value;
		let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
		let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);
		let res=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
		document.getElementById("resultado_final").innerHTML = formatter.format(res)
}

function plan_amortizacion(){
	for (let a = 1; a <= años_en_meses(document.getElementById("plazo").value); a++){

		nombre_objeto = 'resultado'+a
		Plan_pagos.push(nombre_objeto = new Cada_Periodo(a,numPK(a).toFixed(2),denPK(a).toFixed(2),PK(numPK(a),denPK(a)),numPK_1(a).toFixed(2),denPK_1(a).toFixed(2),PK_1(numPK_1(a),denPK_1(a)),0,0));			
		nombre_objeto.abono_capital()			
		nombre_objeto.pago_intereses()

		tot_int_pagados.push(nombre_objeto.cobro)
		//optimizando variables + operador logico OR 
		console.log(nombre_objeto?.cobro || 'La propiedad Cobro no existe')
		console.log(nombre_objeto?.refinanciacion || 'La propiedad refinanciacion no existe')	
		
		//desestructurar objeto
		const {capitalPK,capitalPK_1,abonos,cobro} = nombre_objeto
		console.log(`Las variables desestructuradas son: Capital Anterior = ${capitalPK_1}, Capital Actual = ${capitalPK}, Abonos = ${abonos} e Intereses = ${cobro}`)

		let container = document.getElementById('detalle_pagos')
		let tr = document.createElement('tr')
		tr.className= `${a} fila` 
		container.append(tr)


		for (let j = 1; j<=5;j++){
			fil_col = 'tabla'+a+j;
			clase_rc= 'rc'+a+j 

			let td = document.createElement('td')
			td.id=clase_rc
			td.className= 'linea'
			tr.append(td)

			switch(j){
				case 1:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = a
					break 
				case 2:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.capitalPK)
					break
				case 3:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.capitalPK_1)
					break
				case 4:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.abonos)
					break
				case 5:
					fil_col=document.getElementById(clase_rc)
					fil_col.innerText = formatter2.format(nombre_objeto.cobro)
					break
			}
		}
	}
}


const calcular = document.getElementById('calculo')
calcular.onclick = () => {
		anualidad()
		plan_amortizacion()
		sessionStorage.setItem('programa', JSON.stringify(Plan_pagos))
		// Spread del array tot_int_pagados para sumarlos y poder calcular el total de intereses a pagar
		console.log(`El total de intereses pagados segun las condiciones seleccionadas es de ` + formatter.format(sumar(...tot_int_pagados)))

		Toastify({
			text: "Simulacion generadoa correctamente",
			duration: 2000,
			gravity: "top", // `top` or `bottom`
			position: "center", // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
		  }).showToast();


		  let valido = dayjs().format('DD/MM/YYYY h:mm:ss A')
		  console.log(valido)


		  let timerInterval
		  Swal.fire({
			title: `Oferta limitada! a partir de ${valido}`,
			html: 'Esta oferta solo sera valida por los proximos 15 segundos: <b></b>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, Aceptar',
			cancelButtonText: 'No, Rechazar',
			reverseButtons: true,
			timer: 15000,
			timerProgressBar: true,
			willClose: () => {
			  clearInterval(timerInterval)
			}
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Excelente!',
				'Has aceptado el plan de pagos.',
				'Proceso exitoso'
			  )
			}
		  })



} 
	
// para mostrar el valor seleccionados en los inputs de rango
const prestamo = document.querySelector('#prestamo')
const output = document.querySelector('.prestamo-output')

output.textContent = prestamo.value

prestamo.addEventListener('input', function() {
  output.textContent = prestamo.value
});

const interes = document.querySelector('#interes')
const output2 = document.querySelector('.interes-output')

output2.textContent = interes.value

interes.addEventListener('input', function() {
  output2.textContent = interes.value
});

const plazo = document.querySelector('#plazo')
const output3 = document.querySelector('.plazo-output')

output3.textContent = plazo.value

plazo.addEventListener('input', function() {
  output3.textContent = plazo.value
});