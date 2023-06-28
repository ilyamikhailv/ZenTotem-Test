import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageDecoder, StorageEncoder, StorageService, StorageTranscoder } from 'ngx-webstorage-service';

@Injectable({ providedIn: 'root' })
export class AppStorageService {

    
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    }

    /**
     * Checks whether an entry with the specified key exists in the storage.
     *
     * @param   key Identifier of the entry for which its presence in the storage is to be checked.
     * @returns     `true` if an entry with the specified key exists in the storage, `false` if not.
     */
    has(key: string): boolean {
        return this.has(key);
    }

    /**
     * Retrieves the value stored for the entry that is associated with the specified key. The given decoder is used to convert the stored
     * value to the desired type. If no entry for the specified key exists or if the decoder is unable to decode the stored value, then
     * `undefined` will be returned.
     *
     * @param   key     Identifier of the entry whose value is to be retrieved.
     * @param   decoder Decoder to use for converting the stored value to the desired return type.
     * @returns         Value of the entry that is identified by the specified key. In case the entry does not exist or if it cannot be
     *                  loaded (due to a decoding issue), then `undefined` will be returned by this function.
     */
    get<X>(key: string, decoder?: StorageDecoder<X>): X {
        return this.storage.get<X>(key, decoder);
    }

    /**
     * Creates or updates the entry identified by the specified key with the given value. The specified encoder is used to convert the given
     * value into a format that can be stored by the storage service's underlying storage.
     *
     * Storing a value into the storage service will ensure that an equivalent of the value can be read back, i.e. the data and structure of
     * the value will be the same. It, however, does not necessarily return the same reference.
     *
     * @param key     Identifier of the entry which is to be created or updated.
     * @param value   Value which is to be stored.
     * @param encoder Encoder used to convert the given value into a format that can be used for storage.
     */
    set<X>(key: string, value: X, encoder?: StorageEncoder<X>): void {
        this.storage.set(key, value, encoder);
    }
    /**
     * Removes the entry that is identified by the specified key. Attempting to remove an entry for an unknown key will have no effect.
     * Attempting to retrieve an entry via the `get` method after it has been removed will result in `undefined`.
     *
     * @param key Identifier of the entry which is to be removed.
     */
    remove(key: string): void {
        this.storage.remove(key);
    }
    /**
     * Clears the storage by removing all entries. Subsequent `get(x)` calls for a key *x* will return `undefined`, until a new value is set
     * for key *x*.
     */
    clear(): void {
        this.storage.clear();
    }
    /**
     * Creates a new storage service that uses the specified transcoder by default for read and write operations. The new storage service
     * uses the storage service on which this function is invoked as underlying storage. Both storage services will thus be able to access
     * the same data.
     *
     * The default transcoder will not be changed for the storage service on which this function is invoked.
     *
     * @param   transcoder Transcoder that should be used by default for read and write operations by the new storage service.
     * @returns            A new storage service that uses the specified transcoder by default.
     */
    withDefaultTranscoder<X>(transcoder: StorageTranscoder<X>): StorageService<X> {
        return this.storage.withDefaultTranscoder(transcoder);
    }
}
