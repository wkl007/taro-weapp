import Types from '../../constants'
import { saveData, USER_INFO } from '../../../utils/catche'

export function setUserInfo (data) {
  return dispatch => {
    saveData(USER_INFO, data)
    dispatch({
      type: Types.SET_USER_INFO,
      data
    })
  }
}
