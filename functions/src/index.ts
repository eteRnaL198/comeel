import { https } from "firebase-functions";
import { Client, Message, WebhookEvent } from "@line/bot-sdk";
import { apps } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const aidEvent = https.onRequest(async (req, res) => {
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
      text: "上記のIDをコピーして、こちらのサイトにアクセスしてください\nhttps://comeel.web.app",
    },
  ];
  const replyToken = events[0].replyToken;
  lineClient.replyMessage(replyToken, messages).catch((err) => {
    res.status(500).send(`Failed to reply message. Error: ${err}`);
  });

  // 新規ユーザーをデータベースに登録
  if (apps.length === 0) initializeApp();
  const db = getFirestore();
  const docRef = db.collection("users").doc(userId);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    await docRef.set({
      name: "匿名",
    });
  }

  res.send(userId);
  return;
});
