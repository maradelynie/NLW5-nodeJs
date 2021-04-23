import { Request, Response} from "express"
import {MessagesService} from "../services/MessagesService"

class MessagesController {
    async create( req : Request, res : Response ) {
        const {user_id, admin_id, text} = req.body;
        const messagesService = new MessagesService();
    
        try{
            const messages = await messagesService.create({
                user_id, 
                admin_id,
                text
            });
            return res.json(messages);

        }catch(error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
    async findById( req : Request, res : Response ) {
        const {user_id} = req.params;
        const messagesService = new MessagesService();
        
        try{
            const list = await messagesService.findById({
                user_id,
            });
            return res.json(list);

        }catch(error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export { MessagesController }; 