import { PresentationCard } from './presentation-card'

type Presentation = {
    _id: string;
    title: string;
    slideCount: number;
    style: string;
    tone: string;
    updatedAt: string;
}

type PresentationListSectionProps = {
  presentations: Presentation[]
  isLoading: boolean
}

export function PresentationListSection({
  presentations,
  isLoading,
}: PresentationListSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold mb-4">Your presentations</h2>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : presentations?.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No presentations yet. Create one with the form below.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {presentations?.map((p) => (
            <li key={p._id}>
              <PresentationCard presentation={p} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
