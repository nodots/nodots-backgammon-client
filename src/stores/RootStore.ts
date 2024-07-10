import { makeAutoObservable } from 'mobx'
import { NodotsGameStore } from './Game/Store'
import { generateId } from './Game/Types'
import { createContext, useContext } from 'react'

class RootStore {
  id: string
  name: string
  gameStore: NodotsGameStore

  constructor() {
    makeAutoObservable(this)
    console.log('2. [Stores: Root] constructor')
    this.id = generateId()
    this.name = 'Nodots Backgammon Root'
    this.gameStore = new NodotsGameStore(this)
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
