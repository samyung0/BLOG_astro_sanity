import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemas'
import {codeInput} from '@sanity/code-input'
import {table} from '@sanity/table'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'

export default defineConfig({
  name: 'default',
  title: 'personal-website',

  projectId: 'ywfq98mg',
  dataset: 'production',

  plugins: [
    codeInput(),
    deskTool(),
    visionTool(),
    table(),
    media(),
  ],

  schema,
})
