import post from './post'
import embed from './embed'
import author from './author'
import tag from './tag'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, embed, author, tag],
}
