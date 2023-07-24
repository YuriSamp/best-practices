const diffParser = () => {
  let diffString;
  let isReading = false;

  const possibleFiles = [
    '.yml',
    '.yaml',
    '.md',
    '.json',
    '.lock',
    '.git',
    '.cjs',
    '.config.js',
    'LICENSE',
  ];

  const checkFile = (line) => {
    let invalidFiles = 0;
    possibleFiles.forEach((ext) => {
      invalidFiles += line.includes(ext);
    });
    return Boolean(invalidFiles);
  };

  diff.split(/\r?\n/).forEach((line) => {
    if (line.slice(0, 5) === '+++ b' && checkFile(line)) {
      isReading = false;
    } else if (line.slice(0, 5) === '+++ b' && !checkFile(line)) {
      isReading = true;
    }

    if (line[0] === '+' && isReading) {
      diffString += line;
    }
  });
  return diffString;
};
