import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Process contact form message (e.g. log or save to DB)
    console.log("Contact submission received:", { name, email, subject, message });

    return NextResponse.json(
      { success: true, message: "Thank you for your inquiry. Message received." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
