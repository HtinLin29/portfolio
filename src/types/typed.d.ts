declare module 'typed.js' {
  interface TypedOptions {
    strings: string[]
    typeSpeed?: number
    backSpeed?: number
    backDelay?: number
    loop?: boolean
    showCursor?: boolean
    cursorChar?: string
  }

  export default class Typed {
    constructor(element: string | Element, options: TypedOptions)
    destroy(): void
  }
}
