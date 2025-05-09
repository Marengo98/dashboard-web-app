'use client';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '../SidebarProvider';

export default function SidebarToggle() {
  const { setShowSidebar } = useSidebar();

  return (
    <Button
      variant="outline-primary"
      className="d-md-none mb-3"
      onClick={() => setShowSidebar(true)}
    >
      <FontAwesomeIcon icon={faBars} />
    </Button>
  );
}
