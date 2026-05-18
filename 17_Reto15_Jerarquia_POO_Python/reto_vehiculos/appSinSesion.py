# app.py
from flask import Flask, render_template, session, request, redirect, url_for
from core.coche import Coche
from core.motocicleta import Motocicleta
from core.bicicleta_electrica import BicicletaElectrica

app = Flask(__name__)

# CRUCIAL: Clave secreta para que Flask pueda firmar y asegurar las cookies de sesión
app.secret_key = 'clave_secreta_samurai_para_desarrollo'

# Simulamos una base de datos temporal de vehículos disponibles para alquiler
VEHICULOS_DISPONIBLES = {
    1: Coche("Toyota", "Yaris", 2023, 5, "Híbrido"),
    2: Motocicleta("Honda", "CB500F", 2022, 471, "Naked"),
    3: BicicletaElectrica("Specialized", "Turbo Tero", 2024, 710, 25)
}

@app.route('/')
def inicio():
    # De momento, solo devolvemos un texto de prueba para verificar que funciona
    # return "¡Servidor Flask de Alquiler de Vehículos funcionando correctamente!"
    # Ya para probar Flask comentamos la linea anterior y colocamos esta para renderizar base.html
    # return render_template('base.html')
    # Ahora que incluimos el index.html que hereda de base.html pues renderizaos a index.html con la lista de vehiculos...
    return render_template('index.html', lista_vehiculos=VEHICULOS_DISPONIBLES)


if __name__ == '__main__':
    # Ejecutamos en modo depuración (debug) para que se recargue solo al hacer cambios
    app.run(debug=True)