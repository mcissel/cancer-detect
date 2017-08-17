import {
  UPLOAD_REQUEST,
  UPLOAD_FAILURE,
  UPLOAD_SUCCESS,
} from '../constants/Upload'

import { showNotification } from './NotificationActions'
import { endpoint } from './settings.json';
console.log(endpoint);
console.log('this');

const request = require('superagent-bluebird-promise')

export function uploadFile(file) {

  return dispatch => {
    console.log('this');
    dispatch({ type: UPLOAD_REQUEST })

    return request.post(endpoint)
      .attach('image', file, file.name)
      .then(res => {
        if (!res.ok) {
          dispatch({ type: UPLOAD_FAILURE })
          dispatch(showNotification({
            status: 'err',
            text: 'Error contacting server',
          }))
        } else {
          const data = JSON.parse(res.text)
          // console.log(res);
          dispatch({
            type: UPLOAD_SUCCESS,
            data,
          })
          dispatch(showNotification({
            status: 'ok',
            text: `Percent chance of malignancy: ${res.text}`,
          }))
        }
        console.log({ res });
      }, err => {
        console.log({ err });
        dispatch({ type: UPLOAD_FAILURE })
        dispatch(showNotification({
          status: 'err',
          text: err.message,
        }))
      })
  }
}
