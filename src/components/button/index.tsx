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
          flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 8,
          backgroundColor: color, borderWidth: 3,
          borderColor: Colors.lightBlue, overflow: 'hidden',
        }}
      >
        <View style={{
            position: 'absolute', zIndex: -1, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />

        <Text style={{
          color: Colors.lightBlue, fontSize: Fonts.lg, fontWeight: Fonts.cruiserWeight,
          // textShadowOffset: { width: 0.5, height: 0.5, }, textShadowRadius: 8, textShadowColor: School.tone,
        }}>{title}</Text>
      </TouchableOpacity>
    </>
  )
}

export default Button
