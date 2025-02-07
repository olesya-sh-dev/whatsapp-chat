/* eslint-disable no-unused-vars */
export type LoginProps = {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
};
export type LoginForm = {
  idInstance: string;
  apiTokenInstance: string;
};
export type SenderData = {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
  senderContactName: string;
};

export type TextMessageData = {
  textMessage: string;
};

export type MessageData = {
  typeMessage: string;
  textMessageData: TextMessageData;
};

export type ReceiveNotificationResponse = {
  receiptId: number;
  body: NotificationBody;
};

export type SendMessageProps = {
  idInstance: string;
  apiTokenInstance: string;
};

export type Message = {
  text: string;
  isIncoming: boolean;
  sender?: string;
};

type InstanceData = {
  idInstance: number;
  wid: string;
  typeInstance: string;
};

type NotificationBody = {
  typeWebhook: string;
  instanceData: InstanceData;
  timestamp: number;
  idMessage: string;
  senderData: SenderData;
  messageData: MessageData;
};
