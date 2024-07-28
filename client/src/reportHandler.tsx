import { Metric } from 'web-vitals'

function reportHandler(metric: Metric) {
  console.warn(`[reportHandler] not implemented metric:`, metric)
}

export default reportHandler
