import { action, makeAutoObservable } from 'mobx'
import { NodotsGameStore } from './Game/Store'
import { createContext, useContext } from 'react'
import { v4 } from 'uuid'

class RootStore {
  id: string
  name: string

  constructor() {
    makeAutoObservable(this)
    console.log('2. [Stores: Root] constructor')
    this.id = generateId()
    this.name = 'Nodots Backgammon Root'
  }

  setGameStore() {
    console.log('[RootStore] setGameStore', this)
  }
}

const rootStore = new RootStore()
const StoreContext = createContext<RootStore>(rootStore) // Use null as initial value

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export default RootStore
export const generateId = (): string => v4()
export const generateTimestamp = (): string => new Date().toISOString()
