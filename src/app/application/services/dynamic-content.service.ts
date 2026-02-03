import { Injectable, signal } from '@angular/core';

export interface ContentData {
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class DynamicContentService {
  private readonly content = signal<ContentData>({});

  /**
   * Establece el contenido completo
   */
  setContent(data: ContentData): void {
    this.content.set(data);
  }

  /**
   * Obtiene el valor de una clave usando notación de punto (ruta absoluta)
   * Busca directamente en la estructura del JSON sin asumir ninguna estructura específica
   * 
   * Ejemplos:
   * - 'PAYROLL.TITLE' -> busca directamente en PAYROLL.TITLE
   * - 'SUPPLIERS.SUBTITLE' -> busca directamente en SUPPLIERS.SUBTITLE
   * - 'SHARED.MANUAL.TITLE' -> busca directamente en SHARED.MANUAL.TITLE
   * - 'CUALQUIER.RUTA.NUEVA' -> busca directamente en CUALQUIER.RUTA.NUEVA
   */
  get(key: string): string {
    if (!key) {
      return '';
    }

    const keys = key.split('.');
    const content = this.content();

    // Buscar la ruta completa tal cual (ruta absoluta)
    const value = this.navigatePath(content, keys);
    
    if (value !== null && typeof value === 'string') {
      return value;
    }

    // Si no encuentra, retorna la clave original
    console.warn(`Content key not found: ${key}`);
    return key;
  }

  /**
   * Navega por una ruta en el objeto de contenido
   * @param obj - Objeto donde buscar
   * @param path - Array de claves para navegar
   * @returns El valor encontrado o null si no existe
   */
  private navigatePath(obj: any, path: string[]): any {
    let current = obj;
    
    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }
    
    return current;
  }

  /**
   * Obtiene el contenido completo (para debugging)
   */
  getContent(): ContentData {
    return this.content();
  }
}

