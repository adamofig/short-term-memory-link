import { Elysia } from "elysia";
import { staticPlugin } from '@elysiajs/static'

const app = new Elysia().get("/", () => "Hello Elysia")

app.use(staticPlugin());

app.listen(3000);




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
