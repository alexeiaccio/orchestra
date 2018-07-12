/* global tw */
import { css } from 'react-emotion'

export const Body = css`
  ${tw([
    'font-source', 'font-normal',
    'leading-body', 'text-body',
    'tracking-normal'
  ])};
`

export const ButtonText = css`
  ${tw([
    'font-source', 'font-semibold',
    'text-sm', 'screen:text-lg',
    'tracking-button', 
  ])};
  font-variant-caps: all-small-caps;
`

export const Heading = css`
  ${tw([
      'font-plex', 'leading-heading',
      'm-0', 'tracking-tight'
    ])};
`

export const Heading1 = css`
  ${Heading};
  ${tw([
    'text-heading1', 'font-bold',
  ])};
`

export const Heading2 = css`
  ${Heading};
  ${tw([
    'text-heading2', 'font-bold',
  ])};
`

export const Heading3 = css`
  ${Heading};
  ${tw([
    'text-heading3', 'font-semibold',
  ])};
`

export const Heading4 = css`
  ${Heading};
  ${tw([
    'text-heading4', 'font-semibold',
  ])};
`

export const Heading5 = css`
  ${Heading};
  ${tw([
    'text-heading5', 'font-semibold',
  ])};
`

export const Lead = css`
  ${tw([
    'font-plex', 'leading-none',
    'tracking-tight',
    'text-heading5', 'font-semibold',
  ])};
`