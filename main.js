const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space' || event.code.toLowerCase() === 'enter') {
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type
  if (type === 'lock') {
    const node = event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if(type === 'text') {
    copyTextColor(event.target.textContent)
    alert('Цвет был скопирован!')
  }
})

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)].toLowerCase()
  }
  return '#' + color
}

function copyTextColor (text) {
  return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsHash() : []

  cols.forEach((col, i) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('.col__text')
    const button = col.querySelector('.col__button')


    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    const color = isInitial
    ? colors[i]
      ? colors[i]
      : generateRandomColor()
    : generateRandomColor()
    
    
    if (!isInitial) {
      colors.push(color)
    }

    text.textContent = color
    col.style.background = color

    console.log(colors)

    setTextColor(text, color)
    setTextColor(button, color)
  })

  updateColorHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1)
    })
    .join('-')
}

function getColorsHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map((color) => '#' + color)
  }
  return []
}

setRandomColors(true)

