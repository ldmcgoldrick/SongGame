import axios from 'axios'
import { getAccessToken } from './auth'

export const playSong = async (uri) => {
    const playEndpoint = 'https://api.spotify.com/v1/me/player/play'
    const trackUri = uri
    const requestData = {
        uris: [trackUri],
    }

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    await axios
        .put(playEndpoint, requestData, { headers })
        .then((response) => {
            console.log('Playback started:', response.data)
        })
        .catch((error) => {
            console.error('Error starting playback:', error)
        })
}

export const getTopGenres = async () => {
    const endpoint = 'https://api.spotify.com/v1/me/top/artists'

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    try {
        const response = await axios.get(endpoint, { headers })
        console.log('Genres:', response.data)
        return response.data // Return the fetched data
    } catch (error) {
        console.error('Error getting genres:', error)
        throw error // Re-throw the error if needed
    }
}

export const generatePlaylist = async (artists, genres) => {
    const endpoint = 'https://api.spotify.com/v1/recommendations'
    const requestData = {
        limit: 100,
        seed_artists: artists,
        seed_genres: genres,
        market: 'US',
    }

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    try {
        const response = await axios.get(endpoint, {
            params: requestData,
            headers,
        })
        console.log(response.data.tracks)
        return response.data.tracks // Return the fetched data
    } catch (error) {
        console.error('Error generating playlist:', error)
        throw error // Re-throw the error if needed
    }
}

export const setRepeat = async () => {
    const endpoint = 'https://api.spotify.com/v1/me/player/repeat'

    const access_token = await getAccessToken()

    const headers = {
        Authorization: `Bearer ${access_token}`,
    }

    const requestData = {
        state: 'track',
    }

    try {
        const response = await axios.put(endpoint, null, {
            params: requestData,
            headers: headers,
        })
        return response.data // Return the fetched data
    } catch (error) {
        console.error('Error setting repeat:', error)
        throw error // Re-throw the error if needed
    }
}
