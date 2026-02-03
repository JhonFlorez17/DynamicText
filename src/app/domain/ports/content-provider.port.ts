export interface ContentProviderPort {
  /**
   * Carga el contenido desde la fuente configurada
   * @returns Promise que se resuelve cuando el contenido ha sido cargado
   */
  load(): Promise<void>;
}
