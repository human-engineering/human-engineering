import { Text as RNText, TextProps, } from 'react-native'

interface ITextProps {
  children: React.ReactNode,
  props?: TextProps,
  style?: TextProps['style'],
}
function Text({ children, props, style, }: ITextProps) {
  return (
    <RNText {...props} style={[{fontFamily: 'Fx',}, style]} >
      {children}
    </RNText>
  )
}

export default Text
