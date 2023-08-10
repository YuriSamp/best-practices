const IGNORED_FILES = [
  '.yml',
  '.yaml',
  '.md',
  '.json',
  '.lock',
  '.git',
  '.example',
  '.config.',
  '.init.',
  'LICENSE',
]

export const isValidFileExtension = (line: string) => {
  return !IGNORED_FILES.some((ext) => line.includes(ext))
}
