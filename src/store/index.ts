export const useCounterStore = defineStore("counter", {
  state: (): { counter: number } => ({
    counter: 0,
  }),
  actions: {
    addCounter(offset: number = 1) {
      this.counter += offset
    },
  },
})
