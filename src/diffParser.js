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

const diffParser = (gitDiff) => {
  let diffString = '';
  let isValidFile = false;

  const isValidFileExtension = (line) => {
    let invalidFiles = 0;
    IGNORED_FILES.forEach((ext) => {
      invalidFiles += line.includes(ext);
    });
    return !invalidFiles;
  };

  const checkNewFile = (line) => {
    const isANewFIle = line.slice(0, 5) === '+++ b';

    if (isANewFIle && isValidFileExtension(line)) {
      isValidFile = true;
    }
    if (isANewFIle && !isValidFileExtension(line)) {
      isValidFile = false;
    }
  };

  gitDiff.split(/\r?\n/).forEach((line) => {
    checkNewFile(line);
    if (line[0] === '+' && isValidFile) {
      diffString += line;
    }
  });

  return diffString;
};
