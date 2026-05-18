# core/vehiculo.py

class Vehiculo:
    # Constructor con marc, modelo y año que se asignan a los atributos
    def __init__(self, marca: str, modelo: str, anio: int):
        self.marca = marca
        self.modelo = modelo
        self.anio = anio

    # Metodo para imprimir la informacion de la clase
    def mostrar_informacion(self) -> str:
        """Muestra la información básica del vehículo."""
        return f"{self.marca} {self.modelo} ({self.anio})"