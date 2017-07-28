# Google Places App
The application allows a user to search for places with an auto suggest feature which fetches places from Google Places API. Upon selection of a place a marker is added in the map at the selected location's latitude and longitude.

Also a list of added markers is displayed besides the map and the user will have the ability to remove the markers.

# Tools/Libraries Used
*   ReactJs
*   Webpack and Webpack-dev-server
*   Bootstrap
*   npm scripts
*   babel

# Steps to run the application locally
*   Install node/npm
*   Open terminal and change to application's root directory.
*   Run `npm install` to install all the dependencies listed in **package.json**. This should create a **node_modules** folder with all the dependencies.
*   The application can be run in 2 modes:
    * **Development**: Run `npm run dev`. (this mode is powered by webpack's dev server with hot reloading and static files are not minimized and served from memory)
    * **Production**: Run `npm run prod`. (bundled and minified files will be generated in the **dist** folder and are served from there)
*   You should be able to run the app based on `http://localhost:8080`
