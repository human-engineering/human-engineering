import React, { } from 'react'
import { View, TextInput, } from 'react-native'

interface IInputProps {
  value?: string,
  placeholder?: string,
  icon?: string,
}
function Input({ value, placeholder, }: IInputProps) {
  return (
    <>
      <View style={{borderWidth: 1, borderColor: 'blue', borderRadius: 32, padding: 12,}}>
        <View style={{flex: 1,}}>
          <TextInput
            value={value}
            placeholder={placeholder}
            style={{fontSize: 14,}}
          />
        </View>
      </View>
    </>
  )
}

export default Input
