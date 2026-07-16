export function f_Format(p_nValor, lnDecim = 0) {
   // Verificamos que sea un número
   if (isNaN(p_nValor) || p_nValor === null) return '-'
   // Convertimos a número
   let lnValor= Number(p_nValor)
   // Formateamos con separador de miles y decimales
   return lnValor.toLocaleString('es-PE', {minimumFractionDigits: lnDecim, maximumFractionDigits: lnDecim})
}
