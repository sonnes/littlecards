export type Deck = {
  id: string;
  title: string;
  coverImage?: string;
  cards: Card[];
};

export type Card = {
  id: string;
  title?: string;
  coverImage?: string;
  text?: string;
  url?: string;
  type: "text" | "image" | "video" | "audio";
};
