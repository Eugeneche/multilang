import React, { useState, useEffect } from 'react'
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import * as style from "../style/_style.module.scss"
import Layout from "../components/layout"
import { useTranslation } from "react-i18next"
import { LocalizedLink as Link } from "gatsby-theme-i18n"
import GalleryItem from '../components/GalleryItem/GalleryItem'
import Video from "../components/Video/Video"


const Project = ({ data }) => {

  const { t } = useTranslation()
  const projectData = data.mdx
  const images = data.allFile.nodes
  let counter = 0, width = ""

  const [isFull, setIsfull] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [currentImage, setCurrentImage] = useState({})
  const [index, setIndex] = useState(0)
  const [deviceWidth, setDeviceWidth] = useState('')

  const styleShow = {
    display: "block"
  }

  const styleHidden = {
    display: "none"
  }

  const showFullImage = (image, index) => {
    setIsfull(true)
    setCurrentImage(image)
    setIndex(index)
  }

  const toggleIsFullImage = (bool) => {
    setIsfull(bool)
  }

  useEffect(() => {
    
    const showReturnButton = () => {
      window.scrollY > 200 && setIsShow(true)
      window.scrollY <= 200 && setIsShow(false)
    };

    window.addEventListener('scroll', showReturnButton);

    return () => {
      window.removeEventListener('scroll', showReturnButton);
    };
  }, []);

  
  useEffect(() => {

    setDeviceWidth(window.innerWidth)
    window.addEventListener('resize', () => setDeviceWidth(window.innerWidth))
    window.removeEventListener('resize', () => setDeviceWidth(window.innerWidth))
    return () => { 
      setDeviceWidth('')}
  }, [])


  return (
    <Layout>
      <Seo title={projectData?.frontmatter?.seo_title} description={projectData?.frontmatter?.seo_description} />
      <div className={style.gap}></div>
      <div className={style.container}>
      <button className={style.buttonReturn} style={isShow ? styleShow : styleHidden}><Link to={`/${data.mdx.frontmatter.category}`}>{t("return")}</Link></button>
        <h1 className={style.title}>{projectData?.frontmatter?.title}</h1>

        {!data.mdx.frontmatter.link ? 

        <div className={`${style.container} ${style.photosGallery}`}>
          {images.map((image, i) => {
            
            if (counter === 0) {

              if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {               
                  width =`100%`
                  counter = 0
              } else if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {         
                  width =`100%`
                  counter = 1
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 2
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(33.333333% - 10px)`
                  counter = 2
              } else if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `100%`
                  counter = 0
              } 

            } else if (counter === 1) {

              if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 2
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(33.333333% - 10px)`
                  counter = 2
              }  else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `100%`
                  counter = 0
              }                    
            } else if (counter === 2) {

              if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {                
                  width = `calc(50% - 10px)`
                  counter = 1
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 0
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(66.666667% - 10px)`
                  counter = 0
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(66.666667% - 10px)`
                  counter = 1
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height &&
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `calc(50% - 10px)`
                  counter = 0
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height &&
                image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `calc(66.666667% - 10px)`
                  counter = 0
              }
            }

            return (
              <>
                {deviceWidth > 1024 ? 
                <div className={style.photo} style={{width: width}} aria-hidden onClick={() => showFullImage(image, i)}>
                  <GatsbyImage
                    key={image.id}
                    alt={projectData?.frontmatter?.title}
                    image={getImage(image)}  
                    style={{width: "100%", height: "100%"}}               
                  />
                </div> :
                <div className={style.photo} style={{width: width}}>
                  <GatsbyImage
                    key={image.id}
                    alt={projectData?.frontmatter?.title}
                    image={getImage(image)}  
                    style={{width: "100%", height: "100%"}}               
                  />
                </div>}
              </>
            )
          })
          
        }
        </div> :
        <Video videoSrcURL={data.mdx.frontmatter.link} />
            
        } 
               
        <article className={style.projectDescription}>
          <MDXRenderer>{projectData?.body}</MDXRenderer>
        </article>
        
      </div>
      {isFull && <GalleryItem 
                  image={currentImage} 
                  images={images} 
                  index={index} 
                  toggleIsFullImage={toggleIsFullImage} />}
    </Layout>
  )
}

export default Project

export const query = graphql`
query ProjectBySlug($slug: String, $locale: String, $fullSlug: String) {
  mdx(frontmatter: {slug: {eq: $slug}}, fields: {locale: {eq: $locale}}) {
    frontmatter {
      title
      seo_title
      seo_description
      hero_image {
        image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
        alt
      }
      link
      category
    }
    body
  }
  allFile(filter: {extension: {eq: "jpg"}, relativeDirectory: {eq: $fullSlug}}) {
    nodes {
      relativeDirectory
      id
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
}
`