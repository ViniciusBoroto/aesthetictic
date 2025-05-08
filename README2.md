1. Executar o Backend
Passo 1.1: Criar o Ambiente Virtual
Navegue até a pasta do backend no terminal:

Crie o ambiente virtual:

Passo 1.2: Ativar o Ambiente Virtual
Ative o ambiente virtual:

Windows:

Linux/Mac:

Passo 1.3: Instalar Dependências
Com o ambiente virtual ativado, instale as dependências:

Passo 1.4: Iniciar o Backend
Inicie o servidor do backend com o Uvicorn:

O terminal exibirá o endereço onde o backend está rodando, geralmente http://127.0.0.1:8000.

2. Executar o Frontend
Passo 2.1: Navegar até a Pasta do Frontend
Abra um novo terminal e navegue até a pasta do frontend:

Passo 2.2: Instalar Dependências
Instale as dependências do frontend:

Passo 2.3: Iniciar o Frontend
Inicie o servidor de desenvolvimento do frontend:

O terminal exibirá o endereço onde o frontend está rodando, geralmente http://localhost:3000.

3. Configurar a Comunicação entre Frontend e Backend
Certifique-se de que o frontend está configurado para se comunicar com o backend. Verifique se há um arquivo de configuração no frontend (como .env) e ajuste a URL da API, por exemplo:

Se você fizer alterações no arquivo .env, reinicie o servidor do frontend.

4. Visualizar no Navegador
Acesse o frontend no navegador: http://localhost:3000.
Certifique-se de que o backend está rodando em http://127.0.0.1:8000 para que os dados sejam carregados corretamente.