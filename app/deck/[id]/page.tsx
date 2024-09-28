"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Layout from "@/components/ui/layout";
import { useQuery } from "@tanstack/react-query";
import { Deck, Card as FlashCard } from "@/types/deck";

async function fetchDeck(id: string): Promise<Deck> {
  const response = await fetch(`/api/deck/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch deck");
  }
  return response.json();
}

export default function DeckView() {
  const params = useParams();
  const id = params.id as string;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const {
    data: deck,
    isLoading,
    error,
  } = useQuery<Deck>({
    queryKey: ["deck", id],
    queryFn: () => fetchDeck(id),
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        navigateCards(-1);
      } else if (event.key === "ArrowRight") {
        navigateCards(1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCardIndex, deck?.cards.length]);

  const navigateCards = (direction: number) => {
    if (!deck) return;
    setCurrentCardIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return deck.cards.length - 1;
      if (newIndex >= deck.cards.length) return 0;
      return newIndex;
    });
  };

  const renderCardContent = (card: FlashCard) => {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
        {card.type === "text" && <p className="text-lg mb-4">{card.text}</p>}
        {card.type === "image" && (
          <>
            <Image
              src={card.url || ""}
              alt={card.title || "Flashcard image"}
              width={300}
              height={200}
              className="w-auto h-[200px] object-contain mb-4"
            />
            {card.text && <p className="text-lg mb-4">{card.text}</p>}
          </>
        )}
        {card.type === "video" && (
          <>
            <video src={card.url} controls className="max-w-full h-auto mb-4" />
            {card.text && <p className="text-lg mb-4">{card.text}</p>}
          </>
        )}
        {card.type === "audio" && (
          <>
            <audio src={card.url} controls className="w-full mb-4" />
            {card.text && <p className="text-lg mb-4">{card.text}</p>}
          </>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center mt-8">Loading...</div>
      </Layout>
    );
  }

  if (error || !deck) {
    return (
      <Layout>
        <div className="text-center mt-8">Error loading deck</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Deck: {deck.title}</h1>
        <div className="flex flex-col items-center">
          <Card className="w-full max-w-2xl min-h-64 flex items-center justify-center mb-4 p-4">
            <CardContent>
              {renderCardContent(deck.cards[currentCardIndex])}
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            Card {currentCardIndex + 1} of {deck.cards.length}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Button onClick={() => navigateCards(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button onClick={() => navigateCards(1)}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
