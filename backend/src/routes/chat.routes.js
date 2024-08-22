import { Router } from 'express';
import { findOrCreateChat, getMessages, saveMessage } from '../controllers/chat.controller.js';

const routerChat = Router();

routerChat.post('/create_or_join', findOrCreateChat);
routerChat.get('/:chat_id/messages', getMessages);
routerChat.post('/:chat_id/messages', saveMessage);

export default routerChat;
