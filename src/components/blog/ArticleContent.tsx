'use client';

import React, { useState } from 'react';
import { BlogPost, BlogFAQ } from '@/types';
import { ArticleCallout } from './ArticleCallout';
import { ChevronDown, HelpCircle, Table as TableIcon } from 'lucide-react';

interface ArticleContentProps {
  article: BlogPost;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const { content } = article;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed text-base">
      {/* Introduction */}
      {content.introduction && (
        <div className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed pt-2">
          {content.introduction}
        </div>
      )}

      {/* Main Sections */}
      {content.sections.map((section) => (
        <section key={section.id} id={section.id} className="space-y-5 scroll-mt-24">
          {/* H2 Section Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-4 border-t border-slate-800/60">
            {section.title}
          </h2>

          {/* Section Main Text */}
          {section.content && (
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {section.content}
            </p>
          )}

          {/* Optional Callout */}
          {section.callout && (
            <ArticleCallout
              type={section.callout.type}
              title={section.callout.title}
              text={section.callout.text}
            />
          )}

          {/* Subsections (H3) */}
          {section.subsections && section.subsections.length > 0 && (
            <div className="space-y-5 pl-2 sm:pl-4 border-l-2 border-slate-800 my-4">
              {section.subsections.map((sub) => (
                <div key={sub.id} id={sub.id} className="space-y-2 scroll-mt-24">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {sub.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Optional Table */}
          {section.table && (
            <div className="my-6 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                <TableIcon className="w-3.5 h-3.5" />
                <span>Reference Matrix:</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-200 font-mono text-xs uppercase">
                    <tr>
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-normal">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-slate-300 leading-relaxed">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* FAQs Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section id="faqs" className="space-y-6 pt-6 border-t border-slate-800 scroll-mt-24">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {content.faqs.map((faq: BlogFAQ, index: number) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/90 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 bg-slate-950/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Conclusion */}
      {content.conclusion && (
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <h3 className="text-xl font-bold text-white tracking-tight">Summary & Next Steps</h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {content.conclusion}
          </p>
        </div>
      )}
    </div>
  );
};
