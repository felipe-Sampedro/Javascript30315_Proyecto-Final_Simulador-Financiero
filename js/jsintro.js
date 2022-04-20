    console.log('intro-js')
    
    const validacion1 = localStorage.getItem('Nombre')
    const validacion2 = localStorage.getItem('Edad')
    const validacion3 = localStorage.getItem('Trabajas')
    const validacion4 = localStorage.getItem('Amparado')
    const validacion5 = localStorage.getItem('Historial')

if (validacion1!==null && validacion2!==null){
	const alertaintro = document.getElementById('alerta')

    const nombre = document.getElementById('nom_ape')
    nombre.value = validacion1
    const age = document.getElementById('edad')
    age.value = validacion2
    const trabajandoSI =document.getElementById('flexRadioDefault1')
    const trabajandoNO =document.getElementById('flexRadioDefault2')
    validacion3 === 'SI'? trabajandoSI.checked =true :trabajandoNO.checked=true

    const tutorSI =document.getElementById('flexRadioDefault3')
    const tutorNO =document.getElementById('flexRadioDefault4')
    validacion4 === 'SI'? tutorSI.checked=true:tutorNO.checked=true

    const trayectoriaSI =document.getElementById('flexRadioDefault5')
    const trayectoriaNO =document.getElementById('flexRadioDefault6')
    validacion5 === 'SI'? trayectoriaSI.checked=true:trabajandoNO.checked=true

    alertaintro.innerText="La session ha sido restaurada con los datos anteriormente ingresados"
    alertaintro.className="bg-dark text-white m-3"

}

const simular = document.getElementById('simular')
simular.onclick = () =>{
	const alertaintro = document.getElementById('alerta')
	const nombre = document.getElementById('nom_ape')
    const age = document.getElementById('edad')
    const ready = document.getElementById('comando')
    const trabajando = (document.getElementById('flexRadioDefault1').checked)?'SI':'NO'
    const tutor = (document.getElementById('flexRadioDefault3').checked)?'SI':'NO'
    const trayectoria = (document.getElementById('flexRadioDefault5').checked)?'SI':'NO'

    localStorage.setItem('Fecha',new Date())
    localStorage.setItem('Nombre',nombre.value)
    localStorage.setItem('Edad',age.value)
    localStorage.setItem('Trabajas', trabajando)
    localStorage.setItem('Amparado', tutor)
    localStorage.setItem('Historial', trayectoria)

	if (nombre.value==='' || age.value==='* Selecciona tu Edad'){
//    if (nombre.value!==null && age.value==='Selecciona tu Edad' || nombre.value==='' && age.value==='Selecciona tu Edad'){
		alertaintro.innerText="¡Todos los datos con '*' son obligatorios para poder continuar!"
        alertaintro.className="bg-danger m-3"
        Swal.fire({
            icon: 'error',
            title: 'Oops... Faltan datos',
            text: 'Algo salio mal!',
            footer: '<a href="">Necesitas ayuda?</a>'
          })
    }
	else{
        if(parseInt(edad.value) > 18){
            trabajando === 'SI' ? alertaintro.innerText=`Felicitaaciones, cumples con el requisito minimo para acceder al credito y ademas SI Tienes trabajo`
                                :alertaintro.innerText=`Felicitaaciones, cumples con el requisito minimo para acceder al credito`
            alertaintro.className="bg-success m-3"
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Datos procesados correctamente',
                showConfirmButton: false,
                timer: 2500
              })
            let btn=document.createElement('button')
            btn.id='nuevobtn'
            btn.className="btn btn-primary btn-lg"
            btn.innerHTML="<a href='../pages/simulador.html' class='text-white' style='text-decoration:none'>IR AL SIMULADOR</a>"
            ready.append(btn)

            function PosiblesNuevosClientes(cliente){
                const NCdo=document.getElementById('posibles-clientes')
    
                NCdo.innerHTML=null
                NCdo.innerHTML="<strong>ENCONTRAMOS LOS SIGUIENTES POSIBLES CLIENTES DE TU LISTA DE CONTACTOS, SI LOS REFIERES PODRAS TENER BENEFICIOS PARA AQUELLOS QUE APLIQUEN</strong>"
                cliente.forEach( c => {
                    console.log(c)
                    if(c.edad >= 18){
                        sumary=`La persona ${c.name} es un posible nuevo cliente ya que cumple la mayoria de edad`
                    }
                    else if(c.edad<18 && c.Trabaja=="SI"){
                        sumary=`Aunque La persona ${c.name} es menor de edad, es un posible nuevo cliente ya que actualmente ${c.Trabaja} trabaja`
                    }
                    else{
                        sumary=`La persona ${c.name} es menor de edad y actualmente ${c.Trabaja} trabaja, por lo que no califica como posible nuevo cliente`
                    }
                    
                    const li =document.createElement('li')
                    li.innerText = sumary
                    NCdo.append(li)
                });
            }


        }  
        else if (parseInt(edad.value) < 18 && parseInt(edad.value) >= 15 && trabajando ==="NO" && tutor ==="SI" && trayectoria ==="SI" || parseInt(edad.value) < 18 && parseInt(edad.value) >= 14 && trabajando ==="SI" && tutor ==="NO" && trayectoria ==="SI" || parseInt(edad.value) < 18 && parseInt(edad.value) >= 13 && trabajando ==="SI" && tutor ==="SI" && trayectoria ==="NO"){
            alertaintro.innerText=`Aunque no cumples la edad para un credito, como ${trabajando} estas trabajndo, ${tutor} tienes a alguien que te ampare y ${trayectoria} tienes historial crediticio, cumples con el score para acceder` 
            alertaintro.className="bg-success m-3"
            let btn=document.createElement('button')
            btn.className="btn btn-primary btn-lg"
            btn.innerHTML="<a href='../pages/simulador.html' class='text-white' style='text-decoration:none'>IR AL SIMULADOR</a>"
            ready.append(btn)


            function PosiblesNuevosClientes(cliente){
                const NCdo=document.getElementById('posibles-clientes')
    
                NCdo.innerHTML=null
                NCdo.innerHTML="<strong>ENCONTRAMOS LOS SIGUIENTES POSIBLES CLIENTES DE TU LISTA DE CONTACTOS, SI LOS REFIERES PODRAS TENER BENEFICIOS PARA AQUELLOS QUE APLIQUEN</strong>"
                cliente.forEach( c => {
                    console.log(c)
                    if(c.edad >= 18){
                        sumary=`La persona ${c.name} es un posible nuevo cliente ya que cumple la mayoria de edad`
                    }
                    else if(c.edad<18 && c.Trabaja=="SI"){
                        sumary=`Aunque La persona ${c.name} es menor de edad, es un posible nuevo cliente ya que actualmente ${c.Trabaja} trabaja`
                    }
                    else{
                        sumary=`La persona ${c.name} es menor de edad y actualmente ${c.Trabaja} trabaja, por lo que no califica como posible nuevo cliente`
                    }
                    
                    const li =document.createElement('li')
                    li.innerText = sumary
                    NCdo.append(li)
                });
            }

            
        }
        else if(parseInt(edad.value) < 18 && trabajando ==="NO" && tutor ==="NO" && trayectoria ==="SI" || parseInt(edad.value) < 18 && trabajando ==="NO" && tutor ==="SI" && trayectoria ==="NO" || parseInt(edad.value) < 18 && trabajando ==="SI" && tutor ==="NO" && trayectoria ==="NO")
        {
            alertaintro.innerText=`Aunque no cumples la edad para un credito, como ${trabajando} estas trabajndo, ${tutor} tienes a alguien que te ampare y ${trayectoria} tienes historial crediticio, aun no cumples con los requisitos minimos para el credito pero te falta poco` 
            alertaintro.className="bg-warning m-3"
        }
        else{
            alertaintro.innerText=`No cumples con los requisitos minimos para un Credito, Intentalo despues.` 
            alertaintro.className="bg-danger m-3"
        }



	}


 /* Aplicando Fetch al proyecto */
    fetch('../js/datajsonAPI.json')
    .then(respuesta => respuesta.json() )
    .then( dat => {
        PosiblesNuevosClientes(dat)
    })

}

const clear = document.getElementById('restaurar')
clear.onclick = () => {	
    const alertaintro = document.getElementById('alerta')
    const ready = document.getElementById('nuevobtn')
    const vinculacion = document.getElementById('posibles-clientes')

    alertaintro.innerText=""
    alertaintro.className="m-3"
    vinculacion.innerText=null
    ready.remove()
}


function PosiblesNuevosClientes(cliente){
    const NCdo=document.getElementById('posibles-clientes')

    NCdo.innerHTML=null
    NCdo.innerHTML="<strong>ENCONTRAMOS LOS SIGUIENTES POSIBLES CLIENTES DE TU LISTA DE CONTACTOS, SI LOS REFIERES PODRAS TENER BENEFICIOS PARA AQUELLOS QUE APLIQUEN</strong>"
    cliente.forEach( c => {
        console.log(c)
        if(c.edad >= 18){
            sumary=`La persona ${c.name} es un posible nuevo cliente ya que cumple la mayoria de edad`
        }
        else if(c.edad<18 && c.Trabaja=="SI"){
            sumary=`Aunque La persona ${c.name} es menor de edad, es un posible nuevo cliente ya que actualmente ${c.Trabaja} trabaja`
        }
        else{
            sumary=`La persona ${c.name} es menor de edad y actualmente ${c.Trabaja} trabaja, por lo que no califica como posible nuevo cliente`
        }
        
        const li =document.createElement('li')
        li.innerText = sumary
        NCdo.append(li)
    });
}
