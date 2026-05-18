# app.py
from flask import Flask, render_template, session, request, redirect, url_for
from core.coche import Coche
from core.motocicleta import Motocicleta
from core.bicicleta_electrica import BicicletaElectrica

app = Flask(__name__)

# Clave secreta para firmar las cookies de la sesión
app.secret_key = 'clave_secreta_samurai_para_desarrollo'

VEHICULOS_DISPONIBLES = {
    1: Coche("Toyota", "Yaris", 2023, 5, "Híbrido"),
    2: Motocicleta("Honda", "CB500F", 2022, 471, "Naked"),
    3: BicicletaElectrica("Specialized", "Turbo Tero", 2024, 710, 25)
}

@app.route('/')
def inicio():
    # 1. Miramos si hay algún ID de vehículo guardado en la sesión de la cookie
    alquilado_id = session.get('vehiculo_alquilado_id')
    vehiculo_alquilado = None
    
    # 2. Si existe, recuperamos el objeto completo de nuestra "base de datos"
    if alquilado_id and alquilado_id in VEHICULOS_DISPONIBLES:
        vehiculo_alquilado = VEHICULOS_DISPONIBLES[alquilado_id]
    
    # Pasamos tanto la lista completa como el vehículo actualmente alquilado
    return render_template('index.html', 
                           lista_vehiculos=VEHICULOS_DISPONIBLES, 
                           alquilado=vehiculo_alquilado)

@app.route('/alquilar/<int:vehiculo_id>')
def alquilar_vehiculo(vehiculo_id):
    # Verificamos que el vehículo realmente exista
    if vehiculo_id in VEHICULOS_DISPONIBLES:
        # GUARDAMOS EN LA SESIÓN: Flask se encarga de meter esto en la cookie cifrada
        session['vehiculo_alquilado_id'] = vehiculo_id
        
    return redirect(url_for('inicio'))

@app.route('/devolver')
def devolver_vehiculo():
    # Eliminamos el registro de la sesión para vaciar el "carrito"
    session.pop('vehiculo_alquilado_id', None)
    return redirect(url_for('inicio'))


if __name__ == '__main__':
    # Ejecutamos en modo depuración (debug) para que se recargue solo al hacer cambios
    app.run(debug=True)