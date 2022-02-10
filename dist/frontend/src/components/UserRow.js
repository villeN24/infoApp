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
const UserRow = ({ id, fName, lName, age, refreshList }) => {
    const [edit, setEdit] = (0, react_1.useState)(true);
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [varAge, setVarAge] = (0, react_1.useState)(0);
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Delete user with ID: ${id}`);
        yield axios_1.default.delete(`http://localhost:8080/users/${id}`);
        refreshList();
    });
    const handleEdit = () => __awaiter(void 0, void 0, void 0, function* () {
        setEdit(!edit);
    });
    const handleChange = (e) => {
        if (e.target.id === "fname") {
            setFirstName(e.target.value);
        }
        if (e.target.id === "lname") {
            setLastName(e.target.value);
        }
        if (e.target.id === "age") {
            setVarAge(Number(e.target.value));
        }
        console.log(firstName, lastName, varAge);
    };
    const insertInfo = () => __awaiter(void 0, void 0, void 0, function* () {
        let dataPacket = {
            fName: firstName,
            lName: lastName,
            age: varAge,
        };
        let response = yield axios_1.default.patch(`/users/${id}`, {
            payload: dataPacket,
        });
        console.log(response);
        setEdit(!edit);
        refreshList();
    });
    return (React.createElement("tr", null,
        React.createElement("td", null,
            id,
            " "),
        edit ? (React.createElement("td", null, fName)) : (React.createElement("td", null,
            React.createElement("input", { onChange: handleChange, type: "text", id: "fname", placeholder: "First name" }))),
        edit ? (React.createElement("td", null, lName)) : (React.createElement("td", null,
            React.createElement("input", { onChange: handleChange, type: "text", id: "lname", placeholder: "Last name" }))),
        edit ? (React.createElement("td", null, age)) : (React.createElement("td", null,
            React.createElement("input", { onChange: handleChange, type: "number", id: "age", placeholder: "Age" }))),
        edit ? (React.createElement("td", null,
            React.createElement("button", { className: "top", onClick: () => handleDelete() }, "Delete user"),
            React.createElement("button", { onClick: () => handleEdit() }, "Edit user"))) : (React.createElement("td", null,
            React.createElement("button", { className: "top", onClick: () => insertInfo() }, "Submit user"),
            React.createElement("button", { onClick: () => handleEdit() }, "Cancel")))));
};
exports.default = UserRow;
//# sourceMappingURL=UserRow.js.map