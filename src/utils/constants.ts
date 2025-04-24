import { Linking } from 'react-native'

export const organization = 'HUMaN ENGiNEERING'
export const compact = 'https://hel-case.s3.us-east-2.amazonaws.com/compact.jpg'
export const thumbnail = 'https://hel-case.s3.us-east-2.amazonaws.com/thumbnail.jpg'
export const video = 'https://hel-case.s3.us-east-2.amazonaws.com/video.mp4'

export const projects: Array<any> = [
  {
    name: 'human engineering',
    description: `human engineering [sic] is a software engineering team from Vancouver BC Canada. Mobile app development, AI and machine learning software, local business webpages--no project is too big or small for us.\n\n-> Contact us`,
    icon: thumbnail,
    images: [],
    highlight: true,
    onPress: () => Linking.openURL('mailto:contact@human.engineering')
  },
  {
    name: 'Streetpass',
    description: `Streetpass is an app that matches you with people you pass in the street. Powered by an AI-driven match-making algorithm, users can find suitable missed connections they pass right by every day. Launched in Vancouver BC, Streetpass is expanding globally.`,
    icon: require('../assets/media/streetpass.png'),
    images: [],
    onPress: () => Linking.openURL('https://streetpass.app'),
  },
  {
    name: 'Kite (sunset)',
    description: `Kite is a new social media app designed to connect people through geotagged media. Post images and videos, follow your friends, find hotspots locally and around the globe, and share memories everywhere you go.`,
    icon: require('../assets/media/kite.png'),
    images: [],
  },
  // {
  //   name: 'Serano Properties (sold)',
  //   logo: require('../assets/media/serano.png'),
  //   background: require('../assets/media/serano-background.png'),
  //   images: [],
  // },
  {
    name: 'Exaltanic (acquired)',
    description: `Exaltanic uses machine learning to monitor drivers and promote safe driving. Using frame-by-frame capture, Exaltanic recognizes poor road conditions, erratic traffic patterns, and when a driver is sleepy, distracted, or even experiencing road rage. Gentle audible instructions remind the driver when and how to stay safe during unoptimal circumstances.`,
    icon: require('../assets/media/exaltanic.png'),
    images: [],
  },
  {
    name: 'BRIT (acquired)',
    description: `BRIT (Boxing Round Interval Timer) is a boxing personal training app that utilizes machine learning to instruct on form and intensity. Set your round count, round time and break time, and BRIT's text-to-speech model will automatically instruct you to be a better boxer and have more effective workouts. Acquired in 2020.`,
    icon: require('../assets/media/brit.png'),
    images: [],
  },
  // {
  //   name: 'Vietnam House Victoria',
  //   logo: require('../assets/media/vietnam.png'),
  //   background: require('../assets/media/vietnam-background.png'),
  //   images: [],
  //   onPress: () => Linking.openURL('https://vietnamhousevictoria.com'),
  // },
  // {
  //   name: 'Legend Autoworks',
  //   logo: require('../assets/media/autoworks.png'),
  //   background: require('../assets/media/autoworks-background.png'),
  //   images: [],
  //   onPress: () => Linking.openURL('http://legendautoworks.ca'),
  // },
  {},
]

export const projectsMap = (mobile: boolean | null) => {
  const chunkSize = mobile ? 1 : 2
  const chunks = []
  for (let i = 0; i < projects.length; i += chunkSize) chunks.push(projects.slice(i, i + chunkSize))
  return chunks
}
