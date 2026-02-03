import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PaymentContext } from '../../domain/models/payment-context.type';

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
   * Obtiene el valor de una clave buscando de forma flexible en el JSON
   * Estrategia de búsqueda:
   * 1. Busca la ruta completa tal cual (ruta absoluta)
   * 2. Si no encuentra, busca en el contexto del environment (ruta relativa)
   * 3. Si no encuentra, retorna la clave
   * 
   * Ejemplos:
   * - 'PAYROLL.TITLE' -> busca directamente en PAYROLL.TITLE
   * - 'SHARED.MANUAL.TITLE' -> busca directamente en SHARED.MANUAL.TITLE
   * - 'TITLE' -> busca primero en PAYROLL.TITLE o SUPPLIERS.TITLE según environment
   * - 'CUALQUIER.RUTA.NUEVA' -> busca directamente en CUALQUIER.RUTA.NUEVA
   */
  get(key: string): string {
    const context: PaymentContext = environment.paymentContext;
    const keys = key.split('.');
    const content = this.content();

    // Estrategia 1: Buscar la ruta completa tal cual (ruta absoluta)
    let value = this.navigatePath(content, keys);
    if (value !== null && typeof value === 'string') {
      return value;
    }

    // Estrategia 2: Si no encontró y la clave no empieza con el contexto,
    // intentar buscar en el contexto del environment (ruta relativa)
    if (keys[0] !== context && keys[0] !== 'SHARED') {
      const contextKeys = [context, ...keys];
      value = this.navigatePath(content, contextKeys);
      if (value !== null && typeof value === 'string') {
        return value;
      }
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

