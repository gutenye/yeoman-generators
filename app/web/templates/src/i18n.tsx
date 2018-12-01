import i18next from 'i18next'
import backend from 'i18next-fetch-backend'
import languageDetector from 'i18next-browser-languagedetector'

i18next
  .use(backend)
  .use(languageDetector)
  .init({
    // debug: true,
    lng: 'zh-CN',
    fallbackLng: 'zh-CN',
    ns: ['common'],
    defaultNS: 'common',
    react: {
      wait: true,
    }
  }, () => { })

export const t = i18next.t.bind(i18next)

export default i18next
