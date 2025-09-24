import { defineType } from 'sanity';

export default defineType({
  name: 'fruit',
  title: 'Fruit',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'unit',
      title: 'Unit',
      type: 'string',
      options: {
        list: [
          { title: '€/kg', value: '€/kg' },
          { title: '€/ud', value: '€/ud' },
        ],
      },
    },
    {
      name: 'seasonal',
      title: 'Seasonal',
      type: 'boolean',
    },
    {
      name: 'origin',
      title: 'Origin',
      type: 'string',
    },
    {
      name: 'ecological',
      title: 'Ecological',
      type: 'boolean',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
  ],
});