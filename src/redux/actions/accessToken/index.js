import Types from '../../constants'
import { saveData, ACCESS_TOKEN } from '../../../utils/catche'

export function setAccessToken (data) {
  return dispatch => {
    saveData(ACCESS_TOKEN, data)
    dispatch({
      type: Types.SET_ACCESS_TOKEN,
      data
    })
  }
}
