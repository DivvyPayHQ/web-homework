import DashboardIcon from '../assets/DashboardIcon'
import SettingsIcon from '../assets/SettingsIcon'
import TransactionsIcon from '../assets/TransactionsIcon'

export const NAVIGATION = [
  {
    name: 'dashboard',
    icon: DashboardIcon,
    url: '/dashboard'
  },
  {
    name: 'transactions',
    icon: TransactionsIcon,
    url: '/transactions?page=1'
  },
  {
    name: 'settings',
    icon: SettingsIcon,
    url: '/settings'
  }
]
