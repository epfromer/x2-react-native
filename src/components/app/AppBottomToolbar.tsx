import React, { useContext, useState } from 'react'
import { Icon, ThemeContext } from 'react-native-elements'
import BottomNavigation, {
  FullTab,
} from 'react-native-material-bottom-navigation'
import { textColor } from '../../utils/appThemes'

// https://www.npmjs.com/package/react-native-material-bottom-navigation

export default function AppBottomToolbar() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const { theme }: any = useContext(ThemeContext)
  const barColor = theme.Header.containerStyle.backgroundColor

  const tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor,
      action: () => navigate('/'),
    },
    {
      key: 'search',
      icon: 'search',
      label: 'Search',
      barColor,
      action: () => navigate('/SearchView'),
    },
  ]

  const renderTab = ({ tab, isActive }: any) => (
    <FullTab
      isActive={isActive}
      key={tab.icon}
      label={tab.label}
      labelStyle={{ color: textColor(theme) }}
      renderIcon={() => (
        <Icon
          size={24}
          color={textColor(theme)}
          name={tab.icon}
          tvParallaxProperties={undefined}
        />
      )}
    />
  )

  return (
    <BottomNavigation
      activeTab={activeTab}
      onTabPress={(tab: any) => {
        setActiveTab(tab.key)
        tab.action()
      }}
      renderTab={renderTab}
      tabs={tabs}
    />
  )
}
