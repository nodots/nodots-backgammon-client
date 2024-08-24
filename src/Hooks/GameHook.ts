import { useState } from 'react'
import {
  GameInitialized,
  GamePlayingMoving,
  GamePlayingRolling,
  NodotsBoard,
  NodotsChecker,
  NodotsGame,
  NodotsGameState,
  NodotsMoveDirection,
  NodotsOfferPlay,
  NodotsPlayer,
  NodotsPlayerPlaying,
  NodotsPlayerSeekingGame,
  NodotsPlayersInitialized,
  NodotsPlayersPlaying,
  NodotsRoll,
} from '../../nodots_modules/backgammon-types'

const _initializeGame = async (
  players: NodotsPlayersInitialized,
  endpoint: string
) => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(players),
  })
  return result.json()
}

const _rollForStart = async (
  game: GameInitialized,
  endpoint: string
): Promise<GamePlayingRolling> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}

const _roll = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingMoving> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}

const _switchDice = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingRolling> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}

const _double = async (
  game: GamePlayingRolling,
  endpoint: string
): Promise<GamePlayingMoving> => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  return result.json()
}

const _getPlayerGames = async (endpoint: string): Promise<NodotsGame[]> => {
  const result = await fetch(endpoint)
  return result.json()
}

const _getPlayersSeekingGame = async (
  endpoint: string
): Promise<NodotsPlayerSeekingGame[]> => {
  const result = await fetch(endpoint)
  return result.json()
}

const _getPlayerForEmail = async (
  endpoint: string
): Promise<NodotsPlayer | null> => {
  const result = await fetch(endpoint)
  return result.json()
}

const _getPlayOffers = async (endpoint: string): Promise<NodotsOfferPlay[]> => {
  const result = await fetch(endpoint)
  return result.json()
}

const _move = (
  state: GamePlayingRolling | GamePlayingMoving,
  checkerId: string,
  endpoint: string
): NodotsGame => {
  console.log(checkerId)
  return state
}

const useNodotsGame = () => {
  const [game, setGame] = useState<NodotsGameState>()
  const apiUrl = 'http://localhost:3000'

  const initialize = async (players: NodotsPlayersInitialized) => {
    setGame(await _initializeGame(players, apiUrl + '/game'))
  }

  const switchDice = async (game: GamePlayingRolling) => {
    setGame(await _switchDice(game, `${apiUrl}/game/${game.id}/switch-dice`))
  }

  const roll = async (game: GamePlayingRolling) => {
    setGame(await _roll(game, `${apiUrl}/game/${game.id}/roll`))
  }

  const double = async (game: GamePlayingRolling) => {
    setGame(await _double(game, `${apiUrl}/game/${game.id}/double`))
  }

  const getPlayerGames = async (email: string) => {
    return await _getPlayerGames(`${apiUrl}/game/player/${email}`)
  }

  const getPlayersSeekingGame = async () => {
    return await _getPlayersSeekingGame(`${apiUrl}/player/seeking-game`)
  }

  const getPlayerForEmail = async (email: string) => {
    return await _getPlayerForEmail(`${apiUrl}/player/${email}`)
  }

  const getPlayOffers = async (playerId: string) => {
    return await _getPlayOffers(`${apiUrl}/offer/play/${playerId}`)
  }

  // const rollForStart = (state: GameInitializing) => {
  //   setGame(_rollForStart(state, apiUrl + '/game'))
  // }

  // const move = (
  //   state: GamePlayingRolling | GamePlayingMoving,
  //   checkerId: string
  // ) => {
  //   setGame(_move(state, checkerId, apiUrl))
  // }

  const getCheckers = (board: NodotsBoard) => {
    const checkers: NodotsChecker[] = []
    checkers.push(...board.points.flatMap((p) => p.checkers))
    checkers.push(...board.bar.black.checkers)
    checkers.push(...board.bar.white.checkers)
    checkers.push(...board.off.black.checkers)
    checkers.push(...board.off.white.checkers)
    return checkers
  }

  const getClockwiseCheckers = (
    players: NodotsPlayersPlaying,
    board: NodotsBoard
  ) => {
    const clockwiseColor =
      players.black.direction === 'clockwise' ? 'black' : 'white'
    const checkers = getCheckers(board)
    return checkers.filter((c) => c.color === clockwiseColor)
  }

  const getCounterClockwiseCheckers = (
    players: NodotsPlayersPlaying,
    board: NodotsBoard
  ) => {
    const counterClockwiseColor =
      players.black.direction === 'clockwise' ? 'black' : 'white'
    const checkers = getCheckers(board)
    return checkers.filter((c) => c.color === counterClockwiseColor)
  }

  const getCheckersForDirection = (
    direction: NodotsMoveDirection,
    players: NodotsPlayersPlaying,
    board: NodotsBoard
  ) => {
    return direction === 'clockwise'
      ? getClockwiseCheckers(players, board)
      : getCounterClockwiseCheckers(players, board)
  }

  const getClockwisePlayer = (
    players: NodotsPlayersPlaying
  ): NodotsPlayerPlaying => {
    return players.black.direction === 'clockwise'
      ? players.black
      : players.white
  }

  const getCounterClockwisePlayer = (
    players: NodotsPlayersPlaying
  ): NodotsPlayerPlaying => {
    return players.black.direction === 'counterclockwise'
      ? players.black
      : players.white
  }

  const getPlayerForDirection = (
    direction: NodotsMoveDirection,
    players: NodotsPlayersPlaying
  ) => {
    return direction === 'clockwise'
      ? getClockwisePlayer(players)
      : getCounterClockwisePlayer(players)
  }

  return {
    game,
    roll,
    double,
    switchDice,
    getCheckersForDirection,
    getPlayerForDirection,
    getPlayerGames,
    getPlayersSeekingGame,
    getPlayerForEmail,
    getPlayOffers,
  }
}

export default useNodotsGame
