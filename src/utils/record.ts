import Plain from 'slate-plain-serializer';

export const initRecords = (text) => Plain.deserialize(text, { toJSON: true });
