import prisma from "@/lib/prisma";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: NextRequest) {
  try {
    // Clerk から送られたヘッダーの取得
    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new NextResponse("Missing svix headers.", { status: 400 });
    }

    // Clerk から送られたリクエストボディ取得
    const payload = await req.text();
    const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!secret) {
      return new NextResponse("Webhook secret not configured.", {
        status: 500,
      });
    }

    const wh = new Webhook(secret);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return new NextResponse("Invalid signature.", { status: 400 });
    }

    const eventType = evt.type;
    const { username, email_addresses, id, image_url } = evt.data as UserJSON;
    // イベントの種類ごとに処理を分岐
    switch (eventType) {
      case "user.created":
        await prisma.user.create({
          data: {
            id: id,
            name: username as string,
            email: email_addresses[0].email_address,
            clerkId: id as string,
            image: image_url,
          },
        });

        break;
      case "user.updated":
        console.log("User updated:", evt.data.id);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new NextResponse("Webhook processed.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
