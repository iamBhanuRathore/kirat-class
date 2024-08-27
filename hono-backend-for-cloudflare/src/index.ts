import { Hono } from "hono";

const app = new Hono();

app.post("/api/v1/signin", (c) => {
  return c.text("Hello Hono!");
});
app.post("/api/v1/signup", (c) => {
  return c.text("Hello Hono!");
});
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
app.get("/api/v1/blogs", (c) => {
  return c.text("Hello Hono!");
});
app.put("/api/v1/blogs/:id", (c) => {
  app.get("/api/v1/blogs/:id", (c) => {
    return c.text("Hello Hono!");
  });
  return c.text("Hello Hono!");
});
app.delete("/api/v1/blogs/:id", (c) => {
  return c.text("Hello Hono!");
});

export default app;
