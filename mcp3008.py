#! /usr/bin/env python
# -*- coding: utf-8 -*-
# Desarrollado por Jefferson Rivera
from gpiozero import MCP3008
from firebase import firebase
from time import sleep

# conexión al firebase, (acá colocas tu la URL que te genera firebase)
fire = firebase.FirebaseApplication('https://proyectorpi.firebaseio.com', None) 

sensorLuz  = MCP3008(0) # canal 0
sensorTemp = MCP3008(1) # canal 1

while True:

    try:
        # Rango de 0 a 10, donde 0 es aucencia de luz y 10 la mászima luz
        ValorSensorLuz  = sensorLuz.value*10 
        ValorSensorTemp = sensorTemp.value*500 # Convertimos el voltaje en temperatura 
        ValorSensorLuz  = round(ValorSensorLuz, 2) # Redondeamos y dejamos 4 decimales
        ValorSensorTemp = round(ValorSensorTemp, 2)

        # Mostramos en Pantalla
        print "************************************"
        print "Sensor Luz: ", ValorSensorLuz
        print "Sensor Temp:", ValorSensorTemp
        print "************************************\n"

        #Actualizamos el valor de los sensores en firebase, para cada caso
        fire.put('/sensor/', 'temp', ValorSensorTemp)
        fire.put('/sensor/', 'luz',  ValorSensorLuz)

        # Esperamos 3 Segundos  
        sleep(3)

    except KeyboardInterrupt:
      print "\nSalida"
      break


