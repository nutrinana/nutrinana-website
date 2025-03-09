export const metadata = {
  title: "Nutrinana's Activated Granola",
  description: "Discover Nutrinana’s Activated Granola, made with activated nuts for better digestion. Shop online via DELLI or find us at the Black Farmer Market in Brixton. A perfect start to your day!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
