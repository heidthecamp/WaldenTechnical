

export function putNewLDPEntry(productCode: string,
  lot: string,
  originProcessingCenter: string,
  weight: string,
  ldp: string,
  reason: string,
  packer: string,
  location: string
) {
  // Todo: have this make and actual put request
  console.log(
    `product code: ${productCode}\n`
    + `lot: ${lot}\n`
    + `Origin Processing Center: ${originProcessingCenter}\n`
    + `weight: ${weight}\n`
    + `ldp: ${ldp}\n`
    + `reason: ${reason}\n`
    + `packer: ${packer}\n`
    + `location: ${location}`
  )
}