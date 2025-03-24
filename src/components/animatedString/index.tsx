import React, { useEffect, useState, useRef } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Text from '../text'

interface AnimatedStringProps {
  style?: any,
  delay?: number,
}

const AnimatedString: React.FC<AnimatedStringProps> = ({ style, delay = 0 }) => {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

  const transformations: any = {
    'human ': 'h.',
    'engineering ': 'e.',
    'laboratories ': 'labs/'
  }

  const words = Object.keys(transformations)
  const [progress, setProgress] = useState<number[]>(words.map(() => 0))
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    setProgress(words.map(() => 0))
    timeoutRef.current = setTimeout(() => {
      let startTime = Date.now()
      const duration = 1500
      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        if (elapsed < duration) {
          const newProgress = words.map((_, index) => {
            const wordDuration = duration / 2
            const wordStartTime = index * (duration / 3)
            const wordElapsed = elapsed - wordStartTime
            if (wordElapsed <= 0) return 0
            if (wordElapsed >= wordDuration) return 1
            return wordElapsed / wordDuration
          })
          setProgress(newProgress)
          animationRef.current = requestAnimationFrame(animate)
        } else setProgress(words.map(() => 1))
      }
      animationRef.current = requestAnimationFrame(animate)
    }, delay)
    
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [delay])
  
  const interpolateWord = (word: string, prog: number) => {
    const target = transformations[word.toLowerCase()] || word
    if (prog === 0) return word
    if (prog === 1) return target
    const originalLength = word.length
    const targetLength = target.length
    if (target.startsWith(word[0])) {
      const currentLength = Math.max(1, Math.round(originalLength - (originalLength - targetLength) * prog))
      if (currentLength === targetLength) return target
      else return word.substring(0, currentLength) + (currentLength < originalLength ? '.' : '')
    } else return prog < 0.5 ? word : target
  }
  
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {words.map((word, index) => (
        <Text
          key={index}
          style={{color: Colors.white, fontSize: Fonts.md,}}
        >
          {interpolateWord(word, progress[index])}
        </Text>
      ))}
    </View>
  )
}

export default AnimatedString
