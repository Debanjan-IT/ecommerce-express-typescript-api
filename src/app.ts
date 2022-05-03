import express, { Request, Response, Application, NextFunction } from 'express';

// TODO Figure out how NOT to use require here.
// const express = require('express');
const app: Application = express();
const port = process.env.PORT || 3005;
const server = process.env.DEVSERVER || 'http://localhost';

app.use((req: Request, res: Response, next: NextFunction) => {
  // tslint:disable-next-line:no-console
  console.log(`Requested url: ${server}:${port}${req.url}`);
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: "Success",
    message: "Running"
  })
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`⚡️[server]: Server is running at ${server}:${port}`);
});