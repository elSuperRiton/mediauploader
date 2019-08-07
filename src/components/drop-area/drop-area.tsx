// import { Component, h, State, Element } from '@stencil/core';
import { DropElement } from '../drop-element/drop-element';
import { Component, h, Element, State, Prop } from '@stencil/core';
import { IDropAreaConfig } from '../../interfaces/drop-area';
import { configService, IConfigService } from '../../services/config-service';

@Component({
  tag: 'drop-area',
  styleUrl: 'drop-area.scss',
  shadow: true
})
export class DropArea {

  @Element() public dropArea: HTMLElement;

  @Prop() public config: IDropAreaConfig;

  @State() public highlighted: boolean = false;
  @State() public uploads: DropElement[] = [];

  private _configService: IConfigService = configService;

  componentDidLoad() {
    console.log(this.config);
    this._configService.setConfig(this.config);
    console.log(this._configService.getData().then(data => console.log(data)));
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, this.preventDefaults, false)
      document.body.addEventListener(eventName, this.preventDefaults, false)
    });

    // // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, ()=> this.highlighted = true, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, ()=> this.highlighted = false, false)
    });

    this.dropArea.addEventListener('drop', this.handleDrop, false)
  }

  handleDrop = (e) => {
    var dt = e.dataTransfer
    var files = dt.files

    this.handleFiles(files)
  }

  handleFiles = (files) => {
    files = [...files]
    files.forEach(this.previewFile)
  }

  previewFile = (file) => {
    this.uploads = [...this.uploads, <drop-element file={file}></drop-element>]
  }

  preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  render() {
    return <div id="drop-area">
      <form class={{ 'highlight' : this.highlighted }}>
        <p>
          Drag and drop files here <br/>
        </p>
        <p>
          Or
        </p>
        <input type="file" id="fileElem" multiple accept="image/*" />
        <label class="button retry" htmlFor="fileElem">Select some files</label>
      </form>
      <div id="gallery">
        { this.uploads }
      </div>
    </div>
  }
}