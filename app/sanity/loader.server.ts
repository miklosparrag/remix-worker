// src/sanity/loader.ts

import * as serverOnly from '@sanity/react-loader'
import { client } from '~/sanity/client'

const { loadQuery, setServerClient } = serverOnly

setServerClient(client.withConfig({ token: process.env.SANITY_VIEWER_TOKEN }))

export { loadQuery }
