# app.py
from flask import Flask, render_template, session, redirect, url_for
# Importamos la función de persistencia que creamos en el paso anterior
from core.database import obtener_todos_los_vehiculos
# Para hacer que la cookie dure 5 dias haremos estos pasos. Paso 1 persistencia cookie
from datetime import timedelta

app = Flask(__name__)

# Clave secreta para firmar las cookies de la sesión
app.secret_key = 'clave_secreta_samurai_para_desarrollo'
# Le decimos a Flask que las sesiones permanentes durarán 5 días en el navegador. Paso 2 persisitencia cookie
app.permanent_session_lifetime = timedelta(days=5)

@app.route('/')
def inicio():
    # 1. Traemos los objetos vivos directamente desde la Base de Datos SQLite
    vehiculos_db = obtener_todos_los_vehiculos()
    
    # 2. Miramos si hay algún ID de vehículo guardado en la sesión
    alquilado_id = session.get('vehiculo_alquilado_id')
    vehiculo_alquilado = None
    
    # 3. Si existe, recuperamos el objeto correspondiente desde los datos de la BD
    if alquilado_id and alquilado_id in vehiculos_db:
        vehiculo_alquilado = vehiculos_db[alquilado_id]
    
    # Pasamos los datos dinámicos a la plantilla Jinja2
    return render_template('index.html', 
                           lista_vehiculos=vehiculos_db, 
                           alquilado=vehiculo_alquilado)

@app.route('/alquilar/<int:vehiculo_id>')
def alquilar_vehiculo(vehiculo_id):
    vehiculos_db = obtener_todos_los_vehiculos()
    
    if vehiculo_id in vehiculos_db:
        # NUEVO: Le indicamos a Flask que guarde esta sesión con la duración de larga vida
        session.permanent = True
        session['vehiculo_alquilado_id'] = vehiculo_id
        
    return redirect(url_for('inicio'))

@app.route('/devolver')
def devolver_vehiculo():
    # Eliminamos el registro de la sesión
    session.pop('vehiculo_alquilado_id', None)
    return redirect(url_for('inicio'))

if __name__ == '__main__':
    app.run(debug=True)