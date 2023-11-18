// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

// const func = async () => {
//   const response = await window.versions.ping()
//   console.log(response) // prints out 'pong'
// }

// func()

//console.log(window.myAPI)
  const setButton = document.getElementById('btn')
  const titleInput = document.getElementById('title')
  setButton.addEventListener('click', () => {
    console.log('clicking event triggered')
    const title = titleInput.value
    window.electronAPI.setTitle(title)
  })
