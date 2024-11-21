# React + TypeScript + Vite

# How to use

- Open CMD or VSCode's integrated terminal and run `npm install` from the root directory (where the `package.json` is located)
- Then run `npm run dev` to start the website
- Then open your browser and open `http://localhost:5173/` or the provided host when you ran `npm run dev`

# Approach

The application uses `React` and `react-router-dom` as requested.

Based on our initial interview, I was left with the impression that Digital Banking, uses the latest best practices.

To show my current and evolving skills, I decided to include `TypeScript`, `Redux` and `Material UI`.

Since `Redux` has 2 main approaches, to showcase that, I used both:

1.  `createApi` - for the data fetching and caching
2.  `createAppSlice` - for the Log In form

The initial load presents a login page, after which, you are presented with the table filled with data from `https://swapi.dev/api/people`

As requested the table is located in the `/table` route, but it's protected via guarded route, to make use of the login screen.

- I added and a Log out button to better test the guarded route.

The app displays loading and error messages where needed.

# Additional features

Since the API provides a lot more data than what is requested, I decided to make use of it and created:

1.  `pagination` feature
2.  `expand` feature to show some of the previously unseen data
