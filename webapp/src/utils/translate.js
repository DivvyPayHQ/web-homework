import { translateContent } from './translation-content'

export const translate = lookup => {
  const localStorage = window.localStorage
  const locale = localStorage.getItem('divvyLocale') || 'en'
  const content = translateContent[lookup]?.[locale]
  return content || lookup || ''
}
