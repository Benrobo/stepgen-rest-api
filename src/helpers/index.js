const { randomUUID } = require("crypto");
const bcryptjs = require("bcryptjs");

const genId = () => randomUUID();

const genHash = (string) => {
  return bcryptjs.hashSync(string, 10);
};

const compareHash = (string, hash) => {
  return bcryptjs.compareSync(string, hash);
};

module.exports = {
  genHash,
  compareHash,
  genId
}