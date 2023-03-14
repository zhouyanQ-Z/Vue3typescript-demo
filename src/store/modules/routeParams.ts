import {defineStore}  from 'pinia'

export default defineStore('route',{
  state:():State =>({
    id: 0,
    authority: []
  }),

  actions: {
    saveRoute(data:any) {
      this.id = data.id
      this.authority = data.authority
    }
  },

  persist:{
    key: 'authorstate',
    storage: sessionStorage
  }
})

interface State {
  id: number
  authority: number[]
}