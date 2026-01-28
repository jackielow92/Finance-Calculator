import { useState, RefObject } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface ExportButtonProps {
  contentRef: RefObject<HTMLDivElement | null>
  filename: string
  title: string
}

function ExportButton({ contentRef, filename, title }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!contentRef.current) return

    setIsExporting(true)

    try {
      const element = contentRef.current

      // Create a wrapper for PDF-friendly styling
      const wrapper = document.createElement('div')
      wrapper.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        padding: 20px;
        background: #ffffff;
      `

      // Clone the content
      const clone = element.cloneNode(true) as HTMLElement

      // Apply PDF-friendly styles to the clone
      applyPdfStyles(clone)

      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)

      // Create canvas with high quality settings
      const canvas = await html2canvas(wrapper, {
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
      })

      // Clean up
      document.body.removeChild(wrapper)

      // PDF dimensions
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 297
      const margin = 10
      const contentWidth = pageWidth - margin * 2
      const headerHeight = 25
      const footerHeight = 10

      // Calculate image dimensions
      const imgRatio = canvas.height / canvas.width
      const imgWidth = contentWidth
      const imgHeight = imgWidth * imgRatio

      // Available height for content per page
      const availableHeight = pageHeight - headerHeight - footerHeight - margin

      // Add header to first page
      addHeader(pdf, title, pageWidth)

      // Handle content that may span multiple pages
      let remainingHeight = imgHeight
      let sourceY = 0
      let pageNum = 1

      while (remainingHeight > 0) {
        if (pageNum > 1) {
          pdf.addPage()
          addHeader(pdf, title, pageWidth)
        }

        const sliceHeight = Math.min(remainingHeight, availableHeight)
        const sourceHeight = (sliceHeight / imgHeight) * canvas.height

        // Create a slice of the canvas for this page
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvas.width
        pageCanvas.height = sourceHeight

        const ctx = pageCanvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          )
        }

        const pageImgData = pageCanvas.toDataURL('image/png', 1.0)
        pdf.addImage(
          pageImgData,
          'PNG',
          margin,
          headerHeight,
          imgWidth,
          sliceHeight
        )

        sourceY += sourceHeight
        remainingHeight -= sliceHeight
        pageNum++
      }

      // Add footer to all pages
      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        addFooter(pdf, i, totalPages, pageWidth, pageHeight)
      }

      // Save the PDF
      const formattedDate = new Date().toISOString().split('T')[0]
      pdf.save(`${filename}_${formattedDate}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="neu-btn px-4 py-2 text-sm disabled:opacity-50"
    >
      {isExporting ? (
        <>
          <i className="fas fa-spinner fa-spin mr-2"></i>
          Exporting...
        </>
      ) : (
        <>
          <i className="fas fa-file-pdf mr-2"></i>
          Export PDF
        </>
      )}
    </button>
  )
}

function addHeader(pdf: jsPDF, title: string, pageWidth: number) {
  // Title
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(33, 33, 33)
  pdf.text(title, pageWidth / 2, 12, { align: 'center' })

  // Date
  pdf.setFontSize(10)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(100, 100, 100)
  const date = new Date().toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  pdf.text(`Generated: ${date}`, pageWidth / 2, 18, { align: 'center' })

  // Divider line
  pdf.setDrawColor(200, 200, 200)
  pdf.setLineWidth(0.5)
  pdf.line(10, 22, pageWidth - 10, 22)
}

function addFooter(
  pdf: jsPDF,
  currentPage: number,
  totalPages: number,
  pageWidth: number,
  pageHeight: number
) {
  pdf.setFontSize(8)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(128, 128, 128)

  // Page number on the right
  pdf.text(`Page ${currentPage} of ${totalPages}`, pageWidth - 10, pageHeight - 8, {
    align: 'right',
  })

  // Website on the left
  pdf.text('Finance Calculator', 10, pageHeight - 8)
}

function applyPdfStyles(element: HTMLElement) {
  // Remove neumorphic shadows and use flat design for PDF
  const cards = element.querySelectorAll<HTMLElement>('.neu-card, .neu-card-inset')
  cards.forEach((card) => {
    card.style.boxShadow = 'none'
    card.style.border = '1px solid #e0e0e0'
    card.style.borderRadius = '8px'
    card.style.backgroundColor = '#ffffff'
  })

  // Style summary cards
  const summaryCards = element.querySelectorAll<HTMLElement>('.summary-grid > div')
  summaryCards.forEach((card) => {
    card.style.boxShadow = 'none'
    card.style.border = '1px solid #e0e0e0'
    card.style.borderRadius = '8px'
    card.style.backgroundColor = '#f8f9fa'
  })

  // Ensure tables are readable
  const tables = element.querySelectorAll<HTMLElement>('table')
  tables.forEach((table) => {
    table.style.width = '100%'
    table.style.borderCollapse = 'collapse'
  })

  const tableCells = element.querySelectorAll<HTMLElement>('td, th')
  tableCells.forEach((cell) => {
    cell.style.padding = '8px 12px'
    cell.style.borderBottom = '1px solid #e0e0e0'
  })

  // Make text darker for better print contrast
  const allText = element.querySelectorAll<HTMLElement>('*')
  allText.forEach((el) => {
    const color = window.getComputedStyle(el).color
    // Convert light gray text to darker for readability
    if (color === 'rgb(156, 163, 175)' || color === 'rgb(107, 114, 128)') {
      el.style.color = '#4a5568'
    }
  })

  // Remove any input elements (show values instead)
  const inputs = element.querySelectorAll<HTMLInputElement>('input, select')
  inputs.forEach((input) => {
    const span = document.createElement('span')
    span.textContent = input.value
    span.style.fontWeight = '600'
    span.style.color = '#1a202c'
    input.parentNode?.replaceChild(span, input)
  })

  // Style buttons to be hidden in PDF
  const buttons = element.querySelectorAll<HTMLElement>('button')
  buttons.forEach((button) => {
    button.style.display = 'none'
  })

  // Ensure charts render properly
  const canvases = element.querySelectorAll<HTMLCanvasElement>('canvas')
  canvases.forEach((canvas) => {
    canvas.style.maxWidth = '100%'
    canvas.style.height = 'auto'
  })
}

export default ExportButton
