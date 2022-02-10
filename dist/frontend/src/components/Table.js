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
const react_1 = __importStar(require("react"));
require("../App.css");
const axios_1 = __importDefault(require("axios"));
const Insert_1 = __importDefault(require("./Insert"));
const UserRow_1 = __importDefault(require("./UserRow"));
const topColor = "#36304a";
const hlColor = "gray";
function Table() {
    const [list, setList] = (0, react_1.useState)([]);
    const [refresh, setRefresh] = (0, react_1.useState)(false);
    const [helper, setHelper] = (0, react_1.useState)(true);
    const [sort, setSort] = (0, react_1.useState)(false);
    const [ageFlip, setAgeFlip] = (0, react_1.useState)();
    const [idFlip, setIdFlip] = (0, react_1.useState)();
    const [fNameFlip, setFNameFlip] = (0, react_1.useState)();
    const [lNameFlip, setLNameFlip] = (0, react_1.useState)();
    const [idStyle, setIdStyle] = (0, react_1.useState)({
        backgroundColor: topColor,
        icon: null,
    });
    const [fNameStyle, setFNameStyle] = (0, react_1.useState)({
        backgroundColor: topColor,
        icon: null,
    });
    const [lNameStyle, setLNameStyle] = (0, react_1.useState)({
        backgroundColor: topColor,
        icon: null,
    });
    const [ageStyle, setAgeStyle] = (0, react_1.useState)({
        backgroundColor: topColor,
        icon: null,
    });
    /**
     * Refreshes the rendered list when something is changed from child.
     */
    const refreshList = () => {
        setRefresh(!refresh);
    };
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            if (refresh !== helper) {
                let response = yield axios_1.default.get(`/users`);
                setList(response.data);
                setHelper(refresh);
            }
        });
        fetchData();
    }, [refresh, sort]);
    const sortByID = () => {
        let tmp = list;
        if (idFlip !== true) {
            setIdStyle({ backgroundColor: hlColor, icon: "\u23F6" });
            tmp.sort((a, b) => {
                return a.id - b.id;
            });
        }
        else {
            setIdStyle({ backgroundColor: hlColor, icon: "\u23F7" });
            tmp.sort((a, b) => {
                return b.id - a.id;
            });
        }
        setIdFlip(!idFlip);
        setList(tmp);
        setSort(!sort);
        setAgeFlip(false);
        setFNameStyle({ backgroundColor: topColor, icon: null });
        setLNameStyle({ backgroundColor: topColor, icon: null });
        setAgeStyle({ backgroundColor: topColor, icon: null });
    };
    const sortByAge = () => {
        let tmp = list;
        if (ageFlip !== true) {
            setAgeStyle({ backgroundColor: hlColor, icon: "\u23F6" });
            tmp.sort((a, b) => {
                return a.age - b.age;
            });
        }
        else {
            setAgeStyle({ backgroundColor: hlColor, icon: "\u23F7" });
            tmp.sort((a, b) => {
                return b.age - a.age;
            });
        }
        setAgeFlip(!ageFlip);
        setList(tmp);
        setSort(!sort);
        setIdFlip(false);
        setFNameStyle({ backgroundColor: topColor, icon: null });
        setLNameStyle({ backgroundColor: topColor, icon: null });
        setIdStyle({ backgroundColor: topColor, icon: null });
    };
    const sortByName = (firstName) => {
        let tmp = list;
        if (firstName === true) {
            tmp.sort((a, b) => {
                let fa;
                let fb;
                if (fNameFlip !== true) {
                    setFNameStyle({ backgroundColor: hlColor, icon: "\u23F6" });
                    fa = a.fName.toLowerCase();
                    fb = b.fName.toLowerCase();
                }
                else {
                    setFNameStyle({ backgroundColor: hlColor, icon: "\u23F7" });
                    fa = b.fName.toLowerCase();
                    fb = a.fName.toLowerCase();
                }
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            setLNameStyle({ backgroundColor: topColor, icon: null });
            setLNameFlip(false);
            setFNameFlip(!fNameFlip);
        }
        if (firstName === false) {
            tmp.sort((a, b) => {
                let fa;
                let fb;
                if (lNameFlip !== true) {
                    setLNameStyle({ backgroundColor: hlColor, icon: "\u23F6" });
                    fa = a.lName.toLowerCase();
                    fb = b.lName.toLowerCase();
                }
                else {
                    setLNameStyle({ backgroundColor: hlColor, icon: "\u23F7" });
                    fa = b.lName.toLowerCase();
                    fb = a.lName.toLowerCase();
                }
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            setFNameStyle({ backgroundColor: topColor, icon: null });
            setFNameFlip(false);
            setLNameFlip(!lNameFlip);
        }
        setList(tmp);
        setSort(!sort);
        setAgeFlip(false);
        setIdFlip(false);
        setIdStyle({ backgroundColor: topColor, icon: null });
        setAgeStyle({ backgroundColor: topColor, icon: null });
    };
    return (react_1.default.createElement("div", { id: "container" },
        react_1.default.createElement("div", { id: "table" },
            react_1.default.createElement("table", null,
                react_1.default.createElement("tbody", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { id: "left", style: idStyle, onClick: () => sortByID() },
                            "ID ",
                            idStyle.icon),
                        react_1.default.createElement("th", { style: fNameStyle, onClick: () => sortByName(true) },
                            "First name ",
                            fNameStyle.icon),
                        react_1.default.createElement("th", { style: lNameStyle, onClick: () => sortByName(false) },
                            "Last name ",
                            lNameStyle.icon),
                        react_1.default.createElement("th", { style: ageStyle, onClick: () => sortByAge() },
                            "age ",
                            ageStyle.icon),
                        react_1.default.createElement("th", { id: "right" })),
                    list.map((id) => (react_1.default.createElement(UserRow_1.default, { key: id.id, id: id.id, fName: id.fName, lName: id.lName, age: id.age, refreshList: refreshList }))))),
            react_1.default.createElement("div", { id: "insert" },
                react_1.default.createElement(Insert_1.default, { refreshList: refreshList })))));
}
exports.default = Table;
//# sourceMappingURL=Table.js.map