/* global tw */
import React from 'react'
import styled, { css } from 'react-emotion'

import {
  concat,
  startCase,
  ifElse,
  includes,
  curry,
  pick,
  keysIn,
  compose,
  map,
  values,
  assoc,
  objOf,
  safeMap,
  uuid,
} from '../../helpers'

import { ColumnThreeFive, ColumnTwoFive } from './Grids'
import { Description, DescriptionSemibold } from './Typography'

const Col = styled('div')`
  ${Description};
  ${tw(['flex', 'flex-col', 'mt-q72', 'mb-q36', 'w-full'])};
`

const Line = styled('div')`
  ${tw(['flex', 'flex-row', 'md:-mx-q12', 'mb-q4'])};
`

const Left = styled('div')`
  ${ColumnThreeFive};
  ${tw(['mb-0'])};
`

const Right = styled('div')`
  ${ColumnTwoFive};
  ${tw(['mb-0'])};
`

export const InfoTags = ({ data, lang }) => {
  const translations = {
    client: 'клиент',
    location: 'расположение',
    status: 'статус',
    timeline: 'Время',
    type: 'Тип',
  }
  const translateHandler = curry((obj, lang, key) =>
    ifElse(
      () => includes('ru', lang),
      () => startCase(obj[key]),
      () => startCase(key)
    )(lang, obj, key)
  )
  const translate = translateHandler(translations, lang)
  const pickKeys = pick(['location', 'type', 'status', 'timeline', 'client'])
  const keysIt = compose(
    map(translate),
    keysIn,
    pickKeys
  )
  const valuesIt = compose(
    values,
    pickKeys
  )
  const allTags = concat(
    keysIt(data).map((key, i) =>
      assoc('tagdescription', valuesIt(data)[i], objOf('tagtitle', key))
    ),
    data.customtags
  )

  return (
    <Col>
      {safeMap(({ tagtitle, tagdescription }) => (
        <Line key={uuid()}>
          <Right
            key={uuid()}
            className={css`
              ${tw('screen:text-white')};
            `}
          >
            {tagtitle}
          </Right>
          <Left key={uuid()} className={DescriptionSemibold}>
            {tagdescription}
          </Left>
        </Line>
      ))(allTags)}
    </Col>
  )
}
