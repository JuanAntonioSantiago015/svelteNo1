import { pool } from '$lib/db/maria';
import type { RowDataPacket } from 'mysql2/promise';

export async function queryDatabase<T = RowDataPacket[]>(
	query: string,
	params: any[] = []
): Promise<T | { error: string }> {
	let conn;
	try {
		conn = await pool.getConnection();
		const [result] = await conn.query<T>(query, params);
		return result;
	} catch (err) {
		console.error(err);
		return { error: 'Error en la consulta' };
	} finally {
		if (conn) conn.release();
	}
}

export async function getAllData(): Promise<RowDataPacket[] | { error: string }> {
	return await queryDatabase('SELECT * FROM tb_municipio LIMIT 100');
}

export async function getById(muniId: string): Promise<RowDataPacket[] | { error: string }> {
	console.log('Query para cargar uno');
	return await queryDatabase('SELECT * FROM tb_municipio WHERE codigo = ?', [muniId]);
}

export async function create(
	codigo: int,
	estado: int,
	nombre: string,
	cod_usuario: int,
	cod_departamento: int
): Promise<RowDataPacket[] | { error: string }> {
	return await querydatabase(
		'INSERT INTO tb_municipio (codigo, estado, nombre, cod_usuario, cod_departamento) VALUES (?, ?, ?, ?, ?)',
		[codigo, estado, nombre, cod_usuario, cod_departamento]
	);
}
