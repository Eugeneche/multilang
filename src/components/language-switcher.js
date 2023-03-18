import * as React from "react"
import { navigate } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
//import Form from "react-bootstrap/Form"

function LanguageSwitcher() {
  const { locale, defaultLang, config } = useLocalization()
  const switchLanguage = e => {
    // Avoid an unnecessary page load if the
    // user selected the already active locale
    if (e.target.value === locale) {
      return
    }
    // Go to the home page corresponding to the 
    // selected locale
    if (e.target.value === defaultLang) {
      navigate("/")
    } else {
      navigate(`/${e.target.value}`)
    }
  }
  return (
    <div>    
      <select value={locale}
        onChange={switchLanguage} 
        style={{/* height: "25px", */
        fontFamily: `'Exo 2', sans-serif`,
        border: "1px solid #e1e1e1",
        borderRadius: "4px"}}>
        {config.map(c => (
          <option key={c.code} value={c.code}>
            {c.localName}         
          </option>
        ))}
      </select>
    </div>
  )
}
export default LanguageSwitcher