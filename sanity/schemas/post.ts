import {type SchemaTypeDefinition} from 'sanity'

const post: SchemaTypeDefinition = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: () => true,
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    weak: true,
                    to: [
                      {type: 'post'},
                      {type: 'author'},
                      {type: 'tag'},
                      // other types you may want to link to
                    ],
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          validation: (Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {type: 'embed'},
        {
          type: 'code',
          validation: (Rule) => Rule.required(),
          options: {
            language: 'javascript',
            withFilename: true,
          },
        },
        {
          name: 'sizeChart',
          title: 'Size Chart',
          type: 'table',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'reference',
          to: [{type: 'tag'}],
        },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
}

export default post
