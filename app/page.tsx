"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/ui/layout";

interface Deck {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  cardCount: number;
}

// In a real app, you would fetch decks from your API here
// For this example, we'll use mock data
const mockDecks: Deck[] = [
  {
    id: "top-car-brands",
    title: "JavaScript Basics",
    description: "Learn the fundamentals of JavaScript",
    coverImage: "/placeholder.svg?height=100&width=200",
    cardCount: 20,
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Master React Hooks",
    coverImage: "/placeholder.svg?height=100&width=200",
    cardCount: 15,
  },
  {
    id: "3",
    title: "CSS Flexbox",
    description: "Understand CSS Flexbox layout",
    coverImage: "/placeholder.svg?height=100&width=200",
    cardCount: 10,
  },
];
export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [decks, setDecks] = useState<Deck[]>(mockDecks);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setDecks(
      mockDecks.filter((deck) =>
        deck.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <div className="bg-accent">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Little Cards</h1>
          <p className="text-xl">
            Create, study, and master any subject with our interactive
            flashcards.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Explore Decks</h2>
        <Input
          type="search"
          placeholder="Search for decks..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <Link href={`/deck/${deck.id}`} key={deck.id}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src={deck.coverImage}
                    alt={deck.title}
                    width={200}
                    height={100}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{deck.title}</CardTitle>
                  <CardDescription>{deck.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    {deck.cardCount} cards
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
