export const sessionPath = 'session'

export const sessionMethods = ['find', 'get', 'create', 'patch', 'remove']

export const sessionClient = (client) => {
  const connection = client.get('connection')

  client.use(sessionPath, connection.service(sessionPath), {
    methods: sessionMethods
  })
}
