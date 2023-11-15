import { IEducatorController } from "../types/IeducatorController";
import { Request,Response } from 'express';
import {Educator} from "../models/educatorModel";

class EducatorController implements IEducatorController {
    //TODO: add try-tach
    async getEducators(_req: Request, res:Response){
        const educators=await Educator.find();
        res.status(200).json({ data: educators});
    }

    async getEducatorById(_req: Request, res:Response){
        res.status(200).json({ message: "getEducatorById" });
    }

    async createEducator(_req: Request, res:Response){
        res.status(200).json({ message: "createEducator" });
    }

    async updateEducator(_req: Request, res:Response){
        res.status(200).json({ message: "updateEducator" });
    }

    async deleteEducator(_req: Request, res:Response){
        res.status(200).json({ message: "deleteEducator" });
    }
}

export const educatorController = new EducatorController();