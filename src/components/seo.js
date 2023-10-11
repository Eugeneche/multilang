/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, lang, meta, title, ogImageDefault, ogImageAlt }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        ogImageDefault: file(relativePath: { eq: "social.jpg" }) {
          childImageSharp {
            fixed(height: 630, width: 1200) {
              src
            }
          }
        }
      }
    `
  )

  const metaDescription = description || data.site.siteMetadata.description
  //const defaultTitle = data.site.siteMetadata?.title
  const imagePath = constructUrl(
    data.site.siteMetadata.siteUrl,
    data.ogImageDefault?.childImageSharp?.fixed?.src
  )

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      //titleTemplate={defaultTitle ? `%s / ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: imagePath,
        },
        {
          name: `twitter:image`,
          content: imagePath,
        },
        { property: `twitter:image:alt`, 
          content: ogImageAlt || "Yudai Delgado's website", 
        }, 
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

function constructUrl(baseUrl, path) {
  if (baseUrl === "" || path === "") return "";
  return `${baseUrl}${path}`;
}

export default Seo
