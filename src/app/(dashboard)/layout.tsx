import { Container } from 'react-bootstrap'
import React from 'react'
import SidebarOverlay from '@/components/Layout/Dashboard/Sidebar/SidebarOverlay'
import Sidebar from '@/components/Layout/Dashboard/Sidebar/Sidebar'
import SidebarNav from '@/components/Layout/Dashboard/Sidebar/SidebarNav'
import Header from '@/components/Layout/Dashboard/Header/Header'
import Footer from '@/components/Layout/Dashboard/Footer/Footer'
import Breadcrumb from '@/components/Layout/Dashboard/Breadcrumb/Breadcrumb'
import SidebarProvider from '@/components/Layout/Dashboard/SidebarProvider'
import SidebarToggle from '@/components/Layout/Dashboard/Sidebar/SidebarToggle'

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarOverlay />
      <Sidebar>
        <SidebarToggle/>
        <SidebarNav />
      </Sidebar>

      <div className="wrapper d-flex flex-column min-vh-100">
        {/* <Header /> */}
        <Container fluid className='mt-3'>
          <Breadcrumb />
        </Container>
        <div className="body flex-grow-1 px-sm-2 mb-4 mt-2">
          <Container fluid="lg">
            {children}
          </Container>
        </div>

        {/* <Footer /> */}
      </div>

      <SidebarOverlay />
    </SidebarProvider>
  )
}
