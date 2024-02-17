export interface Usecase {
  execute(input?: any): Promise<any>;
}
