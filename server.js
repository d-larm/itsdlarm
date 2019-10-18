import express, { Router } from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import cors from 'cors'
import { URLSearchParams } from 'url'
import SpotifyAPI from 'spotify-web-api-node'


require( 'dotenv' ).config()



const { SERVER_PORT = 3001, CLIENT_ID, CLIENT_SECRET } = process.env

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

const getAccessToken = async () => {
  const body = new URLSearchParams()
  body.append( 'grant_type', "client_credentials" )
  return fetch( `https://accounts.spotify.com/api/token`,
    {
        method: 'POST',
        headers,
        body,
    }
  ).then( data => data.json() )
}

const getTracks = async () => {
  const apiAccessToken = await spotify.getAccessToken()

  if( !apiAccessToken ){
    const { access_token: accessToken } = await getAccessToken()
    await spotify.setAccessToken( accessToken )
  }

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
    // console.log( albums )
    res.json( albums )
  }catch( err ){
    console.log( err )
    try{
      if( err.statusCode === 401 ){
        const albums = await getTracks()
        res.json( albums )
      }
    }catch( e ){
      res.json( { err } )
    }
    res.json( { err } )
  }
} )

endpoint.get( '/singles', async ( _, res ) => {
  const { access_token: accessToken } = await getAccessToken()
  console.log( accessToken )
} )

endpoint.get( '/all', async ( _, res ) => {
  const { access_token: accessToken } = await getAccessToken()
  console.log( accessToken )
} )

const main = async () => {
  // Mount all the provided endpoints
  app.use( endpoint )
  app.use( bodyParser.json() )
  // app.use( cors() )
  try {
    const server = await app.listen( SERVER_PORT )
    const { address: host, port } = server.address()
    console.log( `Listening at http://${host}:${port}` )
  } catch ( err ) {
    console.error( 'Exited with error', err )
  }
}

main()
