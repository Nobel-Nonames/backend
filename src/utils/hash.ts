import SHA3 from 'sha3'

export default function hash(text: string) {
  const hasher = new SHA3(512)
  hasher.update(text)
  return hasher.digest('hex')
}