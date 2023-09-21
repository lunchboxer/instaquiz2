export const answerPath = 'answer'

export const answerMethods = ['find', 'get', 'create', 'patch', 'remove']

export const answerClient = (client) => {
  const connection = client.get('connection')

  client.use(answerPath, connection.service(answerPath), {
    methods: answerMethods
  })
}
