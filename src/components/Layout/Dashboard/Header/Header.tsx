import Link from 'next/link'
import { Container } from 'react-bootstrap'
import HeaderSidebarToggler from '@/components/Layout/Dashboard/Header/HeaderSidebarToggler'
import HeaderFeaturedNav from '@/components/Layout/Dashboard/Header/HeaderFeaturedNav'
import HeaderNotificationNav from '@/components/Layout/Dashboard/Header/HeaderNotificationNav'
import HeaderProfileNav from '@/components/Layout/Dashboard/Header/HeaderProfileNav'
import Breadcrumb from '@/components/Layout/Dashboard/Breadcrumb/Breadcrumb'

export default function Header() {
  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center px-0">
        <HeaderSidebarToggler />
        <Link href="/" className="header-brand d-md-none">
            <img
         
          height="60"
          src="/assets/brand/logo-total.png"
          alt="TMP Logo"
        />
        </Link>
        {/* <div className="header-nav d-none d-md-flex">
          <HeaderFeaturedNav />
        </div>
        <div className="header-nav ms-auto">
          <HeaderNotificationNav />
        </div>
        <div className="header-nav ms-2">
          <HeaderProfileNav />
        </div> */}
      </Container>
      <div className="header-divider border-top my-2 mx-sm-n2" />
      <Container fluid>
        <Breadcrumb />
      </Container>
    </header>
  )
}
