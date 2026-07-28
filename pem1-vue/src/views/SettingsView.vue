<template>
  <div class="settings-view">
    <header class="settings-header">
      <h1>設定</h1>
    </header>

    <section class="settings-section">
      <h2 class="section-title">通知</h2>

      <div class="setting-row main-row">
        <div class="setting-label">
          <p class="label-title">通知を受け取る</p>
          <p class="label-desc">オフにするとすべての通知が届かなくなります</p>
        </div>
        <label class="switch">
          <input
            type="checkbox"
            :checked="settings.notificationsEnabled"
            @change="toggleAll($event.target.checked)"
          />
          <span class="slider"></span>
        </label>
      </div>

      <div
        class="sub-settings"
        :class="{ disabled: !settings.notificationsEnabled }"
      >
        <div class="setting-row">
          <div class="setting-label">
            <p class="label-title">コメント</p>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              v-model="settings.pushComments"
              :disabled="!settings.notificationsEnabled"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <p class="label-title">いいね</p>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              v-model="settings.pushLikes"
              :disabled="!settings.notificationsEnabled"
            />
            <span class="slider"></span>
          </label>
        </div>

        <div class="setting-row">
          <div class="setting-label">
            <p class="label-title">メンション</p>
          </div>
          <label class="switch">
            <input
              type="checkbox"
              v-model="settings.pushMentions"
              :disabled="!settings.notificationsEnabled"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useNotificationSettings } from "../composables/useNotificationSettings";

const { settings, toggleAll } = useNotificationSettings();
</script>

<style scoped>
.settings-view {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Sans", sans-serif;
  color: #1f2a24;
}

.settings-header h1 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 20px;
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: #6b7a72;
  letter-spacing: 0.02em;
  margin: 0 0 8px;
  text-transform: uppercase;
}

.settings-section {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e7e5dd;
  overflow: hidden;
}

.settings-section > .section-title {
  padding: 14px 16px 4px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-top: 1px solid #eeece5;
}

.main-row {
  border-top: none;
}

.setting-label {
  padding-right: 16px;
}

.label-title {
  font-size: 15px;
  font-weight: 500;
  margin: 0;
}

.label-desc {
  font-size: 12px;
  color: #6b7a72;
  margin: 4px 0 0;
}

.sub-settings {
  transition: opacity 0.15s ease;
}

.sub-settings.disabled {
  opacity: 0.45;
}

/* トグルスイッチ */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #d3d1c7;
  transition: 0.2s;
  border-radius: 999px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.2s;
  border-radius: 50%;
}

.switch input:checked + .slider {
  background-color: #3d6b5c;
}

.switch input:checked + .slider::before {
  transform: translateX(18px);
}

.switch input:disabled + .slider {
  cursor: not-allowed;
}
</style>
