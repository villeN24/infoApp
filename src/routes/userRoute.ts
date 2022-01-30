import { Router } from "express";
//const router = express.Router();
const router: Router = Router();
const unexpectedErr = `Serverside error occured.`;
import { connectionFunctions } from "../database/database";

/**
 * Router function to get all from table.
 *
 * Directs http get query from it´s url to fetch
 * everything from a database, and returns them.
 */
router.get(`/`, async (req, res) => {
  let allLocations;
  try {
    allLocations = await connectionFunctions.findAll();
    res.status(200).send(allLocations);
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});

export default router;
