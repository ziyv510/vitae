import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js'

const canvas = document.getElementById('bg-canvas')

const width = window.innerWidth
const height = window.innerHeight
canvas.width = width * window.devicePixelRatio
canvas.height = height * window.devicePixelRatio
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'

const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  antialias: true, 
  alpha: true 
})
renderer.setSize(width, height, false)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000)
camera.position.set(0, 10, 60)
camera.lookAt(0, 0, 0)

const nodeCount = 150
const positions = new Float32Array(nodeCount * 3)
const colors = new Float32Array(nodeCount * 3)
const initialPositions = new Float32Array(nodeCount * 3)

const rangeX = 80
const rangeY = 50
const rangeZ = 60

for (let i = 0; i < nodeCount; i++) {
  const x = (Math.random() - 0.5) * rangeX * 2
  const y = (Math.random() - 0.5) * rangeY * 2
  const z = (Math.random() - 0.5) * rangeZ * 2 - 20
  
  positions[i * 3] = x
  positions[i * 3 + 1] = y
  positions[i * 3 + 2] = z
  initialPositions[i * 3] = x
  initialPositions[i * 3 + 1] = y
  initialPositions[i * 3 + 2] = z
  
  const choice = Math.random()
  if (choice < 0.33) {
    colors[i * 3] = 0.55 + Math.random() * 0.15
    colors[i * 3 + 1] = 0.35 + Math.random() * 0.10
    colors[i * 3 + 2] = 0.20 + Math.random() * 0.10
  } else if (choice < 0.66) {
    colors[i * 3] = 0.50 + Math.random() * 0.15
    colors[i * 3 + 1] = 0.45 + Math.random() * 0.12
    colors[i * 3 + 2] = 0.38 + Math.random() * 0.10
  } else {
    colors[i * 3] = 0.70 + Math.random() * 0.15
    colors[i * 3 + 1] = 0.50 + Math.random() * 0.15
    colors[i * 3 + 2] = 0.25 + Math.random() * 0.10
  }
}

const nodeGeometry = new THREE.BufferGeometry()
nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const nodeMaterial = new THREE.PointsMaterial({ 
  size: 2.2,
  vertexColors: true, 
  transparent: true, 
  opacity: 0.6,
  blending: THREE.NormalBlending,
  depthWrite: false,
  sizeAttenuation: true
})
const points = new THREE.Points(nodeGeometry, nodeMaterial)
scene.add(points)

const linePositions = new Float32Array(nodeCount * nodeCount * 6)
let linePosIndex = 0
for (let i = 0; i < nodeCount; i++) {
  for (let j = i + 1; j < nodeCount; j++) {
    const dx = positions[i*3] - positions[j*3]
    const dy = positions[i*3+1] - positions[j*3+1]
    const dz = positions[i*3+2] - positions[j*3+2]
    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
    if (dist < 25) {
      linePositions[linePosIndex++] = positions[i*3]
      linePositions[linePosIndex++] = positions[i*3+1]
      linePositions[linePosIndex++] = positions[i*3+2]
      linePositions[linePosIndex++] = positions[j*3]
      linePositions[linePosIndex++] = positions[j*3+1]
      linePositions[linePosIndex++] = positions[j*3+2]
    }
  }
}

const lineGeometry = new THREE.BufferGeometry()
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, linePosIndex), 3))
const lineMaterial = new THREE.LineBasicMaterial({ 
  color: 0x8a7a6e,
  transparent: true, 
  opacity: 0.20,
  blending: THREE.NormalBlending
})
const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
scene.add(lines)

const starCount = 80
const starPositions = new Float32Array(starCount * 3)
const starColors = new Float32Array(starCount * 3)
for (let i = 0; i < starCount; i++) {
  starPositions[i * 3] = (Math.random() - 0.5) * 200
  starPositions[i * 3 + 1] = (Math.random() - 0.5) * 140
  starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200 - 40
  const brightness = 0.25 + Math.random() * 0.25
  starColors[i * 3] = brightness
  starColors[i * 3 + 1] = brightness * 0.85
  starColors[i * 3 + 2] = brightness * 0.75
}
const starGeometry = new THREE.BufferGeometry()
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
const starMaterial = new THREE.PointsMaterial({
  vertexColors: true,
  size: 0.5,
  transparent: true,
  opacity: 0.5,
  sizeAttenuation: true
})
const stars = new THREE.Points(starGeometry, starMaterial)
scene.add(stars)

const ambient = new THREE.AmbientLight(0xf5ede6, 0.5)
scene.add(ambient)

const light1 = new THREE.DirectionalLight(0xf5e0d0, 0.8)
light1.position.set(30, 50, 30)
scene.add(light1)

window.addEventListener('resize', () => {
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * window.devicePixelRatio
  canvas.height = h * window.devicePixelRatio
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
})

const floatOffsets = new Float32Array(nodeCount)
const floatSpeeds = new Float32Array(nodeCount)
for (let i = 0; i < nodeCount; i++) {
  floatOffsets[i] = Math.random() * Math.PI * 2
  floatSpeeds[i] = 0.3 + Math.random() * 0.5
}

function animate(time) {
  const t = time * 0.001
  
  const posAttr = nodeGeometry.attributes.position
  const posArray = posAttr.array
  for (let i = 0; i < nodeCount; i++) {
    const i3 = i * 3
    const floatY = Math.sin(t * floatSpeeds[i] + floatOffsets[i]) * 0.8
    posArray[i3] = initialPositions[i * 3]
    posArray[i3 + 1] = initialPositions[i * 3 + 1] + floatY
    posArray[i3 + 2] = initialPositions[i * 3 + 2]
  }
  posAttr.needsUpdate = true
  
  points.rotation.y += 0.0002
  lines.rotation.y += 0.0002
  stars.rotation.y += 0.00015
  
  points.material.opacity = 0.5 + Math.sin(t * 0.3) * 0.12
  lines.material.opacity = 0.15 + Math.sin(t * 0.25 + 0.5) * 0.08
  
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)