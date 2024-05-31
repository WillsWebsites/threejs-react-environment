import { useFrame, useThree } from '@react-three/fiber'
import {
  Lightformer,
  ContactShadows,
  AccumulativeShadows,
  SoftShadows,
  OrbitControls,
  useHelper,
  BakeShadows,
  RandomizedLight,
  Sky,
  Environment,
  Stage
} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience() {
  const cubeRef = useRef()
  const directionalLightRef = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, new THREE.Color('red'))

  const { color, opacity, blur } = useControls('contact shadows', {
    color: '#000000',
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 }
  })

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] }
  })

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('env map', {
    envMapIntensity: { value: 3.0, min: 0, max: 12 },
    envMapHeight: { value: 7.0, min: 0, max: 100 },
    envMapRadius: { value: 20, min: 10, max: 1000 },
    envMapScale: { value: 100, min: 10, max: 1000 }
  })

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime
    // cubeRef.current.position.x = 2 + Math.sin(time)
    cubeRef.current.rotation.y += delta * 0.2
  })

  //   const scene = useThree(state => state.scene)

  //   useEffect(() => {
  //     scene.environmentIntensity = envMapIntensity
  //   }, [envMapIntensity])

  return (
    <>
      {/* <Environment preset="sunset" ground={{ height: envMapHeight, radius: envMapRadius, scale: envMapScale }}>
        <color args={['#000000']} attach="background" />
        <Lightformer scale={10} position-z={-5} intensity={10} color="green" form="ring" />
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh>
      </Environment> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}
      {/* <color args={['ivory']} attach="background" /> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* 
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        blur={blur}
        opacity={opacity}
        // frames={1}
      /> */}

      {/* looks like shit */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        opacity={0.8}
        frames={Infinity}
        color="#316d39"
        temporal
        blend={100}
      >
        <RandomizedLight amount={8} radius={1} ambient={0.5} intensity={3} position={[1, 2, 3]} bias={0.001} />
      </AccumulativeShadows> */}
      {/* 
      <directionalLight
        ref={directionalLightRef}
        position={sunPosition}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={1.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <mesh castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cubeRef} castShadow position-y={1} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

      {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}

      <Stage
        shadows={{
          type: 'contact',
          opacity: 0.6,
          blur: 3
        }}
        adjustCamera={2}
        environment="apartment"
        preset="portrait"
        intensity={envMapIntensity}
      >
        <mesh castShadow position-y={1} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} castShadow position-y={1} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  )
}
