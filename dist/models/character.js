"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const characterSchema = new mongoose_1.Schema({
    name: { type: String, required: true, minlength: 1 },
    race: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, default: 1 },
    actions: { type: Number, default: 1 },
    bonusActions: { type: Number, default: 1 },
    armor: {
        type: { type: String },
        ac: Number,
        category: String,
        stealthDisadvantage: Boolean,
        cost: { quantity: Number, unit: String }
    },
    magicItem: {
        type: { type: String },
        rarity: {
            name: String
        },
        description: String,
        cost: { quantity: Number, unit: String }
    },
    meleeWeapon: {
        name: String,
        damage: String,
        description: String,
        cost: { quantity: Number, unit: String }
    },
    shield: {
        name: String,
        acBonus: Number,
        cost: { quantity: Number, unit: String }
    },
    rangedWeapon: {
        name: String,
        damage: String,
        range: { normal: Number, long: Number },
        cost: { quantity: Number, unit: String }
    },
    cantrip: [
        {
            name: String,
            description: String
        }
    ],
    inventory: { type: Array, default: [] },
    attachedGames: { type: Array, default: [] },
    image: { type: String }
});
exports.Character = mongoose_1.default.model('Character', characterSchema);
