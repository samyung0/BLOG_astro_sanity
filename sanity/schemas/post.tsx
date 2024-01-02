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
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {
                title: 'Highlight',
                value: 'highlight',
                icon: () => 'H',
                component: (props) => (
                  <span style={{backgroundColor: 'tomato'}}>{props.children}</span>
                ),
              },
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'indent',
                type: 'object',
                title: 'Indent Whole',
                icon: () => 'I',
                fields: [
                  {
                    title: 'Indent Level',
                    name: 'indentLevel',
                    type: 'number',
                    initialValue: 1,
                    options: {
                      list: [
                        {title: '1', value: 1},
                        {title: '2', value: 2},
                        {title: '3', value: 3},
                        {title: '4', value: 4},
                      ],
                    },
                    validation: (Rule) => Rule.required(),
                  },
                ],
                components: {
                  annotation: (props: any) => {
                    return (
                      <span
                        style={{
                          paddingInlineStart: props.value.indentLevel * 32 + 'px',
                          display: 'block',
                        }}
                      >
                        {props.renderDefault(props)}
                      </span>
                    )
                  },
                },
              },
              {
                name: 'indent2',
                type: 'object',
                title: 'Indent First',
                icon: () => 'II',
                fields: [
                  {
                    title: 'Indent Level',
                    name: 'indentLevel',
                    type: 'number',
                    initialValue: 1,
                    options: {
                      list: [
                        {title: '1', value: 1},
                        {title: '2', value: 2},
                        {title: '3', value: 3},
                        {title: '4', value: 4},
                      ],
                    },
                    validation: (Rule) => Rule.required(),
                  },
                ],
                components: {
                  annotation: (props: any) => {
                    return (
                      <span
                        style={{
                          paddingInlineStart: props.value.indentLevel * 32 + 'px',
                        }}
                      >
                        {props.renderDefault(props)}
                      </span>
                    )
                  },
                },
              },
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
