import {
  faUser,
  faCoins,
  faClipboard,
  faMoneyBillTransfer,
  faWallet,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavGroup toggleIcon={faUser} toggleText="Client Area">
        <SidebarNavItem icon={faClipboard} href="/">
          {dict.sidebar.items.trading_account}
          {/* <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small> */}
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faCoins} toggleText={dict.sidebar.items.finance}>
        <SidebarNavItem icon={faWallet} href="/deposit">
          {dict.sidebar.items.deposit}
          {/* <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small> */}
        </SidebarNavItem>
        <SidebarNavItem icon={faMoneyBill} href="/withdraw">
          {dict.sidebar.items.withdraw}
          {/* <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small> */}
        </SidebarNavItem>
        <SidebarNavItem icon={faMoneyBillTransfer} href="/transaction_history">
          {dict.sidebar.items.transaction_history}
          {/* <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small> */}
        </SidebarNavItem>
      </SidebarNavGroup>

     </ul>
  )
}
