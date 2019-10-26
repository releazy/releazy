import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage

    try {
      context.renderPage = () => {
        return originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      }

      const initialProps = await Document.getInitialProps(context)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}

export default MyDocument
