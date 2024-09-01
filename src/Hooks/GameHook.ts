import { useEffect, useState } from 'react'
import {
  GameInitialized,
  GamePlayingMoving,
  GamePlayingRolling,
  IPlayerPreferences,
  NodotsBoard,
  NodotsChecker,
  NodotsGame,
  NodotsGameState,
  NodotsMoveDirection,
  NodotsOfferPlay,
  NodotsPlayer,
  NodotsPlayerInitialized,
  NodotsPlayerPlaying,
  NodotsPlayerSeekingGame,
  NodotsPlayersInitialized,
  NodotsPlayersPlaying,
} from '../../nodots_modules/backgammon-types'
import { NodotsLocaleCode } from '../i18n'

const _getPlayers = async (endpoint: string): Promise<NodotsPlayer[]> => {
  const result = await fetch(endpoint)
  return result.json()
}

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

const _updatePlayerLocale = async (id: string, locale: NodotsLocaleCode) => {
  console.log(id, locale)

  // fetch(endpoint, {
  //   method: 'PATCH',
  // })
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

const _getPlayerById = async (endpoint: string): Promise<NodotsPlayer> => {
  const result = await fetch(endpoint)
  return result.json()
}

const _getPlayerForAuth0Sub = async (
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

  const appLogout = async (playerId: string) => {
    console.log('appLogout playerId:', playerId)
    await fetch(`${apiUrl}/player/logout/${playerId}`, {
      method: 'PATCH',
    })
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

  const getPlayers = async () => await _getPlayers(`${apiUrl}/player/`)

  const getPlayersSeekingGame = async () => {
    return await _getPlayersSeekingGame(`${apiUrl}/player/seeking-game`)
  }

  const getPlayerByEmail = async (email: string) => {
    return await _getPlayerForEmail(`${apiUrl}/player/${email}`)
  }

  const getPlayerById = async (id: string) => {
    return await _getPlayerById(`${apiUrl}/player/${id}`)
  }

  const getPlayOffers = async (id: string) => {
    return await _getPlayOffers(`${apiUrl}/offer/play/${id}`)
  }

  const getPlayerForAuth0Sub = async (sub: string) => {
    const [source, externalId] = sub.split('|')
    return await _getPlayerForAuth0Sub(
      `${apiUrl}/player/sub/${source}/${externalId}`
    )
  }

  const togglePlayerSeekingGame = async (
    playerId: string,
    kind: 'player-initialized' | 'player-seeking-game'
  ) => {
    const newKind =
      kind === 'player-initialized'
        ? 'player-seeking-game'
        : 'player-initialized'
    if (playerId) {
      await fetch(`${apiUrl}/player/set-seeking-game/${playerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kind: newKind }),
      })
    }
  }

  const updatePlayerLocale = async (id: string, locale: NodotsLocaleCode) =>
    await _updatePlayerLocale(id, locale)

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
    getPlayers,
    getCheckersForDirection,
    getPlayerForDirection,
    getPlayerGames,
    getPlayersSeekingGame,
    getPlayerById,
    getPlayOffers,
    getPlayerForAuth0Sub,
    updatePlayerLocale,
    togglePlayerSeekingGame,
    appLogout,
  }
}

export default useNodotsGame
