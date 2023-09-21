// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const questionSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Question', additionalProperties: false }
)
export const questionValidator = getValidator(questionSchema, dataValidator)
export const questionResolver = resolve({})

export const questionExternalResolver = resolve({})

// Schema for creating new entries
export const questionDataSchema = Type.Pick(questionSchema, ['text'], {
  $id: 'QuestionData'
})
export const questionDataValidator = getValidator(questionDataSchema, dataValidator)
export const questionDataResolver = resolve({})

// Schema for updating existing entries
export const questionPatchSchema = Type.Partial(questionSchema, {
  $id: 'QuestionPatch'
})
export const questionPatchValidator = getValidator(questionPatchSchema, dataValidator)
export const questionPatchResolver = resolve({})

// Schema for allowed query properties
export const questionQueryProperties = Type.Pick(questionSchema, ['id', 'text'])
export const questionQuerySchema = Type.Intersect(
  [
    querySyntax(questionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const questionQueryValidator = getValidator(questionQuerySchema, queryValidator)
export const questionQueryResolver = resolve({})
