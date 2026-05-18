# main.py
from core.coche import Coche
from core.motocicleta import Motocicleta
from core.bicicleta_electrica import BicicletaElectrica

def ejecutar_prueba():
    print("--- Probando Jerarquía de Clases (Código Samurái) ---\n")

    # 1. Crear instancias de cada vehículo
    mi_coche = Coche("Toyota", "Yaris", 2023, 5, "Híbrido")
    mi_moto = Motocicleta("Honda", "CB500F", 2022, 471, "Naked")
    mi_bici = BicicletaElectrica("Specialized", "Turbo Tero", 2024, 710, 25)

    # 2. Almacenarlas en una lista para demostrar polimorfismo básico
    flota = [mi_coche, mi_moto, mi_bici]

    # 3. Mostrar la información específica de cada uno
    for vehiculo in flota:
        print(vehiculo.mostrar_detalles())

if __name__ == "__main__":
    ejecutar_prueba()