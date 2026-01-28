import { Router, Request, Response } from 'express'

const router = Router()

// Placeholder routes for future backend calculations
// Currently all calculations are done client-side

router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Calculator API',
    endpoints: {
      'POST /compound-interest': 'Calculate compound interest (not implemented)',
      'POST /salary': 'Calculate salary deductions (not implemented)',
      'POST /housing-loan': 'Calculate housing loan (not implemented)',
    },
  })
})

// Placeholder: Compound Interest
router.post('/compound-interest', (_req: Request, res: Response) => {
  res.status(501).json({
    error: 'Not implemented',
    message: 'This calculation is currently done client-side',
  })
})

// Placeholder: Salary
router.post('/salary', (_req: Request, res: Response) => {
  res.status(501).json({
    error: 'Not implemented',
    message: 'This calculation is currently done client-side',
  })
})

// Placeholder: Housing Loan
router.post('/housing-loan', (_req: Request, res: Response) => {
  res.status(501).json({
    error: 'Not implemented',
    message: 'This calculation is currently done client-side',
  })
})

export { router as calculatorRoutes }
