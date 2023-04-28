import { AnimationProvider } from './AnimationContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AnimationProvider>{children}</AnimationProvider>
}
