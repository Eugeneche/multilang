import * as React from "react"
import { useTranslation } from "react-i18next"
import { StaticImage } from "gatsby-plugin-image"
import { useLocalization } from "gatsby-theme-i18n"

import Seo from "../components/seo"
import Layout from "../components/layout"

import * as style from "../style/_style.module.scss"

const Contacts = () => {
  
  const { t } = useTranslation()
  const { locale } = useLocalization()

  const pageToReturn = `https://stirring-mermaid-d8fa23.netlify.app/${locale}/contacts`
  
  return (
    <Layout>
      <Seo title={t("seo_title_contacts")} description={t("seo_description_contacts")} />
      <div className={style.container}>
        <h1 className={style.title}>{t("about")}</h1>

        <div className={style.infoBlock}>
          <ul className={style.links}>
            <li>
              <a className={style.resource} href="https://weva.pro/" target="_blank" rel="noopener noreferrer">
                Weva
              </a> — {t("weva")}
            </li>
            <li>
              <a className={style.resource} href="https://www.fearlessphotographers.com/" target="_blank" rel="noopener noreferrer">
                Fearless Photographers
              </a> — {t("fearless_photographers")}
            </li>
            <li>
              <a className={style.resource} href="https://www.fearlessphotographers.com/" target="_blank" rel="noopener noreferrer">
                Mywed
              </a> — {t("mywed")}
            </li>
            <li>
              <a className={style.resource} href="https://yourockphotographers.com/" target="_blank" rel="noopener noreferrer">
                You Rock Photographers
              </a> — {t("you-rock_photographers")}
            </li>
            <li>
              <a className={style.resource} href="https://www.ighawards.com/" target="_blank" rel="noopener noreferrer">
                Ighawards
              </a> — {t("ighawards")}
            </li>

            
          </ul>
          
        </div>
        
        <div className={style.awardsContacts}>
          <StaticImage src="../images/awards.jpg" alt="The award icons"/>
        </div>
        

        <div className={style.contacts}>
          <StaticImage 
            className={style.aboutPhoto}
            src="../images/me.jpg" 
            alt="my foto"
          />
          <form action="https://submit-form.com/m6LCQqtH">
            <input
              type="hidden"
              name="_redirect"
              value={pageToReturn}
            />
            <input id={style.name} type="text" name="name" placeholder={t("your_name")} />
            <input id={style.phone} type="tel" name="phone" placeholder={t("your_phone")} />
            <input id={style.email} type="email" name="email" placeholder={t("your_email")} />
            <textarea id={style.message} name="message" placeholder={t("your_message")}></textarea>
            <button id={style.submit} type="submit">{t("send")}</button>
          </form>

        </div>

      </div>     
    </Layout>
  )
}

export default Contacts

