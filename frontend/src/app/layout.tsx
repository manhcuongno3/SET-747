import React from 'react'
import Providers from './providers' // Import the Providers component

export const metadata = {
  title: 'Todo',
  description: 'A scalable Next.js app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
