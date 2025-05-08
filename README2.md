PASSOS PARA EXECUTAR O PROJETO 
---------------------------------------------------------------------
                            **BACKEND**

1. Criar o Ambiente Virtual
    Navegue até a pasta backend atráves do terminal (cd backend) e execute: python -m venv venv
        
2. Ativar o Ambiente Virtual
    Windows: venv\Scripts\activate
    Linux/Mac: source venv/bin/activate

3. Instalar Dependências
    Com o ambiente virtual ativado, execute: pip install -r requirements.txt

4. Iniciar o Backend
    Execute o servidor com o Uvicorn: uvicorn main:app --reload

O backend estará disponível em: http://127.0.0.1:8000
---------------------------------------------------------------------
                            **FRONTEND**

1. Instalar Dependências
    Navegue até a pasta frontend no terminal e execute: pnpm install

2. Iniciar o Frontend
    Execute o servidor de desenvolvimento: pnpm dev

O frontend estará disponível em: http://localhost:3000
---------------------------------------------------------------------
                            **OBS**

1. O arquivo `.venv` deve estar configurado corretamente. Caso ocorra algum erro na execução do backend, exclua a pasta `.venv` e crie-a novamente seguindo o guia acima.  

2. Se fizer alterações no arquivo `.env`, reinicie o servidor do frontend.  

3. Após criar o arquivo `.venv` e instalar as dependências no frontend (`pnpm install`), certifique-se de estar no diretório correto sempre que quiser executar o projeto novamente. No backend, use o terminal (`cd backend`) antes de executar `venv\Scripts\activate` e `uvicorn main:app --reload`. O mesmo vale para o frontend (`cd frontend`) antes de executar `pnpm dev`. 

3. Para interromper a execução do projeto, pressione Ctrl + C no terminal onde o frontend e o backend estão rodando.
