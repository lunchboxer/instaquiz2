import { response } from './response/response.js'

import { answer } from './answer/answer.js'

import { question } from './question/question.js'

import { session } from './session/session.js'

import { group } from './group/group.js'

import { user } from './users/users.js'

export const services = (app) => {
  app.configure(response)

  app.configure(answer)

  app.configure(question)

  app.configure(session)

  app.configure(group)

  app.configure(user)

  // All services will be registered here
}
