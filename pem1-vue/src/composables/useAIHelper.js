import { ref } from "vue";

// お助けキャラの定型返信テンプレート
// 用途別に分けておき、呼び出し側で状況に応じたカテゴリを渡せるようにする
const REPLY_TEMPLATES = {
  default: [
    "すごーい！！",
    "そうなんだー！！勉強になったよ",
    "いいね!とってもたのしみ",
    "たくさん頑張ったんだね",
    "おやすみ...もう寝る時間だよ",
  ],
  question: [
    "それってどういうこと？",
    "わかんないや",
    "うーん、難しい質問だね",
  ],
  praise: ["ありがとう!", "感謝感謝！！"],
};

const helperName = "ぺんぺんちゃん";

export function useAIHelper() {
  const isReplying = ref(false);

  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * お助けボタン押下時に呼び出す
   * @param {string} category - 'default' | 'question' | 'praise'
   * @returns {Promise<{ author: string, text: string, isAI: boolean }>}
   */
  async function requestHelperReply(category = "default") {
    isReplying.value = true;
    const list = REPLY_TEMPLATES[category] || REPLY_TEMPLATES.default;

    // 実際のタイピング待機感を出すための遅延(演出用)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reply = {
      author: helperName,
      text: pickRandom(list),
      isAI: true,
      createdAt: new Date().toISOString(),
    };

    isReplying.value = false;
    return reply;
  }

  return {
    isReplying,
    requestHelperReply,
    helperName,
  };
}
