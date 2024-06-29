# Pokédex Web Application

## Overview

This Pokédex web application is built using React and the Pokémon API. The application displays a list of Pokémon cards and a side panel showing caught Pokémon. Clicking on a card in the list or in the side panel will show a page with the Pokémon details and a button to catch the presented Pokémon.

## Technologies Used

- **React.js**: Used for building the user interface.
- **Local Storage**: Used for storing caught Pokémon data.
- **CSS Framework/UI Library**: Custom CSS for styling.
- **Network Requests**: Used Axios for fetching data from the Pokémon API.
- **Vite**: Used for setting up the React application.

## Features

- Fetches the initial list of Pokémon using the provided List API.
- Displays each Pokémon in a visually appealing card format, including an image and basic data.
- Each card is clickable and leads to the detailed view of the Pokémon.
- Fetches detailed data using the URL from the selected Pokémon’s entry in the list.
- Includes an interactive 'Catch' button that allows users to catch the Pokémon with a random chance mechanism.
- Lists all the Pokémon that were successfully caught and stored in local storage.

## Bonus Features

- **Daily Catch Attempts**: Only 10 catch attempts are allowed per day. Users receive a message if they exceed this limit.
- **Remove Pokémon from Caught List**: Users can remove a Pokémon from the caught list.
- **Header Component**: Includes an app name and the number of favorite Pokémon.
- **Loading State**: Shows a loading indicator while fetching data.
- **Pagination**: Implements pagination for the Pokémon List API.
- **Client-side Filters**: Allows filtering caught Pokémon by name.
- **Animated Catching Ball**: Added animation for the catching process.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/fe-task.git
   cd fe-task
2. **Install the dependencies**:
    ```bash
    npm install
4. **Install vite**:
    ```bash
    npm install vite
4. **Start the Application**:
    ```bash
    npm run dev
5. **Access the Application**:
Open your browser and navigate to http://localhost:3000.

## Components
- **FavoritesSidebar:** Manages and displays the caught Pokémon.
- **PokemonList:** Displays all Pokémon and supports pagination.
- **PokemonCard:** Represents individual Pokémon cards.
- **PokemonDetails:** Shows detailed information and catch/release functionality for selected Pokémon.
- **Header:** Displays the app logo and count of caught Pokémon.
- **Filter:** Provides search and filter functionality for caught Pokémon.
- **Alert:** Displays temporary messages for user actions.

# Services
- **pokemon.service.js:** Contains functions for fetching Pokémon list and details.
- **favorites.service.js:** Contains functions for managing caught Pokémon data in local storage.

## Acknowledgements
- Pokémon API: providing the Pokémon data.
- Fonts: The application uses the Flexo-Medium font. 
- Background Pattern: The background pattern used in the application is sourced from the official Pokémon website.
- React: Built with React.
- Axios: Network requests are handled using Axios.
