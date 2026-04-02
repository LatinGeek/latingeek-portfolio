'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, Float, Sparkles, Stars, Sky, Line, useGLTF } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Tech stack icons represented as 3D objects
interface TechNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'database' | 'devops';
  position: [number, number, number];
  size: number;
  color: string;
  proficiency: number; // 0-1
  businessValue: string; // What this brings to business
}

const TECH_NODES: TechNode[] = [
  // Frontend Technologies
  { id: 'nextjs', name: 'Next.js', category: 'frontend', position: [-5, 2, 0], size: 1.2, color: '#000000', proficiency: 0.95, businessValue: 'Enterprise-scale React framework with SSR/SSG for optimal performance and SEO' },
  { id: 'react', name: 'React', category: 'frontend', position: [-3, 2, 2], size: 1.0, color: '#61DAFB', proficiency: 0.95, businessValue: 'Component-based UI for scalable, maintainable applications' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', position: [-1, 2, 0], size: 1.1, color: '#3178C6', proficiency: 0.9, businessValue: 'Type safety reducing bugs by 15% and improving developer velocity' },
  { id: 'tailwind', name: 'Tailwind', category: 'frontend', position: [1, 2, -2], size: 1.0, color: '#06B6D4', proficiency: 0.9, businessValue: 'Rapid UI development with consistent design systems' },
  
  // Backend Technologies
  { id: 'nodejs', name: 'Node.js', category: 'backend', position: [-4, 0, 3], size: 1.2, color: '#339933', proficiency: 0.9, businessValue: 'High-performance server-side JavaScript for scalable APIs' },
  { id: 'python', name: 'Python', category: 'backend', position: [-2, 0, 4], size: 1.0, color: '#3776AB', proficiency: 0.85, businessValue: 'Data processing, ML, and automation capabilities' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', position: [0, 0, 5], size: 0.9, color: '#E10098', proficiency: 0.8, businessValue: 'Efficient data fetching reducing bandwidth by 40%' },
  
  // Infrastructure
  { id: 'aws', name: 'AWS', category: 'infrastructure', position: [4, -1, -2], size: 1.3, color: '#FF9900', proficiency: 0.85, businessValue: 'Enterprise cloud infrastructure with 99.99% uptime SLA' },
  { id: 'docker', name: 'Docker', category: 'infrastructure', position: [2, -1, -1], size: 1.0, color: '#2496ED', proficiency: 0.9, businessValue: 'Containerization ensuring consistent environments' },
  { id: 'kubernetes', name: 'K8s', category: 'infrastructure', position: [0, -1, 0], size: 1.1, color: '#326CE5', proficiency: 0.8, businessValue: 'Orchestration for scalable, resilient deployments' },
  
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', position: [5, 1, -3], size: 1.2, color: '#336791', proficiency: 0.9, businessValue: 'ACID-compliant relational database for transactional data' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', position: [3, 1, -4], size: 1.0, color: '#47A248', proficiency: 0.85, businessValue: 'Scalable NoSQL for flexible data models' },
  { id: 'redis', name: 'Redis', category: 'database', position: [1, 1, -5], size: 0.9, color: '#DC382D', proficiency: 0.8, businessValue: 'In-memory caching reducing latency by 90%' },
  
  // DevOps
  { id: 'github', name: 'GitHub', category: 'devops', position: [-5, -2, 1], size: 1.0, color: '#181717', proficiency: 0.95, businessValue: 'CI/CD automation and team collaboration' },
  { id: 'terraform', name: 'Terraform', category: 'devops', position: [-3, -2, 2], size: 1.1, color: '#7B42BC', proficiency: 0.8, businessValue: 'Infrastructure as Code for reproducible environments' },
  { id: 'jenkins', name: 'Jenkins', category: 'devops', position: [-1, -2, 3], size: 1.0, color: '#D24939', proficiency: 0.75, businessValue: 'Automated build and deployment pipelines' },
];

// Business metrics for real-time display
interface BusinessMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  improvement: number; // Percentage improvement
}

const BUSINESS_METRICS: BusinessMetric[] = [
  { id: 'performance', label: 'Performance Score', value: 98, unit: 'Lighthouse', improvement: 15 },
  { id: 'latency', label: 'API Latency', value: 45, unit: 'ms', improvement: -60 },
  { id: 'scalability', label: 'Concurrent Users', value: 10000, unit: 'users', improvement: 300 },
  { id: 'uptime', label: 'System Uptime', value: 99.99, unit: '%', improvement: 0.5 },
  { id: 'security', label: 'Security Score', value: 95, unit: '/100', improvement: 20 },
];

// 3D Tech Node Component
function TechNode3D({ node, isActive, onClick }: { node: TechNode; isActive: boolean; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Scale effect on hover
      const targetScale = isActive ? 1.5 : hovered ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const getNodeGeometry = () => {
    switch (node.category) {
      case 'frontend': return new THREE.OctahedronGeometry(node.size, 0);
      case 'backend': return new THREE.DodecahedronGeometry(node.size, 0);
      case 'infrastructure': return new THREE.BoxGeometry(node.size * 1.5, node.size * 1.5, node.size * 1.5);
      case 'database': return new THREE.CylinderGeometry(node.size, node.size, node.size * 2, 8);
      case 'devops': return new THREE.TorusGeometry(node.size, node.size * 0.3, 8, 16);
      default: return new THREE.SphereGeometry(node.size, 16, 16);
    }
  };

  return (
    <group>
      {/* Main node */}
      <mesh
        ref={meshRef}
        position={node.position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <primitive object={getNodeGeometry()} />
        <meshStandardMaterial 
          color={node.color} 
          emissive={node.color}
          emissiveIntensity={isActive ? 0.5 : hovered ? 0.3 : 0.1}
          roughness={0.4}
          metalness={0.6}
        />
        
        {/* Proficiency ring */}
        {isActive && (
          <ringGeometry args={[node.size * 1.2, node.size * 1.3, 32]} />
        )}
      </mesh>

      {/* Node label */}
      <Html position={[node.position[0], node.position[1] + node.size + 0.5, node.position[2]]}>
        <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap">
          {node.name}
          {isActive && (
            <div className="text-[10px] text-gray-300 mt-1">
              {node.businessValue}
            </div>
          )}
        </div>
      </Html>

      {/* Proficiency indicator */}
      <Html position={[node.position[0], node.position[1] - node.size - 0.5, node.position[2]]}>
        <div className="text-[10px] text-white bg-black/50 px-2 py-1 rounded">
          Proficiency: {Math.round(node.proficiency * 100)}%
        </div>
      </Html>
    </group>
  );
}

// Connection lines between related nodes
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const [connections, setConnections] = useState<THREE.Vector3[][]>([]);

  useEffect(() => {
    // Create connections between nodes of same category
    const newConnections: THREE.Vector3[][] = [];
    const categories = ['frontend', 'backend', 'infrastructure', 'database', 'devops'];
    
    categories.forEach(category => {
      const categoryNodes = TECH_NODES.filter(node => node.category === category);
      
      // Connect each node to the next in the category
      for (let i = 0; i < categoryNodes.length - 1; i++) {
        const node1 = categoryNodes[i];
        const node2 = categoryNodes[i + 1];
        newConnections.push([
          new THREE.Vector3(...node1.position),
          new THREE.Vector3(...node2.position)
        ]);
      }
    });

    setConnections(newConnections);
  }, []);

  return (
    <group>
      {connections.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#3b82f6"
          lineWidth={1}
          opacity={0.3}
          transparent
        />
      ))}
    </group>
  );
}

// Business Metrics Display
function BusinessMetricsPanel() {
  const { camera } = useThree();
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    // Position panel relative to camera
    const cameraPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraPosition);
    setPosition([cameraPosition.x - 3, cameraPosition.y + 2, cameraPosition.z - 5]);
  }, [camera]);

  return (
    <Html position={position} className="w-64">
      <div className="bg-gray-900/90 backdrop-blur-lg rounded-xl p-4 border border-gray-700 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Business Impact Dashboard
        </h3>
        
        <div className="space-y-3">
          {BUSINESS_METRICS.map((metric) => (
            <div key={metric.id} className="bg-gray-800/50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-300">{metric.label}</span>
                <span className="text-sm font-semibold text-white">
                  {metric.value} {metric.unit}
                </span>
              </div>
              
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">Baseline</span>
                <span className={`font-medium ${metric.improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.improvement >= 0 ? '+' : ''}{metric.improvement}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
              Real-time system monitoring
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              Enterprise-grade SLAs
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}

// Main 3D Scene
function ThreeScene({ onNodeSelect }: { onNodeSelect: (node: TechNode) => void }) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  const handleNodeClick = (node: TechNode) => {
    setSelectedNode(node.id);
    onNodeSelect(node);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      {/* Background elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Sparkles count={200} scale={20} size={1} speed={0.3} />
      
      {/* Floating particles */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-8, 3, -5]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[8, -2, 5]}>
          <torusGeometry args={[0.4, 0.1, 8, 16]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Tech nodes */}
      {TECH_NODES.map((node) => (
        <TechNode3D
          key={node.id}
          node={node}
          isActive={selectedNode === node.id}
          onClick={() => handleNodeClick(node)}
        />
      ))}

      {/* Connections */}
      <ConnectionLines />

      {/* Category labels */}
      <Text
        position={[-5, 4, 0]}
        fontSize={0.8}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        Frontend
      </Text>
      <Text
        position={[-2, 4, 4]}
        fontSize={0.8}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        Backend
      </Text>
      <Text
        position={[3, 4, -2]}
        fontSize={0.8}
        color="#f59e0b"
        anchorX="center"
        anchorY="middle"
      >
        Infrastructure
      </Text>
      <Text
        position={[5, 4, -5]}
        fontSize={0.8}
        color="#ef4444"
        anchorX="center"
        anchorY="middle"
      >
        Database
      </Text>
      <Text
        position={[-5, -4, 2]}
        fontSize={0.8}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
      >
        DevOps
      </Text>

      {/* Business metrics panel */}
      {showMetrics && <BusinessMetricsPanel />}

      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.8}
        maxDistance={20}
        minDistance={5}
      />
    </>
  );
}

// Main Business Tech Scene Component
export default function BusinessTechScene() {
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);

  const handleNodeSelect = (node: TechNode) => {
    setSelectedTech(node);
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-gray-800">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], fov: 50 }}
        className="bg-gradient-to-br from-gray-900 to-black"
      >
        <Suspense fallback={null}>
          <ThreeScene onNodeSelect={handleNodeSelect} />
        </Suspense>
      </Canvas>

      {/* Overlay controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
          <h4 className="text-sm font-semibold text-white mb-2">Interactive Tech Stack</h4>
          <p className="text-xs text-gray-300">
            Click on any technology node to see business impact and details
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            onClick={() => window.open('https://github.com/LatinGeek', '_blank')}
          >
            View GitHub
          </button>
          <button 
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg border border-gray-700 transition-colors"
            onClick={() => window.location.href = '#projects'}
          >
            See Projects
          </button>
        </div>
      </div>

      {/* Selected tech details */}
      {selectedTech && (
        <div className="absolute top-4 left-4 max-w-sm bg-gray-900/90 backdrop-blur-lg rounded-xl p-4 border border-gray-700 shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedTech.name}</h3>
              <div className="flex items-center mt-1">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: selectedTech.color }}
                />
                <span className="text-sm text-gray-300 capitalize">{selectedTech.category}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {Math.round(selectedTech.proficiency * 100)}%
              </div>
              <div className="text-xs text-gray-400">Proficiency</div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Business Value</h4>
            <p className="text-sm text-gray-300">{selectedTech.businessValue}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Scalability</span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${selectedTech.proficiency * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Performance</span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${selectedTech.proficiency * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Maintenance</span>
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${selectedTech.proficiency * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <button 
            className="w-full mt-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            onClick={() => setSelectedTech(null)}
          >
            Close Details
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 max-w-xs">
        <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          3D Tech Visualization
        </h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li className="flex items-center">
            <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
            Click on nodes for business impact details
          </li>
          <li className="flex items-center">
            <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
            Drag to rotate, scroll to zoom
          </li>
          <li className="flex items-center">
            <div className="w-1 h-1 bg-purple-500 rounded-full mr-2" />
            Real-time business metrics on right
          </li>
          <li className="flex items-center">
            <div className="w-1 h-1 bg-yellow-500 rounded-full mr-2" />
            Colors indicate technology categories
          </li>
        </ul>
      </div>
    </div>
  );
}