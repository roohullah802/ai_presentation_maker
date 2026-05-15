"use client";

import { cn } from '@/lib/utils'

type SlideCardProps = {
  slide: {
    id: string
    order: number
    title: string
    imageUrl?: string | null
  }
  isActive: boolean
  onClick: () => void
}

export function SlideCard({ slide, isActive, onClick }: SlideCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left glass rounded-xl overflow-hidden transition-all duration-300 group relative',
        isActive
          ? 'ring-2 ring-primary border-transparent'
          : 'border-border/50 hover:border-primary/30',
      )}
    >
      <div className="aspect-video relative bg-muted/30 overflow-hidden">
        {slide.imageUrl && (
          <img
            src={slide.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white/50">
          {slide.order + 1}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
          {slide.title}
        </h3>
      </div>
    </button>
  )
}
