import { Request, Response } from 'express';
export default async function startFun (req: Request, res: Response) {
    res.send({
      status: "Success",
      message: "Running"
    })
}
