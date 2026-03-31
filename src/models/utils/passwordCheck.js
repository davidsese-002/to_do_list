const axios = require("axios");
const crypto = require("crypto");

async function isBreached(password) {
  const sha1 = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  const res = await axios.get(
    `https://api.pwnedpasswords.com/range/${prefix}`
  );

  return res.data.includes(suffix);
}

module.exports = { isBreached };