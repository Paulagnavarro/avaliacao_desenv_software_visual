const auth = require('../auth');
const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async create(email, data_nasc, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await this.User.create({
                email: email,
                data_nasc: data_nasc,
                password: hashedPassword
            });

            return newUser ? newUser : null;
        } catch (error) {
            throw error;
        }
    }

    // Retornar todos os usuários
    async findAll() {
        try {
            const AllUsers = await this.User.findAll();
            return AllUsers ? AllUsers : null;
        } catch (error) {
            throw error;
        }
    }

    // Retornar o usuário pelo id
    async findById(id) {
        try {
            const User = await this.User.findByPk(id);
            return User ? User : null;
        } catch (error) {
            throw error;
        }
    }

    // Login
    async login(email, password) {
        try {
            const User = await this.User.findOne({
                where: { email }
            });

            if (User) {
                const validPassword = await bcrypt.compare(password, User.password);
                
                if (!validPassword) {
                    throw new Error('Senha incorreta');
                }

                const token = await auth.generateToken(User);
                User.dataValues.Token = token;
                
                User.dataValues.password = '';

                return User;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
