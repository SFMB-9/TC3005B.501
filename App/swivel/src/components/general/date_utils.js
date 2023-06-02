import { format } from "date-fns";
import { es } from 'date-fns/locale';

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  
  const day = format(date, 'dd', {locale: es});
  const month = format(date, 'MMMM', {locale: es});
  const year = format(date, 'yyyy', {locale: es});

  const formattedDate = `${day} de ${month} del ${year}`;
  const formattedShortDate = `${day}/${month}/${year}`;
  const formattedTime = format(date, 'HH:mm');

  return { formattedDate, formattedTime, formattedShortDate };
}