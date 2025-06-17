interface Holiday {
  label: string;
  date: string; // formato dd/mm/yyyy
}

interface HolidayOptions {
  includeChristianHolidays?: boolean;
}

class HolidayCalculator {
  /**
   * Calcula a data da Páscoa para um determinado ano
   * Usando o algoritmo de Gauss para o calendário gregoriano
   */
  private static calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    
    return new Date(year, month - 1, day); // month é 0-indexed em JavaScript
  }

  /**
   * Formata uma data para o formato brasileiro (dd/mm/yyyy)
   */
  private static formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Converte string dd/mm/yyyy para objeto Date
   */
  private static parseDate(dateString: string): Date | null {
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // month é 0-indexed
    const year = parseInt(parts[2]);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    return new Date(year, month, day);
  }

 
  private static getDefaultMovableHolidays(): Array<{label: string, daysFromEaster: number}> {
    return [
      { label: 'Segunda-feira de Carnaval', daysFromEaster: -48 },
      { label: 'Carnaval', daysFromEaster: -47 },
      { label: 'Quarta-feira de Cinzas', daysFromEaster: -46 },
      { label: 'Domingo de Ramos', daysFromEaster: -7 },
      { label: 'Quinta-feira Santa', daysFromEaster: -3 },
      { label: 'Sexta-feira Santa (Paixão de Cristo)', daysFromEaster: -2 },
      { label: 'Páscoa', daysFromEaster: 0 },
      { label: 'Corpus Christi', daysFromEaster: 60 }
    ];
  }

  /**
   * Calcula todos os feriados móveis para um determinado ano
   * @param year Ano para calcular os feriados
   * @param options Opções para personalizar quais feriados incluir
   */
  static calculateMovableHolidays(year: number, options: HolidayOptions = {}): Holiday[] {
    const { 
      includeChristianHolidays = true
    } = options;

    // Se includeChristianHolidays for false, retorna array vazio
    if (!includeChristianHolidays) {
      return [];
    }

    const easter = this.calculateEaster(year);
    const holidays: Holiday[] = [];    // Usa os feriados móveis baseados na Páscoa
    const movableHolidays = this.getDefaultMovableHolidays();
    for (const holiday of movableHolidays) {
      const holidayDate = new Date(easter);
      holidayDate.setDate(easter.getDate() + holiday.daysFromEaster);
      
      holidays.push({
        label: holiday.label,
        date: this.formatDate(holidayDate)
      });
    }

    // Ordena os feriados por data
    holidays.sort((a, b) => {
      const dateA = this.parseDate(a.date);
      const dateB = this.parseDate(b.date);
      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });

    return holidays;
  }

  /**
   * Verifica se uma determinada data é um feriado móvel
   * @param date Data no formato dd/mm/yyyy
   * @param year Ano (opcional, será extraído da data se não fornecido)
   * @param options Opções para personalizar quais feriados considerar
   */
  static isMovableHoliday(
    date: string, 
    year?: number, 
    options: HolidayOptions = {}
  ): Holiday | false {
    const inputDate = this.parseDate(date);
    
    if (!inputDate) {
      return false;
    }
    
    const targetYear = year || inputDate.getFullYear();
    const holidays = this.calculateMovableHolidays(targetYear, options);
    
    for (const holiday of holidays) {
      const holidayDate = this.parseDate(holiday.date);
      if (holidayDate && 
          inputDate.getTime() === holidayDate.getTime()) {
        return holiday;
      }
    }
    
    return false;
  }
}

export default HolidayCalculator;
export type { Holiday, HolidayOptions };
