import mariadb from 'mariadb';

export const pool = mariadb.createPool({
	host: '127.0.0.1',
	user: 'finanssoreal',
	password: 'finanssoreal',
	database: 'local_finanssoreal'
});

export async function getConnection() {
	try {
		const connection = await pool.getConnection();
		return connection;
	} catch (error) {
		console.error('Error obteniendo conexión a la base de datos:', error);
		throw error;
	}
}
