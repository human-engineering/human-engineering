import { createStore, combineReducers, Reducer, } from 'redux'
import systemStore, { ISystemStore, } from '../reducers/SystemReducer'

export interface IStores {
  systemStore: ISystemStore,
}

const rootReducer: Reducer<any> = combineReducers<any>({
  systemStore,
})

const configureStore = () => { return createStore(rootReducer) }

export default configureStore
