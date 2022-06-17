import { defineStore } from "pinia";
const search = defineStore("search", {
  state: () => ({
    // 历史搜索
    histories: [] as string[]
  }),
  actions: {
    /**
     * 1. 新增
     * 2. 单个删除
     * 3. 全部删除
     */
    /**
     * 新增的搜索内容不可和已有的内容重复
     * @param history 搜索内容
     */
    insertHistory(history: string) {
      const index = this.histories.findIndex(item => item === history);
      if (index !== -1) {
        this.histories.splice(index, 1);
      }
      this.histories.unshift(history);
    },
    deleteHistory(index: number) {
      this.histories.splice(index, 1);
    },
    clear() {
      this.histories = [];
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["histories"] }]
  }
});

export default search;
