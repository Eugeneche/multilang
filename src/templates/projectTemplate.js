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
        <Link to={`/${data.mdx.frontmatter.category}`} className={style.buttonReturn} style={isShow ? styleShow : styleHidden}><button>{t("return")}</button></Link>
        <h1 className={style.title}>{projectData?.frontmatter?.title}</h1>

        {!data.mdx.frontmatter.link ? 

        <div className={`${style.container} ${style.photosGallery}`}>
          {images.map((image, i) => {

            //currentImage = image
            //console.log(counter)
            

            if (counter === 0) {

              if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {               
                  width =`100%`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('a')
                  //console.log(counter)
            //console.log(width)
              } else if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {         
                  width =`100%`
                  counter = 1
                  //console.log(i + 1)
                  //console.log('b')
                  //console.log(counter)
            //console.log(width)
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 2
                  //console.log(i + 1)
                  //console.log('c')
                  //console.log(counter)
            //console.log(width)
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(33.333333% - 10px)`
                  counter = 2
                  //console.log(i + 1)
                  //console.log('d')
                  //console.log(counter)
            //console.log(width)
              } else if (image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `100%`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('dd')
                  //console.log(counter)
           // console.log(width)
                } 

            } else if (counter === 1) {

              if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 2
                  //console.log(i + 1)
                  //console.log('e')
                  //console.log(counter)
            //console.log(width)
              } else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(33.333333% - 10px)`
                  counter = 2
                  //console.log(i + 1)
                  //console.log('f')
                  //console.log(counter)
            //console.log(width)
              }  else if (image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `100%`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('ff')
                  //console.log(counter)
            //console.log(width)
              }                    
            } else if (counter === 2) {

              if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {                
                  width = `calc(50% - 10px)`
                  counter = 1
                  //console.log(i + 1)
                  //console.log('g')
                  //console.log(counter)
            //console.log(width)
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(50% - 10px)`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('h')
                  //console.log(counter)
            //console.log(width)
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width >= images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(66.666667% - 10px)`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('i')
                  //console.log(counter)
            //console.log(width)
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height && 
                image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                images[i + 1]?.childImageSharp.gatsbyImageData.width < images[i + 1]?.childImageSharp.gatsbyImageData.height) {
                  width = `calc(66.666667% - 10px)`
                  counter = 1
                  //console.log(i + 1)
                  //console.log('j')
                  //console.log(counter)
            //console.log(width)
              } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height &&
                image.childImageSharp.gatsbyImageData.width < image.childImageSharp.gatsbyImageData.height &&
                !images[i + 1]) {
                  width = `calc(50% - 10px)`
                  counter = 0
                  //console.log(i + 1)
                  //console.log('jj')
                  //console.log(counter)
            //console.log(width)
                } else if (images[i - 1]?.childImageSharp.gatsbyImageData.width < images[i - 1]?.childImageSharp.gatsbyImageData.height &&
                  image.childImageSharp.gatsbyImageData.width >= image.childImageSharp.gatsbyImageData.height &&
                  !images[i + 1]) {
                    width = `calc(66.666667% - 10px)`
                    counter = 0
                    //console.log(i + 1)
                    //console.log('jjj')
                    //console.log(counter)
              //console.log(width)
                  }
          }
            
            //console.log(currentWidth)
            return (
              <>
              {deviceWidth > 1024 ? 
              <div className={style.photo} style={{width: width}} onClick={(e) => showFullImage(image, i)}>
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
          })}
        </div> :
        <iframe width="560" height="315" src="https://www.youtube.com/embed/UWRf3OweYq0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
        } 
               
        <article  className={style.projectDescription}>
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