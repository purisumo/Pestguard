  const URL = 'https://teachablemachine.withgoogle.com/models/GVLyKGjOD/';
  let model, webcam, labelContainer, maxPredictions;
  const classDisplayNames = {
    'alhb': 'asian long-horned beetle',
    'ba': 'bertha armyworm',
    'bmsb': 'brown marmorated stink bug',
    'bph': 'brown-planthopper',
    'cb': 'chinch bug',
    'coc': 'cockroach',
    'cpb': 'colorado potato beetle',
    'dc': 'diaphorina citri',
    'ear': 'earwig',
    'eab': 'emerald ash borer',
    'fg': 'fungus gnats',
    'grsh': 'grasshopper',
    'gm': 'gypsy moth',
    'jb': 'japanese beetle',
    'lice': 'lice',
    'mb': 'mealy bug',
    'rat': 'rat',
    'slater': 'slater',
    'snail': 'snail',
    'thw': 'taro hornworm',
    'term': 'termites',
    'thirps': 'thrips',
    'tw': 'tobacco whitefly',
    'weevil': 'weevil',
    'ww': 'wire worm',
  };

  const classColors = {};
  Object.keys(classDisplayNames).forEach((className) => {
    classColors[className] = getRandomColor();
  });

  async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    const width = 640;
    const height = 480;
    webcam = new tmImage.Webcam(width, height, flip);
    await webcam.setup();
    document.getElementById('webcam-container').appendChild(webcam.canvas);

    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < 3; i++) { // Display top three classes
      labelContainer.appendChild(document.createElement('div'));
    }

    webcam.play();
    window.requestAnimationFrame(loop);
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

async function predict() {
  const predictions = await model.predict(webcam.canvas);

  // Sort predictions by probability in descending order
  predictions.sort((a, b) => b.probability - a.probability);

  // Check if the highest probability is above the threshold
  const highestProbability = predictions[0].probability * 100;
  if (highestProbability >= 75) {
    // Display the top three classes with high probabilities
    for (let i = 0; i < 3; i++) {
      const probability = predictions[i].probability * 100;
      const classPrediction = `${classDisplayNames[predictions[i].className]}: ${probability.toFixed(1)}%`;
      const divElement = labelContainer.children[i];
      divElement.style.fontSize = '24px';
      divElement.style.color = classColors[predictions[i].className];
      divElement.style.fontFamily = 'Arial, sans-serif';
      divElement.style.fontWeight = 'bold';
      divElement.innerHTML = classPrediction;
    }
  } else {
    // If the highest probability is below the threshold, clear the content
    for (let i = 0; i < 3; i++) {
      const divElement = labelContainer.children[i];
      divElement.innerHTML = '';
    }
  }
}


  function getRandomColor() {
    // Generate a random RGB color
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
  }

  init();