import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import type * as Three from 'three';

function BeanFallback() {
  return <svg className="green-bean-feature__fallback" viewBox="0 0 500 580" aria-hidden="true">
    <defs>
      <linearGradient id="bean-fallback-body" x1=".12" y1=".13" x2=".9" y2=".93">
        <stop stopColor="#d3d1aa" /><stop offset=".32" stopColor="#aaaF8f" />
        <stop offset=".7" stopColor="#87977c" /><stop offset="1" stopColor="#526d61" />
      </linearGradient>
      <radialGradient id="bean-fallback-light" cx=".31" cy=".26" r=".7">
        <stop stopColor="#eee8c9" stopOpacity=".36" /><stop offset="1" stopColor="#eee8c9" stopOpacity="0" />
      </radialGradient>
      <filter id="bean-fallback-shadow"><feGaussianBlur stdDeviation="22" /></filter>
    </defs>
    <ellipse cx="260" cy="504" rx="120" ry="22" fill="#010d08" opacity=".58" filter="url(#bean-fallback-shadow)" />
    <g transform="rotate(-18 250 285)">
      <path d="M241 86C330 72 390 148 402 257c13 123-45 220-148 236C156 507 100 437 96 313 91 195 142 102 241 86Z" fill="url(#bean-fallback-body)" stroke="#c9ceb0" strokeWidth="3" />
      <path d="M241 86C330 72 390 148 402 257c13 123-45 220-148 236C156 507 100 437 96 313 91 195 142 102 241 86Z" fill="url(#bean-fallback-light)" />
      <path d="M262 109c-26 47-36 82-30 113 6 32 27 51 25 86-2 29-20 47-23 83-3 30 6 53-13 81" fill="none" stroke="#68785f" strokeWidth="27" strokeLinecap="round" opacity=".5" />
      <path d="M261 111c-22 45-32 75-26 106 6 33 23 56 21 86-3 28-18 49-19 80-1 31 5 54-13 86" fill="none" stroke="#4b6252" strokeWidth="8" strokeLinecap="round" />
      <path d="M151 193c22-48 56-75 91-85" fill="none" stroke="#f4f0d7" strokeWidth="11" strokeLinecap="round" opacity=".22" />
    </g>
  </svg>;
}

function seamAt(unitY: number) {
  return .075 * Math.sin(unitY * 3.4) + .055 * unitY + .017 * Math.sin(unitY * 12);
}

function surfaceHeight(x: number, unitY: number, unitZ: number) {
  let z = unitZ * .36;
  if (unitZ > 0) {
    const distance = (x - seamAt(unitY)) / (.125 + .012 * Math.sin(unitY * 10));
    const fold = Math.exp(-distance * distance);
    z += .025 * Math.exp(-(((x + .27) / .38) ** 2)) * unitZ;
    z += .019 * Math.exp(-(((x - .28) / .35) ** 2)) * unitZ;
    z -= .165 * fold * Math.sqrt(unitZ);
  }
  const grain = Math.sin(x * 37 + unitY * 58) * Math.sin(unitY * 45 - x * 29);
  return z + grain * .0018 * Math.abs(unitZ);
}

function makeBeanGeometry(three: typeof Three) {
  const geometry = new three.SphereGeometry(1, 144, 96);
  const position = geometry.getAttribute('position');
  const colors: number[] = [];
  const light = new three.Color('#b6b89a');
  const dark = new three.Color('#677e6a');
  const warm = new three.Color('#b1a586');
  const color = new three.Color();

  for (let index = 0; index < position.count; index += 1) {
    const unitX = position.getX(index);
    const unitY = position.getY(index);
    const unitZ = position.getZ(index);
    const x = unitX * (.99 + .055 * unitY) + .055 * Math.sin(unitY * 2.4);
    const y = unitY * 1.1;
    let seamShade = 0;

    // The two raised halves meet in an uneven, physically recessed fold.
    if (unitZ > 0) {
      seamShade = Math.exp(-(((x - seamAt(unitY)) / .07) ** 2)) * unitZ;
    }
    position.setXYZ(index, x, y, surfaceHeight(x, unitY, unitZ));
    const mottling = Math.sin(x * 11 + y * 7) * Math.cos(y * 17 - x * 9);
    const variation = Math.sin(unitX * 31 + unitY * 43) * Math.cos(unitY * 37 - unitZ * 13);
    color.copy(dark).lerp(light, Math.min(1, Math.max(0, .6 + mottling * .095 + variation * .035 + unitZ * .07)));
    color.lerp(warm, Math.max(0, mottling) * .14);
    color.multiplyScalar(1 - seamShade * .38);
    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute('color', new three.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function makeSurfaceTexture(three: typeof Three) {
  const size = 256;
  const pixels = new Uint8Array(size * size * 4);
  let seed = 32147;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4;
      const speck = random();
      const cloud = Math.sin(x * .08) * Math.cos(y * .095) * 5;
      const value = Math.max(180, Math.min(255, 235 + (speck - .5) * 24 + cloud - (speck < .025 ? 25 : 0)));
      pixels[offset] = value;
      pixels[offset + 1] = value;
      pixels[offset + 2] = value;
      pixels[offset + 3] = 255;
    }
  }

  const texture = new three.DataTexture(pixels, size, size, three.RGBAFormat);
  texture.colorSpace = three.SRGBColorSpace;
  texture.magFilter = three.LinearFilter;
  texture.minFilter = three.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

export function GreenBeanFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const interactionRef = useRef({
    yaw: -.08,
    pitch: -.12,
    hoverYaw: 0,
    hoverPitch: 0,
    dragging: false,
    suppressHover: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
  });
  const renderRequestedRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  useMotionValueEvent(scrollYProgress, 'change', value => { progressRef.current = value; });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let disposed = false;
    let visible = false;
    let initializing = false;
    let frame = 0;
    let renderer: Three.WebGLRenderer | undefined;
    let scene: Three.Scene | undefined;
    let camera: Three.PerspectiveCamera | undefined;
    let bean: Three.Group | undefined;
    let geometry: Three.BufferGeometry | undefined;
    let material: Three.MeshStandardMaterial | undefined;
    let surfaceTexture: Three.DataTexture | undefined;
    let creaseGeometry: Three.TubeGeometry | undefined;
    let creaseMaterial: Three.MeshBasicMaterial | undefined;
    let resizeObserver: ResizeObserver | undefined;

    const renderFrame = () => {
      if (!visible || disposed || !renderer || !scene || !camera || !bean) return;
      const progress = progressRef.current;
      const interaction = interactionRef.current;
      const targetY = interaction.yaw + interaction.hoverYaw;
      const targetX = interaction.pitch + interaction.hoverPitch;
      const ease = reducedMotion ? 1 : .12;
      bean.rotation.y += (targetY - bean.rotation.y) * ease;
      bean.rotation.x += (targetX - bean.rotation.x) * ease;
      bean.rotation.z = -.18 + (reducedMotion ? 0 : Math.sin(progress * Math.PI) * .035);
      bean.position.y = reducedMotion ? 0 : Math.sin(progress * Math.PI) * .06;
      renderer.render(scene, camera);
      if (!reducedMotion) frame = window.requestAnimationFrame(renderFrame);
    };

    renderRequestedRef.current = () => {
      if (reducedMotion) renderFrame();
    };

    const initialize = async () => {
      if (renderer || initializing || disposed) return;
      initializing = true;
      try {
        const three = await import('three');
        if (renderer || disposed) return;

        renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.outputColorSpace = three.SRGBColorSpace;
        renderer.toneMapping = three.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;

        scene = new three.Scene();
        camera = new three.PerspectiveCamera(33, 1, .1, 20);
        camera.position.set(0, 0, 5.8);
        scene.add(new three.HemisphereLight('#e6e2cc', '#243d2b', 1.1));
        const key = new three.DirectionalLight('#fff1cf', 2.5);
        key.position.set(-2.5, 3.2, 4);
        scene.add(key);
        const rim = new three.DirectionalLight('#b2d7a5', 1.4);
        rim.position.set(2.5, 1, -2);
        scene.add(rim);
        const fill = new three.DirectionalLight('#688b6f', .55);
        fill.position.set(2, -2, 3);
        scene.add(fill);

        geometry = makeBeanGeometry(three);
        surfaceTexture = makeSurfaceTexture(three);
        material = new three.MeshStandardMaterial({ map: surfaceTexture, vertexColors: true, roughness: .94, metalness: 0 });
        bean = new three.Group();
        bean.add(new three.Mesh(geometry, material));
        const creasePoints: Three.Vector3[] = [];
        for (let step = 0; step <= 48; step += 1) {
          const unitY = -.87 + (step / 48) * 1.74;
          const x = seamAt(unitY);
          const unitX = (x - .055 * Math.sin(unitY * 2.4)) / (.99 + .055 * unitY);
          const unitZ = Math.sqrt(Math.max(0, 1 - unitX * unitX - unitY * unitY));
          creasePoints.push(new three.Vector3(x, unitY * 1.1, surfaceHeight(x, unitY, unitZ) + .006));
        }
        creaseGeometry = new three.TubeGeometry(new three.CatmullRomCurve3(creasePoints), 72, .0038, 5, false);
        creaseMaterial = new three.MeshBasicMaterial({ color: '#505b4c', transparent: true, opacity: .76 });
        bean.add(new three.Mesh(creaseGeometry, creaseMaterial));
        scene.add(bean);

        const resize = () => {
          if (!renderer || !camera) return;
          const { width, height } = canvas.getBoundingClientRect();
          if (width < 1 || height < 1) return;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          renderer.render(scene!, camera);
        };
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        resize();
        if (!disposed) {
          setReady(true);
          if (visible) renderFrame();
        }
      } catch {
        // The illustrated bean remains visible when WebGL is unavailable.
      } finally {
        initializing = false;
      }
    };

    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        void initialize();
        if (renderer) renderFrame();
      } else {
        window.cancelAnimationFrame(frame);
      }
    }, { rootMargin: '180px' });
    observer.observe(section);

    return () => {
      disposed = true;
      renderRequestedRef.current = () => {};
      observer.disconnect();
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      geometry?.dispose();
      material?.dispose();
      surfaceTexture?.dispose();
      creaseGeometry?.dispose();
      creaseMaterial?.dispose();
      renderer?.dispose();
    };
  }, [reducedMotion]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!ready || (event.target as Element).closest('button')) return;
    const interaction = interactionRef.current;
    interaction.yaw += interaction.hoverYaw;
    interaction.pitch += interaction.hoverPitch;
    interaction.hoverYaw = 0;
    interaction.hoverPitch = 0;
    interaction.dragging = true;
    interaction.suppressHover = true;
    interaction.pointerId = event.pointerId;
    interaction.lastX = event.clientX;
    interaction.lastY = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add('is-dragging');
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!ready || (event.target as Element).closest('button')) return;
    const interaction = interactionRef.current;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (interaction.dragging && interaction.pointerId === event.pointerId) {
      interaction.yaw += ((event.clientX - interaction.lastX) / bounds.width) * Math.PI * 2.5;
      interaction.pitch = Math.max(-1.35, Math.min(1.35, interaction.pitch + ((event.clientY - interaction.lastY) / bounds.height) * Math.PI));
      interaction.lastX = event.clientX;
      interaction.lastY = event.clientY;
    } else if (event.pointerType !== 'touch' && !interaction.suppressHover) {
      const horizontal = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      const vertical = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
      interaction.hoverYaw = Math.max(-1, Math.min(1, horizontal * 1.55)) * Math.PI;
      interaction.hoverPitch = Math.max(-.62, Math.min(.62, -vertical * .62));
    }
    renderRequestedRef.current();
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    const interaction = interactionRef.current;
    if (interaction.pointerId !== event.pointerId) return;
    interaction.dragging = false;
    interaction.pointerId = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.classList.remove('is-dragging');
  }

  function handlePointerLeave() {
    const interaction = interactionRef.current;
    if (interaction.dragging) return;
    interaction.hoverYaw = 0;
    interaction.hoverPitch = 0;
    interaction.suppressHover = false;
    renderRequestedRef.current();
  }

  function turnBean() {
    const interaction = interactionRef.current;
    interaction.yaw += interaction.hoverYaw + Math.PI;
    interaction.pitch += interaction.hoverPitch;
    interaction.hoverYaw = 0;
    interaction.hoverPitch = 0;
    interaction.suppressHover = true;
    renderRequestedRef.current();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const interaction = interactionRef.current;
    if (event.key === 'ArrowLeft') interaction.yaw -= Math.PI / 6;
    else if (event.key === 'ArrowRight') interaction.yaw += Math.PI / 6;
    else if (event.key === 'ArrowUp') interaction.pitch = Math.max(-1.35, interaction.pitch - Math.PI / 10);
    else if (event.key === 'ArrowDown') interaction.pitch = Math.min(1.35, interaction.pitch + Math.PI / 10);
    else if (event.key === 'Home') { interaction.yaw = 0; interaction.pitch = -.12; }
    else return;
    event.preventDefault();
    interaction.hoverYaw = 0;
    interaction.hoverPitch = 0;
    interaction.suppressHover = true;
    renderRequestedRef.current();
  }

  return <section ref={sectionRef} className="green-bean-feature" aria-labelledby="green-bean-heading">
    <div className="green-bean-feature__inner wrap">
      <div className="green-bean-feature__copy">
        <span className="kicker">A CLOSER LOOK / 01</span>
        <h2 id="green-bean-heading">At the heart<br />of every <em>origin.</em></h2>
        <p>From the coffee cherry comes the green bean. The place has a story; the details of each available lot deserve a closer look.</p>
        <span className="green-bean-feature__rule" aria-hidden="true" />
        <span className="green-bean-feature__note">GREEN COFFEE · ILLUSTRATIVE 3D STUDY</span>
      </div>
      <div className={`green-bean-feature__stage${ready ? ' is-ready' : ''}`} role={ready ? 'group' : 'img'} aria-label={ready ? 'Interactive 3D green coffee bean' : 'Illustration of a green coffee bean'} aria-describedby={ready ? 'green-bean-controls-help' : undefined} tabIndex={ready ? 0 : -1} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} onPointerLeave={handlePointerLeave} onKeyDown={handleKeyDown}>
        <span className="green-bean-feature__halo" aria-hidden="true" />
        <span className="green-bean-feature__ring green-bean-feature__ring--outer" aria-hidden="true" />
        <span className="green-bean-feature__ring green-bean-feature__ring--inner" aria-hidden="true" />
        <BeanFallback />
        <canvas ref={canvasRef} className={`green-bean-feature__canvas${ready ? ' is-ready' : ''}`} aria-hidden="true" />
        <span id="green-bean-controls-help" className="green-bean-feature__a11y-help">Move or drag to rotate the bean. Use the arrow keys to rotate it, or Home to return to the front.</span>
        <span className="green-bean-feature__interaction-hint" aria-hidden="true"><span className="green-bean-feature__hint-desktop">HOVER OR DRAG TO ROTATE</span><span className="green-bean-feature__hint-touch">SWIPE TO ROTATE</span></span>
        <button className="green-bean-feature__turn" type="button" disabled={!ready} onClick={turnBean} aria-label="Turn the coffee bean 180 degrees">TURN 180° <span aria-hidden="true">↻</span></button>
      </div>
    </div>
  </section>;
}
