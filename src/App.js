import React, { createElement } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/nav';
import * as THREE from "three";
import './';

import Card from './components/card/card'
import Modal from './components/modal/modal'



import mars from './textures/mars.jpg';
import bg from './textures/bg.jpg';
import sun from './textures/sun.jpg';
import earth from './textures/earth.jpg';
import lensflare0 from './textures/lensflare0.png'
import lensflare3 from './textures/lensflare3.png'
import disc from './textures/disc.png';

import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
class App extends React.Component {


  state = {
    url: '',
    launch_date: ''

  }



  componentDidMount() {
    // === THREE.JS CODE START ===
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    //escena
    var scene = new THREE.Scene();

    //textura 
    var loaderBg = new THREE.TextureLoader().load(bg);
    scene.background = loaderBg;
    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);

    //camara principal
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    this.ligthSun(scene)

    //renderizado
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //crear sol
    //textura del sol
    var loader = new THREE.TextureLoader();

    var geometry = new THREE.SphereGeometry(1, 32, 32).scale(5, 5, 5);
    var material = new THREE.MeshBasicMaterial({ map: loader.load(sun) });
    var sunMat = new THREE.Mesh(geometry, material);
    sunMat.name = "SUN"
    //scene.add(sunMat);

    var control = new OrbitControls(camera,renderer.domElement)
    

    //crear marte
    //textura de marte
    var moonScale = 0.23;
    var radius = 6371;
    var materialMars = new THREE.MeshBasicMaterial({

      map: loader.load(mars)

    });
    var meshMars = new THREE.Mesh(geometry, materialMars);
    meshMars.position.set(25, 0, 0);
    meshMars.scale.set(moonScale, moonScale, moonScale);
    meshMars.name = "MARS"
    scene.add(meshMars);


    //crear tierra
    var materialEarth = new THREE.MeshBasicMaterial({

      map: loader.load(earth)

    });
    var meshEarth = new THREE.Mesh(geometry, materialEarth);
    meshEarth.position.set(15, 25, 50);
    meshEarth.scale.set(moonScale, moonScale, moonScale);
    meshEarth.name = "EARTH";
    scene.add(meshEarth);

    

    //posicion de la camara
    camera.position.z = 30;


    this.clickELement(renderer, camera, scene, raycaster, mouse)
    var particulas = this. starts(scene)


    //animacion
    var i = 0;
    var a = 0;
    var animate = function () {
      requestAnimationFrame(animate);
      raycaster.setFromCamera(mouse, camera);
      sunMat.rotation.y += 0.001;
      meshEarth.rotation.y += 0.1;
      meshMars.rotation.y += 0.01;
      meshEarth.position.set(Math.cos(a) * 10, 0, Math.sin(a) * 10);
      meshMars.position.set(Math.cos(i) * 30, 0, Math.sin(i) * 15)
      // calculate objects intersecting the picking ray
      
      //velocidad marte
      a+=0.01;
      i += 0.001;
      renderer.render(scene, camera);
    };




    animate();
    // === THREE.JS EXAMPLE CODE END ===


    const APIKEY = "TwP9PaqXaRU5Gago0QGNWI7efsT53kdSsY3LtWjy"
    var f = new Date();
    // var fecha = f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate();
    var fecha = "2019-04-02"
    const URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=" + fecha + "&api_key=" + APIKEY

    fetch(URL, {
      method: "GET"
    }).then(res => res.json()).then(json => {
      console.log(json)
      const lastUrl = json.photos[0].img_src
      const launch_date = json.photos[0].rover.launch_date
      this.setState({
        url: lastUrl,
        launch_date: launch_date
      })

    })
  }

  ligthSun(scene) {
    //luces
    var textureLoader = new THREE.TextureLoader();

    var textureFlare0 = textureLoader.load(lensflare0);
    var textureFlare3 = textureLoader.load(lensflare3);
    addLight(0.08, 0.9, 0.5, 0, 0, 0);
    addLight(0.08, 2, 0.5, 0, 0, 0);
    addLight(0.995, 0.5, 0.9, 0, 0, 0);
    function addLight(h, s, l, x, y, z) {

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.color.setHSL(h, s, l);
      light.position.set(x, y, z);
      scene.add(light);

      var lensflare = new Lensflare();
      lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.6));
      lensflare.addElement(new LensflareElement(textureFlare3, 50, 0.7));
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 0.9));
      lensflare.addElement(new LensflareElement(textureFlare3, 20, 1));
      light.add(lensflare);

    }
  }

  starts(scene){
    var geometry = new THREE.BufferGeometry();
				var vertices = [];

				var sprite = new THREE.TextureLoader().load(disc );

				for ( var i = 0; i < 10000; i ++ ) {
          var x = 2000 * Math.random() - 1000;
					var y = 2000 * Math.random() - 1000;
					var z = 2000 * Math.random() - 1000;

					vertices.push( x, y, z );

				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

				var material = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true } );
				material.color.setHSL( 198, 99, 50 );
				var particles = new THREE.Points( geometry, material );
        scene.add( particles );
        return particles;
  }


  clickELement(renderer, camera, scene, raycaster, mouse) {

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    })

    var i = 0;
    window.addEventListener('mousemove', e => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
      var intersects = raycaster.intersectObjects(scene.children);

      for (i = 0; i < intersects.length; i++) {
        var bool = false;

        if (intersects[i].object.name == 'MARS') {
          if (!bool) {
            console.log('true')
           // intersects[i].object.material.color.set(0xff0000);
            var x = intersects[i].object.position.x;
            var y = intersects[i].object.position.y;
            var geometry = new THREE.BoxGeometry(20, 40, 1);
            var material = new THREE.MeshBasicMaterial({ colorWrite:0xff5f4 });
            
            bool = true;
          }


        } else {

        }


      }
      intersects = null;
    });
  }

  render() {

    const style = { backgroundImage: "url(" + this.state.url + ")" }
    return (
      <div className="App">
        <Nav />
        <Card img1={style} launch_date={this.state.launch_date} />
      </div>
    );
  }
}


export default App;
