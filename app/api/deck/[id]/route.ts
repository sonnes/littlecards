import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Deck } from "@/types/deck";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const filePath = path.join(process.cwd(), "data", "decks", `${id}.json`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const deck: Deck = JSON.parse(fileContents);
    return NextResponse.json(deck);
  } catch (error) {
    return NextResponse.json({ error: "Deck not found" }, { status: 404 });
  }
}
