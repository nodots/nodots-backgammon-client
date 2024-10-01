// gameState.ts
import { makeAutoObservable } from 'mobx'
import {
  NodotsPlayer,
  NodotsPlayerInitializing,
} from '../../../nodots_modules/backgammon-types'
import { User } from '@auth0/auth0-react'

class AuthState {
  user: User | null = null
  player: NodotsPlayer | NodotsPlayerInitializing | null = null
  login: () => void = () => {}
  logout: () => void = () => {}

  constructor() {
    makeAutoObservable(this)
  }

  setUser(user: User) {
    this.user = user
  }

  setPlayer(player: NodotsPlayer | NodotsPlayerInitializing) {
    this.player = player
  }
}

export const authState = new AuthState()
