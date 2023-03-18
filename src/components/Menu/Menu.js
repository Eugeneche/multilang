import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LocalizedLink } from "gatsby-theme-i18n"
import LanguageSwitcher from "../language-switcher"
import { useLocalization } from "gatsby-theme-i18n"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import * as style from "./_Menu.module.scss"
import logo from "../../images/logo.png"
import yt from "../../images/yt_monochrome.svg"
import fb from "../../images/fb_monochrome.svg"
import insta from "../../images/insta_monochrome.svg"
import menu from "../../images/menu_2.svg"
import close from "../../images/close_menu.svg"


const Menu = () => {

  const query = useStaticQuery(graphql`
    query MainMenu {
      allFile(filter: {extension: {eq: "png"}}) {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData
          }
          id
        }
      }
      allMdx(filter: {frontmatter: {category: {eq: "root"}}}) {
        nodes {
          frontmatter {
            slug
            title
          }
          id
          fields {
            locale
          }
        }
      }
      file(name: {eq: "order"}, sourceInstanceName: {eq: "works"}) {
        childMdx {
          exports {
            categories
          }
        }
      }
    }
  `)

  
  const { t } = useTranslation()
  const { locale } = useLocalization()
  const flags = query.allFile.nodes
  const categories = query.allMdx.nodes
  const categoriesRightOrder = query.file.childMdx.exports.categories

  const [show, setShow] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  const shadowHidden = {
    display: "none"
  }
  
  const shadowShown = {
    display: "block"
  }

  const backgroundHidden = {
    right: "-300px"
  }

  const backgroundShown = {
    right: "0",
  }
  
  const styleNormal = {
    position: "relative",
    transition: "all ease 0.5s",
    top: "0"
  }
  
  const styleFixed = {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    marginRight: "auto",
    marginLeft: "auto",
    background: "#fff",
    transition: "all ease 0.5s"
  } 

  useEffect(() => {
    
    const fixMenu = () => {
      window.scrollY > 200 && setIsFixed(true)
      window.scrollY <= 200 && setIsFixed(false)
    };

    window.addEventListener('scroll', fixMenu);

    return () => {
      window.removeEventListener('scroll', fixMenu);
    };
  }, []);

  return (
    <>     
    
      <nav className={style.header}>
        <div className={style.logo}>
        <LocalizedLink to="/"><img src={logo} alt="logo"></img></LocalizedLink>
        </div>

        <div className={style.pagesBackground} style={isFixed ? styleFixed : styleNormal}>
        <ul className={style.pages}>
          <li>
            <LocalizedLink to={`/`}>{t("home")}</LocalizedLink>
          </li>
          <li>
            <LocalizedLink to={`/wedding-photos`}>{t("photo")}</LocalizedLink>
          </li>
          <li>
            <LocalizedLink to={`/wedding-video`}>{t("video")}</LocalizedLink>
          </li>
          {/* <li className={style.works}>
            {t("works")}&nbsp;&nbsp;
              <span>&#10095;
              </span>
            <ul className={style.worksList}>
              {categoriesRightOrder.map(category => {
                return categories.map(title => {
                  if(category === title.frontmatter.slug && title.fields.locale === locale) {
                    return <li key={title.id}>
                      <LocalizedLink to={`/${title.frontmatter.slug}`}>{title.frontmatter.title}</LocalizedLink>
                    </li>
                  }
                })
              })}     
            </ul>
          </li> */}
          <li>
            <LocalizedLink to="/prices">
              {t("prices")}
            </LocalizedLink>
          </li>
          <li>
            <LocalizedLink to="/contacts">
              {t("contacts")}
            </LocalizedLink>
          </li>

          <ul className={style.languages}>
            <li>
              {flags.map(flag => {
                if(flag.name === locale) {
                  return <GatsbyImage
                  key={flag.id}
                  image={flag.childImageSharp.gatsbyImageData}
                  style={{"aspectRatio": "1/1", position: "relative", top: "2px", marginRight: "10px"}}
                  alt="flag"
                />
                } 
              })}
            </li>
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

        </ul></div>
      </nav> 
      
      <div className={style.mobileMenu}>
        <div className={style.logo}>
          <LocalizedLink to="/"><img onClick={() => setShow(false)} src={logo} alt="logo"></img></LocalizedLink>
        </div>
        <button onClick={() => setShow(true)}>
          <img className={style.hamburger} src={menu} alt="menu"></img>
        </button>
        <div className={style.shadow} style={show ? shadowShown : shadowHidden}>
          <div className={style.background} style={show ? backgroundShown : backgroundHidden}>
            <button onClick={() => setShow(false)}>
              <img className={style.closeButton} src={close} alt="close menu"></img>
            </button>
            
          <nav className={style.mainMenu}>

            <ul className={style.languages}>
              <li>
                {flags.map(flag => {
                  if(flag.name === locale) {
                    return <GatsbyImage
                    key={flag.id}
                    image={flag.childImageSharp.gatsbyImageData}
                    style={{"aspectRatio": "1/1", position: "relative", top: "2px", marginRight: "10px"}}
                    alt="flag"
                  />
                  }
                })}
              </li>
              <li>
                <LanguageSwitcher onClick={() => setShow(false)} />
              </li>
            </ul>

            <ul className={style.pages}>
              <li>
                <LocalizedLink to={`/`} onClick={() => setShow(false)}>{t("home")}</LocalizedLink>
              </li>
              <li>
                <LocalizedLink to={`/wedding-photos`}>{t("photo")}</LocalizedLink>
              </li>
              <li>
                <LocalizedLink to={`/wedding-video`}>{t("video")}</LocalizedLink>
              </li>
              {/* <li className={style.worksMobile}>
                {t("works")}
                <ul className={style.worksList}>
                  {categoriesRightOrder.map(category => {
                    return categories.map(title => {
                      if(category === title.frontmatter.slug && title.fields.locale === locale) {
                        return <li key={title.id}>
                          <LocalizedLink to={`/${title.frontmatter.slug}`} onClick={() => setShow(false)}>{title.frontmatter.title}</LocalizedLink>
                        </li>
                      }
                    })
                  })}     
                </ul>
              </li> */}
              <li>
                <LocalizedLink to="/prices" onClick={() => setShow(false)}>{t("prices")}</LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/contacts" onClick={() => setShow(false)}>{t("contacts")}</LocalizedLink>
              </li>

            </ul>
            
            <ul className={style.socials}>
              <li>             
                <a href="https://www.facebook.com/wisotskiy" target="_blank" rel="noopener noreferrer">
                  <img className={style.fb} src={fb} alt="facebook logo" onClick={() => setShow(false)}></img>
                </a>
              </li>
              <li>             
                <a href="https://www.youtube.com/channel/UCARc7cdl8tt5e2Dr1OVokig" target="_blank" rel="noopener noreferrer">
                  <img className={style.yt} src={yt} alt="youtube logo" onClick={() => setShow(false)}></img>
                </a>
              </li>
              <li>             
                <a href="https://www.instagram.com/yaroslaw.wisotskiy/" target="_blank" rel="noopener noreferrer">
                  <img className={style.insta} src={insta} alt="instagram logo" onClick={() => setShow(false)}></img>
                </a>
              </li>
            </ul>                                         
          </nav>     
          </div>
        </div>

      </div>
    </>
  )
}
export default Menu