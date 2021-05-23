const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://jacky:jacky@cluster0.sjspr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

async function main() {
	const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        await client.connect();
     
    } catch (e) {
        console.error(e);

    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createMultipleListings(client, newListing){
    const result = await client.db('sample_airbnb').collection("listingsAndReviews").insertMany(newListing);
    console.log(`${result.insertedCount} new listings created with the following id (s):`);
    console.log(result.insertedId);
}

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with the following id: ${result.insertedId}`)
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};