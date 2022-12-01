// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Game[]>) {
  const { term } = req.query;

  const gamesResponse = await fetch(
    `https://api.rawg.io/api/games?key=f639e4e2821042c19bbec9db70138a27&search=${term}&page_size=100&ordering=-rating`,
  );
  const games = await gamesResponse.json();

  const response: Game[] = [];

  games.results.forEach((game: any) => {
    response.push({
      name: game.name,
      rating: game.rating,
      summary: undefined,
      cover: game.background_image,
      screenshots: game.short_screenshots,
      id: game.id,
    });
  });

  res.status(200).json(response);
}
