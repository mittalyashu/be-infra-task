import express from 'express'
import { v4 } from "uuid";

import { prisma } from './db'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  // console.log('req header', req.header['content-type'])
  // req.header("Content-Type", "application/json")
  next()
})

app.get("/healthz", (_, res) => {
  res.status(200).send("ok")
})

app.get("/logs", async (_, res) => {
  try {
    const all = await prisma.logs.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).send({
      logs: all,
    })

  } catch (error) {
    console.log("error getting logs")
    res.status(500).send({
      code: "server_error"
    })
    return 
  }
})

app.post("/log", async (req, res) => {
  console.log('req:', req.body)
  const tmz = req.body.tmz
  const msg = req.body.msg;
  const actor = req.body.actor;

  try {
    const logD =await prisma.logs.create({
      data: {
        id: v4(),
        actor,
        msg,
      }
        })

        console.log('db data')
        console.log(logD)
  } catch (error) {
    console.log(error);

    res.status(500).send({
      code: "server_error"
    })
    return 
  }

  console.log(`[${tmz}]: ${msg} \n\nby: ${actor}`)
  res.status(200).send({
    result: "ok"
  })
});

app.listen(8084, () => {
  console.log('logger running...')
})

