// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  answerDataValidator,
  answerPatchValidator,
  answerQueryValidator,
  answerResolver,
  answerExternalResolver,
  answerDataResolver,
  answerPatchResolver,
  answerQueryResolver
} from './answer.schema.js'
import { AnswerService, getOptions } from './answer.class.js'
import { answerPath, answerMethods } from './answer.shared.js'

export * from './answer.class.js'
export * from './answer.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const answer = (app) => {
  // Register our service on the Feathers application
  app.use(answerPath, new AnswerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: answerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(answerPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(answerExternalResolver),
        schemaHooks.resolveResult(answerResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(answerQueryValidator), schemaHooks.resolveQuery(answerQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(answerDataValidator), schemaHooks.resolveData(answerDataResolver)],
      patch: [schemaHooks.validateData(answerPatchValidator), schemaHooks.resolveData(answerPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
