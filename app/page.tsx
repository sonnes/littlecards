"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/ui/layout";
import { Deck } from "@/types/deck";
const fetchDecks = async (searchQuery: string = "") => {
  const response = await fetch(
    `/api/deck/list${
      searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch decks");
  }
  return response.json() as Promise<Deck[]>;
};

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: decks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["decks", searchQuery],
    queryFn: () => fetchDecks(searchQuery),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
        {isLoading ? (
          <p>Loading decks...</p>
        ) : error ? (
          <p>Error loading decks. Please try again later.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Link href={`/deck/${deck.id}`} key={deck.id}>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  {deck.coverImage && (
                    <CardHeader>
                      <Image
                        src={deck.coverImage}
                        alt={deck.title}
                        width={200}
                        height={100}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                  )}
                  <CardContent>
                    <CardTitle>{deck.title}</CardTitle>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      {deck.cards?.length} cards
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
