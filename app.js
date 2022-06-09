const userColor = document.getElementById('user-color');
const colorSelect = document.getElementById('color-select');
const setScheme = fetch(
  ' https://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=monochrome&count=6'
);
const getScheme = document.getElementById('get-scheme');
const form = document.querySelector('form');

function render() {
  setScheme
    .then((res) => res.json())
    .then((data) => {
      displayColor(data);
    });
}

function displayColor(data) {
  const colors = document.querySelectorAll('.color-example');
  const colorName = document.querySelectorAll('.color-name');
  colors.forEach((section, index) => {
    const resetText = () => section.textContent = data.colors[index].name.value;
    
    section.style.backgroundColor = data.colors[index].hex.value;
    section.textContent = data.colors[index].name.value;
    section.style.color = 'white';

    section.addEventListener('click', () => {
      navigator.clipboard.writeText(data.colors[index].hex.value);
      section.textContent = 'Color Copied';
      setTimeout(resetText, 1000);
    });
  });
  colorName.forEach((color, index) => {
    color.textContent = data.colors[index].hex.value;
  });
}

getScheme.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(userColor.value.substring(1));
  console.log(colorSelect.value);
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${userColor.value.substring(
      1
    )}&mode=${colorSelect.value}&count=6`
  )
    .then((res) => res.json())
    .then((data) => {
      displayColor(data);
    });
});

render();
