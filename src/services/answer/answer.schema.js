// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const answerSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Answer', additionalProperties: false }
)
export const answerValidator = getValidator(answerSchema, dataValidator)
export const answerResolver = resolve({})

export const answerExternalResolver = resolve({})

// Schema for creating new entries
export const answerDataSchema = Type.Pick(answerSchema, ['text'], {
  $id: 'AnswerData'
})
export const answerDataValidator = getValidator(answerDataSchema, dataValidator)
export const answerDataResolver = resolve({})

// Schema for updating existing entries
export const answerPatchSchema = Type.Partial(answerSchema, {
  $id: 'AnswerPatch'
})
export const answerPatchValidator = getValidator(answerPatchSchema, dataValidator)
export const answerPatchResolver = resolve({})

// Schema for allowed query properties
export const answerQueryProperties = Type.Pick(answerSchema, ['id', 'text'])
export const answerQuerySchema = Type.Intersect(
  [
    querySyntax(answerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const answerQueryValidator = getValidator(answerQuerySchema, queryValidator)
export const answerQueryResolver = resolve({})
