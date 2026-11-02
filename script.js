window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('shoe-canvas');

  if (!container || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45, 
    container.clientWidth / container.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Emerald Green 3D Shoe Mesh Representation
  const geometry = new THREE.BoxGeometry(2.2, 0.8, 1);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x10b981, 
    roughness: 0.25,
    metalness: 0.35
  });
  const shoeMesh = new THREE.Mesh(geometry, material);
  scene.add(shoeMesh);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x34d399, 1.5);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', () => { isDragging = true; });
  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      shoeMesh.rotation.y += deltaMove.x * 0.01;
      shoeMesh.rotation.x += deltaMove.y * 0.01;
    }
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
      shoeMesh.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});

// Dynamic English/Urdu Language Switcher with RTL Support
const btnEn = document.getElementById('lang-en');
const btnUr = document.getElementById('lang-ur');

if (btnEn && btnUr) {
  btnEn.addEventListener('click', () => {
    btnEn.classList.add('active');
    btnUr.classList.remove('active');
    switchLanguage('en');
  });

  btnUr.addEventListener('click', () => {
    btnUr.classList.add('active');
    btnEn.classList.remove('active');
    switchLanguage('ur');
  });
}

function switchLanguage(lang) {
  const translatableElements = document.querySelectorAll('[data-lang-en]');
  
  translatableElements.forEach(el => {
    if (lang === 'ur') {
      el.textContent = el.getAttribute('data-lang-ur');
    } else {
      el.textContent = el.getAttribute('data-lang-en');
    }
  });

  // Handle Text Direction for Urdu (RTL)
  if (lang === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.style.fontFamily = "'Inter', sans-serif";
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
}