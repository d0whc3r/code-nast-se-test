import fetch from 'node-fetch'
import { generateUrl } from '../common.mjs'

const PAGE_SIZE = 10

/**
 * Wrapper function to get news and return in http response
 * @param params {Record<string, string>}
 * @param res {import('http').ServerResponse}
 */
async function getNews(params, res) {
  const page = +params.page || 1
  const pageSize = +params.pageSize || PAGE_SIZE
  const url = generateUrl({ ...params, pageSize: PAGE_SIZE })
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        res.status(200).json({ ...data, pageSize, page, totalPages: Math.ceil(data.totalResults / PAGE_SIZE) })
      } else {
        res.status(500).json({ error: data.message })
      }
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

/**
 * Get a list of news by topic
 * @param req {import('http').IncomingMessage}
 * @param res {import('http').ServerResponse}
 * @param next {import('express').NextFunction}
 */
export async function newsByTopic(req, res, next) {
  const params = { ...req.params, ...req.query }
  return getNews(params, res)
}

/**
 * Get a list of news by topic
 * @param req {import('http').IncomingMessage}
 * @param res {import('http').ServerResponse}
 * @param next {import('express').NextFunction}
 */
export async function latestNews(req, res, next) {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
  const params = { sources: 'engadget', from: yesterday, to: today, ...req.query }
  return getNews(params, res)
}
