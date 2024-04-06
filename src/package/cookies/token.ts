import { getConfig, setConfig } from './cookie'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const setUserToken = async (userToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  config.userToken = userToken
  setConfig(config, cookies)
}

export const getUserToken = (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  return config.userToken
}

export const setAccessTime = async (accessTime: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  config.accessTime = accessTime
  setConfig(config, cookies)
}

export const getAccessTime = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  return config.accessTime
}