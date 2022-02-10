import { Router } from "express";
//const router = express.Router();
const router: Router = Router();
const unexpectedErr = `Serverside error occured.`;
const badReqErr = `Invalid request.`;
import { connectionFunctions } from "../database/database";
import * as jsonschema from "jsonschema";
const validator = new jsonschema.Validator();

const schema: object = {
  type: "object",
  properties: {
    fName: {
      type: "string",
      minLength: 1,
      maxLength: 40,
    },
    lName: {
      type: "string",
      minLength: 1,
      maxLength: 60,
    },
    age: {
      type: "integer",
      exclusiveMinimum: 0,
    },
    required: ["fName", "lName", "age"],
  },
};

router.use((req, res, next) => {
  console.log(`Logged at route`);
  next();
});

/**
 * Router function to get all from table.
 */
router.get(`/`, async (req, res) => {
  try {
    const allLocations = await connectionFunctions.findAll();
    res.status(200).send(allLocations);
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
/**
 * Router function to get one item with given id from table.
 */
router.get(`/:id([0-9]+)`, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const foundLocation = await connectionFunctions.findById(id);
    if (foundLocation !== null) {
      res.status(200).send(foundLocation);
    } else {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + id + ".",
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
/**
 * Router function to delete item with given id from table.
 */
router.delete(`/:id([0-9]+)`, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const foundLocation = await connectionFunctions.findById(id);
    if (foundLocation !== null) {
      await connectionFunctions.deleteById(id);
      res.status(204).send();
    } else {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + id + ".",
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
router.post(`/`, async (req, res) => {
  try {
    const validation = validator.validate(req.body.payload, schema);
    if (validation.errors.length > 0) {
      res.status(400).send(badReqErr);
    } else {
      await connectionFunctions.save(
        req.body.payload.fName,
        req.body.payload.lName,
        req.body.payload.age
      );
      res.status(201).send();
    }
  } catch (err) {
    res.status(500).send({
      msg: badReqErr,
    });
  }
});
router.patch(`/:id([0-9]+)`, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const foundLocation = await connectionFunctions.findById(id);
    if (foundLocation != null) {
      const validation = validator.validate(req.body.payload, schema);
      if (validation.errors.length > 0) {
        res.status(400).send(badReqErr);
      } else {
        await connectionFunctions.editEntry(
          id,
          req.body.payload.fName,
          req.body.payload.lName,
          req.body.payload.age
        );
        res.status(200).send();
      }
    } else {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + id + ".",
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
export default router;
