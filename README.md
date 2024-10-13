# No Code Builder with React and Vite

This project is a web-based No Code Builder built using React and Vite. It allows users to add and edit text and images on a canvas, leveraging the power of the Fabric.js library for canvas manipulation. The project also integrates Tailwind CSS for styling and ESLint for code quality.

## Features

- **Text Editing**: Add and customize text on the canvas with various styles, alignments, and list types.
- **Image Editing**: Add images to the canvas, adjust their size, border, and other properties.
- **Live Preview**: View a live preview of the canvas content.
- **Code Display**: Display the JSON representation of the canvas content.

## Project Structure

- **Components**: The project is structured with reusable React components for different functionalities like `CanvasEditor`, `Tools`, `TextProperties`, `ImageProperties`, and more.
- **Hooks**: Custom hooks like `useFabricCanvas`, `useObjectSelection`, `useTextEditing`, and `useImageEditing` are used to manage canvas state and interactions.
- **Styling**: Tailwind CSS is used for styling the components, providing a modern and responsive design.

## Installation

1. Go to the project directory:
   ```bash
   cd no-code-builder
   ```

2. Install dependencies and start the development server:
   ```bash
   npm install && npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Fabric.js**: A powerful and simple JavaScript HTML5 canvas library.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Development

The project uses Vite for fast development and hot module replacement (HMR). The main entry point is `src/main.jsx`, which renders the `App` component.
