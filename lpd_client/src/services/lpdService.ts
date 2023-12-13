

export async function putNewLPDEntry(productCode: string,
  lot: string,
  originProcessingCenter: string,
  weight: string,
  lpd: string,
  reason: string,
  packer: string,
  location: string
): Promise<boolean> {
  // Todo: have this make and actual put request
  const promise = new Promise((resolve) => {
    setTimeout(() => {
    console.log(
      `product code: ${productCode}\n` +
        `lot: ${lot}\n` +
        `Origin Processing Center: ${originProcessingCenter}\n` +
        `weight: ${weight}\n` +
        `lpd: ${lpd}\n` +
        `reason: ${reason}\n` +
        `packer: ${packer}\n` +
        `location: ${location}`
      );
      resolve('OK');
    }, 500)
  })
  return promise.then(() => ((Math.floor(Math.random() * 10) % 3) === 0)? false : true);
} 

