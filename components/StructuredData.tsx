export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aurlink",
    "description": "Decentralized AI Infrastructure and Cognitive Blockchain Platform",
    "url": "https://aurlink.com",
    "logo": "https://aurlink.io/logo.png",
    "sameAs": [
      "https://t.me/aurlinkupdates",
      "https://facebook.com/aurlink"
    ],
    "founder": {
      "@type": "Person",
      "name": "Aurlink Team"
    },
    "foundingDate": "2024",
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Decentralized AI",
      "Blockchain Technology",
      "Cognitive Computing",
      "Web3 Infrastructure"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}