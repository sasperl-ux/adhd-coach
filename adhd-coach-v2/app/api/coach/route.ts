import { NextResponse } from "next/server";
import { generateCoachReply } from "@/lib/coach/coach-engine";
import { coachRequestSchema } from "@/lib/validations/coach";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = coachRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Messaggio non valido. Scrivi una richiesta breve legata a organizzazione, routine, studio o attività." }, { status: 400 });
  }
  return NextResponse.json(generateCoachReply(parsed.data));
}
