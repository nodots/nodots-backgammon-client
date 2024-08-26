import React, { useEffect, useState } from 'react'
import { Container, List, ListItem } from '@mui/material'
import { NodotsPlayerSeekingGame } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { useAuth0 } from '@auth0/auth0-react'
import { NodotsOfferPlay } from '../../../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'

function AvailableOffers() {
  const { user } = useAuth0()
  const {
    game,
    getPlayersSeekingGame,
    getPlayerForEmail,
    getPlayerForId,
    getPlayOffers,
  } = useNodotsGame()
  const [player, setPlayer] = useState<NodotsPlayerSeekingGame>()
  const [offers, setOffers] = useState<NodotsOfferPlay[]>([])

  const decodeOffers = async (offers: NodotsOfferPlay[]) => {
    return offers.map(async (offer) => {
      const offeringPlayer = await getPlayerForId(offer.offeringPlayerId)
      console.log(offer.offeredPlayerId)
    })
  }

  return <>AvailableOffers</>
}

export default AvailableOffers
