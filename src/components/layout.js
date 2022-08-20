/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

 import * as React from "react"
 import { useTranslation } from "react-i18next"
 import { graphql } from "gatsby"
 import "./layout.css"
 import Aside from "./aside"
 import Footer from "./footer"
 
 const Layout = ({ children }) => {
   const { t } = useTranslation()

   return (
     <>
       <Aside siteTitle={t("app_name") || `Title`} />
       <div className="content">
         <main>{children}</main>
 
         <Footer />
       </div>
     </>
   )
 }
 
 export default Layout