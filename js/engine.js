import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
export const T=THREE;
export function createGame(){
 const host=document.getElementById('game');
 if(!host){throw new Error('Game container not found');}
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,.05,1000);
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);
 renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0x9fbaff,0x1b2518,1.45));
 const sun=new THREE.DirectionalLight(0xffd1ad,3.2);sun.position.set(25,45,20);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
 const clock=new THREE.Clock();
 function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)}
 addEventListener('resize',resize);
 function loop(fn){function frame(){const dt=Math.min(clock.getDelta(),.05);fn(dt,clock.elapsedTime);renderer.render(scene,camera);requestAnimationFrame(frame)}requestAnimationFrame(frame)}
 function beep(freq=440,d=.08,type='sine',vol=.02){try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const a=beep.ctx||(beep.ctx=new A());if(a.state==='suspended')a.resume();const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,a.currentTime);g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.connect(g).connect(a.destination);o.start();o.stop(a.currentTime+d)}catch(e){}}
 return {scene,camera,renderer,loop,beep};
}
export function material(color,rough=.7,metal=.1,em=0){return new T.MeshStandardMaterial({color,roughness:rough,metalness:metal,emissive:em,emissiveIntensity:em?1:0})}
export function box(w,h,d,m){const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.castShadow=o.receiveShadow=true;return o}
export function sphere(r,m){const o=new T.Mesh(new T.SphereGeometry(r,24,18),m);o.castShadow=o.receiveShadow=true;return o}
export function ground(w,d,m){const o=new T.Mesh(new T.PlaneGeometry(w,d),m);o.rotation.x=-Math.PI/2;o.receiveShadow=true;return o}
export function makeCar(color=0xd94848){const g=new T.Group();const body=box(1.8,.5,3.4,material(color,.3,.65));body.position.y=.65;g.add(body);const cab=box(1.35,.45,1.55,material(0x101826,.16,.4));cab.position.set(0,1.03,-.2);g.add(cab);for(const x of[-.95,.95])for(const z of[-1.05,1.05]){const w=sphere(.33,material(0x090b0d,.25,.85));w.scale.set(.55,1,.35);w.position.set(x,.37,z);g.add(w)}return g}
export function makeCharacter(color=0x54e0a8){const g=new T.Group();const body=box(.75,1.45,.5,material(color,.4,.15));body.position.y=.9;g.add(body);const head=sphere(.31,material(0xe3ad8a));head.position.y=1.9;g.add(head);return g}
export function addStars(scene,count=800,r=500){const geo=new T.BufferGeometry(),p=[];for(let i=0;i<count;i++)p.push((Math.random()-.5)*r,(Math.random()-.5)*r,(Math.random()-.5)*r);geo.setAttribute('position',new T.Float32BufferAttribute(p,3));const pts=new T.Points(geo,new T.PointsMaterial({color:0xcfe2ff,size:.8,sizeAttenuation:true}));scene.add(pts);return pts}
export function addTrees(scene,count=60,area=130){for(let i=0;i<count;i++){const g=new T.Group(),tr=box(.5,3,.5,material(0x4b382b));tr.position.y=1.5;g.add(tr);for(let j=0;j<3;j++){const c=sphere(1.5-j*.22,material(0x244c35));c.position.set((Math.random()-.5)*1.2,3+j*1.05,(Math.random()-.5)*1.2);g.add(c)}g.position.set((Math.random()-.5)*area,0,(Math.random()-.5)*area);scene.add(g)}}
export function safeError(err){const host=document.getElementById('game');if(host)host.innerHTML='<div style="height:100%;display:grid;place-items:center;background:#05070c;color:#fff;font:16px system-ui;text-align:center;padding:30px"><div><b>3D ENGINE ERROR</b><p style="color:#9aa2b2">Open F12 → Console for the technical error. Check your internet connection because Three.js is loaded from a CDN.</p></div></div>';console.error(err)}
