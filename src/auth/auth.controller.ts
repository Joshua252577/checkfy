import pool from "../services/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthController {
    public static async authenticate(body: {email: string, password: string}) {
        if (!body.password) {
            throw new Error("Password is required");
        }

        const result = await pool.query(
            `SELECT id, name, email, password FROM users WHERE email = $1`,
            [body.email]
        );
        if (result.rowCount === 0) {
            throw new Error(`Usuário não encontrado.`);
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(body.password, user.password);

        if (!isMatch) {
            throw new Error(`Senha incorreta.`);
        }

        delete user.password;

        const token = jwt.sign(
            {id: user.id, email: user.email},
            'secret',
            { expiresIn: '1d' }
        );

        return {user, token};
    }
}
