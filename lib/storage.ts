interface FileMetadata {
  name: string;
  type: string;
  lastModified: number;
  size: number;
}

interface StoredFileData {
  metadata: FileMetadata;
  blob: Blob;
}

export class FileStorage {
  private db: IDBDatabase | null = null;
  private readonly dbName: string;
  private readonly storeName: string;

  constructor(dbName: string = 'FileStorage', storeName: string = 'files') {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async saveFile(key: string, file: File): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const fileData: StoredFileData = {
      metadata: {
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        size: file.size
      },
      blob: file
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(fileData, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getFile(key: string): Promise<File | null> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const fileData: StoredFileData = request.result;
        if (!fileData) {
          resolve(null);
          return;
        }

        const file = new File(
          [fileData.blob], 
          fileData.metadata.name, 
          {
            type: fileData.metadata.type,
            lastModified: fileData.metadata.lastModified
          }
        );
        resolve(file);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async listFiles(): Promise<Array<{ key: string; metadata: FileMetadata }>> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const files: Array<{ key: string; metadata: FileMetadata }> = [];

      // cursor를 사용하여 key와 value를 모두 가져옵니다
      const request = store.openCursor();

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const fileData = cursor.value as StoredFileData;
          files.push({
            key: cursor.key.toString(),
            metadata: fileData.metadata
          });
          cursor.continue();
        } else {
          // cursor 순회가 끝나면 결과를 반환
          resolve(files);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearAll(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}