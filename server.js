import express, { Router } from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import cors from 'cors'
import { URLSearchParams } from 'url'
import SpotifyAPI from 'spotify-web-api-node'


require( 'dotenv' ).config()



const { SERVER_PORT = 3001, CLIENT_ID, CLIENT_SECRET, NODE_ENV } = process.env

const app = express()
const endpoint = new Router()

app.use( cors( {
  origin: 'http://dlarm.me'
} ) )

const auth = Buffer.from( `${CLIENT_ID}:${CLIENT_SECRET}` ).toString( 'base64' )
const headers = {
  Authorization: `Basic ${auth}`,
  Content_Type: 'application/x-www-form-urlencoded'
}
const spotify = new SpotifyAPI( {
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
} )

const userId = '0UkglgJtVtdxyiCWcc410a'



const setTokens = async () => {
  try{
    const { body: token } = await spotify.clientCredentialsGrant()
    const { access_token, expires_in } = token
    spotify.setAccessToken( access_token )
  }catch( err ){
    console.log( err )
    return err
  }
}

const getTracks = async () => {
  const { body: { items } } = await spotify.getArtistAlbums( userId )

  const albums = items.map( album => ( {
    id: album.id,
    image: album.images[0].url,
    url: album.external_urls.spotify,
    name: album.name,
    release_date: album.release_date,
    type: album.album_type,
    artists: album.artists
  } ) )
  return albums 
}

endpoint.get( '/alltracks', async ( _, res ) => {
  try{
    const albums = await getTracks()
    res.json( albums )
  }catch( err ){
    res.json( { err } )
  }
} )

// endpoint.get( '/singles', async ( _, res ) => {
//   const { access_token: accessToken } = await getAccessToken()
//   console.log( accessToken )
// } )

// endpoint.get( '/all', async ( _, res ) => {
//   const { access_token: accessToken } = await getAccessToken()
//   console.log( accessToken )
// } )

const main = async () => {
  // Mount all the provided endpoints
  app.use( endpoint )
  app.use( bodyParser.json() )
  // app.use( cors() )
  try {
    const server = await app.listen( SERVER_PORT )
    const { address: host, port } = server.address()
    await setTokens()
    const intervalId = setInterval( async () => await setTokens(), 3500e3 )
    console.log( `Listening at http://${host}:${port}` )
  } catch ( err ) {
    console.error( 'Exited with error', err )
  }
}

main()