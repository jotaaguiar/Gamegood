// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Game>) {
  const { id } = req.query;

  const gameResponse = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,
  );
  const game = await gameResponse.json();

  const screenshotsResponse = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`,
  );
  const screenshotsRaw = await screenshotsResponse.json();

  const screenshots = screenshotsRaw.results.map(
    ({ id, image }: { id: number; image: string }) => ({
      id,
      image,
    }),
  );

  const response: Game = {
    name: game.name,
    rating: game.rating,
    summary: game.description_raw,
    cover: game.background_image,
    screenshots,
    id: game.id,
  };

  res.status(200).json(response);
}
