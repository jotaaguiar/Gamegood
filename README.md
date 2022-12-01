# GoodGames | Front-end technical test

<details>
  <summary>Click to read the original assignment</summary>

Exercise React/Typescript/Api

This exercise is designed to test your knowledge on the React Framework, the Typescript programming language and Apis calls.

You have to create a small app that use the RAWG Api (Video Games Database) :

[RAWG Video Games Database API](https://api.rawg.io/docs/)

Here a some relevant informations you'll need to know :

- Your application must use React and Typescript.
- You can do whatever you want from a functionality and design standpoint (import any library, use any UI theme etc)
- Unit testing is optional but appreciated nonetheless.
- The Api is on a free plan, meaning there is 20.000 max requests per month. Be extra careful not to spam it ! local jsons are your friends
- You should at least implement 2 features: games list and game details. Then you can do whatever you want from a functionality and design standpoint
- You have 1 week from the day you've received the assignment in your inbox.

</details>

## Live version

This test has been deployed and you can [check it out here](https://ggapp.vercel.app/).

## Tech used

- typescript
- nextjs
- chakra-ui

## Running locally

- Clone the repo
- Execute `npm install`
- Execute `npm run dev`
- Open http://localhost:3000

## Steps and thought process

The test took me about 5 hours to complete.

Here are the steps I took to complete it:

1. Bootstrap the project with `create-next-app`.
2. Setup my TS, eslint, prettier, and next-config settings.
3. Build the UI with Chakra-UI and fixture data.
4. Try out the RAWG API with insomnia, and then implement the API in the project with next.js' API routes.
5. Fix some bugs here and there before sending it.
6. Deploy on vercel and write this README.

I used Chakra-UI to build the interface because I'm used to it and knew I could build the project quickly.

I added internationalization because why not. It actually caused me some bugs towards the end of the project, so I kind of regret adding i18n.

## Potential improvements

- I didn't have time to implement unit testing, even though I knew it would be appreciated.
- Some parts of the design could be improved.
- I wanted to add more features and do a better design, but I had to be fast enought to send it before the deadline.
