/*
JavsScript
*/
  // creamos un objeto de firebase, y le pasamos la URL como parametro
  var ref = new Firebase("https://proyectorpi.firebaseio.com/");

  // Traemos el valor de los sensores
  ref.once("value", function(res) {

    var sensorTemp = res.child("sensor/temp");
    var valorSensorTemp = sensorTemp.val()
    $('#temp').text(valorSensorTemp);

    var sensorluz = res.child("sensor/luz");
    var valorSensorLuz = sensorluz.val()
    $('#luz').text(valorSensorLuz);

    // llamamos, la funcion cambiarImagen.
    cambiarImagen(valorSensorLuz,valorSensorTemp)

  });

  // Obtenemos el valor de los sensores cada vez que hay un cambio
  // (En tiempo real)
  ref.on("child_changed", function(res) {

    var valorSensorTemp = res.val().temp
    $('#temp').text(valorSensorTemp);

    var valorSensorLuz = res.val().luz
    $('#luz').text(valorSensorLuz);        

    cambiarImagen(valorSensorLuz,valorSensorTemp)

  });        

  /* 
    función para cambiar la imagen de fondo
    de acuerdo a los valores de los sensores
  */

  function cambiarImagen(valorSensorLuz, valorSensorTemp){

    if(valorSensorLuz>=7){

        console.log("Es de dia");

        if(valorSensorTemp<17){

          console.log("dia frio");
          $("#imgDiaFrio").siblings().fadeOut(3000);
          $("#imgDiaFrio").fadeIn(3000);
          $("#dia").text("Dia Frio");

        }
        else if(valorSensorTemp>17 && valorSensorTemp<=23){
          console.log("dia fresco");
          $("#imgDiaFresco").siblings().fadeOut(3000);
          $("#imgDiaFresco").fadeIn(3000)
          $("#dia").text("Dia Fresco");
        }

        else if(valorSensorTemp>24){
          console.log("dia Calido");
          $("#imgDiaCalido").siblings().fadeOut(3000);
          $("#imgDiaCalido").fadeIn(3000);
          $("#dia").text("Dia Calido");
        }

    }else{
        console.log("Es de noche");
        $("#imgNoche").siblings().fadeOut(3000);
        $("#imgNoche").fadeIn(3000);          
        $("#dia").text("Noche");

    }
 }       