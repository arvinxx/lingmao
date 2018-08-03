export type DvaModel<T> = {
  state: T;
  reducers: any;
  effects?: any;
  subscriptions?: any;
};
