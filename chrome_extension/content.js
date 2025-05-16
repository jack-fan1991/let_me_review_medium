// Create the main button container
let buttonContainer = document.createElement('div');
buttonContainer.id = 'unlockButtonContainer';
buttonContainer.style.position = 'fixed';
buttonContainer.style.bottom = '20px';
buttonContainer.style.right = '20px';
buttonContainer.style.display = 'flex';
buttonContainer.style.flexDirection = 'column';
buttonContainer.style.alignItems = 'center';
buttonContainer.style.zIndex = '10000';
buttonContainer.style.cursor = 'move';

// Create the button
let button = document.createElement('div');
button.style.width = '50px';
button.style.height = '50px';
button.style.borderRadius = '50%';
button.style.background = 'linear-gradient(135deg, #0062cc, #1e90ff)';
button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
button.style.display = 'flex';
button.style.justifyContent = 'center';
button.style.alignItems = 'center';
button.style.cursor = 'pointer';
button.style.transition = 'transform 0.2s, box-shadow 0.2s';

// Add hover effect
button.addEventListener('mouseover', function() {
  button.style.transform = 'scale(1.05)';
  button.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
});
button.addEventListener('mouseout', function() {
  button.style.transform = 'scale(1)';
  button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
});

// Create inline SVG unlock icon
let svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgIcon.setAttribute('width', '24');
svgIcon.setAttribute('height', '24');
svgIcon.setAttribute('viewBox', '0 0 24 24');
svgIcon.setAttribute('fill', 'none');
svgIcon.setAttribute('stroke', 'white');
svgIcon.setAttribute('stroke-width', '2');
svgIcon.setAttribute('stroke-linecap', 'round');
svgIcon.setAttribute('stroke-linejoin', 'round');

// Unlock icon path
let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
pathElement.setAttribute('d', 'M7 11V7a5 5 0 0 1 9.9-1');
svgIcon.appendChild(pathElement);

let rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
rectElement.setAttribute('x', '3');
rectElement.setAttribute('y', '11');
rectElement.setAttribute('width', '18');
rectElement.setAttribute('height', '11');
rectElement.setAttribute('rx', '2');
rectElement.setAttribute('ry', '2');
svgIcon.appendChild(rectElement);

button.appendChild(svgIcon);

// Create text label
let textLabel = document.createElement('div');
textLabel.textContent = 'Medium';
//blue
textLabel.style.color = '#1e93ff';
textLabel.style.marginTop = '5px';
textLabel.style.fontSize = '12px';
textLabel.style.fontWeight = 'bold';
textLabel.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';

// Add components to the container
buttonContainer.appendChild(button);
buttonContainer.appendChild(textLabel);

// Add click functionality
button.addEventListener('click', function(e) {
  e.stopPropagation(); // Prevent triggering drag when clicking
  let currentUrl = window.location.href;
  let newUrl = `https://freedium.cfd/${currentUrl}`;
  window.location.href = newUrl;
});

// Make the button draggable
let isDragging = false;
let offsetX, offsetY;

buttonContainer.addEventListener('mousedown', function(e) {
  isDragging = true;
  offsetX = e.clientX - buttonContainer.getBoundingClientRect().left;
  offsetY = e.clientY - buttonContainer.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  
  // Keep button within viewport
  const maxX = window.innerWidth - buttonContainer.offsetWidth;
  const maxY = window.innerHeight - buttonContainer.offsetHeight;
  
  buttonContainer.style.left = Math.min(Math.max(0, x), maxX) + 'px';
  buttonContainer.style.top = Math.min(Math.max(0, y), maxY) + 'px';
  
  // Remove the original positioning when dragging starts
  buttonContainer.style.right = 'auto';
  buttonContainer.style.bottom = 'auto';
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});

// Add to the document
document.body.appendChild(buttonContainer);