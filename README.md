# MovieSpot

## Intro 🚀
- MovieSpot is a movie app that allows users to watch movies and TV shows

## Technologies 🛠️
- `sass`
- `React`
- `Framer Motion`

## Features 💡
- you can see movies (trending, popular, and top-rated) and TV shows (trending, popular, and top-rated).
- You can search for a movie or TV show.
- You can see details about a movie or TV show.
- You can add your rating.
- You can add a movie or TV show to your favorite list.
- You can remove a movie or TV show from your favorite list.
- You can view trailers.
- Your favorite list and rated movies are stored in your local storage.

## Other Feautures 💡💡
- On the first section in each page, if the text overview of a movie or TV show is too long, it will not be displayed in its entirety, as the maximum text length is set to 332 characters.

## Learnings 📚
- How to secure sensitive data when pushed to a Git repository.
- How to use the AnimatePresence component of framer motion.
- How to use useInview hook with useAnimation hook of framer motion.
- How to get query string in a loader function.
- How to fetch multiple data in parallel.

## Running the Project 🚦
- Clone the repository to your machine: `https://github.com/mounirabcire/MovieSpot.git`

- Install dependencies: `cd MovieSpot`  `npm install`

- Start the development server:  `npm run dev`

- Open the address shown in your console on your web browser

## Setup Environment Variables

1. Create a copy of the `.env` file.
2. Open the `.env` file and replace the placeholder values with your actual environment-specific values. For example:

    ```env
    VITE_API_KEY="your_actual_api_key_here"
    VITE_ACCESS="your_actual_access_here"
    ```

    > **Note:** You need to use your own API keys and access credentials. Ensure these keys are kept secure and not shared publicly.


## Demo 📸
- You can start exploring the app here: [MovieSpot](http://moviesspot.vercel.app "MovieSpot")