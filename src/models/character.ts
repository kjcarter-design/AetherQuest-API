import mongoose, { Document, Schema } from 'mongoose';

export interface ICharacter extends Document {
  name: string;
  race: string;
  class: string;
  level: number;
  actions: number;
  bonusActions: number;
  armor: {
    type: string;
    ac: number;
    category: string;
    stealthDisadvantage: boolean;
    cost: { quantity: number; unit: string };
  };
  magicItem: {
    type: string;
    rarity: { name: string };
    description: string;
    cost: { quantity: number; unit: string };
  };
  meleeWeapon: {
    name: string;
    damage: string;
    description: string;
    cost: { quantity: number; unit: string };
  };
  shield: {
    name: string;
    acBonus: number;
    cost: { quantity: number; unit: string };
  };
  rangedWeapon: {
    name: string;
    damage: string;
    range: { normal: number; long: number };
    cost: { quantity: number; unit: string };
  };
  cantrip: [
    {
      name: string;
      description: string;
    }
  ];
  inventory: any[];
  attachedGames: any[];
  image: string;
}

const characterSchema: Schema = new Schema({
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

export const Character = mongoose.model<ICharacter>('Character', characterSchema);
