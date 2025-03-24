import React, { } from 'react'

interface IBlurBackgroundProps {
  dark?: boolean,
  zIndex?: number,
}
function BlurBackground({ dark, zIndex, }: IBlurBackgroundProps) {
  return (
    <>
      <div style={{
        filter: 'blur(1px)',
        position: 'absolute', zIndex: zIndex || -1, width: '100%', height: '100%',
        backgroundColor: dark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)',
      }} />
    </>
  )
}

export default BlurBackground
