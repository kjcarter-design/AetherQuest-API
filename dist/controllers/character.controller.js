"use strict";
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
const character_1 = require("../models/character");
const characterController = {
    getCharacters: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const name = typeof req.query.name === 'string' ? req.query.name : undefined;
            const query = name ? { name: new RegExp(name, 'i') } : {};
            const allCharacters = yield character_1.Character.find(query);
            res.json(allCharacters);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    getCharacter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const foundCharacter = yield character_1.Character.findOne({ name: req.params.name });
            if (foundCharacter) {
                res.json(foundCharacter);
            }
            else {
                res.status(404).send({ message: "Character Not Found!" });
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    createCharacter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characterData = req.body;
            const newCharacter = yield character_1.Character.create(characterData);
            res.status(201).json(newCharacter);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    updateCharacter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characterUpdate = yield character_1.Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (characterUpdate) {
                res.json(characterUpdate);
            }
            else {
                res.status(404).send({ message: "Character Not Found!" });
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }),
    deleteCharacter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deletedCharacter = yield character_1.Character.findByIdAndDelete(req.params.id);
            if (deletedCharacter) {
                res.status(200).json({ message: "Character deleted successfully" });
            }
            else {
                res.status(404).send({ message: "Character Not Found!" });
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
};
exports.default = characterController;
