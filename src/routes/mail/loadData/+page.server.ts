// +page.server.ts
import { getAllData } from '$lib/db/consultas';

export async function load() {
	try {
		const datos = await getAllData();
		console.log('Datos cargados:', datos); // Verifica en terminal

		if (!datos) {
			throw new Error('No se recibieron datos');
		}

		return { datos };
	} catch (error) {
		console.error('Error en load:', error);
		return {
			datos: [] // Retorna array vacío para evitar undefined
		};
	}
}
