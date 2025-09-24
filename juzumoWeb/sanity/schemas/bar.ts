export default {
  name: 'bar',
  title: 'Bar',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'urlMaps',
      title: 'URL de Maps',
      type: 'url',
    },
  ],
};