import { useEffect, useState } from 'react'
import Loading from '@/components/common/Loading'
import { useTranslation } from '@/hooks/useTranslation'
import { homeService } from '@/services/home/homeService'

export function PlacementPartners() {
  const { t } = useTranslation()
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    homeService
      .getPlacementPartners()
      .then((data) => {
        if (isMounted) {
          setPartners(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Duplicate list inside each half to guarantee ample width across wide displays
  const marqueeList = [...partners, ...partners]

  return (
    <section
      className="group bg-slate-50 border-b border-slate-200 py-8 sm:py-12 md:py-14 select-none"
      aria-labelledby="placement-partners-title"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2
            id="placement-partners-title"
            className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 sm:mb-2"
          >
            {t('home.partners.title')}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            {t('home.partners.subtitle')}
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="relative overflow-hidden w-full py-2">
            {/* Left & Right Soft Fade Gradients for a seamless edge */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-slate-50 to-transparent z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-slate-50 to-transparent z-10"
              aria-hidden="true"
            />

            {/* Scrolling Marquee Track with Pure Tailwind Pause on Hover/Focus */}
            <div className="flex animate-marquee min-w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] hover:[animation-play-state:paused]">
              {/* Primary Half Set */}
              <div className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0">
                {marqueeList.map((partner, index) => (
                  <div
                    key={`p-primary-${partner.id}-${index}`}
                    className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all duration-150"
                  >
                    <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 mb-1 text-center">
                      {partner.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {partner.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cloned Half Set for Infinite Seamless Loop */}
              <div
                className="flex items-center gap-3 sm:gap-4 pr-3 sm:pr-4 shrink-0"
                aria-hidden="true"
              >
                {marqueeList.map((partner, index) => (
                  <div
                    key={`p-clone-${partner.id}-${index}`}
                    className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center min-w-[150px] sm:min-w-[180px] md:min-w-[200px] shadow-2xs hover:shadow-sm hover:border-blue-300 transition-all duration-150"
                  >
                    <span className="font-bold text-xs sm:text-sm md:text-base text-slate-900 mb-1 text-center">
                      {partner.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {partner.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default PlacementPartners
