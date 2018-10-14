import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import '../js/EnableThreeExamples';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/loaders/ColladaLoader';

@Component({
  selector: 'app-practice2',
  templateUrl: './practice2.component.html',
  styleUrls: ['./practice2.component.scss']
})
export class Practice2Component implements OnInit, AfterViewInit {

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  // controls: THREE.TrackballControls;

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor() { }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  ngAfterViewInit() {
    this.createRenderer();
    this.createCamera();
    this.createControls();
    this.createScene();
    this.addLights();
    this.addGrond();
    this.animate();
  }

  createRenderer() {
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight - 100);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
  }

  createCamera() {
    // camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
      );
      this.camera.position.set( 0, 0, 100 );
      this.camera.lookAt( 0, 0, 0 );
  }

  createControls() {
    // controls
    const controls = new THREE.OrbitControls( this.camera, this.canvas );
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;
  }

  addGrond(): any {
    // ground
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load( 'assets/three/textures/terrain/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;

    const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    const mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
    mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add( mesh );
  }

  addLights(): any {
    // add lights
    const ambientLight = new THREE.AmbientLight( 0x666666 );
    this.scene.add(ambientLight);

    const light = new THREE.DirectionalLight( 0xdfebff, 1 );
    light.position.set( 50, 200, 100 );
    light.position.multiplyScalar( 1.3 );
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    const d = 300;
    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;
    this.scene.add( light );
  }

  createScene(): any {
    // create scene

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xcce0ff );
    this.scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
  }


  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    // const time = Date.now();
    // const windStrength = Math.cos( time / 7000 ) * 20 + 40;
    // windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
    // windForce.normalize()
    // windForce.multiplyScalar( windStrength );
    // simulate( time );
    this.render();
    // stats.update();
  }

  render() {
    // var p = cloth.particles;
    // for ( var i = 0, il = p.length; i < il; i ++ ) {
    //   clothGeometry.vertices[ i ].copy( p[ i ].position );
    // }
    // clothGeometry.verticesNeedUpdate = true;
    // clothGeometry.computeFaceNormals();
    // clothGeometry.computeVertexNormals();
    // sphere.position.copy( ballPosition );
    this.renderer.render( this.scene, this.camera );
  }

}
