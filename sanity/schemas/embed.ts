import { Preview } from "../components/Preview";
import { type SchemaTypeDefinition } from "sanity";

const embed: SchemaTypeDefinition = {
  name: "embed",
  type: "object",
  title: "Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Video URL",
      validation: (Rule) => Rule.required(),
    },
  ],
  components: {
    preview: Preview,
  },
};

export default embed;
