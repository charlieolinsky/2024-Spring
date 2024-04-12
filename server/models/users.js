const fs = require("fs/promises");

const fileName = __dirname + "/../data/users.json";

/** @type { Promise< { items: User[] } > } */
const dataP = fs
  .access(fileName, fs.constants.F_OK)
  .then(() => fs.readFile(fileName, "utf8"))
  .then((content) => JSON.parse(content))
  .catch((err) => {
    console.error(err);
  });

async function save() {
  const data = await dataP;
  return fs.writeFile(fileName, JSON.stringify(data, null, 2));
}

/**
 * @typedef {import('../../client/src/model/users').User} User
 * */

/**
 * @returns {Promise<User[]>}
 * */
async function getAll() {
  const data = await dataP;
  return data.items.map((x) => ({
    ...x,
    password: undefined,
    bank: undefined,
    ssn: undefined,
  }));
}

/**
 * @param {number} id
 * @returns {Promise<User>}
 * */
async function get(id) {
  const data = await dataP;
  return data.items.find((item) => item.id == id);
}

/**
 * @param {string} q
 * @returns {Promise<User[]>}
 * */
async function search(q) {
  return (await getAll()).filter(
    (item) =>
      new RegExp(q, "i").test(item.firstName) ||
      new RegExp(q, "i").test(item.lastName) ||
      new RegExp(q, "i").test(item.email)
  );
}

/**
 * @param {User} user
 * @returns {Promise<User>}
 * */
async function add(user) {
  const data = await dataP;
  user.id = data.items.length + 1;
  data.items.push(user);
  console.log("2: About to save");

  try {
    await save();
    console.log("3: Saved");
  } catch (error) {
    console.error(error);
  }

  console.log("4: About to return user");
  return user;
}

/**
 * @param {User} user
 * @returns {Promise<User>}
 * */
async function update(user) {
  const data = await dataP;
  const index = data.items.findIndex((item) => item.id == user.id);
  if (index >= 0) {
    data.items[index] = {
      ...data.items[index],
      ...user,
    };
    await save().catch(console.error);
    return user;
  }
  return null;
}

/**
 * @param {number} id
 * @returns {Promise<User | null>}
 * */
async function remove(id) {
  const data = await dataP;
  const index = data.items.findIndex((item) => item.id == id);
  if (index >= 0) {
    const deleted = data.items.splice(index, 1);
    await save().catch(console.error);
    return deleted[0];
  }
  return null;
}

module.exports = {
  getAll,
  get,
  search,
  add,
  update,
  remove,
};
