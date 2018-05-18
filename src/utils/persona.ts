import { TClusterResult } from '../models/data';

export const getFilterPersonaData = (
  personaData: TClusterResult,
  selectDims: string[]
): TClusterResult => {
  return personaData.filter((persona) => selectDims.some((id) => persona.tagId === id));
};
