import express from 'express';
import usersRoute from './routes/user.route';
import authRoute from "./auth/auth.route";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/users', usersRoute);

app.use("/", express.static("front"));
app.use("/", ((...args) => (req, res, next) => {
  if ((req.method === "GET" || req.method === "HEAD") && req.accepts("html")) {
    (res.sendFile || res.sendfile).call(res, ...args, err => err && next())
  } else {
    next()
  }
})("index.html", {
  root: "front"
}));

export default app;

