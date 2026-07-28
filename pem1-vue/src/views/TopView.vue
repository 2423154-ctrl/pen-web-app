<script setup>
import ChatList from "@/components/ChatList.vue";
</script>

<template>
  <section class="top-view">
    <header class="top-header">
      <h1>トップ画面</h1>
      <router-link to="/settings" class="settings-link">設定</router-link>
    </header>
    <ChatList />
  </section>
</template>

<style scoped>
.top-view {
  max-width: 420px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-header h1 {
  margin: 0;
}

.settings-link {
  font-size: 14px;
  font-weight: 700;
  color: #2f6f56;
  text-decoration: none;
}

.settings-link:hover {
  text-decoration: underline;
}
</style>
