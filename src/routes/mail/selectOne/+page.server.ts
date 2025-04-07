import { getById } from '$lib/db/consultas';

export async function load() {
	try {
		const datos = await getById('2');
		console.log('Datos encontrados: ' + datos);

		if (!datos) {
			throw new Error('No se recibieron datos');
		}
		return { datos };
	} catch (error) {
		console.error('Error en load: ', error);
		return {
			datos: []
		};
	}
}
