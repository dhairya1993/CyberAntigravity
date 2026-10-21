import { ImageResponse } from 'next/og';
import { SCAM_EXPLORER_CATEGORIES } from '@/data/scamTypesExplorerData';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'CyberAntigravity Scam Awareness & Defense Guide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  return SCAM_EXPLORER_CATEGORIES.filter((category) => category.slug !== 'phishing').map(
    (category) => ({
      slug: category.slug,
    })
  );
}

interface ImageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const scam = SCAM_EXPLORER_CATEGORIES.find((item) => item.slug === slug);

  // Sensible fallback behavior for missing or invalid slugs
  if (!scam) {
    return new ImageResponse(
      (
        <CyberAntigravityOgCard
          title="Online Scam Awareness & Defense Guide"
          category="SCAM AWARENESS"
          description="Identify social engineering tactics, recognize psychological red flags, and execute safe defensive procedures."
          badge="DEFENSE GUIDE"
          metaPills={['SCAM DETECTION', 'SAFE RESPONSE']}
          sectionLabel="ONLINE SCAM AWARENESS GUIDE"
        />
      ),
      {
        ...size,
      }
    );
  }

  const categoryName =
    scam.categories && scam.categories.length > 0 && scam.categories[0] !== 'ALL'
      ? scam.categories[0]
      : 'SCAM AWARENESS';

  const pills: string[] = [];
  if (scam.tags && scam.tags.length > 0) {
    pills.push(...scam.tags.slice(0, 2));
  } else {
    pills.push('WARNING SIGNS', 'DEFENSIVE RESPONSE');
  }

  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title={`${scam.title} Scam Defense Guide`}
        category={categoryName}
        description={scam.shortDescription || scam.description}
        badge={`MODULE #${scam.number}`}
        riskLevel={scam.risk}
        metaPills={pills.slice(0, 2)}
        sectionLabel="ONLINE SCAM AWARENESS & PREVENTION GUIDE"
      />
    ),
    {
      ...size,
    }
  );
}
