import './globals.css'

export const metadata = {
  title: 'Waitlist App',
  description: 'Join our waitlist',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}