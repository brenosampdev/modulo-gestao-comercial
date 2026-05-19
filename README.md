# Módulo de Gestão Comercial — ERP

Teste técnico Frontend Júnior ERP com produtos, formas de pagamento e pedidos. Estado em Redux, sem persistência.

## Execução

```bash
git clone https://brenosampdev/modulo-gestao-comercial

cd modulo-gestao-comercial
pnpm install
pnpm run dev
```

A rota raiz redireciona para `/orders`.

## Testar

```bash
pnpm run test
```

Testes em `src/__tests__/formatters.test.ts` cobrem `formatDate`, `calcOrderTotal`, `calcPaymentTotal`, `formatCurrency`, `calcInstallmentValue` e `isPaymentComplete`.

## Decisões técnicas

- **Feature-based** em `src/features/{products,payment-methods,orders}` cada feature agrupa `slice`, `schema`, `pages` e `components` trazendo maior escalabilidade/manutenalibidade e legibilidade.
- **Regras compostas no Zod via `.refine`** soma dos pagamentos = total do pedido e formas únicas ficam no schema, não em handler.
- **`prepare` no slice de orders** gera `id` (uuid) e `createdAt` na action; o form só envia campos do usuário.
- **`z.infer` como fonte única de tipos** `OrderFormValues`, `ProductFormValues` etc. saem direto do schema.
- **`isPaymentComplete` reutilizado** como `refine` no schema e como cálculo na listagem (mesma regra, um lugar só).
- **`formatDate` defensivo** valida `isValid(parseISO)` + comprimento 19 para rejeitar formatos fora do padrão.
- **Precisão monetária** com `Math.round(x * 100) / 100` nos cálculos para evitar `0.1 + 0.2` (como o escopo do projeto era somente front-end. Decidi optar pela não implementação da libs monetárias como dinero.js).
- **Alias `@/` → `src/`** configurado em `vite.config.ts` e `tsconfig`.
- **Mocks como estado inicial** dos slices em `src/mocks/`, simulando carga sem API.
