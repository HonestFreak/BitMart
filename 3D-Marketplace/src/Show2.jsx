import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function Model(props) {
  const { nodes, materials } = useGLTF('/show2.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, -0.481, 16.738]} rotation={[Math.PI, -0.535, Math.PI]}>
        <RigidBody type="fixed">
        <mesh geometry={nodes.Object_17.geometry} material={materials.Struktur_W} />
        </RigidBody>
        <mesh geometry={nodes.Object_18.geometry} material={materials.Chrom} />
        <mesh geometry={nodes.Object_19.geometry} material={materials.sehr_helles_warmes_Licht} />
      </group>
      <group position={[0, -0.481, 0.218]} rotation={[-Math.PI, 1.56, -Math.PI]}>
      <RigidBody type="fixed">
        <mesh geometry={nodes.Object_21.geometry} material={materials.Struktur_W} />
      </RigidBody>
        <mesh geometry={nodes.Object_22.geometry} material={materials.Chrom} />
        <mesh geometry={nodes.Object_23.geometry} material={materials.sehr_helles_warmes_Licht} />
      </group>
      <group position={[0, -0.481, -16.955]} rotation={[0, -0.512, 0]}>
      <RigidBody type="fixed">
        <mesh geometry={nodes.Object_25.geometry} material={materials.Struktur_W} />
        </RigidBody>
        <mesh geometry={nodes.Object_26.geometry} material={materials.Chrom} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.sehr_helles_warmes_Licht} />
      </group>
      <group position={[0, 0.24, 0]}>
        <mesh geometry={nodes.Object_47.geometry} material={materials.Struktur_W} />
        <RigidBody type="fixed">
        <mesh geometry={nodes.Object_48.geometry} material={materials['Material.054']} />
        </RigidBody>
        <mesh geometry={nodes.Object_49.geometry} material={materials.Licht} />
      </group>
      <group position={[0, -0.15, 0]}>
        <mesh geometry={nodes.Object_59.geometry} material={materials['Material.055']} />
        <mesh geometry={nodes.Object_60.geometry} material={materials.Gummi_S} />
        <mesh geometry={nodes.Object_61.geometry} material={materials.Chrom} />
        <RigidBody type = "fixed" colliders="trimesh">
        <mesh geometry={nodes.Object_62.geometry} material={materials.Glass_Fenster} />
        </RigidBody>
        <mesh geometry={nodes.Object_63.geometry} material={materials.Licht} />
        <mesh geometry={nodes.Object_64.geometry} material={materials.Stein} />
        <mesh geometry={nodes.Object_65.geometry} material={materials.warmes_Licht} />
      </group>
      <RigidBody type = "fixed">
      <mesh geometry={nodes.Object_15.geometry} material={materials.Beton} position={[0, -0.502, 0]} scale={1.028} />
     </RigidBody>
    </group>
  )
}

useGLTF.preload('/show2.glb')
