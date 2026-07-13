import type { FC } from 'react'
import type { CountUpProps } from 'react-countup'
import CountUpImport from 'react-countup'

type CountUpComponent = FC<CountUpProps>

function resolveCountUp(
  mod: CountUpComponent | { default: CountUpComponent },
): CountUpComponent {
  return typeof mod === 'function' ? mod : mod.default
}

const CountUp = resolveCountUp(
  CountUpImport as CountUpComponent | { default: CountUpComponent },
)

export default CountUp
