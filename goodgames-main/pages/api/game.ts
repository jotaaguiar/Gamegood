// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Game>) {
  const { id } = req.query;

  const gameResponse = await fetch(
    `https://api.rawg.io/api/games/${id}?key=f639e4e2821042c19bbec9db70138a27}`,
  );
  const game = await gameResponse.json();

  const screenshotsResponse = await fetch(
    `https://api.rawg.io/api/games/${id}/screenshots?key=f639e4e2821042c19bbec9db70138a27}`,
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
