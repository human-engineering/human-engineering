import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, View, } from 'react-native'
import { useSelector } from 'react-redux'
import { IStores } from '../../state/store'
import Block from './Block'
import { compact, organization, thumbnail, video, } from '../../utils/constants'
import BlurBackground from '../blurBackground'
import AnimatedString from '../animatedString'

interface IMediaBlockProps {
  order: number,
}
function MediaBlock({ order, }: IMediaBlockProps) {
  const systemStore = useSelector((state: IStores) => state.systemStore)
  const { Colors, Fonts, Spacing, } = systemStore.mobile ? systemStore.Mobile : systemStore.Desktop

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

        <TouchableOpacity
          style={{position: 'absolute', zIndex: 1, padding: Spacing.padding,}}
        >
          <AnimatedString delay={2000} />
        </TouchableOpacity>
    </Block>
  )
}

export default MediaBlock
