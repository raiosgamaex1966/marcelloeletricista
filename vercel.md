# Como Implantar na Vercel e Configurar as Chaves de IA

Este documento explica passo a passo como colocar o site do **Marcello Cordeiro Eletrotécnico** no ar utilizando a Vercel, e como configurar as chaves de API com segurança.

---

## 1. Enviando o Projeto para a Vercel

O método recomendado e mais fácil é utilizar a integração direta com o **GitHub**.

### Passo 1: Enviar seu código para o GitHub
Se você ainda não enviou seu projeto para o GitHub, rode os seguintes comandos no terminal do projeto:
```bash
git init
git add .
git commit -m "implantação do site com chat inteligente"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

### Passo 2: Conectar o GitHub à Vercel
1. Acesse [vercel.com](https://vercel.com/) e faça login usando sua conta do **GitHub**.
2. No painel principal da Vercel, clique no botão azul **"Add New..."** e selecione **"Project"**.
3. Na lista de repositórios que aparecerá, encontre o repositório deste projeto e clique em **"Import"**.
4. A Vercel detectará automaticamente as configurações do **Vite**. Não é necessário alterar nenhum comando de build.

---

## 2. Configurando as Chaves de API na Vercel (Variáveis de Ambiente)

**IMPORTANTE:** Nunca envie o seu arquivo `.env` para o GitHub por motivos de segurança (o arquivo `.gitignore` já está configurado para bloquear isso). Na Vercel, você deve configurar as chaves diretamente no painel deles.

### Passo a Passo para adicionar as chaves:

1. Antes de clicar no botão "Deploy", expanda a seção chamada **"Environment Variables"** (Variáveis de Ambiente).
   *(Se o site já foi publicado, você pode ir em **Settings -> Environment Variables** no painel do seu projeto na Vercel).*
2. Adicione as chaves preenchendo os campos **Key** (Chave) e **Value** (Valor) conforme a tabela abaixo:

| Key (Nome da Variável) | Value (Valor a colar) | Descrição |
| :--- | :--- | :--- |
| `VITE_OPENROUTER_API_KEY` | `sk-or-v1-...` | Sua chave do OpenRouter (Principal) |
| `VITE_OPENAI_API_KEY` | `sk-proj-...` | Sua chave da OpenAI (Fallback 1) |
| `VITE_DEEPINFRA_API_KEY` | `zfje4c6...` | Sua chave da DeepInfra (Fallback 2) |
| `VITE_GEMINI_API_KEY` | `AQ.Ab8R...` | Sua chave do Gemini (Fallback 3) |

3. Para cada variável, digite o nome na caixa **Key**, cole o código correspondente na caixa **Value** e clique em **"Add"**.
4. Após adicionar todas as chaves desejadas, clique no botão azul **"Deploy"** na parte inferior.

Pronto! A Vercel vai compilar o site e colocá-lo no ar. O chat utilizará as chaves configuradas com total segurança.
