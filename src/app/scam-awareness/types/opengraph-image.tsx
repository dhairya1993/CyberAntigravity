import { ImageResponse } from 'next/og';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'CyberAntigravity Scam Types Explorer — Know the Scam. Spot the Pattern.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title="Scam Types Explorer — Know the Scam. Spot the Pattern."
        category="THREAT INTELLIGENCE"
        description="Explore the most common online scam categories, analyze deceptive tactics, and learn how to respond safely."
        badge="12 SCAM VECTORS"
        metaPills={['DETECTION SIGNALS', 'DEFENSIVE RESPONSE', 'SAFE SANDBOX']}
        sectionLabel="ONLINE SCAM DIRECTORY & DEFENSE"
      />
    ),
    {
      ...size,
    }
  );
}
