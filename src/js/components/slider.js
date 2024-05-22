class Slider {
    constructor(slider, options = {}) {
        this.options = options
        this.slider = slider
        this.allSlides = slider.querySelectorAll('.slider__list > *')
        this.sliderList = slider.querySelector('.slider__list')
        
        if (options.loop)
            this.loop = options.loop
        if (options.nextButton)
            this.nextButton = document.querySelector(options.nextButton)
        if (options.prevButton)
            this.prevButton = document.querySelector(options.prevButton)
        if (options.infoCur)
            this.infoCur = document.querySelector(options.infoCur)
        if (options.infoLength)
            this.infoLength = document.querySelector(options.infoLength)
        if (options.bullets)
            this.bullets = document.querySelector(options.bullets)

        this.index = 0
        this.length = this.allSlides.length
        this.autoplay = options.autoplay || false
        this.paused = null

        this.init()
    }

    destroy() {
        for (let item of this.slider.querySelectorAll('.slider__list .cloneItem')) {
            item.remove()
        }
        this.sliderList.style.transform = ''
        this.nextButton.removeEventListener('click', nextSlide)        
        this.prevButton.removeEventListener('click', prevSlide)
        this.slider.classList.remove('init')
    }

    init() {
        if (this.bullets) {
            this.dots()
        }
        
        for (let item of this.allSlides) {
            let cloneItem = item.cloneNode(true)
            if (item.classList.contains('stages__item')) {
                cloneItem.classList.add('cloneItem')
            } else {
                for (let subItem of cloneItem.querySelectorAll('.stages__item')) {                    
                    subItem.classList.add('cloneItem')
                }
            }            
            this.sliderList.append(cloneItem)
        }

        if (this.infoLength) {
            this.infoLength.innerHTML = this.length
            this.infoCur.innerHTML = 1
        }        
        
        if (this.nextButton && this.prevButton){

            if (this.nextButton){
                let nextSlide = (event) => {
                    event.preventDefault()
                    this.next()
                }
                this.nextButton.addEventListener('click', nextSlide)
            }     

            if (this.prevButton){
                let prevSlide = (event) => {
                    event.preventDefault()
                    this.prev()
                }
                this.prevButton.addEventListener('click', prevSlide)
            }

            this.checkBtnsActive()
        }

        if (this.autoplay) {
            this.play()
            this.slider.addEventListener('mouseenter', () => clearInterval(this.paused))
            this.slider.addEventListener('mouseleave', () => this.play())

            if (this.nextButton){
                this.nextButton.addEventListener('mouseenter', () => clearInterval(this.paused))
                this.nextButton.addEventListener('mouseleave', () => this.play())
            }

            if (this.prevButton){
                this.prevButton.addEventListener('mouseenter', () => clearInterval(this.paused))
                this.prevButton.addEventListener('mouseleave', () => this.play())
            }
        }

        this.slider.classList.add('init')
    }

    checkBtnsActive() {
        if (this.loop) return

        if (this.nextButton) {
            if (this.index === this.length - 1) {
                this.nextButton.setAttribute('disabled', ' ')
            } else {
                this.nextButton.removeAttribute('disabled')
            }
        }
        
        if (this.prevButton) {
            if (this.index === 0) {
                this.prevButton.setAttribute('disabled', '')
            } else {
                this.prevButton.removeAttribute('disabled')
            }
        }
    }

    goto(index) {
        if (index > this.length - 1) {
            this.index = 0
        } else if (index < 0) {
            this.index = this.length - 1
        } else {
            this.index = index
        }

        if (this.infoCur) {
            this.infoCur.innerHTML = this.index + 1
        }
        
        this.checkBtnsActive()        

        this.move()
    }

    

    next() {
        this.goto(this.index + 1)
    }

    prev() {
        this.goto(this.index - 1)
    }

    move() {
        // const offset = 100/this.length * this.index
        const offset = this.allSlides[this.index].offsetLeft
        this.sliderList.style.transform = `translateX(-${offset}px)`

        if (this.bullets) {
            
            for(let bullet of this.bullets.children) {
                bullet.classList.remove('active')
            }
            this.bullets.children[this.index].classList.add('active')
        }


    }

    play() {
        this.paused = setInterval(() => this.next(), 4000)
    }

    // создать индикатор текущего слайда
    dots() {
        if (this.bullets.children.length > 0) return

        for (let i = 0; i < this.length; i++) {
            let bullet = document.createElement('div')
            bullet.classList.add('slider-nav__bullet')
            if (i === 0) bullet.classList.add('active')
                this.bullets.append(bullet)
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Slider(document.querySelector('.participants__items'), {
        autoplay: true,
        loop: true,
        prevButton: '.participants__nav .slider-nav__prev',
        nextButton: '.participants__nav .slider-nav__next',
        infoCur: '.participants__nav .slider-nav__info-cur',
        infoLength: '.participants__nav .slider-nav__info-length',
    })


    window.addEventListener('resize', () => {
        initStagesSlider()
    }, true);
})

let stageeSlider

function initStagesSlider() {
    const winWidth = window.innerWidth
    const stages__slider = document.querySelector('.stages__items')

    if (winWidth <= 768) {
        if (setStagesSlidesGroup()) {
            stageeSlider = new Slider(stages__slider, {
                prevButton: '.stages__nav .slider-nav__prev',
                nextButton: '.stages__nav .slider-nav__next',
                bullets: '.stages__nav .slider-nav__bullets',
            })
        }        
    } else {
        if (unsetStagesSlidesGroup()) {
            stageeSlider.destroy()
        }
    }
}

initStagesSlider()

function setStagesSlidesGroup() {
    const stages__list = document.querySelector('.stages__list')
    if (stages__list.classList.contains('groupped')) return

    const slidesAll = document.querySelectorAll('.stages__item')
    let group1 = document.createElement('div')
    group1.classList.add('stages__group')
    slidesAll[0].insertAdjacentElement("beforebegin", group1)
    group1.append(slidesAll[0])
    group1.append(slidesAll[1])
    let group2 = document.createElement('div')
    group2.classList.add('stages__group')
    slidesAll[3].insertAdjacentElement("beforebegin", group2)
    group2.append(slidesAll[3])
    group2.append(slidesAll[4])
    stages__list.classList.add('groupped')
    return true
}

function unsetStagesSlidesGroup() {
    const stages__list = document.querySelector('.stages__list')
    if (!stages__list.classList.contains('groupped')) return

    const slidesAllGroups = document.querySelectorAll('.stages__group')
    slidesAllGroups.forEach(group => {
        group.querySelectorAll('.stages__item').forEach(item => {
            group.insertAdjacentElement("afterend", item)
        })
        group.remove()
    })
    stages__list.classList.remove('groupped')
    return true
}