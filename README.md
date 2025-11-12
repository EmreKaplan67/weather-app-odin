# Odin Weather App

This is a clean and modern weather application that provides real-time weather information and a 10-day forecast for any location. The project was built as part of The Odin Project curriculum.

## Features

- **Current Weather Display**: Shows the current temperature, conditions, humidity, and wind speed.
- **10-Day Forecast**: Provides a horizontally scrollable 10-day weather forecast.
- **Dynamic Main Display**: Click on any forecast card to update the main display with that day's weather details.
- **Unit Conversion**: Toggle between Celsius and Fahrenheit without re-fetching data.
- **Location Search**: Search for any location worldwide.
- **Visual Weather Icons**: Uses weather icons to visually represent the conditions.
- **Default Location**: Automatically fetches and displays the weather for Dublin on initial load.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **API**: [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- **Bundler**: Webpack
- **Environment Variables**: dotenv

## Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed on your machine.
- A Visual Crossing Weather API key.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your_username/weather-app.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd weather-app
   ```

3. **Install NPM packages:**
   ```sh
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the root of the project.
   - Add your Visual Crossing API key to the file:
     ```
     VC_API_KEY=your_api_key_here
     ```

5. **Run the development server:**
   ```sh
   npm start
   ```
   The application will open in your default browser at `http://localhost:8080`.

6. **Build for production:**
   To create a production-ready build, run:
   ```sh
   npm run build
   ```
   The bundled files will be placed in the `dist/` directory.
