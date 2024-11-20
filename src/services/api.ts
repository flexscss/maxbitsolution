export class ApiService {
  private static instance: ApiService
  private readonly cacheName = 'api-cache'
  private cacheLifetime = 5 * 60 * 1000

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    const cache = await caches.open(this.cacheName)
    const cachedResponse = await cache.match(url)

    if (cachedResponse) {
      const timestamp = Number(cachedResponse.headers.get('timestamp'))
      if (Date.now() - timestamp < this.cacheLifetime) {
        return cachedResponse.json()
      }
    }

    const response = await this.fetchData(url, options)
    await this.cacheResponse(url, response.clone())
    return response.json()
  }

  private async fetchData(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const response = await fetch(url, {
        ...options,
        method: 'GET',
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response
    }
    finally {
      clearTimeout(timeoutId)
    }
  }

  private async cacheResponse(url: string, response: Response): Promise<void> {
    const cache = await caches.open(this.cacheName)
    const headers = new Headers(response.headers)
    headers.set('timestamp', Date.now().toString())

    await cache.put(url, new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    }))
  }
}
export default ApiService.getInstance()
