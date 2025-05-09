'use client';

import { useSidebar } from '@/components/Layout/Dashboard/SidebarProvider';
import classNames from 'classnames';

export default function SidebarOverlay() {
  const { showSidebar, setShowSidebar } = useSidebar();

  const hideSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div
      tabIndex={-1}
      aria-hidden
      className={classNames(
        'sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50',
        {
          'd-none': !showSidebar,
        }
      )}
      onClick={hideSidebar}
    />
  );
}
