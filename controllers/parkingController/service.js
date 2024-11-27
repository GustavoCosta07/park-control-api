const db = require("../../config/db");

const getNearbyParkings = async (address) => {
  // Aqui você pode adicionar a lógica para calcular a distância entre os estacionamentos e o endereço informado
  // Por agora, vamos apenas retornar todos os estacionamentos para simplificar
  const result = await db.query("SELECT * FROM parkings");
  return result[0];
};

const createReservation = async (userId, parkingId) => {
  const result = await db.query(
    'INSERT INTO reservations (user_id, parking_id) VALUES (?, ?)',
    [userId, parkingId]
  );
  // Atualizar o número de vagas disponíveis no estacionamento
  await db.query('UPDATE parkings SET available_spots = available_spots - 1 WHERE id = ?', [parkingId]);
  
  // Obter o endereço do estacionamento
  const [parking] = await db.query('SELECT address FROM parkings WHERE id = ?', [parkingId]);
  
  return { reservationId: result.insertId, address: parking.address };
};



module.exports = {
  getNearbyParkings,
  createReservation
};
