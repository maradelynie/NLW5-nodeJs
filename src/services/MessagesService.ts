import { getCustomRepository, Repository } from "typeorm";
import { Messages } from "../entities/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessagesCreate {
    admin_id?: string;
    user_id: string;
    text: string;
}
interface IMessagesFindById {
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Messages>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
    async create({text, user_id, admin_id}:IMessagesCreate) {
    
        const messages = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        })
    
        await this.messagesRepository.save(messages);
        
        return messages
    }
    async findById({user_id}:IMessagesFindById) {
      
        const list = this.messagesRepository.find({
            where: {user_id},
            relations: ["user"]
        })
    
        return list
    }
}

export {MessagesService}