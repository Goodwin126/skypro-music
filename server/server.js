const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();
const routes = jsonServer.rewriter(require("./routes.json"));

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(routes);

// Эндпоинт для получения токенов (логин)
server.post("/token", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const accessToken = `mock-access-${Date.now()}`;
    const refreshToken = `mock-refresh-${Math.random().toString(36).substr(2, 8)}`;

    res.json({
      access: accessToken,
      refresh: refreshToken,
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Эндпоинт для обновления access token
server.post("/token/refresh", (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const newAccessToken = `mock-access-${Date.now()}`;
  res.json({
    access: newAccessToken,
  });
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});
