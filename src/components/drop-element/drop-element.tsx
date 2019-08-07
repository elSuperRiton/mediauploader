import { Component, h, Prop, Element, Host, State } from '@stencil/core';
import { IMediaService, mediasService } from '../../services/medias-service';

@Component({
  tag: 'drop-element',
  styleUrl: 'drop-element.scss',
  shadow: true
})
export class DropElement {

  @Element() public dropElement: HTMLElement;

  @Prop() public file;

  @State() private _uploadPending: boolean = true;
  @State() private _uploadError: boolean = false;
  @State() private _uploadSuccess: boolean = false;
  @State() private _imgStyle: { [key: string]: string; } = {};

  private _fileReader: FileReader;
  private _mediasService: IMediaService = mediasService;


  /**
   * componentDidLoad is called once after the component
   * has been rendered and fully initialized
   *
   * Here it calls the appendPreview method prior
   * to sending the upload request via the uploadImg method
   *
   * It also handles displaying the appropriate upload state
   * according to the uploadImg res
   *
   * @memberof DropElement
   */
  componentDidLoad() {
    this._appendPreview().then(() => this._uploadImg(this.file))
  }

  /**
   * appendPreview handles appending a new
   * img element to the DOM
   *
   * @memberof DropElement
   */
  private _appendPreview = () => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onloadend = () => {
        this._fileReader = reader;
        this._imgStyle = {
          backgroundImage: `url(${reader.result})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }
        resolve();
      }
    });
  }

  /**
   * uploadImg handles the actual uploading
   * of the file to the remote server
   *
   *
   * @memberof DropElement
   */
  private _uploadImg = (file): void => {

    // Reset state to it's initial form
    this._uploadPending = true;
    this._uploadError = false;
    this._uploadSuccess = false;

    // Upload the file through configService
    this._mediasService.upload(file, this._fileReader).then((res)=> {
      if (res.status !== 200) throw new Error(res.statusText);
      this._uploadError = false;
      this._uploadPending = false;
      this._uploadSuccess = true;
    })
    .catch(() => {
      this._uploadError = true;
      this._uploadPending = false;
      this._uploadSuccess = false;
    });
  }

  render() {
    return <Host>
      <div class="drop-element-img" style={this._imgStyle}>
        <div
          class={{
            "overlay": true,
            "error": this._uploadError,
            "success": this._uploadSuccess,
          }}
        >
          { this._uploadPending && <loader-pending/> }
          { this._uploadSuccess && <loader-success/> }
          { this._uploadError &&
            <div class="error-wrapper">
              <loader-error />
              <button class="retry" onClick={() => this._uploadImg(this.file)}>
                Retry
              </button>
            </div>
          }
        </div>
      </div>
      <div class="drop-element-txt">
        <p>
          { this.file.name }
        </p>
      </div>
    </Host>
  }
}