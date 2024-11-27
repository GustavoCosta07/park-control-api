const parkingService = require('./service');

module.exports = {

    async getNearbyParkings(req, res) {
        try {
            const { address } = req.body;

            if (!address) {
                return res.status(400).json({ message: 'O endereço é obrigatório.' });
            }

            const parkings = await parkingService.getNearbyParkings(address);

            return res.status(200).json({ message: 'Estacionamentos encontrados!', parkings });
        } catch (error) {
            console.error('Erro ao buscar estacionamentos:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },


    async createReservation(req, res) {
        try {
            const { userId, parkingId } = req.body;

            if (!userId || !parkingId) {
                return res.status(400).json({ message: 'User ID e Parking ID são obrigatórios.' });
            }

            const reservation = await parkingService.createReservation(userId, parkingId);

            return res.status(200).json({ message: 'Reserva realizada com sucesso!', reservation });
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};


