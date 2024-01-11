import { Request, Response } from 'express';
import { Character, ICharacter } from '../models/character';

const characterController = {
  getCharacters: async (req: Request, res: Response): Promise<void> => {
    try {
      const name = typeof req.query.name === 'string' ? req.query.name : undefined;
      const query = name ? { name: new RegExp(name, 'i') } : {};

      const allCharacters = await Character.find(query);
      res.json(allCharacters);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },


  getCharacter: async (req: Request, res: Response): Promise<void> => {
    try {
      const foundCharacter = await Character.findOne({ name: req.params.name });
      if (foundCharacter) {
        res.json(foundCharacter);
      } else {
        res.status(404).send({ message: "Character Not Found!" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  createCharacter: async (req: Request, res: Response): Promise<void> => {
    try {
      const characterData: ICharacter = req.body;
      const newCharacter = await Character.create(characterData);
      res.status(201).json(newCharacter);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCharacter: async (req: Request, res: Response): Promise<void> => {
    try {
      const characterUpdate = await Character.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (characterUpdate) {
        res.json(characterUpdate);
      } else {
        res.status(404).send({ message: "Character Not Found!" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCharacter: async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
      if (deletedCharacter) {
        res.status(200).json({ message: "Character deleted successfully" });
      } else {
        res.status(404).send({ message: "Character Not Found!" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default characterController;
