import React, { } from 'react'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'

interface IBlockBoxProps {
  children?: React.ReactNode,
  masterRef?: any,
}
function BlockBox({ children, masterRef, }: IBlockBoxProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { mobile, minHeight, } = systemStore
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: minHeight,}}>
      <div ref={masterRef} style={{position: 'absolute', zIndex: 0, width: '100%', height: '100%', overflowY: 'scroll', scrollBehavior: 'smooth',}}>
        {children}
      </div>
    </div>
  )
}

export default BlockBox
