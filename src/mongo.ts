import * as mongoDB from "mongodb";
import { Link } from "./models";
import { getNextId } from "./idgeneration";
// import * as dotenv from "dotenv";

// how to save the secret
const DB_CONN_STRING = "";
const DB_NAME = "shortlinks";


export class MongoConnection {


    async saveLink(link: Link): Promise<any> {
        const linkCol: mongoDB.Collection = await this.getLinkCollection();
        const lastLink : any = await linkCol.findOne({}, { sort: {"_id": -1}});

        if(!lastLink) {
          console.log("First link initialize");
          link.key = "000";
        } else {
          console.log("last link", lastLink, lastLink.key);

          const newId = getNextId(lastLink.key);
          console.log("new id", newId);
          link.key = newId;
        }
        // TODO: refactor how domain is used to create short url
        link.shortUrl = `estudi.ar/${link.key}`;
        const result = await linkCol.insertOne(link);  
        console.log("result", result);
        console.log("link", link);      
        return link;
    }

    async getLinkCollection(): Promise<mongoDB.Collection> {
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);
        await client.connect();
        const db: mongoDB.Db = client.db(DB_NAME);
        const links: mongoDB.Collection = db.collection("links");
        return links;
    }

    async connectToDatabase() {
        // dotenv.config();
      
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

        mongoDB
      
        await client.connect();
      
        const db: mongoDB.Db = client.db(DB_NAME);
      
        const links: mongoDB.Collection = db.collection("links");
      
        //   collections.games = gamesCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${links.collectionName}`);
        links.findOne({}).then((result) => {
          console.log(result);
        });
      
        const demo = { key: "3123", link: "appingles.com/2123" };
      
        links.insertOne(demo).then((result) => {
          console.log(result);
        });
      
      }
}


