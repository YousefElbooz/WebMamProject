import {Suspense,useEffect,useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = (isMobile) => {
  const Computer =useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={0.15}
      groundColor="black" />
      <pointLight intensity={1}/>
      <spotLight 
      position={[-2,5,1]}
      angle={1}
      penumbra={1}
      intensity={300}
      castShadow
      shadow-mapSize={1024}
      />
      <primitive  
      object={Computer.scene}
      scale={isMobile ? 0.75 : 0.75}
      position={isMobile ?[0,-3,-2,2]: [0,-3.25,-1.5]}
      rotation ={[-.01,-0.2,-0.1]}
      />
    </mesh>
  )
}
const ComputersCanvas=()=>{
  const [isMobile,setIsMobile]=useState(false);
  useEffect(()=>{
    //add a listner for changes to the screen size
    const MediaQery=window.matchMedia('(max-width:500px)');
    //set the intial vale of the 'ismobile' state var
    setIsMobile(MediaQery.matches);
    //define a callback fnc to handle changes to the media query
    const HandelMediaQueryChange=(event)=>{
      setIsMobile(event.matches);
    }
    //add the calback func as a listner for changes to the media query
    MediaQery.addEventListener('change',HandelMediaQueryChange);
    //removee the lisntere when the component unmonted
    return() =>{
      MediaQery.removeEventListener('change',HandelMediaQueryChange);
    }
  
  })
  return(
    <Canvas 
    frameloop='demand'
    shadows
    camera={{position:[20,3,5],fov:25}}
    gl={{preserveDrawingBuffer:true}}>
      <Suspense >
        <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
    <Preload all />
    </Canvas>
  )
}
export default ComputersCanvas