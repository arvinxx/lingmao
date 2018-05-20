import { TBlock, TBlockData,  TPersonaRecord } from '../models/persona';
import blockText from '../common/persona';

export const getFilterBlockData = (
  personaData: TPersonaRecord,
  selectDims: string[]
): TPersonaRecord => {
  return personaData.filter((persona) => selectDims.some((id) => persona.tagId === id));
};

export const getBlockData = (personaData: TPersonaRecord): TBlockData => {
  const blockData: TBlockData = [];
  personaData.forEach((persona) => {
    const { type, value, tagText } = persona;
    if (blockData.some((block) => block.type === type)) {
      return;
    } else {
      const block: TBlock = {
        type,
        values: [],
      };
      personaData.forEach((persona) => {
        if (persona.type === type) {
          block.values.push({ text: persona.tagText, value: persona.value });
        }
      });
      blockData.push(block);
    }
  });
  return blockData;
};

export const getBlockText = (block: TBlock): string => {
  const text = blockText.filter((item) => item.type === block.type);
  if (text.length > 0) {
    return text[0].text;
  } else return '';
};
