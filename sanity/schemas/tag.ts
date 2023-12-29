import { type SchemaTypeDefinition } from "sanity";

const tag: SchemaTypeDefinition = {
  name: "tag",
  type: "document",
  title: "Tag",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    },
  ]
};

export default tag;