# Reporte de errores - Movimientos de billetera virtual

## a) Defectos encontrados

1. **Débito con signo positivo.** "Débito por transferencia" figura como `+ 500.00`. Un débito resta saldo, debería ser negativo como la extracción. Es el más grave porque muestra mal la plata del usuario.
2. **Fecha con otro formato.** `12/21/2011` está en formato MM/DD/AAAA y el resto en formato DD/MM/AAAA. Leída como formato DD/MM, el mes 21 no existe.
3. **Problema de caracteres.** Se muestra `Dep&oacute;sito` en lugar de "Depósito".
4. **Separador decimal distinto.** Los pesos usan punto (`1000.00`) y los dólares coma (`1000,00`). Debería ser el mismo formato en todo el listado.
5. **Fechas desordenadas.** 21/11, 21/12 y 01/10 no siguen ningún orden cronológico.
6. **Error de ortografía.** "transferensia" en lugar de "transferencia".
7. **Encabezados sin tilde.** "DESCRIPCION" y "DOLARES".
8. **Importes desalineados.** Los montos no están alineados de la misma forma en las dos columnas.

## b) Campos de un reporte de defecto

- **ID**
- **Título:** qué falla y dónde, en una línea.
- **Módulo**
- **Entorno:** ambiente, versión, navegador o dispositivo.
- **Precondiciones**
- **Pasos para reproducir**
- **Resultado esperado**
- **Resultado actual**
- **Severidad:** impacto del error.
- **Prioridad:** urgencia para corregirlo.
- **Evidencia:** capturas, logs, videos.
- **Observaciones**

## Reporte del defecto 1

**ID:** BUG-001

**Título:** El "Débito por transferencia" se muestra con importe positivo en la consulta de movimientos

**Módulo:** Billetera virtual - Consulta de movimientos

**Entorno:** QA (Google chrome - Windows 11)

**Precondiciones:** Usuario con una transferencia saliente de $500 el 01/10/2011.

**Pasos para reproducir:**
1. Iniciar sesión en la billetera.
2. Ingresar a "Movimientos de cuenta".
3. Buscar el movimiento del 01/10/2011.

**Resultado esperado:** El importe se muestra como `- 500,00`.

**Resultado actual:** El importe se muestra como `+ 500.00`.

**Severidad:** Alta

**Prioridad:** Alta

**Evidencia:** Captura de la tabla de movimientos.

**Observaciones:** Revisar si el error es solo visual o si también afecta el cálculo del saldo.
