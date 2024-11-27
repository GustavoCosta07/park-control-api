const garagistaService = require('./service');

module.exports = {
    async createGaragista(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'As senhas não coincidem.' });
            }

            const newGaragista = await garagistaService.createGaragista({ name, email, password });

            return res.status(201).json({ message: 'Garagista criado com sucesso!', garagista: newGaragista });
        } catch (error) {
            console.error('Erro ao criar garagista:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async loginGaragista(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
            }

            const garagista = await garagistaService.loginGaragista(email, password);

            if (!garagista) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            return res.status(200).json({ message: 'Login realizado com sucesso!', garagista });
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async createParking(req, res) {
        try {
            const parkingData = req.body;
            const newParking = await garagistaService.createParking(parkingData);
            return res.status(201).json({ message: 'Estacionamento criado com sucesso!', parking: newParking });
        } catch (error) {
            console.error('Erro ao criar estacionamento:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async updateParking(req, res) {
        try {
            const parkingId = req.params.id;
            const parkingData = req.body;
            const success = await garagistaService.updateParking(parkingId, parkingData);
            return res.status(success ? 200 : 404).json({ message: success ? 'Estacionamento atualizado com sucesso!' : 'Estacionamento não encontrado.' });
        } catch (error) {
            console.error('Erro ao atualizar estacionamento:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async incrementSpot(req, res) {
        try {
            const parkingId = req.params.id;
            const success = await garagistaService.incrementSpot(parkingId);
            return res.status(success ? 200 : 400).json({ message: success ? 'Vaga incrementada com sucesso!' : 'Falha ao incrementar vaga.' });
        } catch (error) {
            console.error('Erro ao incrementar vaga:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async decrementSpot(req, res) {
        try {
            const parkingId = req.params.id;
            const success = await garagistaService.decrementSpot(parkingId);
            return res.status(success ? 200 : 400).json({ message: success ? 'Vaga decrementada com sucesso!' : 'Falha ao decrementar vaga.' });
        } catch (error) {
            console.error('Erro ao decrementar vaga:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async getReservations(req, res) {
        try {
            const parkingId = req.params.id;
            const reservations = await garagistaService.getReservations(parkingId);
            return res.status(200).json({ message: 'Reservas encontradas!', reservations });
        } catch (error) {
            console.error('Erro ao buscar reservas:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async confirmArrival(req, res) {
        try {
            const reservationId = req.params.id;
            const success = await garagistaService.confirmArrival(reservationId);
            return res.status(success ? 200 : 400).json({ message: success ? 'Chegada confirmada com sucesso!' : 'Falha ao confirmar chegada.' });
        } catch (error) {
            console.error('Erro ao confirmar chegada:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },

    async confirmDeparture(req, res) {
        try {
            const { reservationId, parkingId } = req.body;
            const success = await garagistaService.confirmDeparture(reservationId, parkingId);
            return res.status(success ? 200 : 400).json({ message: success ? 'Saída confirmada com sucesso!' : 'Falha ao confirmar saída.' });
        } catch (error) {
            console.error('Erro ao confirmar saída:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};



