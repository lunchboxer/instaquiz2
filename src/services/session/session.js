// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  sessionDataValidator,
  sessionPatchValidator,
  sessionQueryValidator,
  sessionResolver,
  sessionExternalResolver,
  sessionDataResolver,
  sessionPatchResolver,
  sessionQueryResolver
} from './session.schema.js'
import { SessionService, getOptions } from './session.class.js'
import { sessionPath, sessionMethods } from './session.shared.js'

export * from './session.class.js'
export * from './session.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const session = (app) => {
  // Register our service on the Feathers application
  app.use(sessionPath, new SessionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: sessionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(sessionPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(sessionExternalResolver),
        schemaHooks.resolveResult(sessionResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(sessionQueryValidator), schemaHooks.resolveQuery(sessionQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(sessionDataValidator), schemaHooks.resolveData(sessionDataResolver)],
      patch: [schemaHooks.validateData(sessionPatchValidator), schemaHooks.resolveData(sessionPatchResolver)],
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
