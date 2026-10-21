import { ImageResponse } from 'next/og';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'CyberAntigravity Cybersecurity Knowledge Hub & Research Guides';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title="Cybersecurity Knowledge Hub & Research Library"
        category="KNOWLEDGE HUB"
        description="Practical cybersecurity guides, scam awareness explainers, digital privacy tips, and proactive defensive security knowledge."
        badge="RESEARCH & GUIDES"
        metaPills={['THREAT DEFENSE', 'FREE RESEARCH', 'STEP-BY-STEP']}
        sectionLabel="CYBERSECURITY RESEARCH & PLAYBOOKS"
      />
    ),
    {
      ...size,
    }
  );
}
