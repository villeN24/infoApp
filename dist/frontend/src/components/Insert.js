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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const React = __importStar(require("react"));
const react_1 = require("react");
require("../App.css");
const Insert = ({ refreshList }) => {
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [age, setAge] = (0, react_1.useState)("");
    const insertInfo = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        let dataPacket = {
            fName: firstName,
            lName: lastName,
            age: age,
        };
        setFirstName("");
        setLastName("");
        setAge("");
        yield axios_1.default.post(`/users`, {
            payload: dataPacket,
        });
        refreshList();
    });
    return (React.createElement("div", { id: "insertContainer" },
        React.createElement("form", { onSubmit: insertInfo },
            React.createElement("input", { onChange: (e) => setFirstName(e.target.value), type: "text", id: "fname", value: firstName, placeholder: "First name" }),
            React.createElement("input", { onChange: (e) => setLastName(e.target.value), type: "text", id: "lname", value: lastName, placeholder: "Last name" }),
            React.createElement("input", { onChange: (e) => setAge(Number(e.target.value)), type: "number", id: "age", value: age, placeholder: "Age" }),
            React.createElement("button", { type: "submit" }, "Submit"))));
};
exports.default = Insert;
//# sourceMappingURL=Insert.js.map