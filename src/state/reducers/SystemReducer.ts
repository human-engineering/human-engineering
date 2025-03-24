

export interface ISystemStore {
  Desktop: {
    Colors: any,
    Fonts: any,
    Spacing: any,
  },
  Mobile: {
    Colors: any,
    Fonts: any,
    Spacing: any,
  },
  breakWidth: number,
  minHeight: number,
  width: number | null,
  height: number | null,
  mobile: boolean | null,
}

export const Colors = {
  safeLight: 'rgba(255,255,255,0.4)',
  safeLighter: 'rgba(255,255,255,0.85)',
  safeLightest: 'rgba(255,255,255,1)',
  safeDark: 'rgba(0,0,0,0.3)',
  safeDarker: 'rgba(0,0,0,0.5)',
  safeDarkest: 'rgba(0,0,0,0.8)',
  safeLightBackground: 'rgba(255,255,255,0.2)',
  safeLighterBackground: 'rgba(255,255,255,0.5)',
  safeLightestBackground: 'rgba(255,255,255,0.8)',
  safeDarkBackground: 'rgba(0,0,0,0.4)',
  safeDarkerBackground: 'rgba(0,0,0,0.5)',
  safeDarkestBackground: 'rgba(0,0,0,0.7)',
  lightGrey: 'rgba(99,99,102,0.5)',
  middleGrey: 'rgba(128,128,128,0.7)',
  lightRed: 'rgba(255,80,80,1)',
  red: 'rgba(245,10,10,0.8)',
  lighterBlue: 'rgba(0,144,253,0.5)',
  lightBlue: 'rgba(0,114,253,1)',
  blue: 'rgba(0,29,253,255)',
  darkBlue: 'rgba(0,0,256,1)',
  darkerBlue: 'rgba(23,25,30, 1)',
  green: 'rgba(40,240,40,0.9)',
  darkGreen: 'rgba(20,220,20,1)',
  black: 'rgba(0,0,0,1)',
  white: 'rgba(255,255,255,1)',
  gold: 'rgba(255,165,0,1)',
  transparent: 'rgba(0,0,0,0)',
  activeOpacity: 0.6,
}

export const FontWeights = {
  featherWeight: '200',
  lightWeight: '300',
  welterWeight: '400',
  middleWeight: '500',
  cruiserWeight: '600',
  heavyWeight: '700',
}

const INITIAL_STATE: ISystemStore = {
  Desktop: {
    Colors: Colors,
    Fonts: {
      ...FontWeights,
      xs: 14,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      xxl: 56,
      xxxl: 80,
      xxxxl: 128,
    },
    Spacing: {
      paddingSm: 16,
      paddingMd: 32,
      padding: 64,
      margin: 64,
      navHeight: 72,
    },
  },
  Mobile: {
    Colors: Colors,
    Fonts: {
      ...FontWeights,
      xs: 8,
      sm: 10,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 40,
      xxxxl: 64,
    },
    Spacing: {
      paddingSm: 8,
      paddingMd: 16,
      padding: 32,
      margin: 32,
      navHeight: 64,
    },
  },
  breakWidth: 768,
  minHeight: 800,
  width: null,
  height: null,
  mobile: null,
}

export enum SystemActions {
  SetDimensions = 'SET_DIMENSIONS',
}

type SystemAction =
  | { type: SystemActions.SetDimensions; payload: { width: number, height: number, }, }

const systemStore = (state = INITIAL_STATE, action: SystemAction) => {
  switch (action.type) {
    case SystemActions.SetDimensions:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        mobile: action.payload.width < state.breakWidth || action.payload.width < action.payload.height,
      }
    default:
      return state
  }
}

export default systemStore
