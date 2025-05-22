import {defineField, defineType} from 'sanity'

export const countryType = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currency',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'currencySymbol',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneCode',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'flag',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})