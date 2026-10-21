import React from 'react';

export interface OgCardProps {
  title: string;
  category: string;
  description?: string;
  badge?: string;
  metaPills?: string[];
  riskLevel?: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  sectionLabel?: string;
}

export const CyberAntigravityOgCard: React.FC<OgCardProps> = ({
  title,
  category,
  description,
  badge,
  metaPills = [],
  riskLevel,
  sectionLabel = 'RESEARCH & EDUCATION',
}) => {
  // Truncate long descriptions to prevent text clipping
  const cleanDescription = description
    ? description.length > 175
      ? `${description.slice(0, 172)}...`
      : description
    : '';

  // Adaptive font sizing for title
  const titleFontSize = title.length > 75 ? 38 : title.length > 45 ? 44 : 52;

  // Risk styling if provided
  const isCritical = riskLevel === 'CRITICAL';
  const riskBorderColor = isCritical ? 'rgba(244, 63, 94, 0.6)' : 'rgba(245, 158, 11, 0.6)';
  const riskBgColor = isCritical ? 'rgba(225, 29, 72, 0.2)' : 'rgba(217, 119, 6, 0.2)';
  const riskTextColor = isCritical ? '#fda4af' : '#fde68a';
  const riskDotColor = isCritical ? '#f43f5e' : '#f59e0b';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#07090e',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '36px 44px',
        overflow: 'hidden',
      }}
    >
      {/* 1. Ambient Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '650px',
          height: '650px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(14, 165, 233, 0.12) 40%, transparent 70%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-140px',
          left: '-140px',
          width: '550px',
          height: '550px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, transparent 65%)',
          display: 'flex',
        }}
      />

      {/* 2. Cyber Grid Matrix Line Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          display: 'flex',
        }}
      />

      {/* 3. Outer Cyber Card Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '24px',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          backgroundColor: 'rgba(10, 15, 29, 0.75)',
          padding: '38px 46px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Brand Mark & Identity */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Cyber Shield Emblem SVG */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              style={{ marginRight: '16px' }}
            >
              {/* Telemetry Shield Outline */}
              <path
                d="M24 5 L39 10.5 L39 24.5 C39 33.5 24 42.5 24 42.5 C24 42.5 9 33.5 9 24.5 L9 10.5 Z"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeOpacity="0.45"
                strokeDasharray="3 2"
                fill="none"
              />
              {/* Left "C" Flank */}
              <path
                d="M 22 8 L 11 12 L 11 25.5 C 11 33.5, 17.5 38.5, 22.5 41 L 22.5 35.5 C 19 33.5, 15.5 29.5, 15.5 24 L 15.5 15.5 L 22 13 Z"
                fill="#00f0ff"
              />
              {/* Right "A" Flank */}
              <path
                d="M 25.5 7 L 29.5 7 L 37 25.5 C 37 33.5, 30.5 38.5, 25.5 41 L 25.5 35.5 C 29 33.5, 32.5 29.5, 32.5 24 L 28 13.5 L 25.5 13.5 Z"
                fill="#38bdf8"
              />
              {/* Ascending Apex Chevron */}
              <path
                d="M 24 7.5 L 30 20 L 26.5 20 L 24 14.5 L 21.5 20 L 18 20 Z"
                fill="#ffffff"
              />
              {/* Center Crossbar & Node */}
              <path
                d="M 19.5 22.5 L 28.5 22.5 L 27.5 25.5 L 20.5 25.5 Z"
                fill="#a5f3fc"
              />
              <circle cx="24" cy="18" r="2" fill="#ffffff" />
            </svg>

            {/* Wordmark and Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.4px',
                  lineHeight: '1.1',
                }}
              >
                CyberAntigravity
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  fontWeight: 700,
                  color: '#22d3ee',
                  letterSpacing: '2.8px',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                RISE ABOVE CYBER THREATS.
              </div>
            </div>
          </div>

          {/* Right Badges */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {riskLevel && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  backgroundColor: riskBgColor,
                  border: `1px solid ${riskBorderColor}`,
                  marginRight: '12px',
                }}
              >
                <div
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: riskDotColor,
                    marginRight: '7px',
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: riskTextColor,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {riskLevel} RISK
                </span>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '7px 16px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(6, 182, 212, 0.14)',
                border: '1px solid rgba(34, 211, 238, 0.45)',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  backgroundColor: '#00f0ff',
                  marginRight: '8px',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#67e8f9',
                  letterSpacing: '1.4px',
                  textTransform: 'uppercase',
                }}
              >
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Center Main Content (Title & Excerpt) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '22px 0',
          }}
        >
          {sectionLabel && (
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#38bdf8',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              {sectionLabel}
            </div>
          )}

          <div
            style={{
              fontSize: `${titleFontSize}px`,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: '1.18',
              letterSpacing: '-0.025em',
              marginBottom: cleanDescription ? '16px' : '0px',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.6)',
              maxHeight: '180px',
              overflow: 'hidden',
            }}
          >
            {title}
          </div>

          {cleanDescription && (
            <div
              style={{
                fontSize: '20px',
                color: '#94a3b8',
                lineHeight: '1.45',
                maxHeight: '62px',
                overflow: 'hidden',
              }}
            >
              {cleanDescription}
            </div>
          )}
        </div>

        {/* Bottom Footer Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Metadata Pills */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {badge && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginRight: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#e2e8f0',
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {badge}
                </span>
              </div>
            )}

            {metaPills.map((pill, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(71, 85, 105, 0.5)',
                  marginRight: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#cbd5e1',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {pill}
                </span>
              </div>
            ))}
          </div>

          {/* Right Domain & Verification Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(34, 211, 238, 0.25)',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginRight: '7px' }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#22d3ee',
                letterSpacing: '0.3px',
              }}
            >
              cyberantigravity.vercel.app
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
