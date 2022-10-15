import { phases } from "../memory"
import { Phase } from "../schemas/db/phase"

export const insert = (phase: Phase) => {
  phases.push(phase)

  return phase
}

export const get = (): Phase[] => {
  return phases
}
