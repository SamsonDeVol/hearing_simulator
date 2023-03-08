export const CREATE_AUDIO = "CREATE_AUDIO"

export function createAudio(payload) {
  return { type: CREATE_AUDIO, payload }
}
