// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  questionDataValidator,
  questionPatchValidator,
  questionQueryValidator,
  questionResolver,
  questionExternalResolver,
  questionDataResolver,
  questionPatchResolver,
  questionQueryResolver
} from './question.schema.js'
import { QuestionService, getOptions } from './question.class.js'
import { questionPath, questionMethods } from './question.shared.js'

export * from './question.class.js'
export * from './question.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const question = (app) => {
  // Register our service on the Feathers application
  app.use(questionPath, new QuestionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: questionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(questionPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(questionExternalResolver),
        schemaHooks.resolveResult(questionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(questionQueryValidator),
        schemaHooks.resolveQuery(questionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(questionDataValidator),
        schemaHooks.resolveData(questionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(questionPatchValidator),
        schemaHooks.resolveData(questionPatchResolver)
      ],
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
