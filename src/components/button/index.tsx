import React, { } from 'react'
import { TouchableOpacity, View, } from 'react-native'
import { IStores } from '../../state/store'
import { useSelector } from 'react-redux'
import Text from '../text'

interface IButtonProps {
  title: string | React.ReactNode,
  titleColor?: string,
  color?: string,
  fill?: boolean,
  onPress?: () => void,
}
function Button({ title, titleColor, color, fill, onPress, }: IButtonProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 8, borderRadius: Spacing.borderRadius,
          backgroundColor: color, borderWidth: 1,
          borderColor: Colors.white, overflow: 'hidden',
        }}
      >
        <View style={{
            position: 'absolute', zIndex: -1, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />

        <Text style={{
          color: Colors.white, fontSize: Fonts.md, fontWeight: Fonts.featherWeight,
          // textShadowOffset: { width: 0.5, height: 0.5, }, textShadowRadius: 8, textShadowColor: School.tone,
        }}>{title}</Text>
      </TouchableOpacity>
    </>
  )
}

export default Button
