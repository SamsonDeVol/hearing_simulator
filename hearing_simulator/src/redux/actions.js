export const CREATE_AUDIO = "CREATE_AUDIO"
export const STOP_AUDIO = "STOP_AUDIO"

export function createAudio(payload) {
  return { type: CREATE_AUDIO, payload }
}

export function stopAudio(payload) {
  return { type: STOP_AUDIO, payload}
}
