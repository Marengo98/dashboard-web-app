import '@/styles/globals.scss'
// Next.js allows you to import CSS directly in .js files.
// It handles optimization and all the necessary Webpack configuration to make this work.
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import DictionaryProvider from '@/locales/DictionaryProvider'
import { getDictionary } from '@/locales/dictionary'
import getTheme from '@/themes/theme'
import { SessionProvider } from 'next-auth/react'
import SessionWrapper from '@/components/SessionWrapper'

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary()


  return (
    <html lang="en" data-bs-theme={getTheme()}>
    <body>
      <SessionWrapper>
        <ProgressBar />
        <DictionaryProvider dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </SessionWrapper>
    </body>
  </html>
  )
}
