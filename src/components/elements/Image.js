/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { Transition, animated } from 'react-spring'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import {
  constant,
  F,
  isArray,
  isNil,
  pathOr,
  unless,
  uuid,
} from '../../helpers'

const Wrapper = styled('div')`
  ${tw(['absolute', 'pin'])};
  filter: blur(${({ backSlider }) => backSlider && '12px'});
  transform: scale(1.1);
  &::after {
    ${tw(['absolute', 'bg-black', 'hidden', 'opacity-25', 'pin'])};
    ${({ backSlider }) => backSlider && tw(['block'])};
    content: '';
  }
`

const Slide = css`
  ${tw('absolute pin')};
  will-change: opacity;
`

const transitionGroup = data =>
  data.map(({ image }) => style => (
    <animated.div
      className={css`
        ${Slide};
      `}
      style={{ ...style }}
    >
      <Img
        sizes={image.localFile.childImageSharp.sizes}
        className={css`
          ${tw('pin')};
        `}
        style={{ position: 'absolute' }}
      />
    </animated.div>
  ))

export const Image = compose(
  connect(({ backImage, backSlider, jumboCount }) => ({
    backImage,
    backSlider,
    jumboCount,
  })),
  pure
)(({ backImage, backSlider, image, jumboCount }) => {
  const parsedImage = JSON.parse(backImage)
  const safeImage = unless(
    isNil,
    pathOr(false, ['localFile'], parsedImage) ? constant(parsedImage) : F
  )(parsedImage)
  const data = isArray(image)
    ? [image[jumboCount]]
    : [{ image: safeImage || image }]
  const hasImage = xs =>
    xs.some(x => x && x.image && x.image.localFile !== null)
  return (
    <Fragment>
      {hasImage(data) &&
        !isNil(jumboCount) && (
          <Wrapper {...{ backSlider }}>
            <Img
              sizes={data[0].image.localFile.childImageSharp.sizes}
              className={css`
                ${tw('pin')};
              `}
              style={{ position: 'absolute' }}
            />
            <Transition
              native
              items={data}
              keys={data.map(({ image }) => `${image}${uuid()}`)}
              from={{ opacity: 0.0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0.0 }}
            >
              {transitionGroup(data)}
            </Transition>
          </Wrapper>
        )}
    </Fragment>
  )
})
