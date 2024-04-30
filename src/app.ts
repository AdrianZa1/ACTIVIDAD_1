import { Examen } from "./interfaces/IExamen";
import { InsumoEvaluacion } from "./interfaces/IInsumoEvaluacion";
import { Pregunta } from "./interfaces/IPregunta";

//-------OBJETOS-------
const examenes: Examen[] = [
    { id: 1, descripcion: "Examen de Matemáticas" },
    { id: 2, descripcion: "Examen de Historia" },
    { id: 3, descripcion: "Examen de Ciencias Naturales" }
];

// Arreglo de objetos para Pregunta
const preguntas: Pregunta[] = [
    { id: 1, pregunta: "¿Cuánto es 2 + 2?", categorias: "Matemáticas",respuestas_correctas: 5 },
    { id: 2, pregunta: "¿Quién fue Simón Bolívar?", categorias: "Historia",respuestas_correctas: 8 },
    { id: 3, pregunta: "¿Cuál es el proceso de la fotosíntesis?", categorias: "Ciencias Naturales",respuestas_correctas: 9 }
];

// Arreglo de objetos para InsumoEvaluacion
const insumosEvaluacion: InsumoEvaluacion[] = [
    { id: 1, id_pregunta: 1, id_examen: 1, valor: 5 },
    { id: 2, id_pregunta: 2, id_examen: 2, valor: 10 },
    { id: 3, id_pregunta: 3, id_examen: 3, valor: 8 }
];
// Arreglo para la eliminaion
function eliminarElementoPorID<T extends { id: number }>(arreglo: T[], id: number): T | undefined {
    const index = arreglo.findIndex(item => item.id === id);
    if (index !== -1) {
        return arreglo.splice(index, 1)[0];
    }
}
// función eliminar
function eliminarElementoConCallback<T>(arreglo: T[], id: number, callback: (elementoEliminado: T) => void): void {
    const index = arreglo.findIndex((elemento: any) => elemento.id === id);
    if (index !== -1) {
        const elementoEliminado = arreglo.splice(index, 1)[0];
        callback(elementoEliminado);
    } else {
        console.log("Elemento no encontrado");
    }
}



// Definir interfaz para la respuesta del servicio REST
interface RestResponse {
  data: (Examen | InsumoEvaluacion| Pregunta)[];
}

// Función para consultar el servicio REST
async function fetchData(url: string): Promise<RestResponse | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Aquí puedes validar que la respuesta cumpla con la estructura esperada antes de retornarla
    return data as RestResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// URL de ejemplo de un servicio REST gratuito
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// Ejemplo de uso de la función fetchData
fetchData(apiUrl).then(response => {
  if (response) {
    console.log("Data from REST service:", response);
  } else {
    console.log("Failed to fetch data from REST service.");
  }
});

export { fetchData };