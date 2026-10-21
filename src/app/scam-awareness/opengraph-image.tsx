import { ImageResponse } from 'next/og';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'CyberAntigravity Scam Awareness Learning Hub — Spot the Scam. Protect Yourself.';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title="Scam Awareness Learning Hub — Spot the Scam. Protect Yourself."
        category="LEARNING HUB"
        description="Learn how modern scams manipulate trust, urgency, and emotion — then practice identifying them through interactive scenarios."
        badge="CYBER DEFENSE"
        metaPills={['SOCIAL ENGINEERING', 'RED FLAGS', 'SIMULATOR LABS']}
        sectionLabel="DEFENSIVE CYBER EDUCATION"
      />
    ),
    {
      ...size,
    }
  );
}
