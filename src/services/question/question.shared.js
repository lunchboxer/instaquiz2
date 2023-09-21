export const questionPath = 'question'

export const questionMethods = ['find', 'get', 'create', 'patch', 'remove']

export const questionClient = (client) => {
  const connection = client.get('connection')

  client.use(questionPath, connection.service(questionPath), {
    methods: questionMethods
  })
}
