const db = require('../../config/db');
const bcrypt = require('bcrypt');

const createUser = async ({ name, cpf, email, password, carLicensePlate, phone, address, carModel, carBrand, carYear, cnhNumber }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO driver_users (name, cpf, email, password, car_license_plate, phone, address, car_model, car_brand, car_year, cnh_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, cpf, email, hashedPassword, carLicensePlate, phone, address, carModel, carBrand, carYear, cnhNumber]
  );
  return { id: result.insertId, name, cpf, email, carLicensePlate, phone, address, carModel, carBrand, carYear, cnhNumber };
};

const loginUser = async (email, password) => {
  const result = await db.query('SELECT * FROM driver_users WHERE email = ?', [email]);
  if (result.length > 0) {
    const user = result[0];
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (isPasswordValid) {
      return { id: user.id, name: user.name, email: user.email, carLicensePlate: user.car_license_plate };
    }
  }
  return null;
};


module.exports = {
  createUser,
  loginUser,

};


