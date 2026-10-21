import { ImageResponse } from 'next/og';
import { BLOG_ARTICLES, calculateArticleReadingTime } from '@/data/blogArticles';
import { CyberAntigravityOgCard } from '@/components/og/CyberAntigravityOgCard';

export const alt = 'CyberAntigravity Blog & Threat Research Guide';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  return BLOG_ARTICLES.filter((a) => a.status === 'published').map((article) => ({
    slug: article.slug,
  }));
}

interface ImageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  // Sensible fallback behavior for missing or invalid slugs
  if (!article) {
    return new ImageResponse(
      (
        <CyberAntigravityOgCard
          title="Cybersecurity Defense & Threat Research"
          category="SECURITY RESEARCH"
          description="Actionable cybersecurity education, threat defense guides, and digital safety intelligence."
          badge="SECURITY GUIDE"
          metaPills={['CYBER DEFENSE', 'ONLINE SAFETY']}
          sectionLabel="CYBERSECURITY RESEARCH & ANALYSIS"
        />
      ),
      {
        ...size,
      }
    );
  }

  const readingTime =
    article.readingTime || calculateArticleReadingTime(article.content, article.excerpt);

  const pills: string[] = [readingTime];
  if (article.difficulty) {
    pills.push(article.difficulty.toUpperCase());
  }
  if (article.tags && article.tags.length > 0) {
    pills.push(article.tags[0].toUpperCase());
  }

  return new ImageResponse(
    (
      <CyberAntigravityOgCard
        title={article.title}
        category={article.category.toUpperCase()}
        description={article.description || article.excerpt}
        badge="RESEARCH GUIDE"
        metaPills={pills.slice(0, 3)}
        sectionLabel="CYBERSECURITY RESEARCH & ANALYSIS"
      />
    ),
    {
      ...size,
    }
  );
}
