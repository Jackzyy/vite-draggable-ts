/// <reference types="vite/client" />

import 'vue'

declare module 'vue' {
  interface HTMLAttributes extends AriaAttributes {
    setPointStyle?: string
  }
}
