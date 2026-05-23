const client = require('./client');

async function run() {

    await client.set("user", "Rajneesh");

    const value = await client.get("user");

    console.log(value);

    process.exit(0);
}

run();