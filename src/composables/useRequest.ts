import { ref } from 'vue'
import type { Ref } from 'vue'

interface RequestOptions<T> {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useRequest<T>(
  requestFn: (...args: any[]) => Promise<T>,
  options: RequestOptions<T> = {}
) {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async (...args: any[]) => {
    loading.value = true
    error.value = null

    try {
      const result = await requestFn(...args)
      data.value = result
      options.onSuccess?.(result)
      return result
    } catch (err) {
      error.value = err as Error
      options.onError?.(err as Error)
      throw err
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute
  }
}

export function usePagination<T>(
  requestFn: (params: { page: number; pageSize: number }) => Promise<{ list: T[]; total: number }>,
) {
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const list = ref<T[]>([]) as Ref<T[]>

  const { loading, error, execute } = useRequest(async () => {
    const result = await requestFn({
      page: currentPage.value,
      pageSize: pageSize.value,
    })
    list.value = result.list
    total.value = result.total
    return result
  })

  const refresh = () => {
    currentPage.value = 1
    return execute()
  }

  const next = () => {
    currentPage.value++
    return execute()
  }

  return {
    currentPage,
    pageSize,
    total,
    list,
    loading,
    error,
    refresh,
    next,
  }
}