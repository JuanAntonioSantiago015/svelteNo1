import { pool } from '$lib/db/maria';
import { json } from '@sveltejs/kit';

export async function PUT({ params, request }) {
	const { estado, nombre, cod_usuario, cod_departamento } = await request.json();
	const { muniid } = params;
	try {
		const [result] = await pool.query(
			'UPDATE tb_municipio SET estado  = ?, nombre = ?, cod_usuario = ?, cod_departamento = ?, updated_at  = NOW() WHERE codigo = ?',
			[estado, nombre, cod_usuario, cod_departamento, codigo]
		);
		if (result.affectedRows === 0) {
			return new Response(JSON.stringify({ error: 'No encontrado' }), { status: 404 });
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error }), { status: 500 });
	}
}
