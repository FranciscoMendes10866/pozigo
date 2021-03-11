import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'

import { microservice, channel, connection, assert } from '@providers/rabbitmq'

class RootController {
  async index (req: Request, res: Response) {
    await microservice('')
    const ID = uuid()
    await channel.sendToQueue('rpc_csv', req.file.buffer, {
      replyTo: assert.queue,
      correlationId: ID
    })
    channel.consume(assert.queue, async (msg) => {
      if (msg.properties.correlationId === ID) {
        await channel.close()
        await connection.close()
        return res.json({ users: JSON.parse(msg.content) })
      }
    }, { noAck: true })
  }
}

export default new RootController()
