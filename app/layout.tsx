

import '@/styles/fonts.css'
import '@/styles/reset.css'
import '@/styles/global.css'
import Providers from '@/providers/Providers'
import { SITE_NAME, SITE_DESCRIPTION } from '@/utils/lib/constants'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Container from '@/components/Container'

import GlobalVarStyle from '@/styles/GlobalVar.module.css'

export const metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#0f0f0f',
      }
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ff3a00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={GlobalVarStyle.GlobalVar}>
      <head>
        <link rel="preload" href="/fonts/ClashDisplay-Variable.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <Providers>
          <Container grow allowChildrenToGrow maxInlineSize={'1200px'}>
            <Header />
            <main>{children}</main>
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  )
}
