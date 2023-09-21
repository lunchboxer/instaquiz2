// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const responseSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Response', additionalProperties: false }
)
export const responseValidator = getValidator(responseSchema, dataValidator)
export const responseResolver = resolve({})

export const responseExternalResolver = resolve({})

// Schema for creating new entries
export const responseDataSchema = Type.Pick(responseSchema, ['text'], {
  $id: 'ResponseData'
})
export const responseDataValidator = getValidator(responseDataSchema, dataValidator)
export const responseDataResolver = resolve({})

// Schema for updating existing entries
export const responsePatchSchema = Type.Partial(responseSchema, {
  $id: 'ResponsePatch'
})
export const responsePatchValidator = getValidator(responsePatchSchema, dataValidator)
export const responsePatchResolver = resolve({})

// Schema for allowed query properties
export const responseQueryProperties = Type.Pick(responseSchema, ['id', 'text'])
export const responseQuerySchema = Type.Intersect(
  [
    querySyntax(responseQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const responseQueryValidator = getValidator(responseQuerySchema, queryValidator)
export const responseQueryResolver = resolve({})
