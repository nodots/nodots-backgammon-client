import { useContext } from 'react'
import {
  NodotsBoard,
  NodotsChecker,
  NodotsColor,
  NodotsGameActive,
  NodotsMoveDirection,
  NodotsPlayersPlaying,
  PlayerPlaying,
} from '../../../nodots_modules/backgammon-types'
import { NodotsLocaleCode } from '../../i18n'
import { GameContext } from './GameContext'
import {
  _getActiveGameById,
  _getGameById,
  _getPlayerById,
  _getPlayerForAuth0Sub,
  _getPlayerForEmail,
  _getPlayerGames,
  _getPlayers,
  _getPlayersSeekingGame,
  _getPlayOffers,
  _startGame,
  _updatePlayerLocale,
} from './GameContextHelpers'
import { apiUrl } from '../../App'

const useNodotsGame = () => {
  const gameContext = useContext(GameContext)

  console.log('[Game Hook] useNodotsGame gameContext:', gameContext)

  const startGame = async (player1Id: string, player2Id: string) => {
    const result = await _startGame(player1Id, player2Id)
    return result
  }

  const getPlayerGames = async (playerId: string) => {
    console.log('[useNodotsGame] getPlayerGames playerId:', playerId)
    const result = await _getPlayerGames(
      `${apiUrl}/player/active-game/${playerId}`
    )
    console.log('[useNodotsGame] getPlayerGames result:', result)
    return result
  }

  const getGameById = async (gameId: string) => {
    const result = await _getGameById(`${apiUrl}/game/${gameId}`)
    return result
  }

  const getActiveGameById = async (gameId: string) => {
    console.log('[Game Hook] getActiveGameById gameId:', gameId)
    const result = await _getActiveGameById(`${apiUrl}/game/active/${gameId}`)
    return result
  }

  const appLogout = async (playerId: string) => {
    console.log('appLogout playerId:', playerId)
    await fetch(`${apiUrl}/player/logout/${playerId}`, {
      method: 'PATCH',
    })
  }

  // const switchDice = async (game: GamePlayingRolling) => {
  //   setGame(await _switchDice(game, `${apiUrl}/game/${game.id}/switch-dice`))
  // }

  // const roll = async (game: GamePlayingRolling) => {
  //   setGame(await _roll(game, `${apiUrl}/game/${game.id}/roll`))
  // }

  // const double = async (game: GamePlayingRolling) => {
  //   setGame(await _double(game, `${apiUrl}/game/${game.id}/double`))
  // }

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

  const getClockwisePlayer = (players: NodotsPlayersPlaying): PlayerPlaying => {
    return players.black.direction === 'clockwise'
      ? players.black
      : players.white
  }

  const getCounterClockwisePlayer = (
    players: NodotsPlayersPlaying
  ): PlayerPlaying => {
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

  const getColorsByDirection = (
    players: NodotsPlayersPlaying
  ): { clockwiseColor: NodotsColor; counterclockwiseColor: NodotsColor } => {
    console.log('[Game Hook] getDirectionColors players', players)
    return {
      clockwiseColor:
        players.black.direction === 'clockwise' ? 'black' : 'white',
      counterclockwiseColor:
        players.black.direction === 'clockwise' ? 'white' : 'black',
    }
  }

  console.log('[Game Hook] gameContext:', gameContext)

  return gameContext
    ? {
        game: gameContext,
        startGame,
        getPlayers,
        getPlayerGames,
        getGameById,
        getActiveGameById,
        getCheckersForDirection,
        getPlayerForDirection,
        getPlayersSeekingGame,
        getColorsByDirection,
        getPlayerById,
        getPlayOffers,
        getPlayerForAuth0Sub,
        updatePlayerLocale,
        togglePlayerSeekingGame,
        appLogout,
      }
    : { game: undefined, setGame: () => {} }
}

export default useNodotsGame

/*
export const useNodotsPlayer = () => {
  const playerContext = useContext(PlayerContext)
  return playerContext
    ? playerContext
    : { player: undefined, setPlayer: () => {} }
}

*/
