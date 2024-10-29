export class VideoChunkBuffer {
  private chunks: Uint8Array[] = []
  private totalSize: number = 0

  append(chunk: BlobPart): void {
    if (chunk instanceof Blob) {
      chunk.arrayBuffer().then(buffer => {
        const uint8Array = new Uint8Array(buffer)
        this.chunks.push(uint8Array)
        this.totalSize += uint8Array.length
      })
    }
  }

  async getBuffer(): Promise<ArrayBuffer> {
    const result = new Uint8Array(this.totalSize)
    let offset = 0
    
    for (const chunk of this.chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }
    
    return result.buffer
  }

  clear(): void {
    this.chunks = []
    this.totalSize = 0
  }

  get size(): number {
    return this.totalSize
  }
}
