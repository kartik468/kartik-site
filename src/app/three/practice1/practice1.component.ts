import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  NgZone
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-practice1',
  templateUrl: './practice1.component.html',
  styleUrls: ['./practice1.component.scss']
})
export class Practice1Component implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  // controls: THREE.TrackballControls;

  cube: THREE.Mesh;

  constructor(
    private ngZone: NgZone
  ) { }

  ngOnInit() { }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }


  ngAfterViewInit() {
    // const renderer = new THREE.WebGLRenderer();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight - 100);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set( 0, 0, 100 );
    this.camera.lookAt( 0, 0, 0 );

    this.scene = new THREE.Scene();

    // this.renderer.setClearColor(0x00ff00);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // this.scene.add(pointLight);

    // camera controls
    // this.controls = new THREE.TrackballControls( this.camera );
    // this.controls.rotateSpeed = 1.0;
    // this.controls.zoomSpeed = 1.2;
    // this.controls.panSpeed = 0.8;
    // this.controls.noZoom = false;
    // this.controls.noPan = false;
    // this.controls.staticMoving = true;
    // this.controls.dynamicDampingFactor = 0.3;

    // create cube
    this.createCube();
    this.drawLines();
    this.renderer.render( this.scene, this.camera );
    // this.camera.position.z = 5;

    // render
    this.ngZone.runOutsideAngular(() => this.render());
  }

  drawLines(): any {
    // create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

    const line = new THREE.Line( geometry, material );

    this.scene.add( line );
  }

  createCube(): any {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: 0xf3ffe2 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(-20, 0, 0);
    this.scene.add(this.cube);

  }

  render() {
    // this.animate();
  }

  animate() {
    // this.controls.update();
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
  }


}
