import { Injectable } from '@angular/core';
import { IfcViewerAPI} from 'web-ifc-viewer';

@Injectable({providedIn:'root'})
export class IfcService {
  currentModel = -1;
  ifcViewer?: IfcViewerAPI;
  container?: HTMLElement;

  constructor() { }

  startIfcViewer(container: HTMLElement) {
    if (!container) return this.notFoundError('container');
    this.container = container;
    this.setupIfcScene();
  }
	
  setupIfcScene() {
    if (!this.container) return;
    this.ifcViewer = new IfcViewerAPI({
      container: this.container
    });
		this.ifcViewer?.IFC.setWasmPath('./assets')
  }

  private notFoundError(item: string) {
    throw new Error(`ERROR: ${item} could not be found!`);
  }

	async loadIfc(file: File) {;
		await this.ifcViewer?.IFC.loadIfc(file, true);
  }
}