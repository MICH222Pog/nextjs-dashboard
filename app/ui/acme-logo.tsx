import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <CurrencyDollarIcon className="h-16 w-16 rotate-[15deg]" />
      <p className="text-[38px]">PayUp</p>
    </div>
  );
}
