# core/database.py
import sqlite3
from .coche import Coche
from .motocicleta import Motocicleta
from .bicicleta_electrica import BicicletaElectrica

DATABASE_PATH = 'alquiler.db'

def obtener_conexion():
    """Establece una conexión con la base de datos SQLite."""
    conexion = sqlite3.connect(DATABASE_PATH)
    # Permite acceder a las columnas por su nombre como un diccionario
    conexion.row_factory = sqlite3.Row
    return conexion

def obtener_todos_los_vehiculos() -> dict:
    """Consulta la BD y devuelve un diccionario de objetos según su clase correspondiente."""
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    cursor.execute('SELECT * FROM vehiculos')
    filas = cursor.fetchall()
    
    vehiculos_objetos = {}
    
    for fila in filas:
        id_v = fila['id']
        tipo = fila['tipo']
        
        # Reconstruimos la instancia POO específica mapeando los datos de la fila
        if tipo == 'coche':
            objeto = Coche(
                marca=fila['marca'],
                modelo=fila['modelo'],
                anio=fila['anio'],
                numero_puertas=fila['numero_puertas'],
                combustible=fila['combustible']
            )
        elif tipo == 'motocicleta':
            objeto = Motocicleta(
                marca=fila['marca'],
                modelo=fila['modelo'],
                anio=fila['anio'],
                cilindrada=fila['cilindrada'],
                tipo=fila['tipo_moto']
            )
        elif tipo == 'bicicletaelectrica':
            objeto = BicicletaElectrica(
                marca=fila['marca'],
                modelo=fila['modelo'],
                anio=fila['anio'],
                capacidad_bateria=fila['capacidad_bateria'],
                velocidad_maxima=fila['velocidad_maxima']
            )
            
        # Lo guardamos en nuestro diccionario usando su ID de la base de datos
        vehiculos_objetos[id_v] = objeto
        
    conexion.close()
    return vehiculos_objetos