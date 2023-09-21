// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  responseDataValidator,
  responsePatchValidator,
  responseQueryValidator,
  responseResolver,
  responseExternalResolver,
  responseDataResolver,
  responsePatchResolver,
  responseQueryResolver
} from './response.schema.js'
import { ResponseService, getOptions } from './response.class.js'
import { responsePath, responseMethods } from './response.shared.js'

export * from './response.class.js'
export * from './response.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const response = (app) => {
  // Register our service on the Feathers application
  app.use(responsePath, new ResponseService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: responseMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(responsePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(responseExternalResolver),
        schemaHooks.resolveResult(responseResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(responseQueryValidator),
        schemaHooks.resolveQuery(responseQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(responseDataValidator),
        schemaHooks.resolveData(responseDataResolver)
      ],
      patch: [
        schemaHooks.validateData(responsePatchValidator),
        schemaHooks.resolveData(responsePatchResolver)
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
