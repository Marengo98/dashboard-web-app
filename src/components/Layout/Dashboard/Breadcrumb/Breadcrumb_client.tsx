'use client';

import { Breadcrumb } from 'react-bootstrap';
import Link from 'next/link';

type Props = {
  items: { href?: string; label: string; active?: boolean }[];
};

export default function BreadcrumbClient({ items }: Props) {
  return (
    <Breadcrumb className="mb-0 align-items-center">
      {items.map((item, index) => (
        <Breadcrumb.Item key={index} active={item.active}>
          {!item.active && item.href ? (
            <Link href={item.href} className="text-decoration-none text-reset">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
