import { pool } from '$lib/db/maria';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	try {
		// Ejecutamos la consulta SQL y obtenemos las filas
		const [rows] = await pool.query('SELECT * FROM tb_municipio LIMIT 5');

		// Verificamos si `rows` es un array de objetos
		if (Array.isArray(rows)) {
			// Convertimos BigInt a String si hay múltiples filas
			const resultWithStringBigInt = rows.map((row) => {
				return Object.fromEntries(
					Object.entries(row).map(([key, value]) =>
						typeof value === 'bigint' ? [key, value.toString()] : [key, value]
					)
				);
			});

			console.log(resultWithStringBigInt); // Verifica que todo esté correcto
			return new Response(JSON.stringify(resultWithStringBigInt), {
				headers: { 'Content-Type': 'application/json' },
				status: 200
			});
		} else {
			// En caso de que `rows` no sea un array, lo manejamos como un único objeto
			const resultWithStringBigInt = Object.fromEntries(
				Object.entries(rows).map(([key, value]) =>
					typeof value === 'bigint' ? [key, value.toString()] : [key, value]
				)
			);
			return new Response(JSON.stringify([resultWithStringBigInt]), {
				headers: { 'Content-Type': 'application/json' },
				status: 200
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
}
