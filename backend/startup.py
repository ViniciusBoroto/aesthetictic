import uvicorn
from main import get_app

uvicorn.run(get_app(), host="127.0.0.1", port=8000)