import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './app/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'accept-ed',

  projectId: 'nv2pxiqn',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      title: 'Preview',
      icon: () => '👀',
      previewUrl: {
        origin: 'http://127.0.0.1:5173',
        previewMode: {
          enable: 'api/preview-mode/enable',
          disable: 'api/preview-mode/disable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
