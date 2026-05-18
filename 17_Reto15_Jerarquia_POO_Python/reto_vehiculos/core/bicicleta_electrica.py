# core/bicicleta_electrica.py
from .vehiculo import Vehiculo

class BicicletaElectrica(Vehiculo):
    def __init__(self, marca: str, modelo: str, anio: int, capacidad_bateria: int, velocidad_maxima: int):
        super().__init__(marca, modelo, anio)
        self.capacidad_bateria = capacidad_bateria  # Ej: en vatios-hora (Wh)
        self.velocidad_maxima = velocidad_maxima    # Ej: en km/h

    def mostrar_detalles(self) -> str:
        """Muestra los detalles específicos de la bicicleta eléctrica."""
        info_basica = self.mostrar_informacion()
        return f"Bici Eléctrica: {info_basica} | Batería: {self.capacidad_bateria}Wh | Vel. Máx: {self.velocidad_maxima}km/h"