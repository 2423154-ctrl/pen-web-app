<template>
  <button
    class="helper-btn"
    :disabled="isReplying"
    @click="handleClick"
  >
    <span class="helper-icon">🤖</span>
    <span v-if="!isReplying">お助け</span>
    <span v-else>考え中…</span>
  </button>
</template>

<script setup>
import { useAIHelper } from '../composables/useAIHelper'

const props = defineProps({
  category: {
    type: String,
    default: 'default',
  },
})

const emit = defineEmits(['reply'])

const { isReplying, requestHelperReply } = useAIHelper()

async function handleClick() {
  const reply = await requestHelperReply(props.category)
  emit('reply', reply)
}
</script>

<style scoped>
.helper-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #3d6b5c;
  color: #3d6b5c;
  background: #fff;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
}

.helper-btn:hover:not(:disabled) {
  background: #eef4f1;
}

.helper-btn:disabled {
  opacity: 0.6;
  cursor: default;
}

.helper-icon {
  font-size: 14px;
}
</style>
