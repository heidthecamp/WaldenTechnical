import { ItemSelection } from "../assets/ProductOtions";
import _productList from "../assets/products.json";

const productList = _productList as ItemSelection[];

export const getCodeFromMeatCut = (meat: string, cut: string): string | undefined => {

  for(const listMeat of productList){
    if (listMeat.type === meat){
      for(const listCut of listMeat.cuts){
        if (listCut.cut === cut) {
          return listCut.code;
        }
      }
    }
  }
  return undefined;
}

export const getIndexPairFromCode = (code: string): number[] | undefined => {
  if(code.length !== 5){
    return undefined;
  }

  for (let i = 0; i < productList.length; i++){
    for (let j = 0; j < productList[i].cuts.length; j++){
      if (productList[i].cuts[j].code === code){
        return [i, j];
      }
    }
  }
  
  return undefined;
}