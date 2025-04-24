import React, { useEffect, useRef, useState, } from 'react'
import { Animated, Dimensions, Image, Linking, ScrollView, TouchableOpacity, View, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { compact, organization, projectsMap, thumbnail, video, } from '../../utils/constants'
import BlurBackground from '../blurBackground'
import Text from '../text'
import { ReactComponent as ChevronDownIcon, } from '../../assets/icons/chevron-down-filled.svg'

interface IMediaBlockProps {
  order: number,
}
function MediaBlock({ order, }: IMediaBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop
  const [showInputs, setShowInputs] = useState<boolean>(false)
  const scrollRef = useRef<ScrollView | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  if (videoRef.current) {
    videoRef.current.defaultMuted = true
    videoRef.current.muted = true
    videoRef.current.playsInline = true
    videoRef.current.autoplay = true
    videoRef.current.loop = true
    videoRef.current.preload = 'auto'
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.playsInline = true
      videoRef.current.autoplay = true
      videoRef.current.loop = true
      videoRef.current.preload = 'auto'
    }
    const removeEventListeners = () => {
      document.removeEventListener('touchstart', tryPlayVideo)
      document.removeEventListener('scroll', tryPlayVideo)
      document.removeEventListener('click', tryPlayVideo)
      document.removeEventListener('keypress', tryPlayVideo)
      document.removeEventListener('mousemove', tryPlayVideo)
      window.removeEventListener('focus', tryPlayVideo)
      window.removeEventListener('load', tryPlayVideo)
    }
    const tryPlayVideo = () => {
      if (videoRef.current && videoRef.current.readyState >= 3) {
        videoRef.current.play().then(() => {}).catch((error) => console.log('Autoplay error', error))
        removeEventListeners()
      }
    }
    tryPlayVideo()
    document.addEventListener('touchstart', tryPlayVideo)
    document.addEventListener('scroll', tryPlayVideo)
    document.addEventListener('click', tryPlayVideo)
    document.addEventListener('keypress', tryPlayVideo)
    document.addEventListener('mousemove', tryPlayVideo)
    window.addEventListener('focus', tryPlayVideo)
    window.addEventListener('load', tryPlayVideo)
    return () => removeEventListeners()
  }, [])

  const cols = projectsMap(systemStore.mobile)
  const animationsCol = cols.map(() => new Animated.Value(8))
  const animationsRow = cols.map(row => row.map(() => new Animated.Value(8)))
  const handleFocusCol = (index: number, focus: boolean) => {
    // Animated.timing(animationsCol[index], {
    //   toValue: focus ? (systemStore.mobile ? 10 : 9) : 8,
    //   duration: 200,
    //   useNativeDriver: false,
    // }).start()
  }
  const handleFocusRow = (colIndex: number, rowIndex: number, focus: boolean) => {
    // Animated.timing(animationsRow[colIndex][rowIndex], {
    //   toValue: focus ? (systemStore.mobile ? 10 : 9) : 8,
    //   duration: 200,
    //   useNativeDriver: false,
    // }).start()
  }

  const scrollY = useRef(new Animated.Value(0)).current
  const headerOpacity = scrollY.interpolate({ inputRange: [(Dimensions.get('window').height / 2) - 200, Dimensions.get('window').height / 2], outputRange: [1, 0], extrapolate: 'clamp', })

  return (
    <Block order={order}>
      <View style={{width: '100%', height: '100%',}}>
        <img
          src={compact}
          alt={''}
          style={{position: 'absolute', zIndex: -3, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: Colors.white,}}
        />
        <BlurBackground dark={true} zIndex={-3} />
        <img
          src={thumbnail}
          alt={''}
          style={{position: 'absolute', zIndex: -2, width: '100%', height: '100%', objectFit: 'cover', backgroundColor: Colors.white,}}
        />
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          preload={'auto'}
          style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', objectFit: 'cover',}}
        >
          <source
            src={video}
            type={'video/mp4'}
          />
        </video>
      </View>

      <Animated.View style={{
        position: 'absolute', zIndex: 1, width: '100%', alignItems: 'center',
        padding: Spacing.paddingMd, opacity: headerOpacity,
      }}>
        <Text style={{color: Colors.white, fontSize: Fonts.lg, fontWeight: Fonts.lightWeight,}}>human engineering</Text>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        style={{position: 'absolute', zIndex: 2, width: '100%', height: '100%', padding: Spacing.padding,}}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY, }, }, }], { useNativeDriver: true, })}
        scrollEventThrottle={16}
      >
        <View style={{height: Dimensions.get('window').height - 160,}} />

        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', maxWidth: 1000,}}>
            <TouchableOpacity
              onPress={() => scrollRef.current?.scrollTo?.({ y: Dimensions.get('window').height - 144, animated: true, })}
              style={{width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 32, opacity: 0.7,}}
            >
              <ChevronDownIcon style={{width: Fonts.xxxl, height: Fonts.xxxl,}} />
            </TouchableOpacity>

            {cols.map((col, colIndex) => (
              <Animated.View
                key={colIndex}
                onPointerEnter={systemStore.mobile ? undefined : () => handleFocusCol(colIndex, true)}
                onPointerLeave={systemStore.mobile ? undefined : () => handleFocusCol(colIndex, false)}
                style={{flex: animationsCol[colIndex], flexDirection: 'row', width: '100%',}}
              >
                {col.map((item, rowIndex) => (
                  <Animated.View
                    key={rowIndex}
                    onPointerEnter={systemStore.mobile ? undefined : () => handleFocusRow(colIndex, rowIndex, true)}
                    onPointerLeave={systemStore.mobile ? undefined : () => handleFocusRow(colIndex, rowIndex, false)}
                    style={{flex: animationsRow[colIndex][rowIndex], width: '100%',}}
                  >
                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingSm,}}>
                      <div
                        onTouchStart={(e) => e.preventDefault()}
                        style={{
                          position: 'absolute', zIndex: 1, width: '100%', height: '100%',
                          pointerEvents: 'none', userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none',
                        }}
                      />

                      <TouchableOpacity
                        activeOpacity={0.93}
                        onPressIn={systemStore.mobile ? () => {
                          handleFocusCol(colIndex, true)
                          handleFocusRow(colIndex, rowIndex, true)
                        } : undefined}
                        onPressOut={systemStore.mobile ? () => {
                          handleFocusCol(colIndex, false)
                          handleFocusRow(colIndex, rowIndex, false)
                        } : undefined}
                        onPress={item.onPress ? item.onPress : undefined}
                        style={{
                          // width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                          // borderColor: Colors.lighterGrey, borderWidth: 0.3,
                          // padding: Spacing.paddingMd, overflow: 'hidden',
                          borderRadius: 16, overflow: 'hidden',
                          width: '100%', height: '100%', aspectRatio: 1/1,
                          ...{ cursor: item.onPress ? undefined : 'default', } as any,
                          ...(item.highlight ? { borderColor: Colors.lightBlue, borderWidth: 3, } : undefined),
                        }}
                      >
                        {item.background && <Image
                          source={{ uri: item.background, }}
                          style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', resizeMode: 'cover', ...{pointerEvents: 'none',} as any,}}
                        />}

                        <BlurBackground blur={item.background ? 8 : undefined} />

                        {item.background && <Image
                          source={{ uri: item.background, }}
                          style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%', resizeMode: 'contain', marginTop: 32, ...{pointerEvents: 'none',} as any,}}
                        />}

                        {item.icon && <Image
                          source={{ uri: item.icon, }}
                          style={{position: 'absolute', zIndex: -2, width: '100%', height: '100%', resizeMode: 'cover', ...{pointerEvents: 'none',} as any,}}
                        />}

                        {(item.icon || item.logo || item.name) &&
                          <View style={{width: '100%',}}>
                            <BlurBackground dark={true} />

                            <View style={{flexDirection: 'row', width: '100%', height: '100%',  padding: Spacing.paddingSm,}}>
                              {item.icon && <Image
                                source={{ uri: item.icon, }}
                                style={{width: 64, aspectRatio: 1/1, resizeMode: 'cover', borderRadius: 16, ...{pointerEvents: 'none',} as any,}}
                              />}

                              {item.logo && <Image
                                source={{ uri: item.logo, }}
                                style={{width: 64, aspectRatio: 1/1, resizeMode: 'contain', backgroundColor: Colors.white, borderRadius: 16, ...{pointerEvents: 'none',} as any,}}
                              />}

                              <View style={{justifyContent: 'center', padding: Spacing.paddingSm,}}>
                                <Text style={{fontSize: Fonts.lg, fontWeight: Fonts.cruiserWeight, color: Colors.white,}}>{item.name}</Text>
                              </View>
                            </View>

                          </View>
                        }

                        {item.description &&
                          <View style={{flex: 1, padding: Spacing.paddingMd, justifyContent: 'center', alignItems: 'center', overflow: 'hidden',}}>
                            <View style={{
                              width: '100%', height: '100%',
                              padding: Spacing.paddingSm, justifyContent: 'center', alignItems: 'center', borderRadius: 16, overflow: 'hidden',
                              backgroundColor: Colors.safeDarkerBackground,
                            }}>
                              <Text style={{fontSize: systemStore.mobile ? Fonts.md : Fonts.sm, fontWeight: Fonts.cruiserWeight, color: Colors.white,}}>{item.description}</Text>
                            </View>
                          </View>
                        }

                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                ))}
              </Animated.View>
            ))}

            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingSm,}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => Linking.openURL('mailto:contact@human.engineering')}
                style={{width: '100%', justifyContent: 'center', alignItems: 'center', padding: Spacing.paddingSm, marginTop: 16, borderRadius: 16, overflow: 'hidden',}}
              >
                <BlurBackground />

                <Text style={{color: Colors.white, fontSize: Fonts.xl, fontWeight: Fonts.featherWeight,}}>Send us an email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={{height: 64,}} />
      </Animated.ScrollView>
    </Block>
  )
}

export default MediaBlock
