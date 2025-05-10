import React, { useRef, useState } from 'react'
import { Animated, Dimensions, Linking, TouchableOpacity, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import Text from '../text'
import { email } from '../../utils/constants'

const quote = '"Any sufficiently advanced technology is indistinguishable from magic." - Arthur C. Clarke'

const lines = [
  'creating technology that',
  'elevates the human experience',
  'is the purpose of all engineering.',
  'technology should not just make our lives',
  'easier—it should entertain, inspire,',
  'mystify, and make us fall in love.',
  'science fiction does not exceed',
  'our grasp; it exceeds our nerve.',
  'and in a world of stagnation,',
  'embracing change is an act of',
  'revolution & bravery.',
  '',
  'human engineering is focused on',
  'adapting people\'s perception of technology,',
  'what it is capable of, and how it can transform lives.',
]

interface IHeroBlockProps {
  order: number,
}
function HeroBlock({ order, }: IHeroBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const [displayedQuote, setDisplayedQuote] = useState('')

  const animatedTitleRef = useRef(new Animated.Value(1)).current
  const animatedTitleOpacity = animatedTitleRef.interpolate({ inputRange: [0, 1], outputRange: [0, 1], })
  const animatedLinesRef = useRef(lines.map(() => new Animated.Value(Dimensions.get('window').height))).current
  const animatedFooterRef = useRef(new Animated.Value(0)).current
  const animatedFooterOpacity = animatedFooterRef.interpolate({ inputRange: [0, 1], outputRange: [0, 1], })
  const animateQuote = () => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedQuote(() => quote.slice(0, i + 1))
      i++
      if (i >= quote.length) clearInterval(interval)
    }, 80)
  }
  const animate = () => {
    Animated.timing(animatedTitleRef, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start()
    animateQuote()
    let cumulativeDelay = 600
    Animated.parallel(animatedLinesRef.map((val, index) => {
      const duration = 300 + (1 - (1 - Math.pow(2 * (index / (animatedLinesRef.length - 1)) - 1, 2))) * 500
      const animation = Animated.timing(val, {
        toValue: 0,
        duration: duration,
        delay: cumulativeDelay,
        useNativeDriver: true,
      })
      cumulativeDelay += duration * 0.5
      return animation
    })).start(() => {
      Animated.timing(animatedFooterRef, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start()
    })
  }

  return (
    <Block order={order} style={{overflow: 'hidden', backgroundColor: Colors.safeLightestBackground,}}>
      <Animated.View style={{
        position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingMd,
        opacity: animatedTitleOpacity,
      }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={animate}
        >
          <Text style={{color: Colors.safeDarker, fontSize: Fonts.lg, fontWeight: Fonts.featherWeight, userSelect: 'none',}}>human engineering</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          position: 'absolute', zIndex: -1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <Text style={{color: Colors.safeDarker, fontSize: Fonts.sm, fontWeight: Fonts.lightWeight, userSelect: 'none', bottom: lines.length * 16,}}>
          {displayedQuote}<Text style={{color: (displayedQuote.length > 0) && (displayedQuote.length < quote.length) ? Colors.middleGrey : Colors.transparent,}}>{'▌'}</Text>
        </Text>
      </Animated.View>

      {lines.map((line, i) => {
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
              transform: [{ translateY: Animated.add(animatedLinesRef[i], new Animated.Value((i - lines.length / 2 + 0.5) * 20)), }, ],
            }}
          >
            <Text style={{color: Colors.safeDarker, fontSize: Fonts.sm, fontWeight: Fonts.lightWeight, userSelect: 'none',}}>{line}</Text>
          </Animated.View>
        )
      })}

      <Animated.View style={{
        position: 'absolute', zIndex: 1, width: '100%', bottom: 0, justifyContent: 'flex-end', alignItems: 'center', padding: Spacing.paddingMd,
        opacity: animatedFooterOpacity,
      }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`mailto:${email}`)
          }}
        >
          <Text style={{color: Colors.darkerBlue, fontSize: Fonts.lg, fontWeight: Fonts.featherWeight, userSelect: 'none',}}>get in touch.</Text>
        </TouchableOpacity>
      </Animated.View>
    </Block>
  )
}

export default HeroBlock
