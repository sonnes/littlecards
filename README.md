## Deck

Add a new route `/api/deck/[id]` that returns a deck of cards for the given id. The data should be read from `data/decks/[id].json`. The response should be a JSON object of type `Deck`:

```typescript
type Deck = {
  id: string;
  title: string;
  coverImage?: string;
  cards: Card[];
};

type Card = {
  id: string;
  title?: string;
  coverImage?: string;
  text?: string;
  url?: string;
  type: "text" | "image" | "video" | "audio";
};
```

maintain all types in `types/` folder.

call `/api/deck/[id]` from DeckView component. use `react-query`

refactor `DeckView` component to use the api response.
