export type Meat = 'Pork' | 'Beef' | 'Chicken' | 'Lamb' | 'Seafood'
export type PorkCut = 'Bacon' | 'Pork Chops' | 'Ground Pork' | 'Ham' | 'Spare Ribs' | 'Baby Back Ribs' | 'Beef and Pork Meatball Mix' | 'Pork Roun Roast' | 'Other'
export type BeefCut = 'Beef Cube Stake' | 'Beef Heart' | 'Brisket' | 'Ground Beef' | 'Other'
export type ChickCut = 'Chicken Breast' | 'Chicken Thighs' | 'Chicken Legs' | 'Whole Chicken' | 'Chicken Drumsticks' | 'Other'
export type LambCut = 'Lamb Shank' | 'Lamb Stew Meat' | 'Ground Lamb'
export type Seafood = 'Scallops' | 'Lobster Tails' | 'Breaded Haddock'

export type Item = {
  cut: PorkCut | BeefCut | ChickCut | LambCut | Seafood;
  code: string;
};

export type ItemSelection = {
  type: Meat
  cuts: Array<Item>
}