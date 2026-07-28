import { ref, watch } from 'vue'

const STORAGE_KEY = 'sns-notification-settings'

const defaults = {
  notificationsEnabled: true,
  pushComments: true,
  pushLikes: true,
  pushMentions: true,
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return { ...defaults }
  }
}

// モジュールスコープの単一状態にすることで、
// 複数コンポーネントから参照しても値が同期される
const state = ref(load())

watch(
  state,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

export function useNotificationSettings() {
  function toggleAll(value) {
    state.value.notificationsEnabled = value
    // 通知を一括オフにした場合は個別設定も見た目上オフにする
    if (!value) {
      state.value.pushComments = false
      state.value.pushLikes = false
      state.value.pushMentions = false
    } else {
      state.value.pushComments = true
      state.value.pushLikes = true
      state.value.pushMentions = true
    }
  }

  return {
    settings: state,
    toggleAll,
  }
}
