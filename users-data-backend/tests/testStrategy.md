# Estratégia de testes

Criação de estratégia de testes, ou seja, o que devemos testar.
Estratégias baseadas no capítulo 7 do livro [Python Testing with pytest](https://www.amazon.com.br/Python-Testing-Pytest-Effective-Scalable/dp/1680508601), segunda edição, do Brian Okken.

## Estratégia

### Prioridade de teste por tipo de feature

Testar features na seguinte ordem:

1. Recentes (adicionadas ou modificadas recentemente)
2. Core (o que é específico do negócio e só a gente tem)
3. Arriscadas (coisas que não conhecemos bem ou que são muito importante para clientes, como segurança dos dados ou bibliotecas de terceiros)
4. Problemáticas (que sempre recebem report de bugs ou sempre quebram)
5. Complexas (requerem expertise, com algoritmos complexos ou coisas que somente algumas pessoas compreendem)

### Casos de teste

Escolhidas as features para testar, devemos seguir essa ordem para criar

1. Caminho feliz não trivial
2. Outros casos importantes
   1. Conjunto interessante de entradas
   2. Conjunto interessante de estados iniciais
   3. Conjunto interessante de estados finais
   4. Todos os estados de erro possíveis