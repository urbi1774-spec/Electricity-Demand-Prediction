import React from 'react';

export default function SectionHeader({ eyebrow, title, subtitle, icon: Icon, align = 'left' }) {
  const isCentered = align === 'center';

  return (
    <div className={`mb-10 ${isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-[#B8A5D6]/60 bg-[#F7F4FC] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#625288] mb-3 shadow-xs ${
            isCentered ? 'justify-center' : ''
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-[#7A67A6]" />}
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#34354A]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#5C5E76] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
