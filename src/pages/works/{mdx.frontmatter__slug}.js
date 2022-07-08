import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
//import { useLocalization } from "gatsby-theme-i18n"
import Seo from "../../components/seo"
import Layout from "../../components/layout"

import * as style from "../../style/_style.module.scss"


const BlogPost = ({ data }) => {
  const post = data.mdx
  const images = data.allFile.nodes
  //const { t } = useTranslation()
  //const { locale, config } = useLocalization()

  //console.log(data.allFile)
  //console.log(post)
  return (
    <Layout>
      <Seo title={post.frontmatter.title} />

      <div className={`${style.container} ${style.itemService}`}>
        <h1>{post.frontmatter.title}</h1>

        <GatsbyImage
          alt={post.frontmatter.hero_image.alt}
          image={getImage(post.frontmatter.hero_image.image)}
          layout="constrained"
        />

        <article>
          <MDXRenderer>{post.body}</MDXRenderer>
        </article>
      </div>
 
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query PostBySlug($frontmatter__slug: String, $locale: String) {
    mdx(
      frontmatter: {slug: {eq: $frontmatter__slug}}
      fields: {locale: {eq: $locale}}
    ) {
      frontmatter {
        title
        published_at
        hero_image {
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          alt
        }
      }
      body
    }
    allFile(
      filter: {extension: {eq: "jpg"}, relativeDirectory: {eq: $frontmatter__slug}}
    ) {
      nodes {
        relativeDirectory
        id
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`