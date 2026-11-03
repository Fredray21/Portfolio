import EmblaCarousel from 'embla-carousel'

export default function initCarousel() {
    const emblaNode = document.querySelector('.slider')
    const prevBtn = document.querySelector('.slider__button--prev')
    const nextBtn = document.querySelector('.slider__button--next')

    const emblaApi = EmblaCarousel(emblaNode, { loop: false, startIndex: 0, dragFree: true, align: 'start' })

    const toggleButtons = () => {
        prevBtn.disabled = !emblaApi.canScrollPrev()
        nextBtn.disabled = !emblaApi.canScrollNext()
    }

    prevBtn.addEventListener('click', () => emblaApi.scrollPrev())
    nextBtn.addEventListener('click', () => emblaApi.scrollNext())

    emblaApi
        .on('select', toggleButtons)
        .on('init', toggleButtons)
        .on('reInit', toggleButtons)

    window.addEventListener('viewchange', ({ detail }) => {
        if (detail.name === 'accueil') emblaApi.reInit()
    })
}
