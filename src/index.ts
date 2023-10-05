import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'
import {MongoConnection} from "./mongo";
import { Link } from "./models";

const app = new Elysia()

app.get("/", () => {
  return Response.redirect("public/index.html");
})

app.get("/:id", (req) => {
  // TODO: get link from database
  // return Response.redirect("https://www.google.com");
  return { response: `the id is ${req.params.id}` };
});

app.post("/newLink", async (req) => {
  console.log(req.body);
  const link: Link = req.body as Link;
  const con = new MongoConnection();
  const result = con.saveLink(link);
  return result;
});

app.use(staticPlugin());
app.listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} s`
);
