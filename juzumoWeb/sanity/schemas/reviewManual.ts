import { defineType } from 'sanity';

export default defineType({
  name: 'reviewManual',
  title: 'Review Manual',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
  ],
});