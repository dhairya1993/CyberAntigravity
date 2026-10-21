import { ImageResponse } from 'next/og';
import { SCAM_EXPLORER_CATEGORIES } from '@/data/scamTypesExplorerData';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'Can You Spot the Phish? Interactive Phishing Learning Lab | CyberAntigravity';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const phishing = SCAM_EXPLORER_CATEGORIES.find((item) => item.slug === 'phishing');

  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title="Can You Spot the Phish? Interactive Phishing Learning Lab"
        category={phishing ? phishing.categories[0] : 'MESSAGING & IDENTITY'}
        description="Inspect simulated deceptive messages, spot psychological red flags, analyze spoofed domains, and test defensive decision-making in a safe educational sandbox."
        badge={phishing ? `MODULE #${phishing.number}` : 'MODULE #01'}
        riskLevel="HIGH"
        metaPills={['INTERACTIVE LAB', 'FAKE LINKS', 'CREDENTIAL DEFENSE']}
        sectionLabel="INTERACTIVE DEFENSIVE SIMULATION LAB"
      />
    ),
    {
      ...size,
    }
  );
}
