import { NextResponse } from "next/server";
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export async function POST(request) {
    let pool;
    try {
        pool = new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10)
        });

        const { email, username, password } = await request.json();

        // Verificar si el usuario ya existe
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        const result = await pool.query(
            'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id',
            [email, username, hashedPassword]
        );

        return NextResponse.json({ message: 'Usuario registrado exitosamente', userId: result.rows[0].id }, { status: 201 });

    } catch (error) {
        console.error('Error en el registro:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    } finally {
        if (pool) {
            await pool.end();
        }
    }
}