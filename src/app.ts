import express, { Request, Response, Application, NextFunction } from 'express';
import router from './routes/index'
import * as bodyparser from 'body-parser'
// TODO Figure out how NOT to use require here.
// const express = require('express');
const app: Application = express();
const port = process.env.PORT || 3005;
const server = process.env.DEVSERVER || 'http://localhost';

app.use(bodyparser.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  // tslint:disable-next-line:no-console
  console.log(`Requested url: ${server}:${port}${req.url}`);
  next()
})

app.use(router)

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`⚡️[server]: Server is running at ${server}:${port}`);
});