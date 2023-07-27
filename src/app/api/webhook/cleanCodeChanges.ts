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
];

export const cleanCodeChanges = (gitDiff: string) => {
  let diffString = '';

  let isValidFile = false;

  const isValidFileExtension = (line: string) => {
    return !IGNORED_FILES.some((ext) => line.includes(ext));
  };

  const checkNewLine = (line: string) => {
    const hasFileName = line.startsWith('+++');

    if (hasFileName && isValidFileExtension(line)) {
      isValidFile = true;
    }
    if (hasFileName && !isValidFileExtension(line)) {
      isValidFile = false;
    }
  };

  gitDiff.split(/\r?\n/).forEach((line) => {
    checkNewLine(line);
    if (line[0] === '+' && isValidFile) {
      diffString += line;
    }
  });

  return diffString;
};