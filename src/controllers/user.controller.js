import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, email, password, document, usertype } = req.body;

    if (!name || !email || !password || !document || !usertype) {
      res.status(400).send({ message: "Submit all fields for registration." });
    }

    const user = await userService.createService(req.body);

    if (!user) {
      return res.status(400).send({ message: "Error creating User." });
    }

    res.status(201).send({
      message: "User created successfully.",
      user: {
        id: user._id,
        name,
        email,
        document,
        usertype,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "There are no registered users." });
    }

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(500).send({message: error.message})
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password, document, usertype } = req.body;

    if (!name && !email && !password && !document && !usertype) {
      res.status(400).send({ message: "Submit one or more field for update!" });
    }

    const { id } = req;

    await userService.updateService(id, name, email, password, document, usertype);

    res.send({ message: "User successfully update!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const excludes = async (req, res) => {
  try {
    const { id } = req;

    await userService.deleteService(id);

    res.send({ message: "User successfully deleted!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { create, findAll, findById, update, excludes };