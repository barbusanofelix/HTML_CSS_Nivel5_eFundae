# core/coche.py
from .vehiculo import Vehiculo  # Importa clase Vehiculo para usarla en la herencia

# Coche hereda de Vehiculo
class Coche(Vehiculo):
    def __init__(self, marca: str, modelo: str, anio: int, numero_puertas: int, combustible: str):
        super().__init__(marca, modelo, anio)
        self.numero_puertas = numero_puertas
        self.combustible = combustible

    def mostrar_detalles(self) -> str:
        """Muestra los detalles específicos del coche."""
        # mostrar_informacion() es el metodo heredad de Vehiculo 
        info_basica = self.mostrar_informacion()
        return f"Coche: {info_basica} | Puertas: {self.numero_puertas} | Combustible: {self.combustible}"