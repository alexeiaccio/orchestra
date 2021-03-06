/* global tw */
import React from 'react'
import Link from 'gatsby-link'
import styled, { css } from 'react-emotion'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import { Img } from './Img'
import { BaseTransition, ImageLinkTransition } from './Transitions'
import { List, DescriptionSemibold, Heading2, Heading6 } from './Typography'

const ImageWrapper = styled('div')`
  ${({ worksGrid }) =>
    worksGrid
      ? tw(['h-full', 'w-full'])
      : tw([
          'flex-no-shrink',
          'h-full',
          'screen:relative',
          'w-full',
          'screen:w-1/2',
        ])};
`

const Image = css`
  ${tw(['pin'])};
`

const HoverImage = css`
  ${tw(['pin', 'opacity-0'])};
  ${ImageLinkTransition};
`

const LinkedImage = styled(Link)`
  ${tw(['flex', 'no-underline', 'relative', 'w-full', 'h-full'])};
  ${({ grid }) =>
    grid === 'true'
      ? tw(['hover:shadow-elevate1'])
      : tw(['flex-col', 'screen:flex-row', 'flex-no-wrap'])};
  ${BaseTransition};

  &:hover {
    & .${HoverImage} {
      ${tw(['shadow-elevate1', 'opacity-100'])};
    }
    & .link-hover {
      ${tw('opacity-100')};
    }
  }
`

const TitleWrapper = styled('div')`
  ${tw(['absolute', 'pin-b', 'pin-l', 'pin-r'])};
  ${({ worksGrid }) =>
    worksGrid
      ? tw(['flex', 'flex-col', 'h-1/2', 'justify-end', 'screen:opacity-0'])
      : tw(['screen:relative'])};
  ${BaseTransition};
  background: ${({ worksGrid }) =>
    worksGrid &&
    'linear-gradient(180deg,' +
      'rgba(0, 0, 0, 0) 0%,' +
      'rgba(0, 0, 0, 0.64) 100%)'};
  @media (max-width: 600px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.64) 100%
    );
  }
`

const Row = styled('div')`
  ${tw([
    'flex',
    'flex-row',
    'flex-no-wrap',
    'items-baseline',
    'justify-between',
    'p-q24',
  ])};
  ${({ worksGrid }) =>
    !worksGrid && tw(['screen:flex-col', 'screen:pt-0', 'screen:pl-q24'])};
`

const Title = styled('h3')`
  ${Heading6};
  ${tw(['mr-1/6', 'text-white', 'screen:w-1/2'])};
  @media (min-width: 601px) {
    ${BaseTransition};
    ${({ worksGrid }) => !worksGrid && Heading2};
    color: ${({ worksGrid }) => (worksGrid ? 'white' : 'black')};
  }
`

const DescriptionText = styled('span')`
  ${tw(['hidden', 'screen:block'])};
  ${({ worksGrid }) => (worksGrid ? DescriptionSemibold : List)};
  ${({ worksGrid }) =>
    worksGrid
      ? tw(['ml-auto', 'text-white', 'min-w-1/2'])
      : tw(['mt-q36', 'text-black'])};
  line-height: 1.125rem;
`

export const LinkImage = connect(
  ({ worksGrid }) => ({ worksGrid }),
  { pageTransition }
)(
  ({
    color,
    statement,
    link,
    image,
    children,
    hoverimage,
    pageTransition,
    title,
    worksGrid,
  }) => (
    <LinkedImage
      {...{ color }}
      grid={worksGrid.toString()}
      onClick={pageTransition}
      to={link.url}
    >
      <ImageWrapper {...{ worksGrid }}>
        <Img className={Image} src={image} style={{ position: 'absolute' }} />
        <Img
          className={HoverImage}
          src={hoverimage}
          style={{ position: 'absolute' }}
        />
      </ImageWrapper>
      <TitleWrapper className="link-hover" {...{ worksGrid }}>
        <Row {...{ worksGrid }}>
          <Title className="title-hover" {...{ worksGrid }}>
            {statement.text}
          </Title>
          <DescriptionText {...{ worksGrid }}>{title}</DescriptionText>
        </Row>
      </TitleWrapper>
      {children}
    </LinkedImage>
  )
)
