import type { Metadata, Viewport } from "next";
import "./globals.css";


export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberantigravity.com"),
  title: {
    default: "CyberAntigravity | Rise Above Cyber Threats",
    template: "%s | CyberAntigravity",
  },
  description:
    "CyberAntigravity is a premier global cybersecurity education and online safety platform empowering individuals, families, and organizations with proactive digital defense, scam awareness, and ethical security literacy.",
  keywords: [
    "Cybersecurity",
    "Cyber Safety",
    "Online Scam Awareness",
    "Phishing Defense",
    "Password Security",
    "Passkeys",
    "Ethical Hacking Education",
    "Threat Intelligence",
    "Digital Privacy",
    "Device Hardening",
    "OWASP Web Security",
  ],
  authors: [{ name: "CyberAntigravity Editorial & Security Research Team" }],
  creator: "CyberAntigravity",
  publisher: "CyberAntigravity",
  alternates: {
    canonical: "https://cyberantigravity.com",
  },
  openGraph: {
    title: "CyberAntigravity | Rise Above Cyber Threats",
    description:
      "Global cybersecurity education and online safety platform. Actionable guides on cyber safety, scam and fraud awareness, password entropy, and ethical security literacy.",
    url: "https://cyberantigravity.com",
    siteName: "CyberAntigravity",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberAntigravity | Rise Above Cyber Threats",
    description:
      "Global cybersecurity education and online safety platform. Actionable defense guides and scam awareness.",
    creator: "@cyberantigravity",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/cyberantigravity-symbol.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://cyberantigravity.com/#organization",
        name: "CyberAntigravity",
        url: "https://cyberantigravity.com",
        logo: "https://cyberantigravity.com/icon.svg",
        slogan: "Rise Above Cyber Threats.",
        description:
          "Global cybersecurity education and online safety platform providing actionable digital defense, scam awareness, and ethical security training.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@cyberantigravity.com",
          contactType: "Customer Support & Security Disclosure",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://cyberantigravity.com/#website",
        url: "https://cyberantigravity.com",
        name: "CyberAntigravity",
        description: "Rise Above Cyber Threats.",
        publisher: {
          "@id": "https://cyberantigravity.com/#organization",
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
