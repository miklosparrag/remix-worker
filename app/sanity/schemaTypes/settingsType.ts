import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contacts',
      type: 'array',
      of: [{type: 'contact'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'facebook',
      type: 'url',      
    }),
    defineField({
      name: 'instagram',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      type: 'url',
    }),     

    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})