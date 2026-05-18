# core/motocicleta.py
from .vehiculo import Vehiculo

class Motocicleta(Vehiculo):
    def __init__(self, marca: str, modelo: str, anio: int, cilindrada: int, tipo: str):
        super().__init__(marca, modelo, anio)
        self.cilindrada = cilindrada
        self.tipo = tipo

    def mostrar_detalles(self) -> str:
        """Muestra los detalles específicos de la motocicleta."""
        info_basica = self.mostrar_informacion()
        return f"Motocicleta: {info_basica} | Cilindrada: {self.cilindrada}cc | Tipo: {self.tipo}"