import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Minus, Plus, X } from 'lucide-react'
import { downloadCvPdf } from '../../lib/downloadCv'
import { onOpenCvViewer } from '../../lib/cvViewer'
import { cvData } from '../../data/cv-data'

const CV_IMAGE_URL = `${import.meta.env.BASE_URL}cv-preview.png`
const ZOOMS = [100, 140, 180, 220]

/** Phones open zoomed in so the text is readable straight away. */
const defaultZoom = () => (window.innerWidth < 640 ? 2 : 0)

/** Full-screen, readable CV viewer. Opens via openCvViewer(); no download needed. */
export default function CvViewer() {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(
    () =>
      onOpenCvViewer(() => {
        setZoom(defaultZoom())
        setOpen(true)
      }),
    [],
  )

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 1, ZOOMS.length - 1))
      if (e.key === '-') setZoom((z) => Math.max(z - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-[#38BDF8]/60 hover:text-[#38BDF8] disabled:opacity-30'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col bg-[#050814]/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${cvData.name} CV`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <div
            className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="truncate font-heading text-[16px] font-bold text-white">{cvData.name} — CV</p>
              <p className="font-mono text-[11px] text-slate-500">One page · updated Nov 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className={btn} aria-label="Zoom out" disabled={zoom === 0} onClick={() => setZoom((z) => z - 1)}>
                <Minus size={17} />
              </button>
              <span className="hidden w-12 text-center font-mono text-[12px] text-slate-400 sm:block">{ZOOMS[zoom]}%</span>
              <button
                type="button"
                className={btn}
                aria-label="Zoom in"
                disabled={zoom === ZOOMS.length - 1}
                onClick={() => setZoom((z) => z + 1)}
              >
                <Plus size={17} />
              </button>
              <button
                type="button"
                onClick={downloadCvPdf}
                className="ml-1 hidden h-10 items-center gap-2 rounded-xl bg-white px-4 text-[13px] font-semibold text-[#070b17] sm:inline-flex"
              >
                <Download size={15} /> PDF
              </button>
              <button ref={closeRef} type="button" className={btn} aria-label="Close CV" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto px-3 py-6 sm:px-6 sm:py-10">
            <motion.img
              src={CV_IMAGE_URL}
              alt={`${cvData.name} CV`}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto block rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.6)] transition-[width,max-width] duration-300"
              style={{ width: `${ZOOMS[zoom]}%`, maxWidth: `${(ZOOMS[zoom] / 100) * 880}px` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
