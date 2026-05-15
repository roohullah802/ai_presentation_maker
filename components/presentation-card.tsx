import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

type Presentation = {
    _id: string;
    title: string;
    slideCount: number;
    style: string;
    tone: string;
    updatedAt: string;
}

type PresentationCardProps = {
  presentation: Presentation
}

export function PresentationCard({ presentation: p }: PresentationCardProps) {
  const updated = new Date(p.updatedAt).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  
  const thumb = `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(p._id)}`

  return (
    <Link
      href={`/presentations/${p._id}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <Card className="h-full glass border-border/50 py-0 overflow-hidden transition-colors hover:border-primary/40">
        <div className="flex gap-4 p-4">
          <img
            src={thumb}
            alt=""
            width={72}
            height={72}
            className="rounded-xl border border-border/50 shrink-0 bg-background/30"
          />
          <CardHeader className="p-0 gap-1 flex-1 min-w-0">
            <CardTitle className="text-base line-clamp-2">{p.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {p.slideCount} slides · {p.style} · {p.tone}
            </CardDescription>
            <p className="text-xs text-muted-foreground pt-1">
              Updated {updated}
            </p>
          </CardHeader>
        </div>
      </Card>
    </Link>
  )
}
