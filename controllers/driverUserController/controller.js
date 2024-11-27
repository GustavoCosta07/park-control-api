const userService = require('./service');

module.exports = {
    async createDriverUser(req, res) {
        try {
            const { name, cpf, email, password, confirmPassword, carLicensePlate, phone, address, carModel, carBrand, carYear, cnhNumber } = req.body;

            if (!name || !cpf || !email || !password || !confirmPassword || !carLicensePlate || !phone || !address || !carModel || !carBrand || !carYear || !cnhNumber) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'As senhas ! coincidem.' });
            }

            const newUser = await userService.createUser({ name, cpf, email, password, carLicensePlate, phone, address, carModel, carBrand, carYear, cnhNumber });

            return res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async loginDriverUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
            }

            const user = await userService.loginUser(email, password);

            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            return res.status(200).json({ message: 'Login realizado com sucesso!', user });
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
 
};


