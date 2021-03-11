import 'dotenv/config'
import { PassThrough } from 'stream'
import parse from 'csv-parse'

import { microservice, channel } from '@providers/rabbitmq'

(async () => {
  try {
    await microservice('rpc_csv')
    channel.consume('rpc_csv', async (msg) => {
      const results = []
      const bufferStream = new PassThrough()
      bufferStream.end(msg.content)
      await bufferStream.pipe(parse()).on('data', (data) => {
        const obj = {
          id: data[0],
          first_name: data[1],
          last_name: data[2],
          date: data[3]
        }
        results.push(obj)
      })
      results.shift()
      channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(results)), {
        correlationId: msg.properties.correlationId
      })
      channel.ack(msg)
    }, { noAck: false })
  } catch (err) {
    console.log(err)
  }
})()
