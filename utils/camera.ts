export function getSupportedMimeType() {
  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp8',
    'video/webm',
    'video/mp4;codecs=h264,aac',
    'video/mp4',
  ]
  
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type
    }
  }
  return ''
}
