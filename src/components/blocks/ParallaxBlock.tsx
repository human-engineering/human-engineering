import React from 'react'
import { View, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Text from '../text'
import { organization } from '../../utils/constants'
import Block from './Block'

const word = organization

interface IParallaxBlockProps {
  order: number,
}
function ParallaxBlock({ order, }: IParallaxBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  return (
    <Block order={order}>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: Fonts.xs, fontWeight: Fonts.welterWeight, color: Colors.white,}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.sm, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.md, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.lg, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.xl, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.xxl, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16,}}>
        <Text style={{fontSize: Fonts.xxxl, fontWeight: Fonts.welterWeight, color: Colors.white, textAlign: 'center',}}>{word}</Text>
      </View>
    </Block>
  )
}

export default ParallaxBlock
