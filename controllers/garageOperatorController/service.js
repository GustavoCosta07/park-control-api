const db = require('../../config/db');
const bcrypt = require('bcrypt');

const createGaragista = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO garage_operator (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return { id: result.insertId, name, email };
};

const loginGaragista = async (email, password) => {
  const result = await db.query('SELECT * FROM garage_operator WHERE email = ?', [email]);
  if (result.length > 0) {
    const garagista = result[0];
    const isPasswordValid = await bcrypt.compare(password, garagista.password);
    if (isPasswordValid) {
      return { id: garagista.id, name: garagista.name, email: garagista.email };
    }
  }
  return null;
};

const createParking = async (parkingData) => {
  const result = await db.query(
    'INSERT INTO parkings (name, address, price_per_hour, price_per_minute, price_per_day, opening_time, closing_time, total_spots, available_spots) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [parkingData.name, parkingData.address, parkingData.price_per_hour, parkingData.price_per_minute, parkingData.price_per_day, parkingData.opening_time, parkingData.closing_time, parkingData.total_spots, parkingData.available_spots]
  );
  return { id: result.insertId, ...parkingData };
};

const updateParking = async (parkingId, parkingData) => {
  const result = await db.query(
    'UPDATE parkings SET name = ?, address = ?, price_per_hour = ?, price_per_minute = ?, price_per_day = ?, opening_time = ?, closing_time = ?, total_spots = ?, available_spots = ? WHERE id = ?',
    [parkingData.name, parkingData.address, parkingData.price_per_hour, parkingData.price_per_minute, parkingData.price_per_day, parkingData.opening_time, parkingData.closing_time, parkingData.total_spots, parkingData.available_spots, parkingId]
  );
  return result.affectedRows > 0;
};

const incrementSpot = async (parkingId) => {
  const result = await db.query(
    'UPDATE parkings SET available_spots = available_spots + 1 WHERE id = ? AND available_spots < total_spots',
    [parkingId]
  );
  return result.affectedRows > 0;
};

const decrementSpot = async (parkingId) => {
  const result = await db.query(
    'UPDATE parkings SET available_spots = available_spots - 1 WHERE id = ? AND available_spots > 0',
    [parkingId]
  );
  return result.affectedRows > 0;
};

const getReservations = async (parkingId) => {
  const result = await db.query(
    'SELECT * FROM reservations WHERE parking_id = ? AND status = "active"',
    [parkingId]
  );
  return result;
};

const confirmArrival = async (reservationId) => {
  const result = await db.query(
    'UPDATE reservations SET status = "confirmed" WHERE id = ? AND status = "active"',
    [reservationId]
  );
  return result.affectedRows > 0;
};

const confirmDeparture = async (reservationId, parkingId) => {
  const result = await db.query(
    'UPDATE reservations SET status = "completed" WHERE id = ? AND status = "confirmed"',
    [reservationId]
  );
  if (result.affectedRows > 0) {
    await incrementSpot(parkingId);
  }
  return result.affectedRows > 0;
};


module.exports = {
  createGaragista,
  loginGaragista,
  createParking,
  updateParking,
  incrementSpot,
  decrementSpot,
  getReservations,
  confirmArrival,
  confirmDeparture,
};
