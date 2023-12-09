import './globals.css'

export const metadata = {
  title: 'Puxin Christmas Lottery',
  description: 'made by HsingFu and the Jesus who loves you!',
  icons: '/small-icon.jpg'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
