import React, { useEffect, useState } from 'react'
import { Container, List, ListItem } from '@mui/material'
import { NodotsPlayerSeekingGame } from '../../../../nodots_modules/backgammon-types'
import useNodotsGame from '../../../Hooks/GameHook'
import { useAuth0 } from '@auth0/auth0-react'
import { NodotsOfferPlay } from '../../../../../nodots-backgammon-api/nodots_modules/@nodots/backgammon-types'

function AvailableOffers() {
  const { user } = useAuth0()
  const { game, getPlayersSeekingGame, getPlayerForEmail, getPlayOffers } =
    useNodotsGame()
  const [player, setPlayer] = useState<NodotsPlayerSeekingGame>()
  const [offers, setOffers] = useState<NodotsOfferPlay[]>([])

  useEffect(() => {
    if (!player && user && user.email) {
      getPlayerForEmail(user.email).then((player) => {
        switch (player?.kind) {
          case 'player-initialized':
          case 'player-playing':
          case 'player-seeking-game':
            getPlayOffers(player.id).then((offers) => {
              setOffers(offers)
            })
        }
      })
    }
  }, [user, player])

  if (offers && offers.length > 0) {
    console.log(offers)
    return (
      <Container>
        <h2>Available Offers</h2>
        <List>
          {offers.map((offer) => (
            <ListItem key={offer.offeringPlayer.id}>
              Some asshole is offering to play
            </ListItem>
          ))}
        </List>
      </Container>
    )
  } else {
    return <></>
  }
}

export default AvailableOffers
