import UserService from "../services/user.service.js";

const userService = new UserService();

class UserController {
  createUser = async (req, res) => {
    const body = req.body;
    try {
      const user = await userService.create(body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  findAllUsers = async (req, res) => {
    try {
      const users = await userService.findAll();

      return res.send(users);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  findUserById = async (req, res) => {
    const { id: userId } = req.params;
    const userIdLogged = req.userId;

    try {
      const user = await userService.findById(userId, userIdLogged);

      return res.send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  updateUser = async (req, res) => {
    const body = req.body;
    const { id: userId } = req.params;

    try {
      const response = await userService.update(body, userId);
      
      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    try {
      const user = await userService.excludes(userId);

      return res.send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

export default UserController;