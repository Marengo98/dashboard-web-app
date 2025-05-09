'use client'

import { useSidebar } from '@/components/Layout/Dashboard/SidebarProvider'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function HeaderSidebarToggler() {
  const { showSidebar, setShowSidebar } = useSidebar()

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <Button
      variant="link"
      className="header-toggler rounded-0 shadow-none d-md-none" // mostra solo su mobile
      type="button"
      onClick={toggleSidebar}
    >
      <FontAwesomeIcon icon={faBars} />
    </Button>
  )
}
