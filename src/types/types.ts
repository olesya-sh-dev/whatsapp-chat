/* eslint-disable no-unused-vars */
export type ResponseData = {
  idInstance: string;
  apiTokenInstance: string;
};
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
  id: string;
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

// {
//   "receiptId": 19,
//   "body": {
//       "typeWebhook": "outgoingAPIMessageReceived",
//       "instanceData": {
//           "idInstance": 7105186102,
//           "wid": "375297606025@c.us",
//           "typeInstance": "whatsapp"
//       },
//       "timestamp": 1738958171,
//       "idMessage": "BAE5545A97CEACD5",
//       "senderData": {
//           "chatId": "375447538843@c.us",
//           "chatName": "Victor Shalay",
//           "sender": "375297606025@c.us",
//           "senderName": "",
//           "senderContactName": "Olesya"
//       },
//       "messageData": {
//           "typeMessage": "extendedTextMessage",
//           "extendedTextMessageData": {
//               "text": "привет",
//               "description": "",
//               "title": "",
//               "previewType": "None",
//               "jpegThumbnail": "",
//               "forwardingScore": 0,
//               "isForwarded": false
//           }
//       }
//   }
// }

// {
//   "receiptId": 20,
//   "body": {
//       "typeWebhook": "incomingMessageReceived",
//       "instanceData": {
//           "idInstance": 7105186102,
//           "wid": "375297606025@c.us",
//           "typeInstance": "whatsapp"
//       },
//       "timestamp": 1738958176,
//       "idMessage": "EC713664173A3CC07EAA8B211BEC7E6E",
//       "senderData": {
//           "chatId": "375447538843@c.us",
//           "chatName": "Victor Shalay",
//           "sender": "375447538843@c.us",
//           "senderName": "Victor Shalay",
//           "senderContactName": "Витечка"
//       },
//       "messageData": {
//           "typeMessage": "textMessage",
//           "textMessageData": {
//               "textMessage": "Hello"
//           }
//       }
//   }
// }
