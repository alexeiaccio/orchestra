import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'react-emotion'

import TemplateWrapper from '../components/layouts'

const HowTemplate = ({ data: { how }}) => {
  return (
    <TemplateWrapper
     seo={{
        data: {
          uid: how.uid,
          seotitle: how.data.seotitle,
          seodescription: how.data.seodescription,
          seokeywords: how.data.seokeywords,
          seoimage: how.data.seoimage,
        }
      }}
      lang={how.lang} 
    >
      <div>{how.data.title.text}</div>
      <div className={css`margin-top: 100px;`} >
      {how.data.headerlinks.map(({link, linktitle}, i) => 
        <a key={i} href={link.url}>{ linktitle }</a>
      )}
      </div>
    </TemplateWrapper>
  )
}

export default HowTemplate

export const query = graphql`
  query HowTemplateQuery($lang: String!) {
    how: prismicHow(lang: {eq: $lang}) {
      uid
      lang
      data {
        seotitle
        seodescription
        seokeywords
        seoimage {
          localFile {
            childImageSharp {
              resolutions(width: 1200, height: 630) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
        }
        headerlinks {
          linktitle
          link {
            url
          }
        }
        title {
          text
        }
        jumbo {
          jumboimage {
            localFile {
              childImageSharp {
                sizes(maxWidth: 1920) {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
          }
        }    
      }
    }
  }
`