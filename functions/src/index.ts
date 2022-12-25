import { https } from "firebase-functions";
import { Client, Message, WebhookEvent } from "@line/bot-sdk";

export const aidEvent = https.onRequest((req, res) => {
  if (req.method !== "POST") {
    res.status(200).send("Not POST method.");
    return;
  }
  const events = req.body.events as WebhookEvent[];
  if (!events.length) {
    res.status(200).send("No events.");
    return;
  }
  if (
    events[0].type !== "message" ||
    events[0].source.type !== "user" ||
    events[0].message.type !== "text" ||
    events[0].message.text !== "支援する"
  ) {
    res.status(200).send("Not aid event.");
    return;
  }

  // ユーザーID、支援サイトへのURLを返信
  const lineClient = new Client({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.LINE_CHANNEL_SECRET as string,
  });
  const userId = events[0].source.userId;
  const messages: Message[] = [
    {
      type: "text",
      text: userId,
    },
    {
      type: "text",
      text: "上記のIDをコピーして、こちらのサイトにアクセスしてください\nhttps://sdpbl-tak-4c7ea.web.app/",
    },
  ];
  const replyToken = events[0].replyToken;
  lineClient.replyMessage(replyToken, messages).catch((err) => {
    res.status(500).send(`Failed to reply message. Error: ${err}`);
  });

  // データベースに追加
  // 既にあったらスルー

  res.send(userId);
  return;
});
