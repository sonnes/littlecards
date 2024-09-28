import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Deck } from "@/types/deck";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "decks");
  const files = await fs.readdir(filePath);
  const decks = await Promise.all(
    files.map(async (file) => {
      const fileContents = await fs.readFile(path.join(filePath, file), "utf8");
      return JSON.parse(fileContents);
    })
  );

  return NextResponse.json(decks);
}
