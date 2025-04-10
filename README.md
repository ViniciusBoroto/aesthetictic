# aesthetictic

## Backend Setup

### 1. Criar Ambiente Virtual (venv)

Na raiz do backend, abra o terminal e execute:

```
python -m venv venv
```

### 2. Ativar o Ambiente Virtual

- **Windows:**
  ```
  venv\Scripts\activate
  ```

- **Linux/Mac:**
  ```
  source venv/bin/activate
  ```

### 3. Instalar Dependências

Com o ambiente virtual ativado, execute:

```
pip install -r requirements.txt
```

### 4. Iniciar a API

Para iniciar a API com o Uvicorn, execute:

```
uvicorn main:app
```
