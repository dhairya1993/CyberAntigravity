import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GamificationToast } from "@/components/gamification/GamificationToast";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

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
  category: "technology",
  classification: "Cybersecurity Education, Digital Safety & Online Scam Awareness",
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CyberAntigravity — Rise Above Cyber Threats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberAntigravity | Rise Above Cyber Threats",
    description:
      "Global cybersecurity education and online safety platform. Actionable defense guides and scam awareness.",
    creator: "@cyberantigravity",
    images: ["/og-image.png"],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "googlef3d16d8655846e9a",
    yandex: "yandex-verification-token",
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/brand/cyberantigravity-symbol.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
        "@type": "EducationalOrganization",
        "@id": "https://cyberantigravity.com/#organization",
        name: "CyberAntigravity",
        url: "https://cyberantigravity.com",
        logo: "https://cyberantigravity.com/brand/cyberantigravity-logo.png",
        slogan: "Rise Above Cyber Threats.",
        description:
          "Global cybersecurity education and online safety platform providing actionable digital defense, scam awareness, and ethical security training.",
        sameAs: [
          "https://twitter.com/cyberantigravity",
          "https://github.com/dhairya1993/CyberAntigravity",
          "https://linkedin.com/company/cyberantigravity"
        ],
        knowsAbout: [
          "Cybersecurity",
          "Phishing Scam Detection",
          "Network Security",
          "Cryptography",
          "Authentication & MFA",
          "Zero Trust Architecture",
          "Privacy & Data Protection"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "dhairyaparekhofficial@gmail.com",
          contactType: "Customer Support & Security Disclosure",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://cyberantigravity.com/#website",
        url: "https://cyberantigravity.com",
        name: "CyberAntigravity",
        description: "Rise Above Cyber Threats — Global Cybersecurity Education Platform.",
        publisher: {
          "@id": "https://cyberantigravity.com/#organization",
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://cyberantigravity.com/blog?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
    ],
  };

  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <head>
        {/* Google tag (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C24569XYGB"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-C24569XYGB');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090e] text-slate-100 antialiased">
        <GoogleAnalytics />
        <AuthProvider>
          {children}
          <GamificationToast />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
