import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    await sendNotification(
      `New contact message from ${name}`,
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message}`,
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
