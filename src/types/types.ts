export interface LoginProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}
export interface LoginForm {
  idInstance: string;
  apiTokenInstance: string;
}
export interface SenderData {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
    senderContactName: string;
  }
  
  export interface TextMessageData {
    textMessage: string;
  }
  
  export interface MessageData {
    typeMessage: string;
    textMessageData: TextMessageData;
  }
  
  export interface InstanceData {
    idInstance: number;
    wid: string;
    typeInstance: string;
  }
  
  export interface NotificationBody {
    typeWebhook: string;
    instanceData: InstanceData;
    timestamp: number;
    idMessage: string;
    senderData: SenderData;
    messageData: MessageData;
  }
  
  export interface ReceiveNotificationResponse {
    receiptId: number;
    body: NotificationBody;
  }
  
  export interface SendMessageProps {
    idInstance: string;
    apiTokenInstance: string;
  }
  
  export interface Message {
    text: string;
    isIncoming: boolean;
    sender?: string;
  }