# Rick and Morty Explorer

Explore characters and locations from the Rick and Morty universe! This web application allows users to browse locations, view detailed character information, filter characters by their status (alive, dead, or unknown), and manage their favorite characters. The application is built using React, Next.js, TypeScript, and Redux.

## Live Demo
You can check out the live demo of this project here:
[Live Demo](https://rick-and-morty-explorer-lyart.vercel.app/)

## Features

- **Locations List:** View a paginated list of all locations from the Rick and Morty API.
- **Location Characters:** View and filter characters from specific locations based on their status (alive, dead, unknown).
- **Character Details:** Detailed view of each character, including species, origin, gender, and episodes they appeared in.
- **Favorites Management:** Add and remove characters from your personal "My Favorites" list, which is stored in Redux.
- **Responsive Design:** Optimized for mobile and desktop devices.
  
## Tech Stack

- **Next.js**: Server-side rendering and routing.
- **React**: UI components.
- **Redux Toolkit**: For managing the state of the "My Favorites" feature.
- **TypeScript**: Type-safe development.
- **SCSS**: CSS pre-processing for styling.
- **Material UI**: A popular React UI framework for styling components.

## Installation

To set up the project locally, follow these steps:

Clone the repository:
```bash
   git clone https://github.com/zulalnb/rick-and-morty-explorer.git
   cd rick-and-morty-explorer
```

Create a .env file in the root of your project and add your API key to the .env file:

```bash
NEXT_PUBLIC_BASE_API_URL=https://rickandmortyapi.com/api
```

Install dependencies

```bash
  npm install
```

Run the development server:

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Building for Production

To create an optimized production build:

```bash
  npm run build
```

Then start the server:

```bash
  npm run start
```
