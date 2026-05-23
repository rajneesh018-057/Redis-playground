const express = require('express');
const axios = require('axios');

const app = express();

const client = require('./client');

app.get('/', async (req, res) => {

    try {

        // Check cache
        const cachedData = await client.get('cachedData');

        if (cachedData) {
            console.log('Serving from cache');

            return res.json(JSON.parse(cachedData));
        }

        // Fetch API data
        const { data } = await axios.get(
            'https://jsonplaceholder.typicode.com/todos/1'
        );

        // Store in Redis for 60 seconds
        await client.set('cachedData', JSON.stringify(data), {
            EX: 60
        });

        console.log('Serving from API');

        return res.json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: 'An error occurred'
        });
    }
});

// Start server
app.listen(9000, () => {
    console.log('Server is running on port 9000');
});