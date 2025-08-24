const quizButton = document.querySelector<HTMLButtonElement>('[data-action="start-quiz"]')

quizButton?.addEventListener('click', () => {
  alert('Quiz started! Implement your quiz logic here.')
})
