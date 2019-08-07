import { IConfigService, configService } from './config-service';
import { IDropAreaConfig } from '../interfaces/drop-area';

export interface IMediaService {
  config?: IDropAreaConfig,
  upload(file, fileReader?: FileReader): Promise<Response>,
  uploadServerSide(file): Promise<Response>,
  uploadFrontSide(file: any): Promise<Response>,
}

class MediaService implements IMediaService {

  private _configService: IConfigService = configService;

  constructor() {}

  /**
   * upload is a helper method that handles switching between
   * uploadFrontSide / uploadServerSide according to the config
   * in the configService instance
   *
   * @param {*} file
   * @returns {Promise<Response>}
   * @memberof MediaService
   */
  public upload(file): Promise<Response> {
    if (this._configService.config.uploadServerSide) {
      return this.uploadServerSide(file);
    }

    return this.uploadFrontSide(file);
  }

  /**
   * uploadServerSide handles uploading a file using the server
   * side method
   *
   * @param {*} file
   * @returns {Promise<Response>}
   * @memberof MediaService
   */
  public uploadServerSide(file): Promise<Response> {
    const formData = new FormData();
    formData.append('file', file);

    const fetchInit = {
      body: formData,
      method: "post"
    }

    return fetch(`${this._configService.config.serverSideURL}`, fetchInit);
  }

  /**
   * uploadFrontSide handles uploading a file on the front
   * side by requesting a signed URL on the server
   *
   * Please note that this method is only triggered when
   * serverSideUpload config is set to false in the configuration
   *
   *
   * @param {*} file
   * @returns {Promise<Response>}
   * @memberof MediaService
   */
  public async uploadFrontSide(file: any): Promise<Response> {

    // build url
    const url = new URL(this._configService.config.frontSideURL);
    url.searchParams.append('fileName', file.name);
    url.searchParams.append('fileType', file.type);


    // get signed url from server
    let signedURL: string;
    try {
      const res = await fetch(url.toJSON()).then(res => res.json());
      signedURL = (res as any).data.signedUrl;
    } catch (error) {
      console.error(error)
      return Promise.reject(error);
    }

    // const formData = new FormData();
    // formData.append("test", (fileReader.result as any));
    return fetch(signedURL, { method: 'PUT', body: file });
  }
}

export const mediasService = new MediaService();