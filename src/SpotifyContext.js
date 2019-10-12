import { createContext } from 'react'

// Context initialised with value null to indicate no url being loaded to the modal
const SpotifyContext = createContext( null )

export const SpotifyProvider = SpotifyContext.Provider
export const SpotifyConsumer = SpotifyContext.Consumer
export default SpotifyContext
