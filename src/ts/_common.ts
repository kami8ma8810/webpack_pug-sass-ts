const resize = (): void => {
  console.log('common resize')
}

export default {
  init: (): void => {
    console.log('common init')
    window.addEventListener('resize', resize)
    resize()
  },
  resize: (): void => {
    // resize()
  },
  scroll: (): void => {
    // scroll()
  },
}
