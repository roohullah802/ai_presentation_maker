export const SLIDE_STYLES = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'professional', label: 'Professional' },
  { value: 'creative', label: 'Creative' },
  { value: 'bold', label: 'Bold' },
] as const

export const TONE_OPTIONS = [
  { value: 'formal', label: 'Formal' },
  { value: 'casual', label: 'Casual' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'informative', label: 'Informative' },
] as const

export const LAYOUT_OPTIONS = [
  { value: 'text-heavy', label: 'Text Heavy' },
  { value: 'visual', label: 'Visual Focus' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'bullet-points', label: 'Bullet Points' },
] as const

export type SlideStyle = (typeof SLIDE_STYLES)[number]['value']
export type SlideTone = (typeof TONE_OPTIONS)[number]['value']
export type SlideLayout = (typeof LAYOUT_OPTIONS)[number]['value']

export const PRESENTATION_TEMPLATES = [
  {
    id: 'business-proposal',
    label: 'Business Proposal',
    content: 'Company introduction, Market problem, Our solution, Business model, Team, Financial projections',
    slides: 8,
    style: 'professional',
    tone: 'persuasive',
    layout: 'balanced',
  },
  {
    id: 'lesson-plan',
    label: 'Educational Lesson',
    content: 'Learning objectives, Introduction to topic, Core concepts, Examples, Quiz/Activity, Summary',
    slides: 10,
    style: 'minimal',
    tone: 'informative',
    layout: 'bullet-points',
  },
  {
    id: 'pitch-deck',
    label: 'Startup Pitch',
    content: 'The Big Idea, The Problem, Solution, Traction, Market Size, Competition, Why Us?',
    slides: 12,
    style: 'bold',
    tone: 'persuasive',
    layout: 'visual',
  },
] as const

export type PresentationTemplate = (typeof PRESENTATION_TEMPLATES)[number]
