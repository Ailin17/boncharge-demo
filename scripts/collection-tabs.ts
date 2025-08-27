import KeenSlider, { KeenSliderInstance } from 'keen-slider'
import 'keen-slider/keen-slider.min.css'

// -----------------------------
// Selectors
// -----------------------------
interface Selectors {
  tabsContainer: string
  tabButton: string
  tabPanel: string
  slider: string
}

const SELECTORS: Selectors = {
  tabsContainer: '[data-collection-tabs]',
  tabButton: '[data-tab-button]',
  tabPanel: '[data-tab-panel]',
  slider: '[data-keen-slider]'
}

// -----------------------------
// CSS Classes
// -----------------------------
interface Classes {
  tabActive: string
  panelActive: string
}

const CLASSES: Classes = {
  tabActive: 'collection-tabs__tab--active',
  panelActive: 'collection-tabs__panel--active'
}

// -----------------------------
// Script
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const tabsContainer = document.querySelector<HTMLElement>(SELECTORS.tabsContainer)
  if (!tabsContainer) return

  const tabButtons = Array.from(
    tabsContainer.querySelectorAll<HTMLButtonElement>(SELECTORS.tabButton)
  )
  const tabPanels = Array.from(
    tabsContainer.querySelectorAll<HTMLElement>(SELECTORS.tabPanel)
  )

  // Initialize Keen Sliders for all panels
  const sliders: KeenSliderInstance[] = []
  tabPanels.forEach(panel => {
    const sliderEl = panel.querySelector<HTMLElement>(SELECTORS.slider)
    if (sliderEl) {
      const slider = new KeenSlider(sliderEl, {
        loop: true,
        slides: {
          perView: 1.2,
          spacing: 15
        },
        breakpoints: {
          '(min-width: 500px)': {
            slides: { perView: 2, spacing: 20 }
          },
          '(min-width: 768px)': {
            slides: { perView: 2.5, spacing: 20 }
          },
          '(min-width: 1100px)': {
            slides: { perView: 4, spacing: 20 }
          }
        }
      })

      sliders.push(slider)

      // Attach nav buttons
      const prevBtn = document.querySelector<HTMLButtonElement>('[data-slider-prev]')
      const nextBtn = document.querySelector<HTMLButtonElement>('[data-slider-next]')

      console.log(prevBtn)
      prevBtn?.addEventListener('click', () => slider.prev())
      nextBtn?.addEventListener('click', () => slider.next())
    }
  })


  function showPanel(index: string) {
    // Update buttons
    tabButtons.forEach(btn => btn.classList.remove(CLASSES.tabActive))
    const activeButton = tabsContainer?.querySelector<HTMLButtonElement>(
      `[data-tab-button="${index}"]`
    )
    activeButton?.classList.add(CLASSES.tabActive)

    // Update panels
    tabPanels.forEach(p => p.classList.remove(CLASSES.panelActive))
    const activePanel = tabsContainer?.querySelector<HTMLElement>(
      `[data-tab-panel="${index}"]`
    )
    if (!activePanel) return
    activePanel.classList.add(CLASSES.panelActive)

    // Refresh slider
    const sliderEl = activePanel.querySelector<HTMLElement>(SELECTORS.slider)
    const sliderInstance = sliders.find(s => s.container === sliderEl)
    sliderInstance?.update()
  }

  // Tab click handler
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.tabButton
      if (index === undefined) return
      showPanel(index)
    })
  })

  // Ensure first tab/panel is active by default
  if (tabButtons[0]) tabButtons[0].classList.add(CLASSES.tabActive)
  if (tabPanels[0]) tabPanels[0].classList.add(CLASSES.panelActive)
})
