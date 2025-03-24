import React, { useState } from 'react'
import { View, TextInput, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import BlurBackground from '../blurBackground'

interface IInputProps {
  value?: string,
  placeholder?: string,
  icon?: string,
  multiline?: boolean,
}
function Input({ value, placeholder, icon, multiline, }: IInputProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const [height, setHeight] = useState<number | undefined>(undefined)

  return (
    <>
      <View style={{flex: 1, borderRadius: Spacing.borderRadius, marginBottom: 16, padding: Spacing.paddingSm, backgroundColor: Colors.safeDarker,}}>
        <View style={{flex: 1,}}>
          <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.safeLight}
            style={{color: Colors.white, fontSize: 14, flexWrap: 'wrap', height: height, ...{outlineStyle: 'none', outlineWidth: 0,} as any,}}
            multiline={multiline}
            // textAlign={'left'}
            // textAlignVertical={'bottom'}
            onContentSizeChange={(event) => {
              const newHeight = event.nativeEvent.contentSize.height
              setHeight(Math.min(newHeight, 4 * 20))
            }}
          />
        </View>
      </View>
    </>
  )
}

export default Input
