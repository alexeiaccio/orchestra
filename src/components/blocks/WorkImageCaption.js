/* global tw */
import React, { Fragment } from 'react'
import styled, { css } from 'react-emotion'
import Img from 'gatsby-image'
import { connect } from 'react-redux'

import { pageTransition } from '../../actions'

import {
  ColumnThreeFive, ColumnTwoFive, Container, 
  Headers, RichText, Row
} from '../elements'

import { 
  and, constant, equals, ifElse, isNil, 
  safeMap, unless, uuid 
} from '../../helpers'

const RowWrapper = styled('div')`
  ${Row};
  ${tw([
    'items-center', 'md:items-start',
    'py-q72', 'md:py-q200', 'relative'
  ])};
  ${({ hasntImage }) => and(hasntImage, tw(['items-baseline']))};
  color: ${({ theme }) => theme.color};
`

const LeftCol = styled('div')`
  ${tw(['md:text-right'])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnTwoFive), 
    constant(ColumnThreeFive)
  )(grid)};
`

const Header = styled('div')`
  ${Headers};
  ${tw(['mb-q36'])};
  color: ${({ color, theme }) => theme.backgroundColor ? color : theme.logoFill};
`

const RightCol = styled('div')`
  ${tw([
    'flex', 'flex-col', 'items-start'
  ])};
  ${({ grid }) => ifElse(equals('left'), 
    constant(ColumnThreeFive), 
    constant(ColumnTwoFive)
  )(grid)};
`

const Text = styled('div')`
  ${RichText};
  & h2 {
    ${tw(['max-w-xs'])};
  }
  & h3 {
    ${tw(['max-w-xs'])};
    color: ${({ color, theme }) => theme.backgroundColor ? color : theme.logoFill};    
  }
`

export const WorkImageCaption = connect( 
  constant, { pageTransition }
)(({ color, items, pageTransition, primary }) => (
  <div 
    right-image={JSON.stringify(primary.sicimage)}
    sicgrid={primary.sicgrid}
    style={{position: 'relative'}}
    theme={primary.sictheme} 
  >
    <Container>
      <RowWrapper hasntImage={isNil(primary.sicimage && primary.sicimage.localFile)}>
        <LeftCol grid={primary.sicgrid} >
        {unless(isNil,() =>
          <Header
            {...{color}}
            dangerouslySetInnerHTML={{ __html: primary.sicheader.html }}
          />
        )(primary.sicheader)}
        {unless(isNil, () =>
          <div
            className={css`${tw('md:hidden mb-q24 w-full')}`}
          ><Img 
            sizes={primary.sicimage.localFile.childImageSharp.sizes}
          /></div>
        )(primary.sicimage && primary.sicimage.localFile)}
        </LeftCol>
        <RightCol grid={primary.sicgrid} >
        {safeMap(item => (
          <Fragment key={uuid()} >        
          {isNil(item.sictextlink) && unless(isNil,() =>
            <Text key={uuid()} 
              {...{color}}
              dangerouslySetInnerHTML={{ __html: item.sictext.html }}
            />
          )(item.sictext)}
          {item.sictextimage && item.sictextimage.localFile && 
            <div
              className={css`${tw('mt-q24 w-full')}`}
            ><Img key={uuid()}
                sizes={item.sictextimage.localFile.childImageSharp.sizes}
              /></div>
          }
          </Fragment>
        ))(items)}
        </RightCol>
      </RowWrapper>
    </Container>
  </div>
))
