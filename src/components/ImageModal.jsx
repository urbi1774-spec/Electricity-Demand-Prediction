import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#34354A]/45 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <div
        className="relative max-w-5xl w-full rounded-2xl border border-[#E5DDF2] bg-white p-4 sm:p-6 shadow-2xl shadow-[#34354A]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-[#EFEAF7]">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#34354A]">{image.title}</h3>
            <p className="text-[11px] font-mono text-[#6B6D85]">
              Exported Matplotlib / Seaborn output from the project notebook
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg bg-[#F7F4FC] border border-[#E5DDF2] text-[#34354A] hover:bg-[#EFE9FA] hover:border-[#B8A5D6] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl bg-[#FFFCF8] border border-[#EFEAF7] p-3 max-h-[75vh] overflow-auto flex items-center justify-center">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[70vh] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
