import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemas'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'personal-website',

  projectId: "ywfq98mg",
  dataset: "production",

  plugins: [codeInput(), deskTool(), visionTool()],

  schema,
})
