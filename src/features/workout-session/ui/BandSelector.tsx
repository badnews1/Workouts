/**
 * BandSelector - Селектор выбора резиновой петли
 */

import { BAND_OPTIONS } from '../config';

interface BandSelectorProps {
  exerciseId: string;
  selectedBand?: string;
  onBandChange: (exerciseId: string, bandValue: string) => void;
  disabled?: boolean;
}

export function BandSelector({ exerciseId, selectedBand, onBandChange, disabled }: BandSelectorProps) {
  return (
    <div className="px-3 pb-3 flex gap-2 flex-wrap">
      {BAND_OPTIONS.map((band) => (
        <button
          key={band.value}
          onClick={() => onBandChange(exerciseId, band.value)}
          disabled={disabled}
          className={`px-3 py-1.5 border-3 border-black font-black text-xs transition-all ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            backgroundColor: selectedBand === band.value ? band.color : 'var(--brand-white)',
            color: selectedBand === band.value ? (band.textColor || 'var(--brand-black)') : 'var(--brand-black)',
            boxShadow: selectedBand === band.value ? '3px 3px 0px var(--brand-black)' : '2px 2px 0px var(--brand-black)',
          }}
        >
          {band.label}
        </button>
      ))}
    </div>
  );
}