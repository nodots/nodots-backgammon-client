import { action, makeAutoObservable } from 'mobx'
import { NodotsGameStore } from './Game/Store'
import { createContext, useContext } from 'react'
import { v4 } from 'uuid'
import {
  INodotsPlayers,
  NodotsPlayersInitializing,
} from './Game/Stores/Player/Types'
import chalk from 'chalk'

class RootStore {
  id: string
  name: string
  gameStore: NodotsGameStore | undefined

  constructor() {
    makeAutoObservable(this)
    console.log(chalk.green('1. [Stores: Root] constructor'))
    this.id = generateId()
    this.name = 'Nodots Backgammon Root'
    this.gameStore = undefined // HRM. this is not right??
  }

  buildGameStore(players: INodotsPlayers) {
    console.log(
      chalk.green(
        '3. [Stores: Root] buildGameStore instantiating NodotsGameStore with externalPlayers:'
      ),
      players
    )
    const gameStore = new NodotsGameStore(this, players)
    console.log(
      chalk.green('10. [Stores: Root] buildGameStore gameStore:'),
      gameStore
    )
    return gameStore
  }
}

const rootStore = new RootStore()
const StoreContext = createContext<RootStore>(rootStore)

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export default RootStore
export function generateId(): string {
  return v4()
}
export const generateTimestamp = (): string => new Date().toISOString()
