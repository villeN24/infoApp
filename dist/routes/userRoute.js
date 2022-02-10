"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//const router = express.Router();
const router = (0, express_1.Router)();
const unexpectedErr = `Serverside error occured.`;
const badReqErr = `Invalid request.`;
const database_1 = require("../database/database");
const jsonschema = __importStar(require("jsonschema"));
const validator = new jsonschema.Validator();
const schema = {
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
router.get(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allLocations = yield database_1.connectionFunctions.findAll();
        res.status(200).send(allLocations);
    }
    catch (_a) {
        res.status(500).send({
            msg: unexpectedErr,
        });
    }
}));
/**
 * Router function to get one item with given id from table.
 */
router.get(`/:id([0-9]+)`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    console.log(id);
    try {
        const foundLocation = yield database_1.connectionFunctions.findById(id);
        if (foundLocation !== null) {
            res.status(200).send(foundLocation);
        }
        else {
            res.status(404).send({
                msg: "Cannot find resource with ID of " + id + ".",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            msg: unexpectedErr,
        });
    }
}));
/**
 * Router function to delete item with given id from table.
 */
router.delete(`/:id([0-9]+)`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const foundLocation = yield database_1.connectionFunctions.findById(id);
        if (foundLocation !== null) {
            yield database_1.connectionFunctions.deleteById(id);
            res.status(204).send();
        }
        else {
            res.status(404).send({
                msg: "Cannot find resource with ID of " + id + ".",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            msg: unexpectedErr,
        });
    }
}));
router.post(`/`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = validator.validate(req.body.payload, schema);
        if (validation.errors.length > 0) {
            res.status(400).send(badReqErr);
        }
        else {
            yield database_1.connectionFunctions.save(req.body.payload.fName, req.body.payload.lName, req.body.payload.age);
            res.status(201).send();
        }
    }
    catch (err) {
        res.status(500).send({
            msg: badReqErr,
        });
    }
}));
router.patch(`/:id([0-9]+)`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const foundLocation = yield database_1.connectionFunctions.findById(id);
        if (foundLocation != null) {
            const validation = validator.validate(req.body.payload, schema);
            if (validation.errors.length > 0) {
                res.status(400).send(badReqErr);
            }
            else {
                yield database_1.connectionFunctions.editEntry(id, req.body.payload.fName, req.body.payload.lName, req.body.payload.age);
                res.status(200).send();
            }
        }
        else {
            res.status(404).send({
                msg: "Cannot find resource with ID of " + id + ".",
            });
        }
    }
    catch (err) {
        res.status(500).send({
            msg: unexpectedErr,
        });
    }
}));
exports.default = router;
//# sourceMappingURL=userRoute.js.map