import { Lightbulb } from 'lucide-react';

interface IntroInfoBlockProps {
  title: string;
  description: string;
}

export function IntroInfoBlock({ title, description }: IntroInfoBlockProps) {
  return (
    <div className="mx-4 mb-6 rounded-3xl p-5 bg-indigo-50">
      <div className="flex gap-4">
        {/* Иконка */}
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
        </div>

        {/* Текст */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
