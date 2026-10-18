import express from 'express';
const app = express();

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }

    next();
});

import locationsRoutes from './routes/locations.routes.js';
app.use('/api/locations', locationsRoutes)

import weatherRoutes from './routes/weather.routes.js';
app.use('/api/weather', weatherRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on http://localhost:3000/. To stop the server, press Ctrl + C");
});