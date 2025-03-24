import { SystemActions } from '../reducers/SystemReducer'

export function setDimensions(input: { width: number, height: number, }) {
  return {
    type: SystemActions.SetDimensions,
    payload: input,
  }
}
