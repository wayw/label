import instance from '../utils/axios'

export const Home = (params) => instance.post('/sso/login', params)

export const textList = (params) => instance.post('/label/taskHall/getTextInfoById', params)

export const mytask = (params) => instance.post('/label/task/querytaskbyid', params)
