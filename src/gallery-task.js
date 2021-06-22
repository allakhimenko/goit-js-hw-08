import galleryItems from "./gallery-items.js"

const refs = {
    gallery: document.querySelector('.js-gallery'),
    galleryItems: document.querySelector('.gallery__item'),
    galleryLink: document.querySelector('.gallery__link'),
    galleryImg: document.querySelector('.gallery__image'),
    openModal : document.querySelector ('.js-lightbox'),
     backdrop: document.querySelector('.lightbox__overlay'),
    modalImg : document.querySelector('.lightbox__image'),
    modalCloseBtn : document.querySelector('.lightbox__button'),
  }
  
  const galleryList = galleryItems.map(({preview,original,desciption}) => {
    return `<li class="gallery__item">
    <a class= "gallery__link"  href=${original}>
      <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        alt=${desciption}
      />
    </a>
  </li>`
  }
  ).join(' ')
    
  refs.gallery.insertAdjacentHTML('afterBegin', galleryList)
  
  const onImgClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return
    }
    e.preventDefault()
    refs.openModal.classList.add('is-open')
    refs.modalImg.src = e.target.dataset.source
    refs.modalCloseBtn.addEventListener('click', onCloseModal)
    refs.backdrop.addEventListener('click', onBackDropClose)
    window.addEventListener('keydown', onEscClose)
    window.addEventListener('keydown',onArrowClick)
  }
  
  const onCloseModal =  () => {
    refs.openModal.classList.remove('is-open')
    refs.modalImg.src = ""
  }
  
  const onEscClose =  e => {
    if (e.code === "Escape") {
    onCloseModal()
  }
  }
  
  const onBackDropClose =  e => {
    if (e.currentTarget === e.target) {
      onCloseModal()
    }
  }
  
  const onArrowClick = e => {
    if (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') {
      return
    }
  
    const currentImg = galleryItems.find(img => img.original === refs.modalImg.src)
    
    let currentIndex =
      e.code === 'ArrowLeft'
        ? galleryItems.indexOf(currentImg) - 1
        : galleryItems.indexOf(currentImg) + 1;
    if (currentIndex < 0) {
      currentIndex = galleryItems.length -1
    }
    if (currentIndex === galleryItems.length) {
      currentIndex = 0
    }
    
    refs.modalImg.src = galleryItems[currentIndex].original
    refs.modalImg.alt = galleryItems[currentIndex].description
  }
  
  
  refs.gallery.addEventListener('click', onImgClick)