// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  groupDataValidator,
  groupPatchValidator,
  groupQueryValidator,
  groupResolver,
  groupExternalResolver,
  groupDataResolver,
  groupPatchResolver,
  groupQueryResolver
} from './group.schema.js'
import { GroupService, getOptions } from './group.class.js'
import { groupPath, groupMethods } from './group.shared.js'

export * from './group.class.js'
export * from './group.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const group = (app) => {
  // Register our service on the Feathers application
  app.use(groupPath, new GroupService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: groupMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(groupPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(groupExternalResolver),
        schemaHooks.resolveResult(groupResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(groupQueryValidator), schemaHooks.resolveQuery(groupQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(groupDataValidator), schemaHooks.resolveData(groupDataResolver)],
      patch: [schemaHooks.validateData(groupPatchValidator), schemaHooks.resolveData(groupPatchResolver)],
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
