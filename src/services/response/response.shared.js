export const responsePath = 'response'

export const responseMethods = ['find', 'get', 'create', 'patch', 'remove']

export const responseClient = (client) => {
  const connection = client.get('connection')

  client.use(responsePath, connection.service(responsePath), {
    methods: responseMethods
  })
}
