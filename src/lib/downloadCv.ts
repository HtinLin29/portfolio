const CV_PDF_URL = `${import.meta.env.BASE_URL}HtinLin_Aung_CV.pdf`
const CV_PDF_FILENAME = 'HtinLin_Aung_CV.pdf'

export function downloadCvPdf(): void {
  const link = document.createElement('a')
  link.href = CV_PDF_URL
  link.download = CV_PDF_FILENAME
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
