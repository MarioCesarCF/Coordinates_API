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

export default { create };