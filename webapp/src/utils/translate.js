import { translateContent } from './translation-content'

export const translate = lookup => {
  // Use Local Storage instead of app storage (aka redux) to have data persist through browser sessions
  const localStorage = window.localStorage
  const locale = localStorage.getItem('divvyLocale') || 'en'
  const content = translateContent[lookup]?.[locale]
  return content || lookup || ''
}
