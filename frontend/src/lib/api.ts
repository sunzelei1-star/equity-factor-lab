import axios from 'axios'
import type { BacktestConfig, BacktestResult } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const runBacktest = async (config: BacktestConfig) => {
  const response = await api.post<BacktestResult>('/backtest', config)
  return response.data
}
