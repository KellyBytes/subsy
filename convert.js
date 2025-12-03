import sharp from 'sharp';

sharp('public/icon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')
  .then(() => console.log('PNG Created!'));
