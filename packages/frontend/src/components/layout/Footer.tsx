function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 text-center text-text-sec text-sm">
      <p>&copy; {currentYear} Financial Calculators. Built for Malaysian professionals.</p>
      <p className="mt-1 text-xs">
        Calculations are estimates. Consult a financial advisor for personalized advice.
      </p>
    </footer>
  )
}

export default Footer
