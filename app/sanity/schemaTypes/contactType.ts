import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'ContactForm', value: 'contactForm'},
          {title: 'Business', value: 'business'},
          {title: 'Team', value: 'team'},
        ]
      }
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'firstName',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      type: 'string',
    }),    
    defineField({
      name: 'companyName',
      type: 'string',
    }),
    defineField({
      name: 'country',
      type: 'reference',
      to: [{type: 'country'}],
    }),
    defineField({      
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})