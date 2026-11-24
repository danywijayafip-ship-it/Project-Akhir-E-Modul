import Image from 'next/image';

interface BrandLogosProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
}

export function BrandLogos({ variant = 'dark', compact = false }: BrandLogosProps) {
  const ringClass = variant === 'dark' ? 'ring-white/15' : 'ring-[#E3E6F0]';

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <div
        className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white p-0.5 ring-1 sm:h-9 sm:w-9 ${ringClass}`}
      >
        <Image
          src="/assets/aistudio/LOGO_LINGKARAN_UM_199a9b5b.png"
          alt="Logo Universitas Negeri Malang"
          width={36}
          height={36}
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
        />
      </div>
      <div
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FAFAFA] p-0.5 ring-1 sm:h-9 sm:w-9 ${ringClass}`}
      >
        <Image
          src="/assets/aistudio/images__5__4b934a2f.jpeg"
          alt="Logo Teknologi Pendidikan UM"
          width={36}
          height={36}
          referrerPolicy="no-referrer"
          className="h-full w-full scale-[1.2] object-contain"
        />
      </div>
      {!compact && (
        <div className="flex min-w-0 flex-col leading-tight">
          <span
            className={`truncate font-[family-name:var(--font-space-grotesk)] text-[15px] font-bold tracking-tight sm:text-base lg:text-lg ${
              variant === 'dark' ? 'text-white' : 'text-[#2438C9]'
            }`}
          >
            Project E-Modul TEP 2026
          </span>
          <span
            className={`hidden truncate text-[11px] font-medium tracking-wide sm:block ${
              variant === 'dark' ? 'text-[#C9CEDD]' : 'text-[#4A5160]'
            }`}
          >
            S1 Teknologi Pendidikan · Universitas Negeri Malang
          </span>
        </div>
      )}
    </div>
  );
}
