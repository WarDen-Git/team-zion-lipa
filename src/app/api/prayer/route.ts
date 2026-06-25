import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, request, private: isPrivate } = body ?? {};

    if (!request) {
      return NextResponse.json(
        { error: "A prayer request is required." },
        { status: 400 },
      );
    }

    await sendNotification(
      `New prayer request${name ? ` from ${name}` : ""}`,
      `Name: ${name || "Anonymous"}\nEmail: ${email || "—"}\nPrivate: ${
        isPrivate === "yes" ? "Yes" : "No"
      }\n\n${request}`,
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("prayer route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
