import ClientService from "../services/client.service.js";

const clientService = new ClientService();

class ClientController {
  createClient = async (req, res) => {
    const body = req.body;
    try {
      const client = await clientService.create(body);

      return res.status(201).send(client);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  findAllClients = async (req, res) => {
    try {
      const clients = await clientService.findAll();

      return res.send(clients);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  findClientById = async (req, res) => {
    const { id: clientId } = req.params;
    const clientIdLogged = req.clientId;

    try {
      const client = await clientService.findById(clientId, clientIdLogged);

      return res.send(client);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  updateClient = async (req, res) => {
    const body = req.body;
    const { id: clientId } = req.params;

    try {
      const response = await clientService.update(body, clientId);

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  deleteClient = async (req, res) => {
    const { id: clientId } = req.params;
    try {
      const client = await clientService.excludes(clientId);

      return res.send(client);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

export default ClientController;
