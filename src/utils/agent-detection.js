import { accessSync, constants } from 'node:fs'
import agents from '../agents.js'

const KNOWN_AGENTS = agents.map((agent) => ({
  flag: agent.flag,
  label: agent.name,
  dir: () => agent.getDir(),
}))

export function detectAgents() {
  const found = []
  for (const agent of KNOWN_AGENTS) {
    try {
      accessSync(agent.dir(), constants.F_OK)
      found.push(agent)
    } catch {
      // agent not installed
    }
  }
  return found
}
