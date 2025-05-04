'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PATH_TRANSLATIONS: Record<string, string> = {
  home: 'Home',
  trade_account: 'Trade Account',
  withdraw: 'Withdraw Fund',
  deposit: 'Deposit Fund',
  transaction_history:'Transaction History'
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getHref = (index: number) =>
    '/' + segments.slice(0, index + 1).join('/');

  const translate = (segment: string) =>
    PATH_TRANSLATIONS[segment] ?? decodeURIComponent(segment);

  return (
    <div className="text-sm text-gray-600 flex flex-wrap items-center space-x-1">
      <Link href="/" className="hover:underline text-blue-600">Home</Link>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const label = translate(segment);
        return (
          <span key={index} className="flex items-center space-x-2 ">
            <span className='mx-2'>/</span>
            {isLast ? (
              <span className="text-gray-500 capitalize ">{label}</span>
            ) : (
              <Link
                href={getHref(index)}
                className="hover:underline text-blue-600 capitalize mx-1"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
