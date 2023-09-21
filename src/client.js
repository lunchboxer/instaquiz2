// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { responseClient } from './services/response/response.shared.js'

import { answerClient } from './services/answer/answer.shared.js'

import { questionClient } from './services/question/question.shared.js'

import { sessionClient } from './services/session/session.shared.js'

import { groupClient } from './services/group/group.shared.js'

import { userClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the instaquiz2 app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(groupClient)

  client.configure(sessionClient)

  client.configure(questionClient)

  client.configure(answerClient)

  client.configure(responseClient)

  return client
}
