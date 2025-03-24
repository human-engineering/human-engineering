import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Home from './screens/Home'
import { View, } from 'react-native'
import { setDimensions, } from './state/actions/SystemActions'
import { useDispatch, } from 'react-redux'

export enum Screens {
  Home = '/',
}

function App() {
  const dispatch = useDispatch()

  return (
    <>
      <Router>
        <Routes>
          <Route path={Screens.Home} element={<Home />} />
        </Routes>
      </Router>

      <View
        onLayout={(event) => dispatch(setDimensions({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height, }))}
        style={{position: 'absolute', zIndex: -1, width: '100%', height: '100%',}}
      />
    </>
  )
}

export default App
