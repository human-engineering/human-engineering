import React from 'react'
import { View, DimensionValue, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'

interface IBlockProps {
  order: number,
  children?: React.ReactNode,
  style?: any,
}
function Block({ order, children, style, }: IBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <>
      <View style={{
        position: 'absolute', top: `${order}00%` as DimensionValue, width: '100%', height: '100%',
        ...style,
      }}>
        {children}
      </View>
    </>
  )
}

export default Block
