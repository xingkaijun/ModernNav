import React from 'react';
import { useSettings, CardSize } from '../context/SettingsContext';

const SIZE_LABELS: Record<CardSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
};

export const SettingsCardSize: React.FC = () => {
  const { cardSize, setCardSize } = useSettings();

  const sizes: CardSize[] = ['sm', 'md', 'lg', 'xl'];

  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/6">
      <h3 className="text-lg font-medium mb-2">Card size</h3>
      <p className="text-sm text-slate-400 mb-4">Choose the size used by cards across the app.</p>

      <div className="flex gap-2">
        {sizes.map((s) => (
          <label key={s} className={`flex-1 cursor-pointer select-none`}>
            <input
              type="radio"
              name="cardSize"
              value={s}
              checked={cardSize === s}
              onChange={() => setCardSize(s)}
              className="sr-only"
            />
            <div
              className={`w-full rounded-lg p-3 text-center border transition-all ${
                cardSize === s
                  ? 'border-primary-400 bg-white/5 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.6)]'
                  : 'border-white/6 bg-transparent'
              }`}
            >
              <div className="text-sm font-medium">{SIZE_LABELS[s]}</div>
              <div className="text-xs text-slate-400 mt-1">Preview</div>
              <div
                aria-hidden
                className={`mx-auto mt-3 bg-white/10 rounded-md`}
                style={{
                  width: s === 'sm' ? 80 : s === 'md' ? 120 : s === 'lg' ? 160 : 220,
                  height: s === 'sm' ? 48 : s === 'md' ? 76 : s === 'lg' ? 100 : 140,
                }}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
