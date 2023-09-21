// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const sessionSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Session', additionalProperties: false }
)
export const sessionValidator = getValidator(sessionSchema, dataValidator)
export const sessionResolver = resolve({})

export const sessionExternalResolver = resolve({})

// Schema for creating new entries
export const sessionDataSchema = Type.Pick(sessionSchema, ['text'], {
  $id: 'SessionData'
})
export const sessionDataValidator = getValidator(sessionDataSchema, dataValidator)
export const sessionDataResolver = resolve({})

// Schema for updating existing entries
export const sessionPatchSchema = Type.Partial(sessionSchema, {
  $id: 'SessionPatch'
})
export const sessionPatchValidator = getValidator(sessionPatchSchema, dataValidator)
export const sessionPatchResolver = resolve({})

// Schema for allowed query properties
export const sessionQueryProperties = Type.Pick(sessionSchema, ['id', 'text'])
export const sessionQuerySchema = Type.Intersect(
  [
    querySyntax(sessionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const sessionQueryValidator = getValidator(sessionQuerySchema, queryValidator)
export const sessionQueryResolver = resolve({})
