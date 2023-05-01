import React from "react"
import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import Seo from "../components/seo"
import Teaser from "../components/teaser"
import Layout from "../components/layout"

import * as style from "../style/_style.module.scss"


const IndexPage = ({ data }) => {
  
  const { t } = useTranslation()
  const categoriesRightOrder = data.file.childMdx.exports.categories

  return (
    <Layout>
      <Seo title={t("seo_title_main")} description={t("seo_description_main")} />
      <div className={style.container}>
        <h1 className={style.title}>{t("main_page_title")}</h1>
        <p className={style.aboutText}>{t("about_text")}</p>
      </div>

      <div className={style.categoriesList}>  
        {categoriesRightOrder.map(categorySlug => {
          
          return data.allMdx.nodes.map(category => {
            if(categorySlug === category.frontmatter.slug) {
              
              return <section className={style.categoryItem} key={category.id}>
              <div className={style.container}>
                <h2>{category.frontmatter.title}</h2>

                <div className={style.bestWorksGroup}>
                  {data.allFile.nodes.map(project => {

                    if(project.childMdx.frontmatter.category === category.frontmatter.slug) {

                      return (
                        <div className={style.bestWorks} key={project.childMdx.id}>
                          <Teaser project={project} />
                        </div>
                      )
                    }
                    
                  })}
                </div>
              </div>
            </section>
            } else return false
          })
        })}     
      </div>   
      <div className={style.container}>
        <StaticImage className={style.awards} src="../images/awards.jpg" alt="The award icons" />  
      </div>   
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
query Categories($locale: String) {
  allMdx(
    filter: {fields: {locale: {eq: $locale}}, frontmatter: {category: {eq: "root"}}}
  ) {
    nodes {
      frontmatter {
        hero_image {
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                layout: FULL_WIDTH
              )
            }
          }
          alt
        }
        slug
        title
      }
      id
      excerpt(pruneLength: 150, truncate: true)
    }
  }
  file(name: {eq: "order"}, sourceInstanceName: {eq: "works"}) {
    childMdx {
      exports {
        categories
      }
    }
  }
  allFile(
    filter: {extension: {eq: "mdx"}, sourceInstanceName: {eq: "projects"}, childMdx: {frontmatter: {show_in_main_page: {eq: "yes"}}, fields: {locale: {eq: $locale}}}}
  ) {
    nodes {
      childMdx {
        id
        frontmatter {
          category
          link
          show_in_main_page
          slug
          title
          hero_image {
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            alt
          }
        }
      }
    }
  }
}
`