import '@testing-library/jest-dom'

import { TextEncoder, TextDecoder } from 'util'

// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Polyfill for requestSubmit
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    if (this.checkValidity()) {
      this.submit()
    }
  }
}
