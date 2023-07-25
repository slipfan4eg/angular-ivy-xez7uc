import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { IfcService } from './services/ifc.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  ifc: IfcService;
	@ViewChild('threeContainer', { static: true }) container?: ElementRef;

	constructor(ifcService: IfcService)
	{
		this.ifc = ifcService;
	}
  ngAfterContentInit(): void {
		let container = (this.container) ? this.container.nativeElement as HTMLElement : null;
		if (container) this.ifc.startIfcViewer(container);
	}

	async loadIfc (event: any) {
    const file = event.target.files[0];
    if(!file) return;
    await this.ifc.loadIfc(file);
  };
}
