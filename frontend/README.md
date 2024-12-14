# Recipe Management Frontend

This is the frontend application for the Recipe Management system. It is built using **React** and **TypeScript**, and provides a user-friendly interface for managing recipes and user accounts.

## Features
- User authentication and session management.
- Recipe browsing, creation, updating, and deletion.
- User profile management.

## Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the project root and configure the required environment variables. For example:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```
   Replace `http://localhost:3000/api` with the URL of your backend API.

4. Start the development server:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

5. Build for production:
   ```bash
   npm run build
   ```
   This will generate optimized static files in the `build/` directory.

## Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/               # Page-level components for routes
├── services/            # API service functions
├── context/             # Context providers for global state
├── utils/               # Utility functions
├── App.tsx             # Main application entry point
├── index.tsx           # Application bootstrap
```

## Scripts
- `npm start` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm test` - Runs the test suite.

## Available Pages
- **Login/Register:** Allows users to authenticate.
- **Recipes List:** Displays all recipes fetched from the API.
- **Recipe Details:** Displays details of a single recipe and allows rating.
- **Create/Edit Recipe:** Provides forms for creating or editing a recipe.
- **User Profile:** Allows users to update their personal details.

## API Integration
The application communicates with the backend API via Axios or Fetch. All API calls are encapsulated in service functions located in the `src/services/` directory. Update the `REACT_APP_API_URL` environment variable to point to the backend API.

## Styling
The application uses **CSS Modules** for component-specific styles. Global styles and themes can be added in the `src/styles/` directory.

## Testing
To run the test suite:
```bash
npm test
```
The application uses **Jest** and **React Testing Library** for unit and integration tests.

## Deployment
1. Build the application for production:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `build/` directory to your hosting service (e.g., Vercel, Netlify, AWS S3).

## License
This project is licensed under the [MIT License](LICENSE).

