type Screenshot = {
  id: number;
  image: string;
};

type Game = {
  name: string;
  rating: number;
  summary?: string;
  cover: string;
  screenshots: Screenshot[];
  id: number;
};
