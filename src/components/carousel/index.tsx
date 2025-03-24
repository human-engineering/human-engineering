import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, Image, Easing } from 'react-native'

interface ICarouselProps {
  images: string[]
}

function Carousel({ images }: ICarouselProps) {
  const translateX = useRef(new Animated.Value(0)).current
  const index = useRef(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!width) return

    // const interval = setInterval(() => {
    //   index.current = (index.current + 1) % images.length
    //   Animated.timing(translateX, {
    //     toValue: -index.current * width,
    //     duration: 1500, // Slower transition
    //     easing: Easing.out(Easing.exp),
    //     useNativeDriver: true,
    //   }).start()
    // }, 3000)
    const interval = setInterval(() => {
      index.current = (index.current + 1) % images.length
      Animated.spring(translateX, {
        toValue: -index.current * width,
        useNativeDriver: true,
      }).start()
    }, 3000)

    return () => clearInterval(interval)
  }, [images, width])

  return (
    <View
      style={{ flex: 1, overflow: 'hidden' }}
      onLayout={(event) => {
        const { width, height, } = event.nativeEvent.layout
        setWidth(width)
        setHeight(height)
      }}
    >
      {width > 0 && (
        <Animated.View style={{flexDirection: 'row', width: images.length * width, transform: [{translateX,}],}}>
          {images.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img, }}
              style={{width: width, height: height, resizeMode: 'cover',}}
            />
          ))}
        </Animated.View>
      )}
    </View>
  )
}

export default Carousel
