import { NextResponse } from "next/server";
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

        const { email, password } = await request.json();

        // Buscar el usuario
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        const user = result.rows[0];

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
        }

        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return NextResponse.json({ message: 'Inicio de sesión exitoso', token }, { status: 200 });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    } finally {
        if (pool) {
            await pool.end();
        }
    }
}